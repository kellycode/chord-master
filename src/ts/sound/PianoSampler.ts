import {Buffer, Sampler} from "tone/tone";
import "../audio/*.mp3";

/**
 * A sampler that loads the audios of the piano notes and generate authentic piano sound
 */
class PianoSampler {
    _lowest: number;
    _highest: number;
    _baseUrl: string;
    _sampler: Sampler | null;
    _loaded: boolean;
    _urls: {};

    constructor(baseUrl = "", lowest = 0, highest = 12 * 8) {
        this._lowest = lowest;
        this._highest = highest;
        this._baseUrl = baseUrl;

        this._sampler = null;

        this._loaded = false;   // If audio files are loaded
        // Call the load function to load audio
        // @ts-ignore
        Buffer.on("load", () => {  // Callback when all buffers are loaded
            console.log("All buffers are loaded");
            this._loaded = true   // The audio is loaded
        });

        // Urls of the audio files
        this._urls = {
            "A0": "A0.[mp3|ogg]",
            "C1": "C1.[mp3|ogg]",
            "D#1": "Ds1.[mp3|ogg]",
            "F#1": "Fs1.[mp3|ogg]",
            "A1": "A1.[mp3|ogg]",
            "C2": "C2.[mp3|ogg]",
            "D#2": "Ds2.[mp3|ogg]",
            "F#2": "Fs2.[mp3|ogg]",
            "A2": "A2.[mp3|ogg]",
            "C3": "C3.[mp3|ogg]",
            "D#3": "Ds3.[mp3|ogg]",
            "F#3": "Fs3.[mp3|ogg]",
            "A3": "A3.[mp3|ogg]",
            "C4": "C4.[mp3|ogg]",
            "D#4": "Ds4.[mp3|ogg]",
            "F#4": "Fs4.[mp3|ogg]",
            "A4": "A4.[mp3|ogg]",
            "C5": "C5.[mp3|ogg]",
            "D#5": "Ds5.[mp3|ogg]",
            "F#5": "Fs5.[mp3|ogg]",
            "A5": "A5.[mp3|ogg]",
            "C6": "C6.[mp3|ogg]",
            "D#6": "Ds6.[mp3|ogg]",
            "F#6": "Fs6.[mp3|ogg]",
            "A6": "A6.[mp3|ogg]",
            "C7": "C7.[mp3|ogg]",
            "D#7": "Ds7.[mp3|ogg]",
            "F#7": "Fs7.[mp3|ogg]",
            "A7": "A7.[mp3|ogg]",
            "C8": "C8.[mp3|ogg]"
        };
    }

    /**
     * Load the audio files
     * @return {Promise<>}
     */
    load(): Promise<any> {
        return new Promise(done => {
            // Initialize the sampler with piano audio files
            console.log("Loading the audio");
            this._sampler = new Sampler(this._urls, done, this._baseUrl,).toMaster() as Sampler;
        })
    }

    /**
     * Trigger a chord
     * @param notes notes in the chord
     */
    keyDown(notes: Array<string>) {
        if (this._loaded) {
            //@ts-ignore
            (this._sampler as Sampler).triggerAttack(notes);
        }
    }

    /**
     * Release the chord
     * @param time
     */
    keyUp(notes: Array<string>, time: string | number) {
        if (this._loaded) {
            //@ts-ignore
            (this._sampler as Sampler).triggerRelease(notes, time);
        }
    }

    /**
     * Play and release a chord
     * @param notes An array of notes in the chord
     * @param duration The time the note should be held
     * @param time When to start the attack
     */
    keyDownUp(notes: Array<string>, duration: string | number, time: number | string) {
        if (this._loaded) {
            //@ts-ignore
            (this._sampler as Sampler).triggerAttackRelease(notes, duration, time);
        }
    }
}

export {PianoSampler}

