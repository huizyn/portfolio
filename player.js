const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const songTitle = document.getElementById('song-title');

const playlist = [
    { title: 'Misery Business - Paramore', src: 'music/song1.mp3' },
    { title: 'My Happy Ending - Avril Lavigne', src: 'music/song2.mp3' },
    { title: 'In The End - Linkin Park', src: 'music/song3.mp3' }
];

let currentSongIndex = 0;

function loadSong(index) {
    audio.src = playlist[index].src;
    songTitle.textContent = playlist[index].title;
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    playBtn.textContent = '⏸';
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audio.play();
    playBtn.textContent = '⏸';
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.volume = 0.7;
loadSong(0);

const floatingPlayer = document.getElementById('floating-player');
const minimizeBtn = document.getElementById('minimize-btn');
const playerContent = document.getElementById('player-content');

function checkMobileAndMinimize() {
    if (window.innerWidth <= 768) {
        floatingPlayer.classList.add('minimized');
        minimizeBtn.textContent = '+';
    } else {
        floatingPlayer.classList.remove('minimized');
    }
}

minimizeBtn.addEventListener('click', () => {
    floatingPlayer.classList.toggle('minimized');
    if (floatingPlayer.classList.contains('minimized')) {
        minimizeBtn.textContent = '+';
    } else {
        minimizeBtn.textContent = '−';
    }
});

checkMobileAndMinimize();

window.addEventListener('resize', checkMobileAndMinimize);
