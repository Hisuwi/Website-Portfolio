document.addEventListener("DOMContentLoaded", function() {
    // Setup navigation link behavior
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
            this.parentNode.classList.add('active');
            
            const contentHeader = document.querySelector('.content-header h1');
            contentHeader.textContent = this.textContent + " Page";
        });
    });

    // Show podcast details when a podcast box is clicked
    document.querySelectorAll('.podcast-box').forEach(box => {
        box.addEventListener('click', () => {
            const mainContent = document.querySelector('.main-content');
            const podcastDetails = document.getElementById('podcastDetails');
            const title = box.querySelector('h3').textContent;
            const imgSrc = box.querySelector('img').src.replace('small', 'large');

            podcastDetails.querySelector('h1').textContent = title;
            podcastDetails.querySelector('.podcast-large-image').src = imgSrc;
            mainContent.style.display = 'none';
            podcastDetails.style.display = 'block';
        });
    });

    // Function to toggle the main content and podcast details
    document.querySelector('.back-arrow a').addEventListener('click', showMainContent);

    // Audio controls
    setupAudioControls();
});

document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById('audioPlayer');
    const volumeSlider = document.getElementById('volumeSlider');

    volumeSlider.addEventListener('input', function() {
        player.volume = parseFloat(this.value); // Update the volume as the slider moves
    });
});


function showMainContent() {
    document.getElementById('podcastDetails').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block';
    return false;
}

function setupAudioControls() {
    const player = document.getElementById('audioPlayer');
    player.addEventListener('timeupdate', updateProgress);
    player.addEventListener('loadedmetadata', () => {
        document.getElementById('totalDuration').textContent = formatTime(player.duration);
    });

    document.querySelectorAll('[data-episode]').forEach(episode => {
        episode.addEventListener('click', function() {
            playEpisode(this.getAttribute('data-title'), this.getAttribute('data-src'));
        });
    });
}

function playEpisode(title, audioSrc) {
    const player = document.getElementById('audioPlayer');
    const trackTitle = document.getElementById('trackTitle');
    const nowPlayingBar = document.getElementById('nowPlayingBar');

    trackTitle.textContent = title; // Update the title
    player.src = audioSrc;
    player.play();

    if (nowPlayingBar.style.display === 'none') {
        nowPlayingBar.style.display = 'flex';
    }
}


function togglePlayPause() {
    const player = document.getElementById('audioPlayer'); // Ensure this ID matches your audio element
    const button = document.querySelector('.play-pause');

    if (player.paused) {
        player.play();
        button.style.backgroundImage = "url('pause-button.png')"; // Change to pause icon when playing
    } else {
        player.pause();
        button.style.backgroundImage = "url('play-button.png')"; // Change to play icon when paused
    }
}


function preloadIcons() {
    const playIcon = new Image();
    const pauseIcon = new Image();
    playIcon.src = 'play-button.png';
    pauseIcon.src = 'pause-button.png';
}

document.addEventListener("DOMContentLoaded", function() {
    preloadIcons(); // Preload icons at the start
});

console.log("Before toggling: ", player.paused ? "Paused" : "Playing");


const episodes = [
    { title: "Episode 1: Introduction to Issues", file: "cyril.mp3" },
    { title: "Episode 2: Deep Dive into Topic A", file: "1975.mp3" },
    { title: "Episode 3: Understanding Topic B", file: "audio/sample_audio3.mp3" }
];

let currentEpisodeIndex = 0; // Start with the first episode


function previousTrack() {
    // Add logic for handling the previous track
}

function nextTrack() {
    // Add logic for handling the next track
}

function updateProgress() {
    const player = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');

    if (player.currentTime > 0) {
        progressBar.value = (player.currentTime / player.duration) * 100;
    }
    currentTime.textContent = formatTime(player.currentTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

document.addEventListener("DOMContentLoaded", function() {
    const player = document.getElementById('audioPlayer');
    const progressBar = document.getElementById('progressBar');

    progressBar.addEventListener('input', function() {
        const value = this.value;
        const seekTime = (value / 100) * player.duration;
        player.currentTime = seekTime;
    });

    // Update progress bar as the audio plays
    player.addEventListener('timeupdate', function() {
        const value = (this.currentTime / this.duration) * 100;
        progressBar.value = value;
    });
});
