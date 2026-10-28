import { fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../account/users/user.service';
import { GameSettingService } from '../game-settings/game-setting.service';
import { GameAudioService } from './game-audio.service';
import { GameComponent } from './game.component';

describe('GameComponent turn lifecycle', () => {
  let component: GameComponent;
  let audio: jasmine.SpyObj<GameAudioService>;

  beforeEach(() => {
    audio = jasmine.createSpyObj<GameAudioService>('audio', ['play']);
    TestBed.configureTestingModule({
      providers: [
        GameComponent,
        { provide: GameAudioService, useValue: audio },
        { provide: MatDialog, useValue: {} },
        { provide: BsModalService, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) },
        { provide: HelperService, useValue: jasmine.createSpyObj('helper', ['toast']) },
        { provide: GameSettingService, useValue: {} },
        { provide: UserService, useValue: { user: null } }
      ]
    });
    component = TestBed.inject(GameComponent);
  });

  afterEach(() => component.ngOnDestroy());

  it('populates the rendered rows with every card', () => {
    expect(component.linhasCartas.length).toBe(2);
    expect(component.linhasCartas.flat()).toEqual(component.game.cards);
  });

  it('redirects an unauthenticated user before starting a game', () => {
    component.ngOnInit();
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledWith(['/temas']);
    expect(component.session.events).toEqual([]);
  });

  it('ignores rapid extra clicks until the mismatched pair turns back', fakeAsync(() => {
    const first = component.game.cards[0];
    const second = component.game.cards.find(card => card.par !== first.par)!;
    const third = component.game.cards.find(card => card !== first && card !== second)!;
    void component.selectCard(first);
    void component.selectCard(second);
    void component.selectCard(third);
    expect(component.game.selectedCards).toEqual([first, second]);
    expect(component.session.events.map(event => event.type)).toEqual(['toFlipCard', 'toFlipCard', 'error']);
    tick(1000);
    flushMicrotasks();
    expect(component.game.selectedCards).toEqual([]);
    void component.selectCard(third);
    expect(component.game.selectedCards).toEqual([third]);
  }));

  it('does not play delayed feedback after leaving the game', fakeAsync(() => {
    const first = component.game.cards[0];
    const second = component.game.cards.find(card => card.par !== first.par)!;
    void component.selectCard(first);
    void component.selectCard(second);
    audio.play.calls.reset();
    component.ngOnDestroy();
    tick(1000);
    flushMicrotasks();
    expect(audio.play).not.toHaveBeenCalled();
  }));
});
