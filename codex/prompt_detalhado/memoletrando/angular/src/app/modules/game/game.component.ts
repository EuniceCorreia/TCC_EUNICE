import { Component, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})


export class GameComponent {

  card1 = this.createCard('card1', 'orca.webp', '1', 'baleia');
  card2 = this.createCard('card2', 'orca.webp', '1', 'baleia');
  card3 = this.createCard('card3', 'peixe.jpeg', '2', 'peixe');
  card4 = this.createCard('card4', 'peixe.jpeg', '2', 'peixe');
  card5 = this.createCard('card5', 'tubarao.jpg', '3', 'tubarao');
  card6 = this.createCard('card6', 'tubarao.jpg', '3', 'tubarao');
  card7 = this.createCard('card7', 'tataruga.jpeg', '4', 'tartaruga');
  card8 = this.createCard('card8', 'tataruga.jpeg', '4', 'tartaruga');

  alertSuccess = {
    title: 'Parabéns!!!',
    description: 'Vamos para a próxima etapa',
    image: '../../../assets/image/character/brain_positive.png'
  }

  alertSuccess2 = {
    title: 'Muito bem!!!',
    description: 'Continue assim',
    image: '../../../assets/image/character/brain_read.png'
  }

  incentiveVoices = ['foi_por_pouco', 'ops_foi_quase', 'ops_nao_foi_dessa_vez', 'quase_la']

  numberPeaces = 4
  cards:any = [this.card1, this.card2, this.card3, this.card4, this.card5, this.card6, this.card7, this.card8]

  collums = this.cards.length/2
  selectedCards:any = []

  correctPlay:any = []

  listEvents:any = []

  validating: boolean = false;

  alertNextPage: boolean = false;

  user: User | null = null;
  game_setting_id: number | null = null;
  game_setting: GameSetting | null = null;
  game_figures: GameFigure[] = [];

  // Cronometer
  private intervalId: any;
  private startTime: number = 0;
  public minutes: string = '00';
  public seconds: string = '00';
  public milliseconds: string = '000';
  linhasCartas: any[] = [];

  constructor(
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private helper_service: HelperService,
    private game_event_service: GameEventService,
    private game_setting_service: GameSettingService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private user_service: UserService
  ) { }

  private createCard(id: string, image: string, pair: string, word: string) {
    return { id, img: `../../../assets/image/${image}`, par: pair, word };
  }

   ngOnInit(): void {
    console.log(screen.width);
    console.log(screen.height);
    this.user = this.user_service.user;
    if(!this.user || !this.user.id) {
      this.helper_service.toast('danger', 'Usuário não encontrado');
      this.router.navigate(['/temas']);
      return;
    }
    this.game_setting_id = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : null;
    
    if(!this.game_setting_id) {
      this.helper_service.toast('danger', 'ID do jogo não encontrado');
      this.router.navigate(['/temas']);
      return;
    }
    
    this.getGameSetting();
     this.cards = this.shuffleArray(this.cards)
     this.registerEvent('initGame', this.minutes, this.seconds, this.milliseconds, 'none', null)
     this.startTime = Date.now()
     this.startTimer(this.startTime);
  }
  
    getGameSetting() {
      this.helper_service.loading();
      this.game_setting_service.getSettingAndImages(this.game_setting_id).then(
          (response: any) => {
              this.helper_service.loading_dismiss();
              if(response.error) {
                this.helper_service.toast('danger', 'Alguma coisa deu errada ao buscar o jogo');
                return;
              }
              this.game_setting = new GameSetting(response.game_settings.game_setting);

              if (this.game_setting &&  this.game_setting.user_id != this.user?.id) {
                this.helper_service.toast('danger', 'Esse Jogo pertence a outro usuário');
                return;
              }
              this.game_figures = response.game_settings.game_figures.map((gf: any) => new GameFigure(gf));
          },
          (error: any) => {
              console.log(error);
              // this.helper_service.responseErrors(error);
              this.helper_service.loading_dismiss();
              // return this.router.navigateByUrl('/temas');
          }
      )
    }
    
    ngOnDestroy(): void {
      clearInterval(this.intervalId);
    }
    
    // Init cronometer functions
    startTimer(startTime: any) {
    this.intervalId = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      this.minutes = this.pad(elapsedTime / 60000);
      this.seconds = this.pad((elapsedTime % 60000) / 1000);
      this.milliseconds = this.pad(elapsedTime % 1000);
    }, 10);
  }

  pad(num: number): string {
    return ('0' + Math.floor(num)).slice(-2);
  }

  // End cronometer functions

  // Init game functions


  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  getRandomElement(array: any[]): any {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  async selectCard(card: any){
    if (this.correctPlay.includes(card)) {
      return;
    }

    this.playSound('efects', 'flip_card');

    if (this.selectedCards.includes(card) && this.selectedCards.length == 1) {
      this.selectedCards = [];
      this.registerMouseEvent('toFlipBackOverCard');
      return;
    }

    if (this.selectedCards.length < 2) {
      this.registerMouseEvent('toFlipCard');
      this.selectedCards.push(card);
      console.log(this.selectedCards.length);
    }

    if (this.selectedCards.length != 2 || this.validating) {
      return;
    }

    this.validating = true;
    const validPlay = await this.validatePlay();

    if (validPlay) {
      await this.handleMatchingPair(card);
    } else {
      await this.handleMismatchedPair();
    }

    this.selectedCards = [];
    this.validating = false;
  }

  private async handleMatchingPair(card: any): Promise<void> {
    this.correctPlay.push(...this.selectedCards);
    await this.wait(250);
    this.registerMouseEvent('hit');
    this.openAlert(card, true, this.alertSuccess);
    await this.wait(1000);
    this.playSound('voices/positive', 'parabens_voce_acertou');
  }

  private async handleMismatchedPair(): Promise<void> {
    this.registerMouseEvent('error');
    await this.wait(1000);
    this.playSound('efects', 'flip_card');
    this.playSound('voices/incentive', this.getRandomElement(this.incentiveVoices));
  }

  private registerMouseEvent(type: string): void {
    this.registerEvent(type, this.minutes, this.seconds, this.milliseconds, 'mouse', null);
  }

  private wait(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  
  async validatePlay(){
    return this.selectedCards[0].par == this.selectedCards[1].par;
  }
  
  registerEvent(typeEvent: string, minutes: string, seconds: string, milliseconds: string, peripheral: string, value: any){
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

  openModal(card: any) {
    const config = {
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
    const modalRef: BsModalRef = this.modalService.show(ModalGameComponent, config);

    modalRef.content.onClose.subscribe((result: any) => {
      console.log(result); // valor retornado pelo modal
      this.listEvents = this.listEvents.concat(result)
      console.log(this.listEvents);


      if(this.validGame()){
        //Salva os eventos
        //Leva para tela final
        this.router.navigate(['end-game'])
        return
      }

      this.openAlert(null, false, this.alertSuccess2)

      
    });
  }

  validGame(){
    return this.correctPlay.length == this.cards.length;
  }

  public getTime(){
    return {
      'minutes': this.minutes,
      'seconds': this.seconds,
      'milliseconds': this.milliseconds,
    }
  }

  public getListEvents(){
    return this.listEvents
  }


  playSound(paste: string, sound: string){
    let audio = new Audio();
    audio.src = `assets/audio/${paste}/${sound.toLowerCase()}.mp3`;
    audio.load();
    audio.play();
  }

  openAlert(card: any, memoryGame: boolean, data: any){
    const dialogRef = this.dialog.open(AlertComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (memoryGame){
        this.openModal(card)
      }
    });
  }
  // End game functions
  
  // Init listener functions
  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event: any) {
  //   console.log('asdasd');
    
  //   event.preventDefault();
  //   const confirmationMessage = 'Tem certeza que deseja sair da página?\nO jogo será interrompido';
  //   event.returnValue = confirmationMessage; // para navegadores antigos
  //   if (confirm(confirmationMessage)) {
  //     // Recarrega a página
  //     location.reload();
  //   }
  // }

  // End listener functions

  closeAlert(){
    
  }

  dividirCartasEmLinhas(cartas: any[], tamanhoLinha: number) {
    console.log('sdas');
    const linhas = [];
    let linhaAtual = [];
    for (let i = 0; i < cartas.length; i++) {
      linhaAtual.push(cartas[i]);
      if (linhaAtual.length === tamanhoLinha || i === cartas.length - 1) {
        linhas.push(linhaAtual);
        linhaAtual = [];
      }
    }
    console.log(linhas);
    
    return linhas;
  }

  async saveGameEvents() {
  console.log(this.listEvents);
    this.game_event_service.storeMultiple(this.listEvents).then(
      (response: any) => {
          // this.loading_save = false;
          console.log(response);
          
          this.helper_service.loading_dismiss();
          if(response.error) {
            this.helper_service.toast('danger', 'Alguma coisa deu errado');
            return;
          }
      },
      (error: any) => {
          this.helper_service.loading_dismiss();
          this.helper_service.responseErrors(error);
      }
  )
  }
}
