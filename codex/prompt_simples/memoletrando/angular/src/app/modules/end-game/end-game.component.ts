import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})


export class EndGameComponent {


  constructor(private router: Router) { }

   ngOnInit(): void {
    this.playSoundsEffects()
  }
    
  async playSoundsEffects(){
    await this.playSound('efects', 'claps')
    await new Promise(f => setTimeout(f, 5000));
    await this.playSound('voices/positive', 'parabens')
  }


  async playSound(paste: string, sound: string){
    let audio = new Audio();
    audio.src = `assets/audio/${paste}/${sound.toLowerCase()}.mp3`;
    audio.load();
    await audio.play();
  }

  goToHome(){
    this.router.navigate(['game'])
  }

}
