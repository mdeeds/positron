import { Audio } from "./audio";


async function go() {
  const audio = await Audio.make();

  const osc = audio.audioCtx.createOscillator();
  osc.type = 'square';
  osc.frequency.setValueAtTime(30, 0);

  const filt = audio.audioCtx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.setValueAtTime(30, 0);

  const vca = audio.audioCtx.createGain();
  vca.gain.setValueAtTime(0, 0);

  osc.start();

  osc.connect(filt).connect(vca).connect(audio.audioCtx.destination);

  let attack = 0.1;
  let decay = 0.1;
  let sustain = 0.8;
  let release = 0.5;

  function noteOn(note: number) {
    const now = audio.audioCtx.currentTime;
    osc.frequency.setValueAtTime(Audio.HzFromNote(note), 0);
    filt.frequency.setValueAtTime(Audio.HzFromNote(note), 0);
    vca.gain.setValueAtTime(now, 0);
    vca.gain.linearRampToValueAtTime(1.0, now + attack);
    vca.gain.linearRampToValueAtTime(sustain, now + attack + decay);
  };

  function noteOff() {
    const now = audio.audioCtx.currentTime;
    vca.gain.linearRampToValueAtTime(0, now + release);
  };

  const body = document.getElementsByTagName('body')[0];
  body.addEventListener('keydown', (ev: KeyboardEvent) => {
    switch (ev.key) {
      case 'a': noteOn(60); break;
      case 'w': noteOn(61); break;
      case 's': noteOn(62); break;
      case 'e': noteOn(63); break;
      case 'd': noteOn(64); break;
      case 'f': noteOn(65); break;
      case 't': noteOn(66); break;
      case 'g': noteOn(67); break;
      case 'y': noteOn(68); break;
      case 'h': noteOn(69); break;
      case 'u': noteOn(70); break;
      case 'j': noteOn(71); break;
      case 'k': noteOn(72); break;
      case 'o': noteOn(73); break;
      case 'l': noteOn(74); break;
    }
  });
  body.addEventListener('keyup', (ev: KeyboardEvent) => {
    noteOff();
  });
}

go();