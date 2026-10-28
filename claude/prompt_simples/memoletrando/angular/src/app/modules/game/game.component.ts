import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/base/helper.service';
import { chunk, randomElement, shuffle } from 'src/app/shared/array.utils';
import { delay } from 'src/app/shared/async.utils';
import { SoundService } from 'src/app/shared/sound.service';
import { User } from '../account/users/user';
import { UserService } from '../account/users/user.service';
import { AlertComponent, AlertData } from '../alert/alert.component';
import { GameEventService } from '../game-events/game-event.service';
import { GameFigure } from '../game-figures/game-figure';
import { GameSetting } from '../game-settings/game-setting';
import { GameSettingService } from '../game-settings/game-setting.service';
import { ModalGameComponent } from '../modal-game/modal-game.component';
import { Card, buildCards } from './card';
import {
  CARDS_PER_ROW,
  DEMO_CARD_PAIRS,
  INCENTIVE_VOICES,
  PAIR_FOUND_ALERT,
  WORD_GUESSED_ALERT,
} from './game.constants';
import { GameSession } from './game-session';

const FLIP_ANIMATION_MS = 250;
const FEEDBACK_DELAY_MS = 1000;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  readonly session = new GameSession();

  cards: Card[] = [];
  cardRows: Card[][] = [];
  selectedCards: Card[] = [];
  matchedCards: Card[] = [];
  private validating = false;

  user: User | null = null;
  game_setting_id: number | null = null;
  game_setting: GameSetting | null = null;
  game_figures: GameFigure[] = [];

  constructor(
    private dialog: MatDialog,
    private helper_service: HelperService,
    private game_event_service: GameEventService,
    private game_setting_service: GameSettingService,
    private modal_service: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private sound_service: SoundService,
    private user_service: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.user_service.user;
    if (!this.user || !this.user.id) {
      return this.leaveGame('Usuário não encontrado');
    }

    const id = this.route.snapshot.params['id'];
    this.game_setting_id = id ? parseInt(id) : null;
    if (!this.game_setting_id) {
      return this.leaveGame('ID do jogo não encontrado');
    }

    this.getGameSetting();
    this.startGame();
  }

  ngOnDestroy(): void {
    this.session.timer.stop();
  }

  isFaceUp(card: Card): boolean {
    return this.selectedCards.includes(card) || this.matchedCards.includes(card);
  }

  async selectCard(card: Card) {
    if (this.matchedCards.includes(card)) return;

    this.sound_service.play('efects', 'flip_card');

    if (this.selectedCards.length === 1 && this.selectedCards[0] === card) {
      this.selectedCards = [];
      this.session.record('toFlipBackOverCard');
      return;
    }

    if (this.selectedCards.length < 2) {
      this.session.record('toFlipCard');
      this.selectedCards.push(card);
    }

    if (this.selectedCards.length === 2 && !this.validating) {
      await this.checkSelectedPair(card);
    }
  }

  saveGameEvents() {
    this.game_event_service.storeMultiple([...this.session.events]).then(
      (response: any) => {
        this.helper_service.loading_dismiss();
        if (response.error) {
          this.helper_service.toast('danger', 'Alguma coisa deu errado');
        }
      },
      (error: any) => {
        this.helper_service.loading_dismiss();
        this.helper_service.responseErrors(error);
      }
    );
  }

  private getGameSetting() {
    this.helper_service.loading();
    this.game_setting_service.getSettingAndImages(this.game_setting_id).then(
      (response: any) => {
        this.helper_service.loading_dismiss();
        if (response.error) {
          this.helper_service.toast('danger', 'Alguma coisa deu errada ao buscar o jogo');
          return;
        }

        this.game_setting = new GameSetting(response.game_settings.game_setting);
        if (this.game_setting.user_id != this.user?.id) {
          this.helper_service.toast('danger', 'Esse Jogo pertence a outro usuário');
          return;
        }

        this.game_figures = response.game_settings.game_figures.map((gf: any) => new GameFigure(gf));
      },
      (error: any) => {
        console.log(error);
        this.helper_service.loading_dismiss();
      }
    );
  }

  private leaveGame(message: string) {
    this.helper_service.toast('danger', message);
    this.router.navigate(['/temas']);
  }

  private startGame() {
    this.cards = shuffle(buildCards(DEMO_CARD_PAIRS));
    this.cardRows = chunk(this.cards, CARDS_PER_ROW);
    this.session.record('initGame', 'none');
    this.session.timer.start();
  }

  private async checkSelectedPair(lastCard: Card) {
    this.validating = true;

    const [first, second] = this.selectedCards;
    if (first.pairId === second.pairId) {
      await this.onPairFound(lastCard);
    } else {
      await this.onPairMissed();
    }

    this.selectedCards = [];
    this.validating = false;
  }

  private async onPairFound(card: Card) {
    this.matchedCards.push(...this.selectedCards);

    await delay(FLIP_ANIMATION_MS);
    this.session.record('hit');
    this.showAlert(PAIR_FOUND_ALERT).subscribe(() => this.openWordModal(card));

    await delay(FEEDBACK_DELAY_MS);
    this.sound_service.play('voices/positive', 'parabens_voce_acertou');
  }

  private async onPairMissed() {
    this.session.record('error');

    await delay(FEEDBACK_DELAY_MS);
    this.sound_service.play('efects', 'flip_card');
    this.sound_service.play('voices/incentive', randomElement(INCENTIVE_VOICES));
  }

  private openWordModal(card: Card) {
    const initialState: Partial<ModalGameComponent> = {
      session: this.session,
      word: card.word.toUpperCase(),
      image: card.img,
      virtualKeyboard: true,
    };
    const modalRef = this.modal_service.show(ModalGameComponent, {
      ignoreBackdropClick: true,
      class: 'modal-fullscreen',
      animated: true,
      initialState,
    });

    modalRef.content?.solved.subscribe(() => this.onWordGuessed());
  }

  private onWordGuessed() {
    if (this.matchedCards.length === this.cards.length) {
      this.router.navigate(['end-game']);
      return;
    }
    this.showAlert(WORD_GUESSED_ALERT);
  }

  private showAlert(data: AlertData): Observable<void> {
    return this.dialog.open(AlertComponent, { data }).afterClosed();
  }
}
