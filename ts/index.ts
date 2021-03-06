import { Audio } from "./audio";
import { Positron } from "./positron";


async function go() {
  const audio = await Audio.make();

  const synth = new Positron(audio);
  const body = document.getElementsByTagName('body')[0];
  body.addEventListener('keydown', (ev: KeyboardEvent) => {
    switch (ev.key) {
      case 'a': synth.noteOn(60); break;
      case 'w': synth.noteOn(61); break;
      case 's': synth.noteOn(62); break;
      case 'e': synth.noteOn(63); break;
      case 'd': synth.noteOn(64); break;
      case 'f': synth.noteOn(65); break;
      case 't': synth.noteOn(66); break;
      case 'g': synth.noteOn(67); break;
      case 'y': synth.noteOn(68); break;
      case 'h': synth.noteOn(69); break;
      case 'u': synth.noteOn(70); break;
      case 'j': synth.noteOn(71); break;
      case 'k': synth.noteOn(72); break;
      case 'o': synth.noteOn(73); break;
      case 'l': synth.noteOn(74); break;
    }
  });
  body.addEventListener('keyup', (ev: KeyboardEvent) => {
    switch (ev.key) {
      case 'a': synth.noteOff(60); break;
      case 'w': synth.noteOff(61); break;
      case 's': synth.noteOff(62); break;
      case 'e': synth.noteOff(63); break;
      case 'd': synth.noteOff(64); break;
      case 'f': synth.noteOff(65); break;
      case 't': synth.noteOff(66); break;
      case 'g': synth.noteOff(67); break;
      case 'y': synth.noteOff(68); break;
      case 'h': synth.noteOff(69); break;
      case 'u': synth.noteOff(70); break;
      case 'j': synth.noteOff(71); break;
      case 'k': synth.noteOff(72); break;
      case 'o': synth.noteOff(73); break;
      case 'l': synth.noteOff(74); break;
    }

  });

  const ta = document.createElement('textarea');
  ta.value = synth.getConfig();
  ta.addEventListener('change', (ev) => {
    try {
      const dict = JSON.parse(ta.value);
      synth.setConfig(ta.value);
    } catch (e) {
      // Ignore.  No biggie.
    }
  });
  body.appendChild(ta);

}

go();