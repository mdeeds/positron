/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        let isDown = false;
        body.addEventListener('keydown', (ev) => {
            if (isDown) {
                return;
            }
            isDown = true;
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
            isDown = false;
            synth.noteOff();
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

/***/ 544:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Positron = void 0;
const audio_1 = __webpack_require__(458);
const positronConfig_1 = __webpack_require__(462);
class Positron {
    constructor(audio) {
        this.c = new positronConfig_1.PositronConfig();
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
    noteOn(note) {
        const now = this.audioCtx.currentTime;
        this.osc.frequency.setValueAtTime(audio_1.Audio.HzFromNote(note), 0);
        this.filt.frequency.setValueAtTime(audio_1.Audio.HzFromNote(note), 0);
        this.vca.gain.cancelScheduledValues(0);
        this.vca.gain.setValueAtTime(0, now);
        this.vca.gain.linearRampToValueAtTime(0.5, now + this.c.attack);
        this.vca.gain.linearRampToValueAtTime(0.5 * this.c.sustain, now + this.c.attack + this.c.decay);
    }
    ;
    noteOff() {
        const now = this.audioCtx.currentTime;
        this.vca.gain.cancelScheduledValues(0);
        this.vca.gain.linearRampToValueAtTime(0, now + this.c.release);
    }
    getConfig() {
        return JSON.stringify(this.c);
    }
    setConfig(cfg) {
        Object.assign(this.c, JSON.parse(cfg));
    }
}
exports.Positron = Positron;
//# sourceMappingURL=positron.js.map

/***/ }),

/***/ 462:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PositronConfig = void 0;
class PositronConfig {
    constructor() {
        this.attack = 0.1;
        this.decay = 0.1;
        this.sustain = 0.8;
        this.release = 0.5;
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