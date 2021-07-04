export class NoiseNode {
  static make(audioCtx: AudioContext) {
    const bufferSize = audioCtx.sampleRate * 3.0;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    let data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    let noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    return noise;
  }
}