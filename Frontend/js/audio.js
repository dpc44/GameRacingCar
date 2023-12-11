export let negativeSound = new Howl({
    src: ['audio/negative.mp3']
});

export let policeSound = new Howl({
    src: ['audio/police.wav'],
    loop: true,
});

export let positiveSound = new Howl({
    src: ['audio/positive.mp3']
});

export let speedupSound = new Howl({
    src: ['audio/speedup.mp4'],
    loop: true,
});

export let checkPoliceSound = false;

export function setCheckPoliceSoundPause(value){
    console.log("set set set")
    checkPoliceSound = value;
    console.log(checkPoliceSound)
}
