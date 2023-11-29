import { newUID } from "./FireBaseConfig.js";

import { GetValueFireBase, getUser } from "./FireBaseFunctions.js";

if (newUID) {
    console.log("start");
} else {
    console.log("wait");
    await getUser();
}



//--------------Variable-------------------
export let player = { x: 0, y: 0, speed: 6, start: false, pause: false, maxSpeed: 8 }
export let enemySpeed = 5;
export let keys = { w: false, s: false, a: false, d: false };
export let counter = 0;

export let currentLevel = 0;
export let AddScore = 100;
export let levelCondition = 0
export let levelCounter = 0;
export let numberOfEnemy = [3, 4, 5, 6]
export let LevelEnemy = 0;

export let previousRandomNumbersLeft = [];
export let previousRandomNumbersRight = [];


export let randomStar = 0;
export let randomRisk = 0;
export let IsX2Score = false;
export let mouseDown = false;
export let modeGameSelect;
export let selectedValue;
export let currentSelectedLevel;
export let storageLevelMode = "LevelStorage";
export let storageChallengeMode = "ChallengeStorage"
export let vehicleCount = 0;
export let tempXArray = [];
export let riskSpeed = 4;
export let carColor = ["Green", "Purple", "Red", "Yellow"];
//------------------variable for level model---------
export let enemyLevelArray = [3, 3, 3, 4, 4, 4, 5, 5, 5, 5];
export let enemySpeedArray = [5, 5.5, 6, 6.5, 7, 7.5, 8.0, 8.5, 9, 9.5];
export let playerSpeedArray = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
export let playerMaxSpeedArray = [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
export let finishedConditionArray = [500, 700, 1000, 1300, 1600, 1900, 2200, 2500, 2800, 3100]
export let tempPlaySpeed = 0;
export let tempEnemySpeed = 0;
export let startCountTime;
export let isSlow = false;
export let hearts = 3;

export var BestScoreLevelMode = ["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"];
export var BestScoreChallengeMode = 0;
//--------------------HTML by Id--------------------------
export var score = document.getElementById('score');

export let level = document.getElementById('level');
export let GameOverScreen = document.getElementById('GameOverScreen');
export let StartGameScreen = document.getElementById('GameStartScreen');

export let roadarea = document.querySelector('.road');
export let timerElement = document.querySelector('.TimeClock');
//-------level skill + Cash------
export var cash = document.getElementById('cash');
export let storageCash = "CashStorage"
export let storeSkill = "UpgradeSkillStorage"

export var skills;
//---------Set Cash + skill storage--------
export var startCashNumber = 0;
export async function UpdateCash() {
    console.log("UpdateCash")
    const userPath = `users/${newUID}/startCashNumber`;
    await GetValueFireBase(userPath)
        .then(data => {
            startCashNumber = data;
            cash.innerHTML = `Cash: ${startCashNumber}`;
        })
        .catch(error => {
            console.log("Error:", error);
        });
}
export async function UpdateUpgradeSkill() {
    console.log("UpdateUpgradeSkill")
    const userPath = `users/${newUID}/skills`;
    skills = await GetValueFireBase(userPath);
    console.log(skills)
}
//------------SetFunction----------




export function setPlayer(field, value) {
    if (field in player) {
        player[field] = value;
    }
}


export function setKeys(field, value) {
    if (field in keys) {
        keys[field] = value;
    }
}

export function setEnemySpeed(value) {
    enemySpeed = value;
}

export function setCounter(value) {
    counter = value;
}



export function setCurrentLevel(value) {
    currentLevel = value;
}

export function setAddScore(value) {
    AddScore = value;
}

export function setLevelCondition(value) {
    levelCondition = value;
}

export function setLevelCounter(value) {
    levelCounter = value;
}

export function setLevelEnemy(value) {
    LevelEnemy = value;
}

export function addToPreviousRandomNumbersLeft(value) {
    previousRandomNumbersLeft.push(value);
}

export function removeFromPreviousRandomNumbersLeft() {
    return previousRandomNumbersLeft.shift();
}

export function addToPreviousRandomNumbersRight(value) {
    previousRandomNumbersRight.push(value);
}

export function removeFromPreviousRandomNumbersRight() {
    return previousRandomNumbersRight.shift();
}

export function setRandomStar(value) {
    randomStar = value;
}

export function setRandomRisk(value) {
    randomRisk = value;
}

export function setIsX2Score(value) {
    IsX2Score = value;
}

export function setMouseDown(value) {
    mouseDown = value;
}

export function setModeGameSelect(value) {
    modeGameSelect = value;
}

export function setSelectedValue(value) {
    selectedValue = value;
}

export function setCurrentSelectedLevel(value) {

    currentSelectedLevel = value;
}

export function setVehicleCount(value) {
    vehicleCount = value;
}

export function addToTempXArray(value) {
    tempXArray.push(value);
}

export function removeFromTempXArray() {
    return tempXArray.pop();
}

export function setRiskSpeed(value) {
    riskSpeed = value;
}

export function setTempPlaySpeed(value) {
    tempPlaySpeed = value;
}

export function setTempEnemySpeed(value) {
    tempEnemySpeed = value;
}

export function setStartCountTime(value) {
    startCountTime = value;
}

export function setIsSlow(value) {
    isSlow = value;
}

export function setHearts(value) {
    hearts = value;
}

export function setBestScoreLevelMode(index, value) {
    BestScoreLevelMode[index] = value;
}

export function setBestScoreChallengeMode(value) {
    BestScoreChallengeMode = value;
}



export function setAllDetailPlayer(newX, newY, newSpeed, newStart, newPause, newMaxSpeed) {
    player.x = newX !== undefined ? newX : player.x;
    player.y = newY !== undefined ? newY : player.y;
    player.speed = newSpeed !== undefined ? newSpeed : player.speed;
    player.start = newStart !== undefined ? newStart : player.start;
    player.pause = newPause !== undefined ? newPause : player.pause;
    player.maxSpeed = newMaxSpeed !== undefined ? newMaxSpeed : player.maxSpeed;
}

export function ResetEnemySpeedArray(newArray) {
    enemySpeedArray = newArray;
}

export function ResetPlayerSpeedArray(newArray) {
    playerSpeedArray = newArray;
}

export function ResetPlayerMaxSpeedArray(newArray) {
    playerMaxSpeedArray = newArray;
}

export function setEnemySpeedArray(position, value) {
    if (position >= 0 && position < enemySpeedArray.length) {
        enemySpeedArray[position] = value;
    }
}

export function setPlayerSpeedArray(position, value) {

    if (position >= 0 && position < playerSpeedArray.length) {
        playerSpeedArray[position] = value;
    }
}

export function setPlayerMaxSpeedArray(position, value) {
    if (position >= 0 && position < playerMaxSpeedArray.length) {
        playerMaxSpeedArray[position] = value;
    }
}
export function setstartCashNumber(value) {
    startCashNumber = value;
}

export function setSkillField(name, field, value) {
    const skill = skills.find(s => s.name === name);
    if (skill) {
        skill[field] = value;
    }
}

export function setAllValueBestLevelScore(value) {
    BestScoreLevelMode = value;
}