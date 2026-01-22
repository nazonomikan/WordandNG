let selectedNumber = null;
let countdownTimer = null;
let topicIndex = 0;

const NG_TOPICS = {
    1: ["りんご", "赤い果物", "おいしいフルーツ"],
    2: ["ねこ", "毛がふわふわ", "ニャーと言う"],
    3: ["いぬ", "しっぽを振る", "ほえる"],
    4: ["バナナ", "黄色い", "皮をむく"],
    5: ["くるま", "エンジン音", "タイヤ"],
    6: ["みかん", "缶詰じゃない", "皮をむく"]
};

document.addEventListener('DOMContentLoaded', () => {
    const numbersDiv = document.getElementById('numbers');
    for (let i = 1; i <= 6; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => selectNumber(i, btn);
        numbersDiv.appendChild(btn);
    }
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = true;
});

function selectNumber(n, btn) {
    selectedNumber = n;
    topicIndex = 0;
    const children = document.getElementById('numbers').children;
    for (let c of children) c.classList.remove('selected');
    btn.classList.add('selected');
    const total = (NG_TOPICS[n] && NG_TOPICS[n].length) || 0;
    document.getElementById('instruction').textContent = `あなたの番号：${n} を選択しました。お題 1/${total}。スタートを押してください。`;
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.disabled = true;
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
    const topics = NG_TOPICS[selectedNumber] || [];
    let word;
    if (topicIndex < topics.length) {
        word = topics[topicIndex];
    } else {
        word = '（お題がありません）';
    }
    ngword.textContent = `NGワード：${word}`;
    ngword.style.display = 'block';
    options.style.display = 'block';
    const total = topics.length;
    if (word === '（お題がありません）') {
        document.getElementById('instruction').textContent = 'これ以上お題はありません。ホームに戻ってください。';
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = true;
    } else {
        document.getElementById('instruction').textContent = `お題 ${topicIndex + 1}/${total}`;
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = false;
    }
    topicIndex++;
}

function onNext() {
    const topics = NG_TOPICS[selectedNumber] || [];
    if (topicIndex >= topics.length) {
        document.getElementById('instruction').textContent = 'これ以上お題はありません。ホームに戻ってください。';
        document.getElementById('ngword').style.display = 'none';
        document.getElementById('options').style.display = 'none';
        document.getElementById('start').style.display = 'block';
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.disabled = true;
        return;
    }
    document.getElementById('instruction').textContent = '司会の合図でスタートボタンを押してください。';
    document.getElementById('ngword').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('start').style.display = 'block';
}

function goHome() {
    window.location.href = 'index.html';
}

