let selectedNumber = null;
let countdownTimer = null;
const NG_WORDS = [
    "りんご",
    "ねこ",
    "いぬ",
    "バナナ",
    "くるま",
    "みかん",
    "テレビ",
    "スマホ",
    "コーヒー",
    "サッカー"
];

document.addEventListener('DOMContentLoaded', () => {
    const numbersDiv = document.getElementById('numbers');
    for (let i = 1; i <= 6; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => selectNumber(i, btn);
        numbersDiv.appendChild(btn);
    }
    document.getElementById('startBtn').disabled = false;
});

function selectNumber(n, btn) {
    selectedNumber = n;
    // clear previous selection style
    const children = document.getElementById('numbers').children;
    for (let c of children) c.classList.remove('selected');
    btn.classList.add('selected');
    document.getElementById('instruction').textContent = `あなたの番号：${n} を選択しました。スタートを押してください。`;
}

function startCountdown() {
    if (!selectedNumber) {
        alert('まず1〜6の番号を選んでください。');
        return;
    }
    const startDiv = document.getElementById('start');
    const countdown = document.getElementById('countdown');
    const ngword = document.getElementById('ngword');
    const options = document.getElementById('options');

    // hide others
    startDiv.style.display = 'none';
    ngword.style.display = 'none';
    options.style.display = 'none';

    let time = 5;
    countdown.style.display = 'block';
    countdown.textContent = time;
    document.getElementById('instruction').textContent = '';

    countdownTimer = setInterval(() => {
        time--;
        countdown.textContent = time;
        if (time <= 0) {
            clearInterval(countdownTimer);
            countdown.style.display = 'none';
            showNGWord();
        }
    }, 1000);
}

function showNGWord() {
    const ngword = document.getElementById('ngword');
    const options = document.getElementById('options');
    const word = NG_WORDS[Math.floor(Math.random() * NG_WORDS.length)];
    ngword.textContent = `NGワード：${word}`;
    ngword.style.display = 'block';
    options.style.display = 'block';
}

function onNext() {
    // Prepare for next round: instruct to wait for host signal, show start button
    document.getElementById('instruction').textContent = '司会の合図でスタートボタンを押してください。';
    document.getElementById('ngword').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('start').style.display = 'block';
}

function goHome() {
    window.location.href = 'index.html';
}

