function startNG() {
    document.getElementById("start").style.display = "none";
    const countdown = document.getElementById("countdown");
    countdown.style.display = "block";

    let time = 5;
    countdown.textContent = time;

    const timer = setInterval(() => {
        time--;
        countdown.textContent = time;

        if (time === 0) {
            clearInterval(timer);
            showNumber();
        }
    }, 1000);
}

function showNumber() {
    document.getElementById("countdown").style.display = "none";
    const number = document.getElementById("number");
    number.style.display = "block";

    const value = Math.floor(Math.random() * 6) + 1;
    number.textContent = `あなたの番号：${value}`;
}
