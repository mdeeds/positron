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
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        const audio = yield audio_1.Audio.make();
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
        function noteOn(note) {
            const now = audio.audioCtx.currentTime;
            osc.frequency.setValueAtTime(audio_1.Audio.HzFromNote(note), 0);
            filt.frequency.setValueAtTime(audio_1.Audio.HzFromNote(note), 0);
            vca.gain.setValueAtTime(now, 0);
            vca.gain.linearRampToValueAtTime(1.0, now + attack);
            vca.gain.linearRampToValueAtTime(sustain, now + attack + decay);
        }
        ;
        function noteOff() {
            const now = audio.audioCtx.currentTime;
            vca.gain.linearRampToValueAtTime(0, now + release);
        }
        ;
        const body = document.getElementsByTagName('body')[0];
        body.addEventListener('keydown', (ev) => {
            switch (ev.key) {
                case 'a':
                    noteOn(60);
                    break;
                case 'w':
                    noteOn(61);
                    break;
                case 's':
                    noteOn(62);
                    break;
                case 'e':
                    noteOn(63);
                    break;
                case 'd':
                    noteOn(64);
                    break;
                case 'f':
                    noteOn(65);
                    break;
                case 't':
                    noteOn(66);
                    break;
                case 'g':
                    noteOn(67);
                    break;
                case 'y':
                    noteOn(68);
                    break;
                case 'h':
                    noteOn(69);
                    break;
                case 'u':
                    noteOn(70);
                    break;
                case 'j':
                    noteOn(71);
                    break;
                case 'k':
                    noteOn(72);
                    break;
                case 'o':
                    noteOn(73);
                    break;
                case 'l':
                    noteOn(74);
                    break;
            }
        });
        body.addEventListener('keyup', (ev) => {
            noteOff();
        });
    });
}
go();
//# sourceMappingURL=index.js.map

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