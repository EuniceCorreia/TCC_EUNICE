import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'src/app/shared/async.utils';
import { SoundService } from 'src/app/shared/sound.service';

const CLAPS_DURATION_MS = 5000;

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  constructor(private router: Router, private sound_service: SoundService) { }

  ngOnInit(): void {
    this.playCelebration();
  }

  goToHome() {
    this.router.navigate(['game']);
  }

  private async playCelebration() {
    await this.sound_service.play('efects', 'claps');
    await delay(CLAPS_DURATION_MS);
    await this.sound_service.play('voices/positive', 'parabens');
  }
}
