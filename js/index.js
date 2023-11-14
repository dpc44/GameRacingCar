
function setStore(name, data) {
    let sData = JSON.stringify(data);
    localStorage.setItem(name, sData);
}

function getStore(name) {
    if (localStorage.getItem(name)) {
        let sData = localStorage.getItem(name);
        let data = JSON.parse(sData);
        return data;
    }
    return {};
}
//--------------Variable-------------------
let player = { x: 0, y: 0, speed: 6, start: false, pause: false, maxSpeed: 8 }
let enemySpeed = 5;
let keys = { w: false, s: false, a: false, d: false };
let counter = 0;
let gasTimers = [];
let skillUsed = [];
let starTimers = [];
let timeLeft = 30;
let timerPaused = false;
let currentLevel = 0;
let AddScore = 100;
let levelCondition = 0
let levelCounter = 0;
let numberOfEnemy = [3, 4, 5, 6]
let LevelEnemy = 0;
let previousRandomNumbersLeft = [];
let previousRandomNumbersRight = [];
let randomStar = 0;
let randomRisk = 0;
let IsX2Score = false;
let mouseDown = false;


let modeGameSelect;
let selectedValue;
let currentSelectedLevel;

let storageLevelMode = "LevelStorage";
let storageChallengeMode = "ChallengeStorage"

let vehicleCount = 0;
let tempXArray = [];
let riskSpeed = 4;
let carColor = ["Green", "Purple", "Red", "Yellow"];
//------------------variable for level model---------
let enemyLevelArray = [3, 3, 3, 4, 4, 4, 5, 5, 5, 5];
let enemySpeedArray = [5, 5.5, 6, 6.5, 7, 7.5, 8.0, 8.5, 9, 9.5];
let playerSpeedArray = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
let playerMaxSpeedArray = [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
let finishedConditionArray = [500, 700, 1000, 1300, 1600, 1900, 2200, 2500, 2800, 3100]
let tempPlaySpeed = 0;
let tempEnemySpeed = 0;
let startCountTime;
let isSlow = false;
let hearts = 3;

var BestScoreLevelMode = ["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00"];
var BestScoreChallengeMode = 0;
//-----new Interval-------
let starInterval;
let timerInterval;
let gasInterval;
let moneyInterval;
let riskInterval;
let countTimerInterval;
let heartInterval;
let CountGasTime = 0;
let CountStarTime = 0;
let CountMoneyTime = 0;
let CountRiskTime = 0;
let CountHeartTime = 0;

let UsedGasTime = 0;
let UsedStarTime = 0;
let UsedMoneyTime = 0;
let UsedRiskTime = 0;
let UsedHeartTime = 0;

let pauseTime = 0;

var score = document.getElementById('score');

let level = document.getElementById('level');
let GameOverScreen = document.getElementById('GameOverScreen');
let StartGameScreen = document.getElementById('GameStartScreen');

const roadarea = document.querySelector('.road');
let timerElement = document.querySelector('.TimeClock');
//-------level skill + Cash------
var cash = document.getElementById('cash');
let storageCash = "CashStorage"
let storeSkill = "UpgradeSkillStorage"

var skills = [
    { name: 'shieldLevel', level: 0, money: 1000, effect: 0 },
    { name: 'X2PointLevel', level: 0, money: 1000, effect: 0 },
    { name: 'bounusLevel', level: 0, money: 1500, effect: 0 }
];

//---------Set Cash + skill storage--------
var startCashNumber = 100000000;
function UpdateCash() {
    if (localStorage.getItem(storageCash) !== null) {
        
        startCashNumber = localStorage.getItem(storageCash);
        
        cash.innerHTML = `Cash: ${startCashNumber}`;

    } else {
        setStore(storageCash, startCashNumber)
        cash.innerHTML = `Cash: ${startCashNumber}`;

    }
}
function UpdateUpgradeSkill() {
    
    if (localStorage.getItem(storeSkill)!== null) {
        
        skills = getStore(storeSkill);
        
    } else {
        
        setStore(storeSkill, skills);
    }
}
