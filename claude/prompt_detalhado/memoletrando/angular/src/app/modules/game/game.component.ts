import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalGameComponent } from '../modal-game/modal-game.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../alert/alert.component';
import { UserService } from '../account/users/user.service';
import { User } from '../account/users/user';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/base/helper.service';
import { GameSettingService } from '../game-settings/game-setting.service';
import { GameSetting } from '../game-settings/game-setting';
import { GameFigure } from '../game-figures/game-figure';
import { GameEventService } from '../game-events/game-event.service';

interface Card {
  id: string,
  img: string,
  par: string,
  word: string
}

interface CardPair {
  par: string,
  word: string,
  img: string
}

const IMAGE_PATH = '../../../assets/image';

const CARD_PAIRS: CardPair[] = [
  { par: '1', word: 'baleia', img: `${IMAGE_PATH}/orca.webp` },
  { par: '2', word: 'peixe', img: `${IMAGE_PATH}/peixe.jpeg` },
  { par: '3', word: 'tubarao', img: `${IMAGE_PATH}/tubarao.jpg` },
  { par: '4', word: 'tartaruga', img: `${IMAGE_PATH}/tataruga.jpeg` },
];

const CARDS_PER_PLAY = 2;
const TIMER_INTERVAL_MS = 10;
const HIT_EVENT_DELAY_MS = 250;
const FEEDBACK_DELAY_MS = 1000;

const SOUND_FOLDER = {
  effects: 'efects',
  positiveVoices: 'voices/positive',
  incentiveVoices: 'voices/incentive',
};

const HOME_ROUTE = '/temas';

/** Gera duas cartas por par, com ids sequenciais (card1, card2, ...). */
function buildCards(pairs: CardPair[]): Card[] {
  return pairs.flatMap((pair, index) =>
    [1, 2].map((copy) => ({
      id: `card${index * 2 + copy}`,
      img: pair.img,
      par: pair.par,
      word: pair.word
    }))
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  alertSuccess = {
    title: 'Parabéns!!!',
    description: 'Vamos para a próxima etapa',
    image: `${IMAGE_PATH}/character/brain_positive.png`
  }

  alertSuccess2 = {
    title: 'Muito bem!!!',
    description: 'Continue assim',
    image: `${IMAGE_PATH}/character/brain_read.png`
  }

  incentiveVoices = ['foi_por_pouco', 'ops_foi_quase', 'ops_nao_foi_dessa_vez', 'quase_la']

  numberPeaces = CARD_PAIRS.length
  cards: Card[] = buildCards(CARD_PAIRS)

  collums = this.cards.length / 2
  selectedCards: Card[] = []

  correctPlay: Card[] = []

  listEvents: any[] = []

  validating: boolean = false;

  alertNextPage: boolean = false;

  user: User | null = null;
  game_setting_id: number | null = null;
  game_setting: GameSetting | null = null;
  game_figures: GameFigure[] = [];

  // Cronômetro
  private intervalId: any;
  private startTime: number = 0;
  public minutes: string = '00';
  public seconds: string = '00';
  public milliseconds: string = '000';
  linhasCartas: any[] = [];

  constructor(
    public dialog: MatDialog,
    private helper_service: HelperService,
    private game_event_service: GameEventService,
    private game_setting_service: GameSettingService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private user_service: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.user_service.user;
    if (!this.user || !this.user.id) {
      this.exitWithError('Usuário não encontrado');
      return;
    }

    this.game_setting_id = this.getRouteGameSettingId();
    if (!this.game_setting_id) {
      this.exitWithError('ID do jogo não encontrado');
      return;
    }

    this.getGameSetting();
    this.cards = this.shuffleArray(this.cards)
    this.registerEvent('initGame', this.minutes, this.seconds, this.milliseconds, 'none', null)
    this.startTime = Date.now()
    this.startTimer(this.startTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private getRouteGameSettingId(): number | null {
    const id = this.route.snapshot.params['id'];
    return id ? parseInt(id) : null;
  }

  private exitWithError(message: string) {
    this.helper_service.toast('danger', message);
    this.router.navigate([HOME_ROUTE]);
  }

  getGameSetting() {
    this.helper_service.loading();
    this.game_setting_service.getSettingAndImages(this.game_setting_id).then(
      (response: any) => {
        this.helper_service.loading_dismiss();
        this.loadGameSetting(response);
      },
      (error: any) => {
        console.log(error);
        this.helper_service.loading_dismiss();
      }
    )
  }

  private loadGameSetting(response: any) {
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
  }

  // Funções do cronômetro

  startTimer(startTime: number) {
    this.intervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      this.minutes = this.pad(elapsedTime / 60000);
      this.seconds = this.pad((elapsedTime % 60000) / 1000);
      this.milliseconds = this.pad(elapsedTime % 1000);
    }, TIMER_INTERVAL_MS);
  }

  pad(num: number): string {
    return ('0' + Math.floor(num)).slice(-2);
  }

  public getTime() {
    return {
      'minutes': this.minutes,
      'seconds': this.seconds,
      'milliseconds': this.milliseconds,
    }
  }

  // Funções do jogo

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getRandomElement(array: any[]): any {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  async selectCard(card: any) {
    if (this.correctPlay.includes(card)) {
      return
    }

    this.playSound(SOUND_FOLDER.effects, 'flip_card')

    if (this.isOnlySelectedCard(card)) {
      this.selectedCards = []
      this.registerCurrentEvent('toFlipBackOverCard')
      return
    }

    if (this.selectedCards.length < CARDS_PER_PLAY) {
      this.registerCurrentEvent('toFlipCard')
      this.selectedCards.push(card)
    }

    if (this.selectedCards.length == CARDS_PER_PLAY && !this.validating) {
      await this.resolvePlay(card)
    }
  }

  private isOnlySelectedCard(card: Card): boolean {
    return this.selectedCards.length == 1 && this.selectedCards.includes(card);
  }

  private async resolvePlay(lastCard: Card) {
    this.validating = true

    if (await this.validatePlay()) {
      await this.handleHit(lastCard)
    } else {
      await this.handleMiss()
    }

    this.selectedCards = []
    this.validating = false
  }

  private async handleHit(lastCard: Card) {
    this.correctPlay.push(...this.selectedCards)

    await delay(HIT_EVENT_DELAY_MS);
    this.registerCurrentEvent('hit')
    this.openAlert(lastCard, true, this.alertSuccess)
    await delay(FEEDBACK_DELAY_MS);
    this.playSound(SOUND_FOLDER.positiveVoices, 'parabens_voce_acertou')
  }

  private async handleMiss() {
    this.registerCurrentEvent('error')
    await delay(FEEDBACK_DELAY_MS);
    this.playSound(SOUND_FOLDER.effects, 'flip_card')
    this.playSound(SOUND_FOLDER.incentiveVoices, this.getRandomElement(this.incentiveVoices))
  }

  async validatePlay() {
    const [first, second] = this.selectedCards;
    return first.par == second.par;
  }

  validGame() {
    return this.correctPlay.length == this.cards.length;
  }

  // Eventos

  registerEvent(typeEvent: string, minutes: string, seconds: string, milliseconds: string, peripheral: string, value: any) {
    console.log(`Registed event: ${typeEvent}\nTime: ${minutes}:${seconds}:${milliseconds}`);
    this.listEvents.push({
      "type": typeEvent,
      "time": {
        "minute": minutes,
        "seconds": seconds,
        "milliseconds": milliseconds,
      },
      "peripheral": peripheral
    })
  }

  /** Registra um evento de mouse com o tempo atual do cronômetro. */
  private registerCurrentEvent(typeEvent: string) {
    this.registerEvent(typeEvent, this.minutes, this.seconds, this.milliseconds, 'mouse', null)
  }

  public getListEvents() {
    return this.listEvents
  }

  async saveGameEvents() {
    this.game_event_service.storeMultiple(this.listEvents).then(
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
    )
  }

  // Modais e alertas

  openModal(card: any) {
    const modalRef: BsModalRef = this.modalService.show(ModalGameComponent, this.buildModalConfig(card));

    modalRef.content.onClose.subscribe((result: any) => {
      this.listEvents = this.listEvents.concat(result)

      if (this.validGame()) {
        this.router.navigate(['end-game'])
        return
      }

      this.openAlert(null, false, this.alertSuccess2)
    });
  }

  private buildModalConfig(card: Card) {
    return {
      ignoreBackdropClick: true,
      class: 'modal-fullscreen',
      animated: true,
      style: {
        width: '100%',
        height: '100%'
      },
      initialState: {
        startTime: this.startTime,
        word: card.word.toUpperCase(),
        virtualKeyboard: true,
        image: card.img
      },
    };
  }

  openAlert(card: any, memoryGame: boolean, data: any) {
    const dialogRef = this.dialog.open(AlertComponent, { data });

    dialogRef.afterClosed().subscribe(() => {
      if (memoryGame) {
        this.openModal(card)
      }
    });
  }

  playSound(folder: string, sound: string) {
    const audio = new Audio();
    audio.src = `assets/audio/${folder}/${sound.toLowerCase()}.mp3`;
    audio.load();
    audio.play();
  }

  closeAlert() { }

  // Layout

  dividirCartasEmLinhas(cartas: any[], tamanhoLinha: number) {
    const linhas = [];
    let linhaAtual = [];
    for (let i = 0; i < cartas.length; i++) {
      linhaAtual.push(cartas[i]);
      if (linhaAtual.length === tamanhoLinha || i === cartas.length - 1) {
        linhas.push(linhaAtual);
        linhaAtual = [];
      }
    }
    return linhas;
  }
}
