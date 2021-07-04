export class Audio {
  readonly audioCtx: AudioContext;
  private constructor(context: AudioContext) {
    this.audioCtx = context;
  }

  public static async make(): Promise<Audio> {
    const ctx = await Audio.getAudioContext();
    return new Promise((resolve, reject) => {
      resolve(new Audio(ctx));
    })
  }

  private static getAudioContext(): Promise<AudioContext> {
    return new Promise((resolve, reject) => {
      const context = new window.AudioContext();
      if (context.state === 'running') {
        resolve(context);
      } else {
        setTimeout(async () => {
          resolve(await Audio.getAudioContext());
        }, 500);
      }
    });
  }

  public static HzFromNote(note: number): number {
    return 440 * Math.pow(2, (note - 69) / 12)
  }
}