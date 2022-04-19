const playBtn = document.querySelector('.player__play-btn');
const durationTime = document.querySelector('.player__duration-time');
const currentTime = document.querySelector('.player__current-time');
const play = document.querySelector('.player__play');
const pause = document.querySelector('.player__pause');
const playerBackground = document.querySelector('.player__background');
const playerPic = document.querySelector('.player__pic');
const bar = document.querySelector('.player__bar');
let audio = document.querySelector('.audio');
let artistName = document.querySelector('.player__artist-name');
let songTitle = document.querySelector('.player__song-title');
let isPlay = false;
let playNum = 0;
let music = [
    {
        artist: 'Micky',
        title: 'This Is The Life',
        src: 'assets/audio/Micky - This Is The Life.mp3',
        background: 'assets/img/micky.jfif',
        album: 'assets/img/micky.jfif',
        duration: '03:10'
    },
    {
        artist: 'Tim McMorris',
        title: "It's a Beautiful Day",
        src: 'assets/audio/Tim McMorris - Its a Beautiful Day.mp3',
        background: 'assets/img/beautiful_day.jpg',
        album: 'assets/img/beautiful_day.jpg',
        duration: '02:14'
    }
];
let duration = music.map(item => item.duration);
let song = music.map(item => item.src);
let artist = music.map(item => item.artist);
let title = music.map(item => item.title);
let background = music.map(item => item.background);
let album = music.map(item => item.album);
const next = document.querySelector('.player__next');
const prev = document.querySelector('.player__prev');
let updateTimer;


loadAudio();
playBtn.addEventListener('click', toggleBtn);
next.addEventListener('click', playNext);
prev.addEventListener('click', playPrev);
bar.addEventListener('change', startFrom);


function loadAudio() {
    clearInterval(updateTimer);
    audio.src = song[playNum];
    audio.load();
    playerBackground.src = background[playNum];
    playerPic.src = album[playNum];
    audio.src = song[playNum];
    artistName.textContent = artist[playNum];
    songTitle.textContent = title[playNum];
    audio.addEventListener('ended', playNext);
    updateTimer = setInterval(setUpdate, 100);
    
}

function toggleBtn() {
    if (!isPlay) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    durationTime.classList.add('active');
    isPlay = true;
    audio.play();
    play.classList.add('inactive');
    pause.classList.add('active');
}
    
function pauseAudio() {
    isPlay = false;
    audio.pause();
    play.classList.remove('inactive');
    pause.classList.remove('active');
}

function playNext() {
    playNum++;
    audio.src = song[playNum];
    if (playNum > song.length-1) {
        playNum = 0;
        audio.src = song[playNum];
    }
    
    loadAudio();
    playAudio();
}   

function playPrev() {
    playNum--;
    audio.src = song[playNum];
    if (playNum < 0) {
        playNum = song.length - 1;
        audio.src = song[playNum];
    } 

    loadAudio();
    playAudio();
}

function setUpdate() {
    let position = 0;
    if(!isNaN(audio.duration)) {
        position = audio.currentTime * (100 / audio.duration);
        bar.value = position;

        let currMin = Math.floor(audio.currentTime / 60);
        let currSec = Math.floor(audio.currentTime - currMin * 60);
        let durationMin = Math.floor(audio.duration / 60);
        let durationSec = Math.floor(audio.duration - (durationMin * 60));

        if(currSec < 10) {currSec = "0" + currSec; }
        if(durationSec < 10) { durationSec = "0" + durationSec; }
        if(currMin < 10) {currMin = "0" + currMin; }
        if(durationMin < 10) { durationMin = "0" + durationMin; }

        currentTime.textContent = currMin + ":" + currSec;
        durationTime.textContent = durationMin + ":" + durationSec;
    }
}



function startFrom() {
    audio.currentTime = audio.duration * (bar.value / 100);
}