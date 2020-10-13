const ATTACK_VALUE = 10;
const STRONG_ATTACK = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';

const enteredValue = prompt('Enter the max life for you and the monster', '100');

let chosenMaxLife = parseInt(enteredValue);
if(isNaN(chosenMaxLife) || chosenMaxLife <= 0 ){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    const initialPLayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPLayerHealth;
        setPlayerHealth(currentPlayerHealth);
        alert('You would be dead but the bonus life saved you.')
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You have won');
    } else if (currentMonsterHealth > 0 && currentPlayerHealth <= 0){
        alert('You have lost');
    } else if(currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert('Its a draw');
    }

    if(currentPlayerHealth <= 0 || currentMonsterHealth <= 0){
        reset();
    }
}

function attack(mode){
    let maxDamage;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
    } else if (mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
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
    endRound();
}



attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPLayerHandler);