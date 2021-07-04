import { Adsr } from "./adsr";
import { Audio } from "./audio";
import { PositronConfig } from "./positronConfig";

export class Positron {
  c: PositronConfig = new PositronConfig();
  osc: OscillatorNode;
  filt: BiquadFilterNode;
  vca: GainNode;
  audioCtx: AudioContext;

  constructor(audio: Audio) {

    this.c.filtEnv.mode = 'note';
    this.c.filtEnv.intensity = 12;

    this.osc = audio.audioCtx.createOscillator();
    this.osc.type = 'square';
    this.osc.frequency.setValueAtTime(30, 0);

    this.filt = audio.audioCtx.createBiquadFilter();
    this.filt.type = 'lowpass';
    this.filt.frequency.setValueAtTime(30, 0);

    this.vca = audio.audioCtx.createGain();
    this.vca.gain.setValueAtTime(0, 0);

    const master = audio.audioCtx.createGain();
    master.gain.setValueAtTime(0.6, 0);

    this.osc.start();

    this.osc.connect(this.filt);
    this.filt.connect(this.vca);
    this.vca.connect(master);
    master.connect(audio.audioCtx.destination);

    this.audioCtx = audio.audioCtx;
  }

  private lastNote: number = 0;
  public noteOn(note: number) {
    if (this.lastNote == note) {
      return;
    }
    const now = this.audioCtx.currentTime;
    this.osc.frequency.setValueAtTime(Audio.HzFromNote(note), 0);
    this.c.filtEnv.bias = note;
    if (this.lastNote === 0) {
      Adsr.gateOn(this.c.filtEnv, this.filt.frequency, now);
      Adsr.gateOn(this.c.gainEnv, this.vca.gain, now);
    }
    this.lastNote = note;
  };

  public noteOff(note: number) {
    if (note === this.lastNote) {
      this.lastNote = 0;
      const now = this.audioCtx.currentTime;
      Adsr.gateOff(this.c.filtEnv, this.filt.frequency, now);
      Adsr.gateOff(this.c.gainEnv, this.vca.gain, now);
    }
  }

  public getConfig(): string {
    return JSON.stringify(this.c, null, 2);
  }

  public setConfig(cfg: string) {
    const dict = JSON.parse(cfg);
    Object.assign(this.c, JSON.parse(cfg));
  }
}