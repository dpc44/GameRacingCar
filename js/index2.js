UpdateUpgradeSkill();
UpdateCash()
OpenShop();

console.log(startCashNumber)
function OpenShop() {

    console.log()
    document.getElementById('shieldLevel').innerHTML = `Level ${skills[0].level}`
    document.getElementById('shieldMoney').innerHTML = `${skills[0].money}`
    document.getElementById('shieldEffect').innerHTML = `Duration: ${skills[0].effect}%`
    if (skills[0].level > 50) {
        document.getElementById('shieldMoney').innerHTML = ``;
        document.getElementById("shieldBtn").classList.add("disabled");
    }

    document.getElementById('x2pointLevel').innerHTML = `Level ${skills[1].level}`
    document.getElementById('x2pointMoney').innerHTML = `${skills[1].money}`
    document.getElementById('x2pointEffect').innerHTML = `Duration: ${skills[1].effect}%`
    if (skills[1].level > 50) {
        document.getElementById('x2pointMoney').innerHTML = ``
        document.getElementById("x2Btn").classList.add("disabled");
    }

    document.getElementById('bonuspointLevel').innerHTML = `Level ${skills[2].level}`
    document.getElementById('bonuspointMoney').innerHTML = `${skills[2].money}`
    document.getElementById('bonuspointEffect').innerHTML = `+${skills[2].effect * 10} Points`
    if (skills[2].level > 20) {
        document.getElementById('bonuspointMoney').innerHTML = ``
        document.getElementById("bonusBtn").classList.add("disabled");
    }

    document.getElementById('cash').innerHTML = `Cash: ${startCashNumber}`
}

function upgrade(type) {
    switch (type) {
        case 'shield':
            if (startCashNumber >= skills[0].money) {
                if (skills[0].level < 50) {
                    skills[0].level += 1;
                    startCashNumber -= skills[0].money;
                    setStore(storageCash, startCashNumber);
                    skills[0].money += 1000;
                    skills[0].effect += 2;
                    document.getElementById('shieldLevel').innerHTML = `Level ${skills[0].level}`;
                    document.getElementById('shieldMoney').innerHTML = `${skills[0].money}`;
                    document.getElementById('shieldEffect').innerHTML = `Duration: ${skills[0].effect}%`;
                    UpdateCash();
                    document.getElementById('cash').innerHTML = `Cash ${startCashNumber}`;
                    setStore(storeSkill, skills);
                    if (skills[0].level >= 50) {
                        document.getElementById('shieldMoney').innerHTML = ``;
                        document.getElementById("shieldBtn").classList.add("disabled");
                    }
                }

            }

            break;
        case 'x2point':
            if (startCashNumber >= skills[1].money) {
                if (skills[1].level < 50) {
                    skills[1].level += 1;
                    startCashNumber -= skills[1].money;
                    setStore(storageCash, startCashNumber);
                    skills[1].money += 1000;
                    skills[1].effect += 2;
                    document.getElementById('x2pointLevel').innerHTML = `Level ${skills[1].level}`;
                    document.getElementById('x2pointMoney').innerHTML = `${skills[1].money}`;
                    document.getElementById('x2pointEffect').innerHTML = `Duration: ${skills[1].effect}%`;
                    UpdateCash();
                    document.getElementById('cash').innerHTML = `Cash ${startCashNumber}`;
                    setStore(storeSkill, skills);
                    if (skills[1].level >= 50) {
                        document.getElementById('x2pointMoney').innerHTML = ``
                        document.getElementById("x2Btn").classList.add("disabled");
                    }
                } 

            }

            break;
        case 'bonuspoint':
            if (startCashNumber >= skills[2].money) {
                console.log(skills[2].level)
                if (skills[2].level < 20) {

                    skills[2].level += 1;
                    startCashNumber -= skills[2].money;
                    setStore(storageCash, startCashNumber);
                    skills[2].money += 1500;
                    skills[2].effect += 1;
                    document.getElementById('bonuspointLevel').innerHTML = `Level ${skills[2].level}`;
                    document.getElementById('bonuspointMoney').innerHTML = `${skills[2].money}`;
                    document.getElementById('bonuspointEffect').innerHTML = `+${skills[2].effect * 10} Points`;
                    UpdateCash();
                    document.getElementById('cash').innerHTML = `Cash ${startCashNumber}`;
                    setStore(storeSkill, skills);

                    if (skills[2].level >= 20) {
                        document.getElementById('bonuspointMoney').innerHTML = ``
                        document.getElementById("bonusBtn").classList.add("disabled");
                    }
                }
                

            }

            break;

    }
}