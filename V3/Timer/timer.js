var isRunning = false;
var isBreak = false;
var numBreaks = 0;
var breakLength = 0;
var numSessions = 0;
var sessionLength = 0;
var timeInSeconds = 0; 
var completedSessions = 0; //counter for completed sessions
var intervalId;

// timerSettings is the modal
function openModal() {
    document.getElementById('timerSettings').style.display = 'block';
}

function closeModal() {
    document.getElementById('timerSettings').style.display = 'none';
}

function loadTimer() {
    // retrieve selected values
    sessionLength = parseInt(document.getElementById('sessionLength').value);
    numSessions = parseInt(document.getElementById('numSessions').value);

    // last break doesn't count because you'll have finished all study portions of sessions**
    numBreaks = numSessions;

    // calculate how long each break is, it is proportionate to the length of time of each study portion
    // for every 25 mins you get 5 min break at the end
    var breakAllotments = sessionLength % 5;
    breakLength = breakAllotments * 5;

    timeInSeconds = sessionLength * 60; // decrementing per second

    // display
    updateTimerDisplay();
    closeModal();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(runTimer, 1000); // update every 1000ms (1 second)
    }
}

function runTimer() {
    if (timeInSeconds > 0) {
        // if not over, decrement
        timeInSeconds--;
        updateTimerDisplay();
    } else {
        // if the timer reaches 0, start a break or a new session
        if (!isBreak) {
          completedSessions++;
          //adding a limit
          if (completedSessions != numSessions) {
            startSession();
          }
        } else {
            startBreak();
        }
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(intervalId);
}

function startSession() {
    isBreak = false;
    timeInSeconds = sessionLength * 60;
    updateTimerDisplay();
}

function startBreak() {
    isBreak = true;
    timeInSeconds = breakLength * 60;
    updateTimerDisplay();
    playAlert();
}

function updateTimerDisplay() {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    document.getElementById('hours').innerText = padZero(hours);
    document.getElementById('minutes').innerText = padZero(minutes);
    document.getElementById('seconds').innerText = padZero(seconds);
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

function playAlert() {
  var audio = document.getElementById("breakTimeAudio");
  audio.play();
}
