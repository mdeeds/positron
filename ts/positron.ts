import { Audio } from "./audio";
import { PositronConfig } from "./positronConfig";

export class Positron {
  c: PositronConfig = new PositronConfig();
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

    this.vca.gain.cancelScheduledValues(0);
    this.vca.gain.setValueAtTime(0, now);
    this.vca.gain.linearRampToValueAtTime(0.5, now + this.c.attack);
    this.vca.gain.linearRampToValueAtTime(
      0.5 * this.c.sustain, now + this.c.attack + this.c.decay);
  };

  public noteOff() {
    const now = this.audioCtx.currentTime;
    this.vca.gain.cancelScheduledValues(0);
    this.vca.gain.linearRampToValueAtTime(0, now + this.c.release);
  }

  public getConfig(): string {
    return JSON.stringify(this.c);
  }

  public setConfig(cfg: string) {
    Object.assign(this.c, JSON.parse(cfg));
  }
}