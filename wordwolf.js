let players = [];
let current = 0;
let wolfIndex = 0;

// お題は自由に変更可能
const citizenWord = "りんご";
const wolfWord = "みかん";

function startGame() {
    const count = Number(document.getElementById("playerCount").value);
    players = Array(count).fill(citizenWord);
    wolfIndex = Math.floor(Math.random() * count);
    players[wolfIndex] = wolfWord;

    document.getElementById("setup").style.display = "none";
    document.getElementById("check").style.display = "block";

    showWord();
}

function showWord() {
    document.getElementById("checkText").textContent =
        `プレイヤー${current + 1}のお題：${players[current]}`;
}

function nextPlayer() {
    current++;
    if (current < players.length) {
        showWord();
    } else {
        document.getElementById("check").style.display = "none";
        document.getElementById("vote").style.display = "block";
    }
}

function finishGame() {
    document.getElementById("vote").style.display = "none";
    document.getElementById("result").style.display = "block";

    document.getElementById("resultText").textContent =
        "結果：市民または人狼の勝利を宣言してください。";

    document.getElementById("wolfWord").textContent =
        `人狼のお題：${wolfWord}`;
}
