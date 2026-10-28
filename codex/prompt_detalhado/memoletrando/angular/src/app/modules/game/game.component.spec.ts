import { ElementRef } from '@angular/core';
import { fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HelperService } from 'src/app/base/helper.service';
import { UserService } from '../account/users/user.service';
import { GameEventService } from '../game-events/game-event.service';
import { GameSettingService } from '../game-settings/game-setting.service';
import { GameComponent } from './game.component';

describe('GameComponent card selection', () => {
  let component: GameComponent;
  let playSound: jasmine.Spy;
  let openAlert: jasmine.Spy;

  beforeEach(() => {
    component = new GameComponent(
      {} as MatDialog,
      new ElementRef(document.createElement('div')),
      {} as HelperService,
      {} as GameEventService,
      {} as GameSettingService,
      {} as BsModalService,
      {} as ActivatedRoute,
      {} as Router,
      {} as UserService
    );
    playSound = spyOn(component, 'playSound');
    openAlert = spyOn(component, 'openAlert');
  });

  function eventTypes(): string[] {
    return component.listEvents.map((event: { type: string }) => event.type);
  }

  it('preserves the initial deck data and separate objects for each card', () => {
    expect(component.cards).toEqual([
      { id: 'card1', img: '../../../assets/image/orca.webp', par: '1', word: 'baleia' },
      { id: 'card2', img: '../../../assets/image/orca.webp', par: '1', word: 'baleia' },
      { id: 'card3', img: '../../../assets/image/peixe.jpeg', par: '2', word: 'peixe' },
      { id: 'card4', img: '../../../assets/image/peixe.jpeg', par: '2', word: 'peixe' },
      { id: 'card5', img: '../../../assets/image/tubarao.jpg', par: '3', word: 'tubarao' },
      { id: 'card6', img: '../../../assets/image/tubarao.jpg', par: '3', word: 'tubarao' },
      { id: 'card7', img: '../../../assets/image/tataruga.jpeg', par: '4', word: 'tartaruga' },
      { id: 'card8', img: '../../../assets/image/tataruga.jpeg', par: '4', word: 'tartaruga' }
    ]);
    expect(component.card1).not.toBe(component.card2);
    expect(component.cards[0]).toBe(component.card1);
    expect(component.collums).toBe(4);
  });

  it('ignores a previously matched card', async () => {
    component.correctPlay = [component.card1];

    await component.selectCard(component.card1);

    expect(component.selectedCards).toEqual([]);
    expect(component.listEvents).toEqual([]);
    expect(playSound).not.toHaveBeenCalled();
  });

  it('records selection using the current timer and mouse peripheral', async () => {
    component.minutes = '02';
    component.seconds = '34';
    component.milliseconds = '56';

    await component.selectCard(component.card1);

    expect(component.selectedCards).toEqual([component.card1]);
    expect(component.listEvents).toEqual([{
      type: 'toFlipCard',
      time: { minute: '02', seconds: '34', milliseconds: '56' },
      peripheral: 'mouse'
    }]);
    expect(component.validating).toBeFalse();
    expect(playSound).toHaveBeenCalledOnceWith('efects', 'flip_card');
  });

  it('turns back the only selected card when clicked again', async () => {
    await component.selectCard(component.card1);
    await component.selectCard(component.card1);

    expect(component.selectedCards).toEqual([]);
    expect(eventTypes()).toEqual(['toFlipCard', 'toFlipBackOverCard']);
    expect(openAlert).not.toHaveBeenCalled();
  });

  it('keeps a matching pair selected through the existing feedback delays', fakeAsync(() => {
    component.selectCard(component.card1);
    component.selectCard(component.card2);
    flushMicrotasks();

    expect(component.correctPlay).toEqual([component.card1, component.card2]);
    expect(component.validating).toBeTrue();
    tick(249);
    expect(openAlert).not.toHaveBeenCalled();

    component.minutes = '01';
    tick(1);
    expect(eventTypes()).toEqual(['toFlipCard', 'toFlipCard', 'hit']);
    expect(component.listEvents[2].time.minute).toBe('01');
    expect(openAlert).toHaveBeenCalledOnceWith(component.card2, true, component.alertSuccess);
    tick(999);
    expect(component.selectedCards.length).toBe(2);
    tick(1);

    expect(playSound.calls.mostRecent().args).toEqual(['voices/positive', 'parabens_voce_acertou']);
    expect(component.selectedCards).toEqual([]);
    expect(component.validating).toBeFalse();
  }));

  it('records a mismatch before waiting and plays the incentive after one second', fakeAsync(() => {
    spyOn(component, 'getRandomElement').and.returnValue('quase_la');
    component.selectCard(component.card1);
    component.selectCard(component.card3);
    flushMicrotasks();

    expect(eventTypes()).toEqual(['toFlipCard', 'toFlipCard', 'error']);
    expect(component.correctPlay).toEqual([]);
    expect(component.validating).toBeTrue();
    tick(999);
    expect(playSound.calls.count()).toBe(2);
    tick(1);

    expect(playSound.calls.allArgs()).toEqual([
      ['efects', 'flip_card'],
      ['efects', 'flip_card'],
      ['efects', 'flip_card'],
      ['voices/incentive', 'quase_la']
    ]);
    expect(openAlert).not.toHaveBeenCalled();
    expect(component.selectedCards).toEqual([]);
    expect(component.validating).toBeFalse();
  }));

  it('plays the click sound without selecting or validating another card while busy', fakeAsync(() => {
    const validatePlay = spyOn(component, 'validatePlay').and.callThrough();
    component.selectCard(component.card1);
    component.selectCard(component.card3);
    flushMicrotasks();
    component.selectCard(component.card5);
    flushMicrotasks();

    expect(component.selectedCards).toEqual([component.card1, component.card3]);
    expect(eventTypes()).toEqual(['toFlipCard', 'toFlipCard', 'error']);
    expect(validatePlay).toHaveBeenCalledTimes(1);
    expect(playSound.calls.count()).toBe(3);
    tick(1000);
  }));

  it('retains loose pair comparison and the asynchronous validation contract', async () => {
    component.selectedCards = [{ par: '1' }, { par: 1 }];
    const result = component.validatePlay();

    expect(result instanceof Promise).toBeTrue();
    expect(await result).toBeTrue();
    component.selectedCards = [component.card1, component.card3];
    expect(await component.validatePlay()).toBeFalse();
  });

  it('finishes only when the number of matched cards equals the deck size', () => {
    expect(component.validGame()).toBeFalse();
    component.correctPlay = component.cards.slice();
    expect(component.validGame()).toBeTrue();
    component.correctPlay.push(component.card1);
    expect(component.validGame()).toBeFalse();
  });
});
