import { Audio } from "./audio";

export class Positron {
  attack: number = 0.1;
  decay: number = 0.1;
  sustain: number = 0.8;
  release: number = 0.5;
  osc: OscillatorNode;
  filt: BiquadFilterNode;
  vca: GainNode;
  audioCtx: AudioContext;

  constructor(audio: Audio) {
    this.osc = audio.audioCtx.createOscillator();
    this.osc.type = 'square';
    this.osc.frequency.setValueAtTime(30, 0);

    this.filt = audio.audioCtx.createBiquadFilter();
    this.filt.type = 'lowpass';
    this.filt.frequency.setValueAtTime(30, 0);

    this.vca = audio.audioCtx.createGain();
    this.vca.gain.setValueAtTime(0, 0);

    this.osc.start();

    this.osc.connect(this.filt);
    this.filt.connect(this.vca);
    this.vca.connect(audio.audioCtx.destination);

    this.audioCtx = audio.audioCtx;
  }

  public noteOn(note: number) {
    const now = this.audioCtx.currentTime;
    this.osc.frequency.setValueAtTime(Audio.HzFromNote(note), 0);
    this.filt.frequency.setValueAtTime(Audio.HzFromNote(note), 0);
    this.vca.gain.setValueAtTime(now, 0);
    this.vca.gain.linearRampToValueAtTime(1.0, now + this.attack);
    this.vca.gain.linearRampToValueAtTime(
      this.sustain, now + this.attack + this.decay);
  };

  public noteOff() {
    const now = this.audioCtx.currentTime;
    this.vca.gain.linearRampToValueAtTime(0, now + this.release);
  }
}