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

    // Add audio elements
    var pomodoroAudio = new Audio('pomodoro.mp3');
    var shortBreakAudio = new Audio('short-break.mp3');
    var longBreakAudio = new Audio('long-break.mp3');

    document.getElementById('current-date').textContent = new Date().toLocaleDateString();

    startButton.addEventListener('click', function() {
        setTimer(44 * 60); // 44 minutes
        // Play Pomodoro audio when the Pomodoro session starts
        pomodoroAudio.play();
    });

    shortBreakButton.addEventListener('click', function() {
        setTimer(11 * 60, 'shortBreak'); // 11 minutes
        // Play Short Break audio when the short break starts
        shortBreakAudio.play();
    });

    longBreakButton.addEventListener('click', function() {
        setTimer(22 * 60, 'longBreak'); // 22 minutes
        // Play Long Break audio when the long break starts
        longBreakAudio.play();
    });

    resetButton.addEventListener('click', function() {
        clearInterval(timer);
        resetTimerDisplay();
    });

    function setTimer(duration, type = 'session') {
        clearInterval(timer);
        startPomodoroTimer(duration, type);
    }

    function startPomodoroTimer(duration, type) {
        let time = duration;
        timer = setInterval(function() {
            let minutes = parseInt(time / 60, 10);
            let seconds = parseInt(time % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerDisplay.textContent = minutes + ":" + seconds;

            // Set the timer progress in the browser's title
            document.title = `${minutes}:${seconds} - Flow-Fluent`;

            if (--time < 0) {
                clearInterval(timer);
                resetTimerDisplay();

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

                // Reset the title when the timer is done
                document.title = 'Pomodoro Timer';
            }
        }, 1000);
    }

    function resetTimerDisplay() {
        timerDisplay.textContent = '44:00';
        startButton.style.display = 'inline';
        shortBreakButton.style.display = 'inline';
        longBreakButton.style.display = 'inline';
        resetButton.style.display = 'none';
        // Reset the title when the timer is reset
        document.title = 'Pomodoro Timer';
    }
});

