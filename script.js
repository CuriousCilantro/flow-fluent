document.addEventListener('DOMContentLoaded', function() {
    var timerDisplay = document.getElementById('timer-display');
    var startButton = document.getElementById('start-timer');
    var shortBreakButton = document.getElementById('short-break');
    var longBreakButton = document.getElementById('long-break');
    var resetButton = document.getElementById('reset-timer');
    var sessionCounter = document.getElementById('session-counter');
    var shortBreakCounter = document.getElementById('short-break-counter');
    var longBreakCounter = document.getElementById('long-break-counter');
    var completedSessions = 0;
    var completedShortBreaks = 0;
    var completedLongBreaks = 0;
    var timer;

    // Audio elements using the same audio file for all actions
    var audio = new Audio('alarm.wav');

    document.getElementById('current-date').textContent = new Date().toLocaleDateString();

    startButton.addEventListener('click', function() {
        setTimer(44 * 61, 'session'); // 44 minutes
    });

    shortBreakButton.addEventListener('click', function() {
        setTimer(11 * 61, 'shortBreak'); // 5 minutes
    });

    longBreakButton.addEventListener('click', function() {
        setTimer(22 * 61, 'longBreak'); // 15 minutes
    });

    resetButton.addEventListener('click', function() {
        clearInterval(timer);
        timerDisplay.textContent = '44:00';  // Reset to default display
        audio.play();  // Play sound on reset
        resetTimerDisplay();
    });

    function setTimer(duration, type = 'session') {
        clearInterval(timer);
        startPomodoroTimer(duration * 1000, type); // Convert seconds to milliseconds
    }

    function startPomodoroTimer(duration, type) {
        const endTime = Date.now() + duration;
        timer = setInterval(function() {
            const timeLeft = endTime - Date.now();
            const secondsLeft = Math.round(timeLeft / 1000);
            if (secondsLeft <= 0) {
                clearInterval(timer);
                timerDisplay.textContent = "00:00";
                audio.play();
                updateCounters(type);
            } else {
                const minutes = Math.floor(secondsLeft / 60);
                const seconds = secondsLeft % 60;
                timerDisplay.textContent = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            }
        }, 1000);
    }

    function resetTimerDisplay() {
        resetButton.style.display = 'none';
        startButton.style.display = 'inline';
        shortBreakButton.style.display = 'inline';
        longBreakButton.style.display = 'inline';
    }

    function updateCounters(type) {
        if (type === 'session') {
            completedSessions++;
            sessionCounter.textContent = completedSessions;
        } else if (type === 'shortBreak') {
            completedShortBreaks++;
            shortBreakCounter.textContent = completedShortBreaks;
        } else if (type === 'longBreak') {
            completedLongBreaks++;
            longBreakCounter.textContent = completedLongBreaks;
        }
    }
});
