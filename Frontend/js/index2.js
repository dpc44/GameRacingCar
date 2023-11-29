import { newUID } from "./FireBaseConfig.js";
import { UpdateDataFireBase, getUser } from "./FireBaseFunctions.js";
import { UpdateCash, UpdateUpgradeSkill, setSkillField, setStore, setstartCashNumber, skills, startCashNumber, storageCash, storeSkill } from "./index.js";


await UpdateUpgradeSkill();
await UpdateCash();
OpenShop();


function OpenShop() {
    document.getElementById('shieldLevel').innerHTML = `Level ${skills[0].level}`
    document.getElementById('shieldMoney').innerHTML = `${skills[0].money}`
    document.getElementById('shieldEffect').innerHTML = `Duration: ${skills[0].effect}%`
    if (skills[0].level >= 50) {
        document.getElementById('shieldMoney').innerHTML = ``;
        document.getElementById("shieldBtn").classList.add("disabled");
    }

    document.getElementById('x2pointLevel').innerHTML = `Level ${skills[1].level}`
    document.getElementById('x2pointMoney').innerHTML = `${skills[1].money}`
    document.getElementById('x2pointEffect').innerHTML = `Duration: ${skills[1].effect}%`
    if (skills[1].level >= 50) {
        document.getElementById('x2pointMoney').innerHTML = ``
        document.getElementById("x2Btn").classList.add("disabled");
    }

    document.getElementById('bonuspointLevel').innerHTML = `Level ${skills[2].level}`
    document.getElementById('bonuspointMoney').innerHTML = `${skills[2].money}`
    document.getElementById('bonuspointEffect').innerHTML = `+${skills[2].effect * 10} Points`
    if (skills[2].level >= 20) {
        document.getElementById('bonuspointMoney').innerHTML = ``
        document.getElementById("bonusBtn").classList.add("disabled");
    }


}

async function upgrade(type) {
    const userPath2 = `users/${newUID}`;
    switch (type) {
        case 'shield':
            if (startCashNumber >= skills[0].money) {
                if (skills[0].level < 50) {
                    setSkillField('shieldLevel', 'level', skills[0].level + 1);
                    setstartCashNumber(startCashNumber - skills[0].money)
                    // setStore(storageCash, startCashNumber);
                    await UpdateDataFireBase(userPath2, "startCashNumber", startCashNumber);
                    setSkillField('shieldLevel', 'money', skills[0].money + 1000);
                    setSkillField('shieldLevel', 'effect', skills[0].effect + 2);
                    document.getElementById('shieldLevel').innerHTML = `Level ${skills[0].level}`;
                    document.getElementById('shieldMoney').innerHTML = `${skills[0].money}`;
                    document.getElementById('shieldEffect').innerHTML = `Duration: ${skills[0].effect}%`;
                    UpdateCash();
                    document.getElementById('cash').innerHTML = `Cash ${startCashNumber}`;
                    //setStore(storeSkill, skills);
                    await UpdateDataFireBase(userPath2, "skills", skills)
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
                    setSkillField('X2PointLevel', 'level', skills[1].level + 1);
                    setstartCashNumber(startCashNumber - skills[1].money)
                    //setStore(storageCash, startCashNumber);
                    await UpdateDataFireBase(userPath2, "startCashNumber", startCashNumber);
                    setSkillField('X2PointLevel', 'money', skills[1].money + 1000);
                    setSkillField('X2PointLevel', 'effect', skills[1].effect + 2);
                    document.getElementById('x2pointLevel').innerHTML = `Level ${skills[1].level}`;
                    document.getElementById('x2pointMoney').innerHTML = `${skills[1].money}`;
                    document.getElementById('x2pointEffect').innerHTML = `Duration: ${skills[1].effect}%`;
                    UpdateCash();
                    document.getElementById('cash').innerHTML = `Cash ${startCashNumber}`;
                    //setStore(storeSkill, skills);
                    await UpdateDataFireBase(userPath2, "skills", skills)
                    if (skills[1].level >= 50) {
                        document.getElementById('x2pointMoney').innerHTML = ``
                        document.getElementById("x2Btn").classList.add("disabled");
                    }
                }

            }

            break;
        case 'bonuspoint':
            if (startCashNumber >= skills[2].money) {
                if (skills[2].level < 20) {
                    setSkillField('bounusLevel', 'level', skills[2].level + 1);
                    setstartCashNumber(startCashNumber - skills[2].money)
                    //setStore(storageCash, startCashNumber);
                    setstartCashNumber(startCashNumber - skills[1].money)
                    setSkillField('bounusLevel', 'money', skills[2].money + 1500);
                    setSkillField('bounusLevel', 'effect', skills[2].effect + 1);
                    document.getElementById('bonuspointLevel').innerHTML = `Level ${skills[2].level}`;
                    document.getElementById('bonuspointMoney').innerHTML = `${skills[2].money}`;
                    document.getElementById('bonuspointEffect').innerHTML = `+${skills[2].effect * 10} Points`;
                    UpdateCash();
                    document.getElementById('cash').innerHTML = `Cash ${startCashNumber}`;
                    //setStore(storeSkill, skills);
                    await UpdateDataFireBase(userPath2, "skills", skills)
                    if (skills[2].level >= 20) {
                        document.getElementById('bonuspointMoney').innerHTML = ``
                        document.getElementById("bonusBtn").classList.add("disabled");
                    }
                }


            }

            break;

    }
}

window.upgrade = upgrade;