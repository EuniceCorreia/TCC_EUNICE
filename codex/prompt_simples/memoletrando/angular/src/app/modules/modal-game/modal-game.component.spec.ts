import { BsModalRef } from 'ngx-bootstrap/modal';
import { GameAudioService } from '../game/game-audio.service';
import { GameSession } from '../game/game-session';
import { ModalGameComponent } from './modal-game.component';

describe('ModalGameComponent', () => {
  let modal: ModalGameComponent;
  let modalRef: jasmine.SpyObj<BsModalRef>;
  let audio: jasmine.SpyObj<GameAudioService>;

  beforeEach(() => {
    modalRef = jasmine.createSpyObj<BsModalRef>('modalRef', ['hide']);
    audio = jasmine.createSpyObj<GameAudioService>('audio', ['play']);
    modal = new ModalGameComponent(modalRef, audio);
    modal.session = new GameSession(() => 0);
    modal.word = 'BALEIA';
  });

  it('records spelling events once in the shared session and closes on success', () => {
    modal.session.record('hit');
    const closed = jasmine.createSpy('closed');
    modal.onClose.subscribe(closed);
    for (const letter of 'baleia') modal.onLetterClick(letter);
    modal.onLetterClick('Enter');
    expect(modalRef.hide).toHaveBeenCalledTimes(1);
    expect(closed).toHaveBeenCalledTimes(1);
    expect(modal.session.events.map(event => event.type)).toEqual([
      'hit', ...Array(6).fill('insert_text'), 'verify_text', 'valid_play'
    ]);
  });

  it('clears incorrect input, provides feedback and keeps the modal open', () => {
    modal.text = 'peixe';
    modal.onLetterClick('Enter');
    expect(modal.text).toBe('');
    expect(modalRef.hide).not.toHaveBeenCalled();
    expect(audio.play).toHaveBeenCalledWith('voices/incentive', 'ops_foi_quase');
    expect(modal.session.events.map(event => event.type)).toEqual(['verify_text', 'error_play']);
  });

  it('deletes the last letter without adding the command to the text', () => {
    modal.text = 'BA';
    modal.onLetterClick('BackSpace');
    expect(modal.text).toBe('B');
    expect(modal.session.events[0].type).toBe('delete_text');
  });
});
