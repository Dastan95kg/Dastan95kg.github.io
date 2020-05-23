function app() {
    const play = document.querySelector('.play');
    const song = document.querySelector('.song');
    const video = document.querySelector('.video-container video');
    const timeDisplay = document.querySelector('.time-display');
    let defaultDuration = 300;
    const selectTime = document.querySelectorAll('.select-time button');
    const sounds = document.querySelectorAll('.sound-pick button');

    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Function that playing and pausing app
    const checkPlaying = (song) => {
        if (song.paused) {
            song.play();
            play.src = '../assets/meditate/pause.svg';
            video.play();
        } else {
            song.pause();
            play.src = '../assets/meditate/play.svg';
            video.pause();
        }
    };

    // Setting timer
    song.ontimeupdate = function () {
        const currentTime = song.currentTime;
        const passed = defaultDuration - currentTime;
        const minutes = Math.floor(passed / 60);
        const seconds = Math.floor(passed % 60);
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= defaultDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "../assets/meditate/play.svg";
            video.pause();
        }
    };

    // Selecting time 
    selectTime.forEach((time) => {
        time.addEventListener('click', function () {
            defaultDuration = this.getAttribute('data-time');
            song.currentTime = 0;
        });
    });

    // Selecting sounds
    sounds.forEach((sound) => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });
}

app();