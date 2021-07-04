import { Adsr } from "./adsr";

export class PositronConfig {
  gainEnv: Adsr = new Adsr();
  filtEnv: Adsr = new Adsr();
  filterOffset: number = 0.0;
  noiseGain: number = 0.0;
}