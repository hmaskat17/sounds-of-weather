import { rainSynth } from './generate-synth.js';
import { currentWeather } from './fetch-weather.js';

let synth, scale, reverb, delay, rainArpInterval, arpMode;
let isPlaying = false;

let majorScale = ["A3", "C#4", "E4", "A4", "B4", "C#5", "E5", "A5", "B4", "C#5", "E5", "A5", "B5", "C#6", "E6", "A6", "B5", "C#6", "E6", "A6", "B6", "C#7", "E7", "A7"];
let minorScale = ["A3", "C4", "E4", "A4", "B4", "C5", "E5", "A5", "B4", "C5", "E5", "A5", "B5", "C6", "E6", "A6", "B5", "C6", "E6", "A6", "B6", "C7", "E7", "A7"];

async function checkWeatherType() {
    let data = await currentWeather();
    console.log(`Weather description: ${data.weather[0].main}`);
    console.log(`Cloud percentage: ${data.clouds.all}`);

    let weatherType = data.weather[0].main;
    let clouds = data.clouds.all;

    function checkClouds() {
        if (clouds >= 11 && clouds <= 50) {
            scale = majorScale;
        }
        else if (clouds >= 51 && clouds <= 100) {
            scale = minorScale;
        };

        return;
    };

    function checkRain() {
        if (weatherType == "Drizzle") {
            rainArpInterval = "4n";
            arpMode = "upDown"
        }
        else if (weatherType == "Rain") {
            rainArpInterval = "16n";
            arpMode = "upDown"
        }
        else if (weatherType == "Thunderstorm") {
            rainArpInterval = "16t";
            arpMode = "random";
        }
        return;
    };

    checkClouds();
    checkRain();
};

checkWeatherType();

const stopSynth = () => {
    if (isPlaying) {
        console.log("Stopping Tone.Transport...");
        Tone.Transport.stop();

        console.log("Disconnecting everything...")
        synth.disconnect();
        reverb.disconnect();
        delay.disconnect();

        if (Tone.Transport.state !== "started") {
            isPlaying = false;
            console.log("Transport successfully stopped!");
        }
        else {
            console.log("Problem stopping Transport!");
        };
    };
};

const playSynth = () => {
    synth = rainSynth().toMaster();

    reverb = new Tone.Reverb(6).toMaster();
    synth.connect(reverb);
    reverb.generate();

    delay = new Tone.FeedbackDelay("4n", 0.02).toMaster();
    synth.connect(delay);

    let pattern = new Tone.Pattern(function (time, note) {
        synth.triggerAttackRelease(note);
    }, scale, arpMode);

    pattern.interval = rainArpInterval;
    //pattern.humanize = true;
    pattern.start();
    Tone.Transport.start();
    isPlaying = true;
};

export { isPlaying, playSynth, stopSynth }