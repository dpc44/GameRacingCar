export let negativeSound = new Howl({
    src: ['audio/negative.mp3'],
    volume: 0.3,
});

export let policeSound = new Howl({
    src: ['audio/police.wav'],
    loop: true,
    volume: 0.3,
});

export let positiveSound = new Howl({
    src: ['audio/positive.mp3'],
    volume: 0.3,
});

export let speedupSound = new Howl({
    src: ['audio/speedup.mp4'],
    loop: true,
    volume: 0.3,
});

export let checkPoliceSound = false;

export function setCheckPoliceSoundPause(value){
    checkPoliceSound = value;
}
