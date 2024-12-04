const btnRandomPrize = document.getElementById('btn-random-prize');
const btnCheckPrize = document.getElementById('btn-check-prize');
const resultMessage = document.getElementById('resultMessage');
const inputLottery = document.getElementById('lottery-number');

const prizeOne = document.getElementById('prize1');
const prizeTwo = document.getElementById('prize2');
const nearNumber = document.getElementById('nearNumber');
const last = document.getElementById('lastNumber');


let countRandom = 0, prize1, prize2 = [], nearbyNumbers = [], lastNumber;

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

function RandomPrize() {
    const randomPrize =  () => Math.floor(Math.random() * 900) + 100;

    prize1 = randomPrize();
    prize2 = [randomPrize(), randomPrize(),randomPrize()];
    nearbyNumbers = [prize1 - 1, prize1 + 1];
    lastNumber = Math.floor(Math.random() * 90) + 10;

    if (prizeOne) prizeOne.textContent = prize1;
    if (prizeTwo) prizeTwo.textContent = prize2.join(", ");
    if (nearNumber) nearNumber.textContent = nearbyNumbers.join(", ");
    if (last) last.textContent = lastNumber;

    countRandom++

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

        if (parseInt(numTwoDogit) === parseInt(lastNumber)) results.push('ถูกรางวัลเลขท้าย 2');

        if (results.length > 0) {
            resultMessage.textContent = `${lottery} ${results.join(' และ ')} 🎉`;
        } else {
            resultMessage.textContent = `${lottery} ไม่ถูกรางวัลใด ๆ 😭`;
        }
    }
}