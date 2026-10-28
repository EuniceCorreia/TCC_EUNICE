import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioService {

    audio_new_order: any;
    looping_audio: any;

    audio_new_message: any;

    sound_emitter = new EventEmitter;

    constructor(
    ) {
        this.setAudioNewLead();
        this.setAudioNewMessage();
    }

    setAudioNewLead() {
        this.audio_new_order = new Audio();
        this.audio_new_order.src = "./assets/audio/bell.mp3";
        this.audio_new_order.load();
    }

    playAudioNewOrder() {
        if (this.looping_audio) return;

        this.looping_audio = setInterval(() => {
            this.audio_new_order.play();
        }, 1000)
    }

    clearIntervalAudioNewOrder() {
        clearInterval(this.looping_audio);
        this.looping_audio = false;
        this.sound_emitter.emit(false);
    }

    /**
     * Audio from new Message receipt
     * */
    setAudioNewMessage() {
        this.audio_new_message = new Audio();
        this.audio_new_message.src = "./assets/audio/new_message.mp3";
        this.audio_new_message.load();
    }

    playAudioNewMessage() {
        this.audio_new_message.play();
    }

}