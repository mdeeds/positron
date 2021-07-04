/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 647:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Adsr = void 0;
const audio_1 = __webpack_require__(458);
class Adsr {
    constructor() {
        this.mode = 'absolute';
        this.attack = 0.1;
        this.decay = 0.1;
        this.sustain = 0.8;
        this.release = 0.5;
        this.intensity = 1.0;
        this.bias = 0.0;
    }
    static identity(x) {
        return x;
    }
    static hz(x) {
        return audio_1.Audio.HzFromNote(x);
    }
    static gateOn(self, param, now) {
        const f = self.mode === 'absolute' ? Adsr.identity : Adsr.hz;
        param.cancelScheduledValues(0);
        param.linearRampToValueAtTime(f(self.bias), now + Math.min(self.attack, 0.001));
        param.linearRampToValueAtTime(f(self.bias + self.intensity), now + self.attack);
        param.linearRampToValueAtTime(f(self.bias + self.intensity * self.sustain), now + self.attack + self.decay);
    }
    static gateOff(self, param, now) {
        const f = self.mode === 'absolute' ? Adsr.identity : Adsr.hz;
        param.cancelScheduledValues(0);
        param.linearRampToValueAtTime(f(self.bias), now + self.release);
    }
}
exports.Adsr = Adsr;
//# sourceMappingURL=adsr.js.map

/***/ }),

/***/ 458:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Audio = void 0;
class Audio {
    constructor(context) {
        this.audioCtx = context;
    }
    static make() {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = yield Audio.getAudioContext();
            return new Promise((resolve, reject) => {
                resolve(new Audio(ctx));
            });
        });
    }
    static getAudioContext() {
        return new Promise((resolve, reject) => {
            const context = new window.AudioContext();
            if (context.state === 'running') {
                resolve(context);
            }
            else {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(yield Audio.getAudioContext());
                }), 500);
            }
        });
    }
    static HzFromNote(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }
}
exports.Audio = Audio;
//# sourceMappingURL=audio.js.map

/***/ }),

/***/ 138:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const audio_1 = __webpack_require__(458);
const positron_1 = __webpack_require__(544);
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        const audio = yield audio_1.Audio.make();
        const synth = new positron_1.Positron(audio);
        const body = document.getElementsByTagName('body')[0];
        body.addEventListener('keydown', (ev) => {
            switch (ev.key) {
                case 'a':
                    synth.noteOn(60);
                    break;
                case 'w':
                    synth.noteOn(61);
                    break;
                case 's':
                    synth.noteOn(62);
                    break;
                case 'e':
                    synth.noteOn(63);
                    break;
                case 'd':
                    synth.noteOn(64);
                    break;
                case 'f':
                    synth.noteOn(65);
                    break;
                case 't':
                    synth.noteOn(66);
                    break;
                case 'g':
                    synth.noteOn(67);
                    break;
                case 'y':
                    synth.noteOn(68);
                    break;
                case 'h':
                    synth.noteOn(69);
                    break;
                case 'u':
                    synth.noteOn(70);
                    break;
                case 'j':
                    synth.noteOn(71);
                    break;
                case 'k':
                    synth.noteOn(72);
                    break;
                case 'o':
                    synth.noteOn(73);
                    break;
                case 'l':
                    synth.noteOn(74);
                    break;
            }
        });
        body.addEventListener('keyup', (ev) => {
            switch (ev.key) {
                case 'a':
                    synth.noteOff(60);
                    break;
                case 'w':
                    synth.noteOff(61);
                    break;
                case 's':
                    synth.noteOff(62);
                    break;
                case 'e':
                    synth.noteOff(63);
                    break;
                case 'd':
                    synth.noteOff(64);
                    break;
                case 'f':
                    synth.noteOff(65);
                    break;
                case 't':
                    synth.noteOff(66);
                    break;
                case 'g':
                    synth.noteOff(67);
                    break;
                case 'y':
                    synth.noteOff(68);
                    break;
                case 'h':
                    synth.noteOff(69);
                    break;
                case 'u':
                    synth.noteOff(70);
                    break;
                case 'j':
                    synth.noteOff(71);
                    break;
                case 'k':
                    synth.noteOff(72);
                    break;
                case 'o':
                    synth.noteOff(73);
                    break;
                case 'l':
                    synth.noteOff(74);
                    break;
            }
        });
        const ta = document.createElement('textarea');
        ta.value = synth.getConfig();
        ta.addEventListener('change', (ev) => {
            try {
                const dict = JSON.parse(ta.value);
                synth.setConfig(ta.value);
            }
            catch (e) {
                // Ignore.  No biggie.
            }
        });
        body.appendChild(ta);
    });
}
go();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 856:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NoiseNode = void 0;
class NoiseNode {
    static make(audioCtx) {
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
exports.NoiseNode = NoiseNode;
//# sourceMappingURL=noiseNode.js.map

/***/ }),

/***/ 544:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Positron = void 0;
const adsr_1 = __webpack_require__(647);
const audio_1 = __webpack_require__(458);
const noiseNode_1 = __webpack_require__(856);
const positronConfig_1 = __webpack_require__(462);
class Positron {
    constructor(audio) {
        this.c = new positronConfig_1.PositronConfig();
        this.lastNote = 0;
        this.c.filtEnv.mode = 'note';
        this.c.filtEnv.intensity = 12;
        this.osc = audio.audioCtx.createOscillator();
        this.osc.type = 'square';
        this.osc.frequency.setValueAtTime(30, 0);
        const noise = noiseNode_1.NoiseNode.make(audio.audioCtx);
        this.noiseGain = audio.audioCtx.createGain();
        this.noiseGain.gain.setValueAtTime(this.c.noiseGain, 0);
        this.filt = audio.audioCtx.createBiquadFilter();
        this.filt.type = 'lowpass';
        this.filt.frequency.setValueAtTime(30, 0);
        this.vca = audio.audioCtx.createGain();
        this.vca.gain.setValueAtTime(0, 0);
        const master = audio.audioCtx.createGain();
        master.gain.setValueAtTime(0.6, 0);
        this.osc.start();
        noise.start();
        this.osc.connect(this.filt);
        noise.connect(this.noiseGain);
        this.noiseGain.connect(this.filt);
        this.filt.connect(this.vca);
        this.vca.connect(master);
        master.connect(audio.audioCtx.destination);
        this.audioCtx = audio.audioCtx;
    }
    noteOn(note) {
        if (this.lastNote == note) {
            return;
        }
        const now = this.audioCtx.currentTime;
        this.osc.frequency.setValueAtTime(audio_1.Audio.HzFromNote(note), 0);
        this.noiseGain.gain.setValueAtTime(this.c.noiseGain, 0);
        this.c.filtEnv.bias = note;
        if (this.lastNote === 0) {
            adsr_1.Adsr.gateOn(this.c.filtEnv, this.filt.frequency, now);
            adsr_1.Adsr.gateOn(this.c.gainEnv, this.vca.gain, now);
        }
        this.lastNote = note;
    }
    ;
    noteOff(note) {
        if (note === this.lastNote) {
            this.lastNote = 0;
            const now = this.audioCtx.currentTime;
            adsr_1.Adsr.gateOff(this.c.filtEnv, this.filt.frequency, now);
            adsr_1.Adsr.gateOff(this.c.gainEnv, this.vca.gain, now);
        }
    }
    getConfig() {
        return JSON.stringify(this.c, null, 2);
    }
    setConfig(cfg) {
        const dict = JSON.parse(cfg);
        Object.assign(this.c, JSON.parse(cfg));
    }
}
exports.Positron = Positron;
//# sourceMappingURL=positron.js.map

/***/ }),

/***/ 462:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PositronConfig = void 0;
const adsr_1 = __webpack_require__(647);
class PositronConfig {
    constructor() {
        this.gainEnv = new adsr_1.Adsr();
        this.filtEnv = new adsr_1.Adsr();
        this.filterOffset = 0.0;
        this.noiseGain = 0.0;
    }
}
exports.PositronConfig = PositronConfig;
//# sourceMappingURL=positronConfig.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(138);
/******/ })()
;
//# sourceMappingURL=main.js.map