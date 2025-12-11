let startTime;
let interval;
let elapsed = 0; // time in ms

const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapDiv = document.getElementById("show_laps");

// calculate timing
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    let seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};

// start timer at 0 from current time
startButton.onclick = () => {
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
        elapsed = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsed);
    }, 100);

    startButton.disabled = true;
    stopButton.disabled = false;
    lapButton.disabled = false;
};

// pause timer
stopButton.onclick = () => {
    clearInterval(interval);

    if(!interval) {
        startTime = Date.now() - elapsed; // start from previous elapsed
        interval = setInterval(() => {
            elapsed = Date.now() - startTime;
            timeDisplay.textContent = (elapsed / 1000).toFixed(1);
        }, 100);
    };

    // could send to route handlers ... 
    console.log("meditation duration:", elapsed/1000);

    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
};

// reset timer to 0
resetButton.onclick = () => {
    clearInterval(interval);

    console.log("timer reset");
    timeDisplay.textContent = formatTime(0.00);
    elapsed = 0;

    // remove displayed lap times
    lapDiv.innerHTML = ""; 
    
    startButton.disabled = false;
    stopButton.disabled = true;
    lapButton.disabled = true;
};

// reset to 0 and record curret elapsed time
lapButton.onclick = () => {
    clearInterval(interval);

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