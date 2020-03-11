const rainSynth = () => {
    let envelope = {
        attack: 0.01,
        decay: 1,
        sustain: 0.01,
        release: 0.01
    };

    return new Tone.Synth({
        volume: -20,
        oscillator: { type: 'triangle6' },
        envelope
    });
};

export { rainSynth };