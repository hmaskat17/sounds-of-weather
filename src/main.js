import { isPlaying, playSynth, stopSynth } from './js/create-soundscape.js';

window.addEventListener("DOMContentLoaded", () => {

    let elem = document.getElementById('select-btn');

    elem.onclick = function () {
        if (isPlaying) {
            stopSynth();
            elem.value = "Play";
        }
        else {
            playSynth();
            elem.value = "Stop";
        }
    };

});

