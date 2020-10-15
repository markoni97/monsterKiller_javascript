const ATTACK_VALUE = 10;
const STRONG_ATTACK = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt('Enter the max life for you and the monster', '100');

let chosenMaxLife = parseInt(enteredValue);
if(isNaN(chosenMaxLife) || chosenMaxLife <= 0 ){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let battleLog = [];
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth){
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPayerHealth: playerHealth
    };
    if(ev === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    } else if(ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
        logEntry.target = 'MONSTER';
    } else if(ev === LOG_EVENT_PLAYER_HEAL){
        logEntry.target = 'PLAYER';
    } else if(ev === LOG_EVENT_MONSTER_ATTACK){
        logEntry.target = 'PLAYER';
    } 
    battleLog.push(logEntry);
}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    const initialPLayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPLayerHealth;
        setPlayerHealth(currentPlayerHealth);
        alert('You would be dead but the bonus life saved you.')
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You have won');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Player won',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0){
        alert('You have lost');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Monster won',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert('Its a draw');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'Its a draw',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }

    if(currentPlayerHealth <= 0 || currentMonsterHealth <= 0){
        reset();
    }
}

function attack(mode){
    let maxDamage;
    let logEvent;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function attackHandler(){
    attack(MODE_ATTACK);
}

function strongAttackHandler(){
    attack(MODE_STRONG_ATTACK);
}

function healPLayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal more than maximum health");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function printLogHandler(){
    console.log(battleLog);
}



attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPLayerHandler);
logBtn.addEventListener('click', printLogHandler);