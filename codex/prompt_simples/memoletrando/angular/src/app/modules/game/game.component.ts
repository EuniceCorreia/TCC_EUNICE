import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { HelperService } from 'src/app/base/helper.service';
import { ModalGameComponent } from '../modal-game/modal-game.component';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from '../account/users/user.service';
import { User } from '../account/users/user';
import { GameSettingService } from '../game-settings/game-setting.service';
import { GameSetting } from '../game-settings/game-setting';
import { GameFigure } from '../game-figures/game-figure';
import { chunk, createDefaultCards, MemoryCard, MemoryGame, shuffle } from './memory-game';
import { GameSession } from './game-session';
import { GameAudioService } from './game-audio.service';

interface GameAlert {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  readonly game = new MemoryGame(shuffle(createDefaultCards()));
  readonly session = new GameSession();
  readonly linhasCartas = chunk(this.game.cards, 4);
  readonly alertSuccess: GameAlert = {
    title: 'Parabéns!!!',
    description: 'Vamos para a próxima etapa',
    image: '../../../assets/image/character/brain_positive.png'
  };
  readonly alertSuccess2: GameAlert = {
    title: 'Muito bem!!!',
    description: 'Continue assim',
    image: '../../../assets/image/character/brain_read.png'
  };
  private readonly incentiveVoices = ['foi_por_pouco', 'ops_foi_quase', 'ops_nao_foi_dessa_vez', 'quase_la'];
  private readonly destroyed$ = new Subject<void>();
  private destroyed = false;
  private interactionLocked = false;

  user: User | null = null;
  game_setting: GameSetting | null = null;
  game_figures: GameFigure[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly helper_service: HelperService,
    private readonly game_setting_service: GameSettingService,
    private readonly modalService: BsModalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly user_service: UserService,
    private readonly audio: GameAudioService
  ) {}

  ngOnInit(): void {
    this.user = this.user_service.user;
    if (!this.user?.id) {
      this.rejectGame('Usuário não encontrado');
      return;
    }
    const settingId = Number(this.route.snapshot.params['id']);
    if (!Number.isInteger(settingId) || settingId <= 0) {
      this.rejectGame('ID do jogo não encontrado');
      return;
    }
    void this.getGameSetting(settingId);
    this.session.record('initGame', 'none');
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private rejectGame(message: string): void {
    this.helper_service.toast('danger', message);
    void this.router.navigate(['/temas']);
  }

  private async getGameSetting(settingId: number): Promise<void> {
    this.helper_service.loading();
    try {
      const response = await this.game_setting_service.getSettingAndImages(settingId);
      if (this.destroyed) return;
      if (response.error) {
        this.helper_service.toast('danger', 'Alguma coisa deu errada ao buscar o jogo');
        return;
      }
      this.game_setting = new GameSetting(response.game_settings.game_setting);
      if (this.game_setting.user_id != this.user?.id) {
        this.helper_service.toast('danger', 'Esse Jogo pertence a outro usuário');
        return;
      }
      this.game_figures = response.game_settings.game_figures.map((figure: Object) => new GameFigure(figure));
    } catch (error) {
      if (!this.destroyed) this.helper_service.responseErrors(error);
    } finally {
      this.helper_service.loading_dismiss();
    }
  }

  async selectCard(card: MemoryCard): Promise<void> {
    if (this.interactionLocked || this.destroyed) return;
    const selection = this.game.select(card);
    if (selection === 'ignored') return;

    this.audio.play('efects', 'flip_card');
    if (selection === 'unflipped') {
      this.session.record('toFlipBackOverCard');
      return;
    }
    this.session.record('toFlipCard');
    if (selection === 'flipped') return;

    this.interactionLocked = true;
    try {
      if (selection === 'match') {
        await this.showMatch(card);
      } else {
        await this.showMismatch();
      }
    } finally {
      this.game.finishTurn();
      this.interactionLocked = false;
    }
  }

  private async showMatch(card: MemoryCard): Promise<void> {
    await this.delay(250);
    if (this.destroyed) return;
    this.session.record('hit');
    void this.playMatchVoice();
    await this.showAlert(this.alertSuccess);
    if (this.destroyed) return;
    this.openModal(card);
  }

  private async showMismatch(): Promise<void> {
    this.session.record('error');
    await this.delay(1000);
    if (this.destroyed) return;
    this.audio.play('efects', 'flip_card');
    const voice = this.incentiveVoices[Math.floor(Math.random() * this.incentiveVoices.length)];
    this.audio.play('voices/incentive', voice);
  }

  private showAlert(data: GameAlert): Promise<void> {
    return new Promise(resolve => {
      this.dialog.open(AlertComponent, { data }).afterClosed()
        .pipe(take(1), takeUntil(this.destroyed$))
        .subscribe({ complete: () => resolve() });
    });
  }

  private openModal(card: MemoryCard): void {
    const modalRef = this.modalService.show(ModalGameComponent, {
      ignoreBackdropClick: true,
      class: 'modal-fullscreen',
      animated: true,
      initialState: {
        session: this.session,
        word: card.word.toUpperCase(),
        virtualKeyboard: true,
        image: card.img
      }
    });
    modalRef.content?.onClose.pipe(take(1), takeUntil(this.destroyed$)).subscribe(() => {
      if (this.game.complete) {
        void this.router.navigate(['end-game']);
        return;
      }
      void this.showAlert(this.alertSuccess2);
    });
  }

  private async playMatchVoice(): Promise<void> {
    await this.delay(1000);
    if (!this.destroyed) this.audio.play('voices/positive', 'parabens_voce_acertou');
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}
