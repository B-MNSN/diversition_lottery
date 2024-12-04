const btnRandomPrize = document.getElementById('btn-random-prize');
const btnCheckPrize = document.getElementById('btn-check-prize');
const resultMessage = document.getElementById('resultMessage');
const inputLottery = document.getElementById('lottery-number');

const prizeOne = document.getElementById('prize1');
const prizeTwo = document.getElementById('prize2');
const nearNumber = document.getElementById('nearNumber');
const last = document.getElementById('lastNumber');


let prize1, prize2 = [], nearbyNumbers = [], lastNumber;

if (btnRandomPrize) {
    btnRandomPrize.addEventListener('click', () => {
        RandomPrize();
    });
}

if (btnCheckPrize) {
    btnCheckPrize.addEventListener('click', () => {
        checkPrize();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('lotteryPrizeData')) {
        const prizeData = JSON.parse(localStorage.getItem('lotteryPrizeData'));

        prize1 = prizeData.prize1;
        prize2 = prizeData.prize2;
        nearbyNumbers = prizeData.nearbyNumbers;
        lastNumber = prizeData.lastNumber;

        displayPrizes(prizeData);
    }
});

function RandomPrize() {
    const randomPrize =  () => Math.floor(Math.random() * 900) + 100;

    prize1 = randomPrize();
    prize2 = [randomPrize(), randomPrize(),randomPrize()];
    nearbyNumbers = [prize1 - 1, prize1 + 1];
    lastNumber = Math.floor(Math.random() * 90) + 10;

    const prizeData = { prize1, prize2, nearbyNumbers, lastNumber };
    displayPrizes(prizeData);

    localStorage.setItem('lotteryPrizeData', JSON.stringify(prizeData));
}

function displayPrizes(prizeData) {
    if (prizeOne) prizeOne.textContent = prizeData.prize1;
    if (prizeTwo) prizeTwo.textContent = prizeData.prize2.join(", ");
    if (nearNumber) nearNumber.textContent = prizeData.nearbyNumbers.join(", ");
    if (last) last.textContent = prizeData.lastNumber;
}

function checkPrize() {
    if (inputLottery && resultMessage) {
        const lottery = inputLottery.value;
        
        if(lottery === '') {
            resultMessage.textContent = 'กรุณากรอกหมายเลขล็อตเตอรี่!';
            return
        }
    
        resultMessage.textContent = '';
    
        let results = [];
    
        if (parseInt(lottery) === prize1) results.push('ถูกรางวัลที่ 1');
        if (prize2.includes(parseInt(lottery))) results.push('ถูกรางวัลที่ 2');
        if (nearbyNumbers.includes(parseInt(lottery))) results.push('ถูกรางวัลข้างเคียงรางวัลที่ 1');

        const numTwoDogit = lottery.toString().slice(-2).padStart(2, '0');

        if (parseInt(numTwoDogit) === parseInt(lastNumber)) results.push('ถูกรางวัลเลขท้าย 2 ตัว');

        if (results.length > 0) {
            resultMessage.textContent = `${lottery} ${results.join(' และ ')} 🎉`;
        } else {
            resultMessage.textContent = `${lottery} ไม่ถูกรางวัลใด ๆ 😭`;
        }
    }
}