let startTime;
let interval;
let elapsed = 0; // in ms

const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

startButton.onclick = () => {
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
        elapsed = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsed);
    }, 250);

    startButton.disabled = true;
    stopButton.disabled = false;
};

stopButton.onclick = () => {
    clearInterval(interval);

    // You can send to the server here if needed
    console.log("meditation duration:", elapsed);

    startButton.disabled = false;
    stopButton.disabled = true;
};

resetButton.onclick = () => {
    clearInterval(interval);

    
    // You can send to the server here if needed
    console.log("meditation duration:", elapsed);
    timeDisplay.textContent = formatTime(0.00);

    startButton.disabled = false;
    stopButton.disabled = true;
};