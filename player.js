const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.querySelector('.progress-container');
const songTitle = document.getElementById('song-title');

const playlist = [
    { title: 'Misery Business - Paramore', src: 'music/song.mp3' },
];

let currentSongIndex = 0;

function loadSong(index) {
    audio.src = playlist[index].src;
    songTitle.textContent = `♪ ${playlist[index].title} ♪`;
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '❚❚';
    } else {
        audio.pause();
        playBtn.textContent = '▶︎';
    }
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

audio.addEventListener('play', () => {
    playBtn.textContent = '❚❚';
})

audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
});

audio.volume = 0.4;
loadSong(0);

audio.autoplay = true;
audio.loop = true;
audio.play();

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
