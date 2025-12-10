let startTime;
let interval;
let elapsed = 0; // in ms

const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapDiv = document.getElementById("show_laps");

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
    lapButton.disabled = false;
};

stopButton.onclick = () => {
    clearInterval(interval);

    // You can send to the server here if needed
    console.log("meditation duration:", elapsed/1000);

    // reset timer to 0
    elapsed = 0;

    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
};

resetButton.onclick = () => {
    clearInterval(interval);

    // You can send to the server here if needed
    console.log("timer reset");
    timeDisplay.textContent = formatTime(0.00);
    elapsed = 0;

    // remove displayed lap times
    lapDiv.innerHTML = ""; 
    
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
};

lapButton.onclick = () => {
    clearInterval(interval);

    // You can send to the server here if needed
    console.log("meditation duration:", elapsed/1000);
    
    // create html element to display lap time
    const p = document.createElement('p');
    p.textContent = formatTime(elapsed);
    lapDiv.appendChild(p);
    
    // reset timer to 0 and keep running
    timeDisplay.textContent = formatTime(0.00);
    elapsed = 0;
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
        elapsed = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsed);
    }, 250);

    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
};

