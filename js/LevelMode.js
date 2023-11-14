
function compareTimes(time1, time2) {
    const [minutes1, seconds1] = time1.split(':').map(Number);
    const [minutes2, seconds2] = time2.split(':').map(Number);

    if (minutes1 < minutes2 || (minutes1 === minutes2 && seconds1 < seconds2)) {
        return time1;
    } else if (minutes1 > minutes2 || (minutes1 === minutes2 && seconds1 > seconds2)) {
        return time2;
    } else {
        return time1;
    }
}


function finishGame() {

    if (counter * 10 >= finishedConditionArray[currentSelectedLevel]) {
        BestScoreLevelMode[currentSelectedLevel] = formatTime(Date.now() - startCountTime);

        console.log(BestScoreLevelMode)

        if (localStorage.getItem(storageLevelMode) !== null) {
            
            let checkvalue = getStore(storageLevelMode);
            let finalValue;
            if(checkvalue[currentSelectedLevel] === "00:00"){
                finalValue = BestScoreLevelMode[currentSelectedLevel];
            }else{
                finalValue = compareTimes(BestScoreLevelMode[currentSelectedLevel], checkvalue[currentSelectedLevel])
            }
            
            BestScoreLevelMode[currentSelectedLevel] = finalValue;

            
            setStore(storageLevelMode, BestScoreLevelMode)

        } else {
            
            setStore(storageLevelMode, BestScoreLevelMode)
        }
        endGame()
    }
}

function createHeartPoint() {

    let heart = document.createElement('i');
    heart.classList.add('fas', 'fa-heart', 'heartPoint');
    heart.style.color = '#ea8090';
    heart.style.fontSize = '25px';
    heart.style.position = 'absolute';
    let randomPosition = getRandomPosition(25, 25);
    heart.style.top = randomPosition.y + 'px';
    heart.style.left = randomPosition.x + 'px';
    roadarea.appendChild(heart);
    clearInternalRemaining();
    setTimeout(() => {
        heart.remove();
    }, 8000);

    setTimeout(() => {
        heart.classList.add('heart-fade');
    }, 5000);
}

function getHeartPoint(playerCar, heart) {

    playerCarBound = playerCar.getBoundingClientRect();
    let heartBound = heart.getBoundingClientRect();

    if (!(playerCarBound.bottom < heartBound.top ||
        playerCarBound.top > heartBound.bottom ||
        playerCarBound.right < heartBound.left ||
        playerCarBound.left > heartBound.right)) {

        if (hearts < 3) {
            let heartsIcons = document.querySelectorAll('.far.fa-heart');
            heartsIcons[0].classList.replace('far', 'fas');
            hearts++;
        }
        heart.remove();
    }
}
function playerarea2() {
    
    let playerCar = document.querySelector('.car');
    let barrier = document.querySelector('.barrier');
    
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
    let heartPoint = document.querySelector('.heartPoint');
    let moneyPoint = document.querySelector('.moneyPoint');
    let road = roadarea.getBoundingClientRect();
    let PauseScreen = document.getElementById('PauseScreen');

    finishGame();
    if (player.start && player.pause == false) {
        if (!starInterval) {
            starInterval = setInterval(createstar, 16000 - UsedStarTime);
            CountStarTime = Date.now();
        }
        if (!heartInterval) {
            heartInterval = setInterval(createHeartPoint, 9000 - UsedHeartTime );
            CountHeartTime = Date.now();
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
        moveVehicles(playerCar)


        if (star) {
            getStar(playerCar, star);
        }
        if (heartPoint) {
            getHeartPoint(playerCar, heartPoint);
        }
        
        if (moneyPoint) {
            getMoney(playerCar,moneyPoint);
        }
        if (risk) {
            MoveRisk(playerCar, risk);
        }
        if (keys.w && player.y > (road.top + 20)) {
            player.y = player.y - playerSpeedArray[currentSelectedLevel];

        }
        if (keys.s && player.y < (roadarea.clientHeight - 120)) {

            player.y = player.y + playerSpeedArray[currentSelectedLevel];

        }

        if (keys.a && player.x > 0) {
            player.x = player.x - playerSpeedArray[currentSelectedLevel];

        }

        if (keys.d && player.x < (road.width - 64)) {
            player.x = player.x + playerSpeedArray[currentSelectedLevel];

        }
        playerCar.style.top = player.y + 'px'
        playerCar.style.left = player.x + 'px'
        if (barrier) {
            barrier.style.top = (player.y - 25) + 'px';
            barrier.style.left = (player.x - 50) + 'px';
            barrier.style.display = 'block';
        }
        window.requestAnimationFrame(playerarea2)


    }
    if (player.pause == true) {
        window.cancelAnimationFrame(playerarea2)


        turnOffInternal();
        document.getElementById('ScoreLinePause').innerHTML = `Score: ${counter * 10}`;
        PauseScreen.style.display = 'block';
    }
}

function init2() {
    // Clear the HTML content of the roadarea
    roadarea.innerHTML = "";
    
    // Set the player's start status to true
    player.start = true;

    // Set up the interval for updating the count time
    countTimerInterval = setInterval(updateCountTime, 1000);

    // Request animation frame for the playerarea2 function
    window.requestAnimationFrame(playerarea2);

    // Create the player car element
    let playerCar = document.createElement('div');
    playerCar.setAttribute('class', 'car');
    roadarea.appendChild(playerCar);

    // Set initial player position (same as your original code)
    player.x = playerCar.offsetLeft;
    player.y = playerCar.offsetTop;

    // Create road lines (same as your original code)
    for (var i = 0; i < 5; i++) {
        let roadlines = document.createElement('div');
        roadlines.setAttribute('class', 'line');
        roadlines.y = i * 150;
        roadlines.style.top = roadlines.y + 'px';
        roadarea.appendChild(roadlines);
    }

    // Create enemy vehicles (same as your original code)
    for (var x = 0; x < enemyLevelArray[currentSelectedLevel]; x++) {
        let randomColor = Math.floor(Math.random() * 4);
        let vehicles = document.createElement('div');
        vehicles.setAttribute('class', 'vehicle');
        vehicles.setAttribute('data-id', x + 1);
        vehicles.y = ((x + 1) * 300) * -1;
        vehicles.style.top = vehicles.y + 'px';
        vehicles.style.left = (x % 2 === 0 ? getRandomUniqueNumber(3, previousRandomNumbersLeft) * 52
            : 195 + getRandomUniqueNumber(4, previousRandomNumbersRight) * 50) + 'px';
        let rotation = x % 2 === 0 ? 'rotate(180deg)' : 'none';
        vehicles.style.backgroundImage = `url(./img/${carColor[randomColor]}.png)`;
        vehicles.style.transform = rotation;
        roadarea.appendChild(vehicles);
    }
}

