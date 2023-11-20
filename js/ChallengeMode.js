import {
    setStore,
    getStore,
    UpdateCash,
    UpdateUpgradeSkill,
    player,
    enemySpeed,
    keys,
    counter,
    currentLevel,
    AddScore,
    levelCondition,
    levelCounter,
    numberOfEnemy,
    LevelEnemy,
    previousRandomNumbersLeft,
    previousRandomNumbersRight,
    randomStar,
    randomRisk,
    IsX2Score,
    mouseDown,
    modeGameSelect,
    selectedValue,
    currentSelectedLevel,
    storageLevelMode,
    storageChallengeMode,
    vehicleCount,
    tempXArray,
    riskSpeed,
    carColor,
    enemyLevelArray,
    enemySpeedArray,
    playerSpeedArray,
    playerMaxSpeedArray,
    finishedConditionArray,
    tempPlaySpeed,
    tempEnemySpeed,
    startCountTime,
    isSlow,
    hearts,
    BestScoreLevelMode,
    BestScoreChallengeMode,
    score,
    level,
    GameOverScreen,
    StartGameScreen,
    roadarea,
    timerElement,
    cash,
    storageCash,
    storeSkill,
    skills,
    startCashNumber
} from "./index.js";


import {
    setLevelEnemy,
    setPlayer,
    setKeys,
    setEnemySpeed,
    setCounter,
    setCurrentLevel,
    setAddScore,
    setLevelCondition,
    setLevelCounter,
    addToPreviousRandomNumbersLeft,
    removeFromPreviousRandomNumbersLeft,
    addToPreviousRandomNumbersRight,
    removeFromPreviousRandomNumbersRight,
    setRandomStar,
    setRandomRisk,
    setIsX2Score,
    setMouseDown,
    setModeGameSelect,
    setSelectedValue,
    setCurrentSelectedLevel,
    setVehicleCount,
    addToTempXArray,
    removeFromTempXArray,
    setRiskSpeed,
    setTempPlaySpeed,
    setTempEnemySpeed,
    setStartCountTime,
    setIsSlow,
    setHearts,
    setBestScoreLevelMode,
    setBestScoreChallengeMode,
    setAllDetailPlayer,
    ResetEnemySpeedArray,
    ResetPlayerSpeedArray,
    ResetPlayerMaxSpeedArray,
    setEnemySpeedArray,
    setPlayerSpeedArray,
    setPlayerMaxSpeedArray
} from "./index.js";
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
StartGameScreen.style.display = 'block';
//---------------------
UpdateCash();
UpdateUpgradeSkill();
//-------support functions------------------
document.getElementById('ModeGame').addEventListener('change', function () {

    let levelPartSelect2 = document.getElementsByClassName('selectLevel')[0];
    if (this.value == 0) {
        levelPartSelect2.style.display = 'none';
    } else {
        levelPartSelect2.style.display = 'block';
    }
});
function clearStats() {

    setAllDetailPlayer({ x: 0, y: 0, speed: 6, start: false, pause: false, maxSpeed: 8 });
    setEnemySpeed(5);
    ResetEnemySpeedArray([5, 5.5, 6, 6.5, 7, 7.5, 8.0, 8.5, 9, 9.5]);
    setHearts(3);
    ResetPlayerSpeedArray([5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]);
    ResetPlayerMaxSpeedArray([7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]);
}
//----------Interval--------
//-----new Interval-------
export let starInterval;
export let timerInterval;
export let gasInterval;
export let moneyInterval;
export let riskInterval;
export let countTimerInterval;
export let heartInterval;
export let CountGasTime = 0;
export let CountStarTime = 0;
export let CountMoneyTime = 0;
export let CountRiskTime = 0;
export let CountHeartTime = 0;

export let UsedGasTime = 0;
export let UsedStarTime = 0;
export let UsedMoneyTime = 0;
export let UsedRiskTime = 0;
export let UsedHeartTime = 0;

export let pauseTime = 0;

export let timeLeft = 30;
export let timerPaused = false;
//------set Interval export ----------

export function setStarInterval(value) {
    starInterval = value;
}

export function setTimerInterval(value) {
    timerInterval = value;
}

export function setGasInterval(value) {
    gasInterval = value;
}

export function setMoneyInterval(value) {
    moneyInterval = value;
}

export function setRiskInterval(value) {
    riskInterval = value;
}

export function setCountTimerInterval(value) {
    countTimerInterval = value;
}

export function setHeartInterval(value) {
    heartInterval = value;
}

export function setCountGasTime(value) {
    CountGasTime = value;
}

export function setCountStarTime(value) {
    CountStarTime = value;
}

export function setCountMoneyTime(value) {
    CountMoneyTime = value;
}

export function setCountRiskTime(value) {
    CountRiskTime = value;
}

export function setCountHeartTime(value) {
    CountHeartTime = value;
}

export function setUsedGasTime(value) {
    UsedGasTime = value;
}

export function setUsedStarTime(value) {
    UsedStarTime = value;
}

export function setUsedMoneyTime(value) {
    UsedMoneyTime = value;
}

export function setUsedRiskTime(value) {
    UsedRiskTime = value;
}

export function setUsedHeartTime(value) {
    UsedHeartTime = value;
}

export function setPauseTime(value) {
    pauseTime = value;
}

export function setTimeLeft(value) {
    timeLeft = value;
}

export function setTimerPaused(value) {
    timerPaused = value;
}
//-----------------------------------------
function clearInternalRemaining() {

    if (UsedGasTime !== 0) {
        clearInterval(gasInterval);
        gasInterval = null;
        UsedGasTime = 0;
    }



    if (UsedStarTime !== 0) {
        clearInterval(starInterval);
        starInterval = null;
        UsedStarTime = 0;
    }


    if (UsedMoneyTime !== 0) {
        clearInterval(moneyInterval);
        moneyInterval = null;
        UsedMoneyTime = 0;
    }


    if (UsedRiskTime !== 0) {
        clearInterval(riskInterval);
        riskInterval = null;
        UsedRiskTime = 0;
    }
    if (UsedHeartTime !== 0) {
        clearInterval(heartInterval);
        heartInterval = null;
        UsedHeartTime = 0;
    }


}

function turnOffInternal() {
    clearInterval(starInterval);
    starInterval = null;
    clearInterval(heartInterval);
    heartInterval = null;
    clearInterval(moneyInterval);
    moneyInterval = null;
    clearInterval(riskInterval);
    riskInterval = null;
    clearInterval(gasInterval);
    gasInterval = null;
    clearInterval(countTimerInterval);
    countTimerInterval = null;
    clearInterval(timerInterval);
    timerInterval = null;
}
function startTimer() {

    if (timeLeft > 0 && !timerPaused) {
        timerInterval = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }
}
function updateTimer() {
    const progressElement = document.querySelector('.progressTimer');
    const timerTextElement = document.querySelector('.timer-text');

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    const progressPercentage = (timeLeft / 30) * 100; // Assuming initial time is 30 seconds
    progressElement.style.width = `${progressPercentage}%`;
    if (timeLeft >= 60) {
        timerTextElement.textContent = `${minutes}m ${seconds}s`;
    } else {
        timerTextElement.textContent = `${seconds}s`;
    }
}
function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    updateTimer();
}
function resetHeart() {
    setHearts(3);
    let heartsIcons = document.querySelectorAll('.far.fa-heart');
    heartsIcons.forEach(function (icon) {
        icon.classList.replace('far', 'fas');
    });
}
function updateCountTime() {
    let currentTime = Date.now() - startCountTime;
    let minutes = Math.floor(currentTime / (1000 * 60));
    let seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

    // Ensure that minutes and seconds are always two digits
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    timerElement.textContent = `${minutes}:${seconds}`;
}
function PauseCountTime() {
    timerPaused = !timerPaused;
    if (timerPaused) {
        clearInterval(countTimerInterval);
    } else {
        updateCountTime()
        countTimerInterval = setInterval(updateCountTime, 1000);
    }
}
function toggleTimerPause() {
    timerPaused = !timerPaused;

    if (timerPaused) {
        clearInterval(timerInterval);
    } else {
        startTimer();
    }
}

function formatTime(currentTime) {
    let minutes = Math.floor(currentTime / (1000 * 60));
    let seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

    // Ensure that minutes and seconds are always two digits
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return `${minutes}:${seconds}`;
}

function resume() {
    //---------pause--------------
    setPlayer('pause', !player.pause);

    let PauseScreen = document.getElementById('PauseScreen');

    pauseTime = Date.now();
    if (selectedValue == 0) {
        toggleTimerPause()
    } else {
        PauseCountTime()
    }


    //---------resume-------------
    if (player.start && !player.pause) {
        setPlayer('start', true);

        PauseScreen.style.display = 'none';

        if (selectedValue == 0) {
            //-----------check interval------------

            if (!gasInterval) {
                if (UsedGasTime == 0) {
                    UsedGasTime = ((pauseTime - CountGasTime) / 1000) * 1000;
                } else {
                    UsedGasTime = UsedGasTime + ((pauseTime - CountGasTime) / 1000) * 1000;

                }


            }
            if (!starInterval) {

                if (UsedStarTime == 0) {
                    UsedStarTime = ((pauseTime - CountStarTime) / 1000) * 1000;
                } else {
                    UsedStarTime = UsedStarTime + ((pauseTime - CountStarTime) / 1000) * 1000;

                }

            }
            if (!moneyInterval) {
                if (UsedMoneyTime == 0) {
                    UsedMoneyTime = ((pauseTime - CountMoneyTime) / 1000) * 1000;
                } else {
                    UsedMoneyTime = UsedMoneyTime + ((pauseTime - CountMoneyTime) / 1000) * 1000;

                }

            }
            if (!riskInterval) {
                if (UsedRiskTime == 0) {
                    UsedRiskTime = ((pauseTime - CountRiskTime) / 1000) * 1000;
                } else {
                    UsedRiskTime = UsedRiskTime + ((pauseTime - CountRiskTime) / 1000) * 1000;

                }

            }

            window.requestAnimationFrame(playerarea);
        } else {
            if (!starInterval) {

                if (UsedStarTime == 0) {
                    UsedStarTime = ((pauseTime - CountStarTime) / 1000) * 1000;
                } else {
                    UsedStarTime = UsedStarTime + ((pauseTime - CountStarTime) / 1000) * 1000;

                }


            }
            if (!moneyInterval) {
                if (UsedMoneyTime == 0) {
                    UsedMoneyTime = ((pauseTime - CountMoneyTime) / 1000) * 1000;
                } else {
                    UsedMoneyTime = UsedMoneyTime + ((pauseTime - CountMoneyTime) / 1000) * 1000;

                }

            }
            if (!riskInterval) {
                if (UsedRiskTime == 0) {
                    UsedRiskTime = ((pauseTime - CountRiskTime) / 1000) * 1000;
                } else {
                    UsedRiskTime = UsedRiskTime + ((pauseTime - CountRiskTime) / 1000) * 1000;

                }

            }
            if (!heartInterval) {
                if (UsedHeartTime == 0) {
                    UsedHeartTime = ((pauseTime - CountHeartTime) / 1000) * 1000;
                } else {
                    UsedHeartTime = UsedHeartTime + ((pauseTime - CountHeartTime) / 1000) * 1000;

                }

            }
            window.requestAnimationFrame(playerarea2);
        }


    }
}
function endGame() {

    setPlayer('start', false);
    document.getElementById('ScoreLine').innerHTML = `Score: ${counter * 10}`;
    GameOverScreen.style.display = 'block';
    let CashValue = (counter * 5) + parseInt(startCashNumber, 10);

    setStore(storageCash, CashValue)
    UpdateCash();
    clearStats();
    turnOffInternal();

    if (selectedValue == 0) {

        if (localStorage.getItem(storageChallengeMode) !== null) {
            let checkvalue = getStore(storageChallengeMode);
            if ((counter * 10) > checkvalue) {

                let bestvalue = counter * 10;
                setBestScoreChallengeMode(bestvalue);
                setStore(storageChallengeMode, BestScoreChallengeMode)
            }
        } else {
            let bestvalue = counter * 10;
            setBestScoreChallengeMode(bestvalue);
            setStore(storageChallengeMode, BestScoreChallengeMode)
        }

    }
    setCounter(0);

}
function getRandomUniqueNumber(number, previousNumbers, side) {
    let randomNum;

    do {
        randomNum = Math.floor(Math.random() * number);

    } while (previousNumbers.includes(randomNum));

    side === 'right' ? addToPreviousRandomNumbersRight(randomNum)
        : addToPreviousRandomNumbersLeft(randomNum);

    if (previousNumbers.length > 2) {
        side === 'right' ? removeFromPreviousRandomNumbersRight()
            : removeFromPreviousRandomNumbersLeft();
    }

    return randomNum;
}
//------------Key----------
function keyDown(ev) {

    if (ev.key === 'Escape') {
        resume()

    } else {
        setKeys(ev.key, true);
    }


}

function keyUp(ev) {
    setKeys(ev.key, false);
}


function handleMouseDown(event) {
    if (event.button === 0) {
        setMouseDown(true);
        if (isSlow == false) {
            
            if (selectedValue == 0) {

                let maxSpeed = player.maxSpeed;
                setTempPlaySpeed(player.speed);
                setPlayer('speed', maxSpeed);

            } else {
                let maxSpeed = playerMaxSpeedArray[currentSelectedLevel]
                setTempPlaySpeed(playerSpeedArray[currentSelectedLevel])
                setPlayerSpeedArray(currentSelectedLevel, maxSpeed);
                setTempEnemySpeed(enemySpeedArray[currentSelectedLevel])
                let tempEnemy = enemySpeedArray[currentSelectedLevel] + 1
                setEnemySpeedArray(currentSelectedLevel, tempEnemy)
            }
        }


    }
}

function handleMouseUp(event) {
    if (event.button === 0) {
        setMouseDown(false);
        if (isSlow == false) {
            if (selectedValue == 0) {
                setPlayer('speed', tempPlaySpeed)
            } else {
                setPlayerSpeedArray(currentSelectedLevel, tempPlaySpeed)
                setEnemySpeedArray(currentSelectedLevel, tempEnemySpeed)
            }
        }

    }
}
//------------------------Move Game Play----------------
function movelines() {
    let roadlines = document.querySelectorAll('.line');

    roadlines.forEach(function (item) {

        let currentTop = parseInt(item.style.top);
        if (currentTop >= 700) {
            currentTop = currentTop - 750;
        }
        currentTop = currentTop + player.speed;
        item.style.top = currentTop + 'px';


    })
}

function createVehicle(customX) {

    let x = customX !== undefined ? customX : numberOfEnemy[LevelEnemy];
    let randomColor = Math.floor(Math.random() * 4);
    let vehicles = document.createElement('div');
    vehicles.setAttribute('class', 'vehicle');
    vehicles.setAttribute('data-id', x);
    if (customX !== undefined) {
        vehicles.y = -300;
    } else {
        vehicles.y = ((x + 1) * 300) * -1;
    }

    vehicles.style.top = vehicles.y + 'px';
    vehicles.style.left = (x % 2 === 0 ? getRandomUniqueNumber(3, previousRandomNumbersLeft, 'left') * 52
        : 195 + getRandomUniqueNumber(4, previousRandomNumbersRight, 'right') * 52) + 'px';
    let rotation = x % 2 === 0 ? 'rotate(180deg)' : 'none';
    vehicles.style.backgroundImage = `url(./img/${carColor[randomColor]}.png)`;
    vehicles.style.transform = rotation;
    roadarea.appendChild(vehicles)
}
//-------stop-------

function moveVehicles(playerCar) {
    let vehicles = document.querySelectorAll('.vehicle');
    let barrier = document.querySelector('.barrier');
    let barrierBound = null;
    if (barrier) {
        barrierBound = barrier.getBoundingClientRect();
    }

    let playerCarBound = playerCar.getBoundingClientRect();



    vehicles.forEach(function (item, index) {
        let x = item.getAttribute('data-id');
        var otherCarBound = item.getBoundingClientRect();



        if (!(playerCarBound.bottom < otherCarBound.top ||
            playerCarBound.top > otherCarBound.bottom ||
            playerCarBound.right < otherCarBound.left ||
            playerCarBound.left > otherCarBound.right)) {
            if (selectedValue == 0) {
                if (timeLeft >= 0) {
                    timeLeft -= 5;
                    updateTimer();

                    addToTempXArray(x)
                    item.remove();
                    setTimeout(() => {
                        let newX = removeFromTempXArray();
                        createVehicle(newX);

                    }, 1500 * index);
                    setCounter(counter - 1);
                    score.innerHTML = `Score: ${counter * 10}`;
                    cash.innerHTML = `Cash: ${counter * 5}`;
                }
            } else {
                setHearts(hearts - 1);
                if (hearts >= 0) {
                    let heartHp = document.getElementById('heartHp');
                    let heartsIcons = heartHp.querySelectorAll('.fas.fa-heart');

                    heartsIcons[hearts].classList.replace('fas', 'far');
                    addToTempXArray(x)
                    item.remove();
                    setTimeout(() => {
                        let newX = removeFromTempXArray();
                        createVehicle(newX);

                    }, 1500 * index);
                    if (hearts === 0) {
                        endGame();
                    }
                }
            }


        }

        if (barrier) {
            if (!(otherCarBound.bottom < barrierBound.top ||
                otherCarBound.top > barrierBound.bottom ||
                otherCarBound.right < barrierBound.left ||
                otherCarBound.left > barrierBound.right)) {
                addToTempXArray(x)

                item.remove();
                if (IsX2Score === true) {
                    setCounter(counter + 2);
                } else {
                    setCounter(counter + 1);
                }

                score.innerHTML = `Score: ${counter * 10}`
                cash.innerHTML = `Cash: ${counter * 5}`;

                setTimeout(() => {
                    let newX = removeFromTempXArray();
                    createVehicle(newX);

                }, 1500 * index);
                if (selectedValue == 0) {
                    LevelUp();
                }

            }
        }

        let currentTop = parseInt(item.style.top);
        if (currentTop >= 750) {
            currentTop = -300;

            item.style.left = (x % 2 === 0 ? getRandomUniqueNumber(3, previousRandomNumbersLeft, 'left') * 52
                : 195 + getRandomUniqueNumber(4, previousRandomNumbersRight, 'right') * 52) + 'px';
            if (IsX2Score === true) {
                setCounter(counter + 2);
            } else {
                setCounter(counter + 1);
            }
            score.innerHTML = `Score: ${counter * 10}`;
            cash.innerHTML = `Cash: ${counter * 5}`;
            let rotation = x % 2 === 0 ? 'rotate(180deg)' : 'none';
            item.style.transform = rotation;
            if (selectedValue == 0) {
                LevelUp();
            }
        }
        if (selectedValue == 0) {
            let newSpeed = x % 2 === 0 ? enemySpeed - 0.5 : enemySpeed;

            currentTop = currentTop + newSpeed;
            item.style.top = currentTop + 'px';
        } else {
            let newSpeed = x % 2 === 0 ? enemySpeedArray[currentSelectedLevel] - 0.5 : enemySpeedArray[currentSelectedLevel];
            currentTop = currentTop + newSpeed;
            item.style.top = currentTop + 'px';
        }




    })
}

function LevelUp() {

    if (counter * 10 >= levelCondition + AddScore) {
        setLevelCondition(levelCondition + AddScore);
        setCurrentLevel(currentLevel + 1);
        document.getElementById('level').innerHTML = `Level: ${currentLevel}`;
        setLevelCounter(levelCounter + 1);
        if (levelCounter === 3) {
            setLevelCounter(0);
            setAddScore(AddScore + 100);
        }

        if (currentLevel % 3 === 0 && LevelEnemy < numberOfEnemy.length - 1) {
            setLevelEnemy(Math.floor(currentLevel / 3));
            createVehicle();
        }
        if (currentLevel % 4 === 0) {
            setEnemySpeed(enemySpeed + 1);
            setPlayer('maxSpeed', player.maxSpeed + 1);
            if (mouseDown === true) {
                setTempPlaySpeed(tempPlaySpeed + 0.5);
            } else {
                setPlayer('speed', 0.5);
            }
        }
    }
}
function getGas(playerCar) {
    let gas = document.querySelector('.gas');
    let playerCarBound = playerCar.getBoundingClientRect();
    let gasBound = gas.getBoundingClientRect();

    if (!(playerCarBound.bottom < gasBound.top ||
        playerCarBound.top > gasBound.bottom ||
        playerCarBound.right < gasBound.left ||
        playerCarBound.left > gasBound.right)) {

        timeLeft += 10;
        if (timeLeft > 30) {
            timeLeft = 30;
        }
        updateTimer();
        gas.remove();
    }
}

function getStar(playerCar, star) {

    let playerCarBound = playerCar.getBoundingClientRect()
    let starBound = star.getBoundingClientRect();

    if (!(playerCarBound.bottom < starBound.top ||
        playerCarBound.top > starBound.bottom ||
        playerCarBound.right < starBound.left ||
        playerCarBound.left > starBound.right)) {
        if (randomStar === 0) {
            createBarrier();
        } else if (randomStar === 1) {
            setIsX2Score(true);
            score.classList.add('rainbow');
            document.getElementById('X2Text').style.display = 'block';
            setTimeout(() => {
                setIsX2Score(false);
                document.getElementById('X2Text').style.display = 'none';
                score.classList.remove('rainbow');
            }, 7000 + (7000 * skills[1].effect / 100));
        }

        star.remove();
    }
}

function getMoney(playerCar, money) {

    let playerCarBound = playerCar.getBoundingClientRect()
    let moneyBound = money.getBoundingClientRect();

    if (!(playerCarBound.bottom < moneyBound.top ||
        playerCarBound.top > moneyBound.bottom ||
        playerCarBound.right < moneyBound.left ||
        playerCarBound.left > moneyBound.right)) {

        if (IsX2Score == true) {
            setCounter(counter + 10 + (skills[2].effect * 2))
            score.innerHTML = `Score: ${counter * 10}`;
            cash.innerHTML = `Cash: ${counter * 5}`;
        } else {
            setCounter(counter + 5 + (skills[2].effect))
            score.innerHTML = `Score: ${counter * 10}`;
            cash.innerHTML = `Cash: ${counter * 5}`;
        }
        money.remove();
    }


}

function MoveRisk(playerCar, risk) {
    let x;
    if (selectedValue == 0) {
        x = numberOfEnemy[LevelEnemy] + 1;
    } else {
        x = enemyLevelArray[currentSelectedLevel] + 1;
    }
    let currentTop = parseInt(risk.style.top);
    if (currentTop >= 750) {
        risk.remove();
        UsedRiskTime = 0;
    }
    if (randomRisk == 0) {
        currentTop = currentTop + riskSpeed;
    }
    else if (randomRisk == 1) {
        if (selectedValue == 0) {
            let newSpeed = x % 2 === 0 ? enemySpeed - 0.5 : enemySpeed;

            currentTop = currentTop + newSpeed;

        } else {
            let newSpeed = x % 2 === 0 ? enemySpeedArray[currentSelectedLevel] - 0.5 : enemySpeedArray[currentSelectedLevel];
            currentTop = currentTop + newSpeed;

        }
    }

    risk.style.top = currentTop + 'px';

    let playerCarBound = playerCar.getBoundingClientRect()
    let riskBound = risk.getBoundingClientRect();
    if (!(playerCarBound.bottom < riskBound.top ||
        playerCarBound.top > riskBound.bottom ||
        playerCarBound.right < riskBound.left ||
        playerCarBound.left > riskBound.right)) {
        if (randomRisk === 0) {
            setPlayer("speed", player.speed - 2)
            risk.remove();
            UsedRiskTime = 0;
            setIsSlow(true);
            setTimeout(function () {
                setPlayer("speed", player.speed + 2)
                setIsSlow(false);

            }, 3000);
        } else if (randomRisk === 1) {
            endGame();
        }

    }

}


function playerarea() {
    let playerCar = document.querySelector('.car');
    console.log(playerCar)
    let barrier = document.querySelector('.barrier');
    let gas = document.querySelector('.gas');
    let star;
    if (randomStar === 0) {
        star = document.querySelector('.star');
    } else if (randomStar === 1) {
        star = document.querySelector('.starX2');
    }
    let risk;
    if (randomRisk === 0) {
        risk = document.querySelector('.riskWater');
    } else if (randomRisk === 1) {
        risk = document.querySelector('.police');
    }
    let moneyPoint = document.querySelector('.moneyPoint');

    let road = roadarea.getBoundingClientRect();
    let PauseScreen = document.getElementById('PauseScreen');
    if (player.start && player.pause == false) {

        if (!gasInterval) {

            gasInterval = setInterval(createGas, 9000 - UsedGasTime);
            CountGasTime = Date.now();


        }
        if (!starInterval) {

            starInterval = setInterval(createstar, 16000 - UsedStarTime);
            CountStarTime = Date.now();


        }
        if (!moneyInterval) {

            moneyInterval = setInterval(createMoney, 16000 - UsedMoneyTime);
            CountMoneyTime = Date.now();


        }
        if (!riskInterval) {

            riskInterval = setInterval(CreateRisk, 15000 - UsedRiskTime);
            CountRiskTime = Date.now();


        }

        movelines();
        moveVehicles(playerCar);
        if (gas) {
            getGas(playerCar);
        }
        if (star) {
            getStar(playerCar, star);
        }
        if (moneyPoint) {
            getMoney(playerCar, moneyPoint);
        }
        if (risk) {
            MoveRisk(playerCar, risk);
        }
        if (keys.w && player.y > (road.top + 20)) {
            setPlayer("y", player.y - player.speed)

        }

        if (keys.s && player.y < (roadarea.clientHeight - 120)) {
            setPlayer("y", player.y + player.speed)
        }

        if (keys.a && player.x > 0) {
            setPlayer("x", player.x - player.speed)
        }

        if (keys.d && player.x < (road.width - 64)) {
            setPlayer("x", player.x + player.speed)

        }
        playerCar.style.top = player.y + 'px'
        playerCar.style.left = player.x + 'px'
        if (barrier) {
            barrier.style.top = (player.y - 25) + 'px';
            barrier.style.left = (player.x - 50) + 'px';
            barrier.style.display = 'block';
        }

        window.requestAnimationFrame(playerarea)
    }

    if (player.pause == true) {

        window.cancelAnimationFrame(playerarea)
        turnOffInternal();
        document.getElementById('ScoreLinePause').innerHTML = `Score: ${counter * 10}`;
        PauseScreen.style.display = 'block';
    }
}

function getRandomPosition(objectWidth, ObjectHeight) {
    let maxX = roadarea.clientWidth - objectWidth; // Adjust for the width of the gas element
    let maxY = roadarea.clientHeight - (ObjectHeight + 50); // Adjust for the height of the gas element

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    return { x: randomX, y: randomY };
}

function createGas() {
    let gas = document.createElement('div');
    gas.setAttribute('class', 'gas');
    let randomPosition = getRandomPosition(30, 30);
    gas.style.top = randomPosition.y + 'px';
    gas.style.left = randomPosition.x + 'px';
    roadarea.appendChild(gas);
    clearInternalRemaining();

    setTimeout(() => {
            gas.remove();
    }, 8000);

    setTimeout(() => {
        gas.classList.add('gas-fade');
    }, 5000);
}

function createMoney() {
    let money = document.createElement('i');
    money.classList.add('fas', 'fa-dollar-sign', 'moneyPoint');
    money.style.color = '#fff700';
    money.style.fontSize = '25px';
    money.style.position = 'absolute';
    let randomPosition = getRandomPosition(25, 25);
    money.style.top = randomPosition.y + 'px';
    money.style.left = randomPosition.x + 'px';
    roadarea.appendChild(money);
    clearInternalRemaining();
    setTimeout(() => {
        money.remove();
    }, 8000);

    setTimeout(() => {
        money.classList.add('money-fade');
    }, 5000);
}
function CreateRisk() {
    let risk;
    setRandomRisk(Math.floor(Math.random() * 2))
    if (randomRisk == 0) {
        risk = document.createElement('i');
        risk.classList.add('fas', 'fa-water', 'riskWater');
        risk.style.left = Math.floor(Math.random() * 350) + 'px';
    } else if (randomRisk == 1) {
        risk = document.createElement('div');
        risk.setAttribute('class', 'police');
        let x;
        if (selectedValue == 0) {
            x = numberOfEnemy[LevelEnemy] + 1;
        } else {
            x = enemyLevelArray[currentSelectedLevel] + 1;
        }
        risk.style.left = (x % 2 === 0 ? getRandomUniqueNumber(3, previousRandomNumbersLeft, 'left') * 52
            : 195 + getRandomUniqueNumber(4, previousRandomNumbersRight, 'right') * 52) + 'px';
    }

    risk.style.position = 'absolute';
    risk.style.top = '-300px';

    roadarea.appendChild(risk);

    clearInternalRemaining();


}

function createstar() {
    let star = document.createElement('div');
    setRandomStar(Math.floor(Math.random() * 2))
    if (randomStar === 0) {
        star.setAttribute('class', 'star');
    } else if (randomStar === 1) {
        star.setAttribute('class', 'starX2');
    }

    let randomPosition = getRandomPosition(30, 30);
    star.style.top = randomPosition.y + 'px';
    star.style.left = randomPosition.x + 'px';
    roadarea.appendChild(star);
    clearInternalRemaining();

    setTimeout(() => {
        if (starIndex !== -1) {
            star.remove();
        }
    }, 8000);

    setTimeout(() => {
        star.classList.add('star-fade');
    }, 5000);
}

function createBarrier() {
    let barrier = document.createElement('div');
    barrier.classList.add('barrier');

    roadarea.appendChild(barrier);
    setTimeout(() => {
        if (SkillIndex !== -1) {
            barrier.remove();
        }
    }, 8000 + (8000 * skills[0].effect / 100));

    setTimeout(() => {
        barrier.classList.add('barrier-fade');
    }, 5000 + (5000 * skills[0].effect / 100));
}
function init() {
    roadarea.innerHTML = "";
    player.start = true;
    startTimer();

    window.requestAnimationFrame(playerarea)

    let playerCar = document.createElement('div');
    playerCar.setAttribute('class', 'car');
    roadarea.appendChild(playerCar);

    setPlayer('x', playerCar.offsetLeft)
    setPlayer('y', playerCar.offsetTop)

    for (var i = 0; i < 5; i++) {
        let roadlines = document.createElement('div');
        roadlines.setAttribute('class', 'line');
        roadlines.y = i * 150;
        roadlines.style.top = roadlines.y + 'px';
        roadarea.appendChild(roadlines)
    }


    //enemy vehicles
    for (var x = 0; x < 3; x++) {
        let randomColor = Math.floor(Math.random() * 4);
        let vehicles = document.createElement('div');
        vehicles.setAttribute('class', 'vehicle');
        vehicles.setAttribute('data-id', x + 1);
        vehicles.y = ((x + 1) * 300) * -1;
        vehicles.style.top = vehicles.y + 'px';
        vehicles.style.left = (x % 2 === 0 ? getRandomUniqueNumber(3, previousRandomNumbersLeft, 'left') * 52
            : 195 + getRandomUniqueNumber(4, previousRandomNumbersRight, 'right') * 52) + 'px';

        let rotation = x % 2 === 0 ? 'rotate(180deg)' : 'none';

        vehicles.style.backgroundImage = `url(./img/${carColor[randomColor]}.png)`;
        vehicles.style.transform = rotation;
        roadarea.appendChild(vehicles)
    }
}

document.getElementById('RetryButton').onclick = () => {
    setIsX2Score(false);
    document.getElementById('X2Text').style.display = 'none';
    score.classList.remove('rainbow');
    if (selectedValue == 0) {
        timeLeft = 30;
        GameOverScreen.style.display = 'none';
        score.innerHTML = `Score: 0`;
        cash.innerHTML = `Cash: 0`;
        level.innerHTML = `Level: 0`;
        setCurrentLevel(0);
        let dataChallenge = getStore(storageChallengeMode);
        document.querySelector('.best').innerHTML = `Best Record: ${dataChallenge}`;
        setAddScore(100);
        setLevelCondition(0);
        setLevelCounter(0);
        init()
    } else {
        resetHeart();
        startCountTime = Date.now();
        GameOverScreen.style.display = 'none';
        score.innerHTML = `Score: 0`;
        cash.innerHTML = `Cash: 0`;
        let dataLevel = getStore(storageLevelMode)
        document.querySelector('.best').innerHTML = `Best Record: ${dataLevel[currentSelectedLevel]}`;
        document.querySelector('.TimeClock').innerHTML = `00:00`
        init2()
    }
}

document.getElementById('StartButton').onclick = () => {
    setSelectedValue(document.getElementById('ModeGame').value)

    if (selectedValue == 0) {

        if (localStorage.getItem(storageChallengeMode) !== null) {
            let dataChallenge = getStore(storageChallengeMode);
            document.querySelector('.best').innerHTML = `Best Record: ${dataChallenge}`;
        } else {
            document.querySelector('.best').innerHTML = `Best Record: 0`;
        }
        level.innerHTML = `Level: 0`;
        score.innerHTML = `Score: 0`;
        cash.innerHTML = `Cash: 0`;
        document.querySelector('.timer').style.display = 'block';
        StartGameScreen.style.display = 'none';
        init()
    } else {

        startCountTime = Date.now();
        score.innerHTML = `Score: 0`;
        cash.innerHTML = `Cash: 0`;
        document.querySelector('.heartHp').style.display = 'block';
        document.querySelector('.GoalScore').style.display = 'block';
        document.querySelector('.boardTime').style.display = 'block';
        StartGameScreen.style.display = 'none';
        setCurrentSelectedLevel(0)
        if (localStorage.getItem(storageLevelMode) !== null) {
            let dataLevel = getStore(storageLevelMode)
            document.querySelector('.best').innerHTML = `Best Record: ${dataLevel[currentSelectedLevel]}`;
        } else {
            document.querySelector('.best').innerHTML = `Best Record: 00:00`;
        }
        document.querySelector('.GoalScore').innerHTML = `Goal ${finishedConditionArray[currentSelectedLevel]}`;
        level.innerHTML = `Level: ${currentSelectedLevel + 1}`;
        init2()
    }
}
document.getElementById('ResumeButton').onclick = () => {
    resume()
}

function backToMainScreen() {
    roadarea.innerHTML = "";
    let PauseScreen = document.getElementById('PauseScreen');
    PauseScreen.style.display = 'none';
    setPlayer('pause', false);
    GameOverScreen.style.display = 'none';
    document.querySelector('.heartHp').style.display = 'none';
    StartGameScreen.style.display = 'block';
    timerPaused = false;
    setCounter(0);
    turnOffInternal();
    if (selectedValue == 0) {
        timeLeft = 30;
        // Add Cash with current having Cash
        score.innerHTML = `Score: 0`;
        level.innerHTML = `Level: 0`;
        setCurrentLevel(0);
        setAddScore(100);
        setLevelCondition(0);
        setLevelCounter(0);
        resetTimer();
        document.getElementById('timer').style.display = 'none'
    } else {
        resetHeart();
        score.innerHTML = `Score: 0`;
        document.querySelector('.TimeClock').innerHTML = `00:00`
        document.getElementById('boardTime').style.display = 'none'
        document.getElementById('GoalScore').style.display = 'none'
    }

}

window.backToMainScreen = backToMainScreen;