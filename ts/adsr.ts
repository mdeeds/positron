import { Audio } from "./audio";

type AdsrMode = 'absolute' | 'note';

export class Adsr {
  mode: AdsrMode = 'absolute';
  attack: number = 0.1;
  decay: number = 0.1;
  sustain: number = 0.8;
  release: number = 0.5;
  intensity: number = 1.0;
  bias: number = 0.0;

  static identity(x: number): number {
    return x;
  }

  static hz(x: number): number {
    return Audio.HzFromNote(x);
  }

  static gateOn(self: Adsr, param: AudioParam, now: number) {
    const f = self.mode === 'absolute' ? Adsr.identity : Adsr.hz;
    param.cancelScheduledValues(0);
    param.linearRampToValueAtTime(
      f(self.bias), now + Math.min(self.attack, 0.001));
    param.linearRampToValueAtTime(
      f(self.bias + self.intensity), now + self.attack);
    param.linearRampToValueAtTime(
      f(self.bias + self.intensity * self.sustain),
      now + self.attack + self.decay);
  }

  static gateOff(self: Adsr, param: AudioParam, now: number) {
    const f = self.mode === 'absolute' ? Adsr.identity : Adsr.hz;
    param.cancelScheduledValues(0);
    param.linearRampToValueAtTime(f(self.bias), now + self.release);
  }
}