import {Keyboard} from "./Keyboard";
import { Chord } from "../music-theory/Chord";
import {Note} from "../music-theory/Note";

class Piano{
    _container: Element;
    _keyboardInterface: Keyboard;
    onKeyDown: any;
    onKeyUp: any;

    constructor(container: Element){
        this._container = container;

        // The piano keyboard interface
        this._keyboardInterface = new Keyboard(container);
        this._keyboardInterface.onKeyDown = this.keyDown.bind(this);    // Trigger the callback event after clicking a key
        this._keyboardInterface.onKeyUp = this.keyUp.bind(this);

        window.addEventListener('resize', this._resize.bind(this)); // Resize the keyboard according to the width of the window
        this._resize();

        // Callback events
        this.onKeyDown = function(){};
        this.onKeyUp = function(){};
    };

    /**
     * Resize the keyboard according to the window's width
     * @private
     */
    _resize(){
        const keyWidth = 27;
        let octaves = Math.round((window.innerWidth / keyWidth) / 12);
        octaves = Math.max(octaves, 1); // Octave not less than 2
        octaves = Math.min(octaves, 4); // Octave not greater than 7
        this._keyboardInterface.resize(36, octaves);  // Populate keys from G2
    }

    /**
     * Set the chord after a key is down
     * @param keyNum
     */
    public keyDown(keyNum: number){
        this._enableAddBtn();
        this._setChord(keyNum);
    }

    /**
     * Enable add progression if the chord type is not single
     */
    _enableAddBtn(){
        if (Chord.type !== "Single"){
            const addBtn = document.querySelector("#addBtn") as HTMLElement;
            addBtn.classList.remove("disabled");
        }
    }

    /**
     * Get the chord based on the root note, highlight the keys on the keyboard. and play the sound
     * @param keyNum
     * @private
     */
    _setChord(keyNum: number){
        Chord.rootKeyNum = keyNum;
        Chord.rootNoteName = Note.toNoteName(keyNum);
        const chord = Chord.getChordList(keyNum);
        Chord.notes = chord;    // Set the notes to the notes in the current chord

        console.log(`Set the chord to ${chord}`);
        this._keyboardInterface.highlight(chord);
        this.onKeyDown(chord);
    }

    /**
     * Release the sound
     * @param keyNum
     */
    keyUp(keyNum: number){
        const chord = Chord.getChordList(keyNum);
        this.onKeyUp(chord);
    }
}

export {Piano}
