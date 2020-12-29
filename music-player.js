'use strict'

const musicContainer = document.getElementById('music_container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('music');
const progressContainer = document.getElementById('progress_container');
const progress = document.getElementById('progress');

const songName = document.getElementById('song_name');
const imageCover = document.getElementById('cover_image');

/** Song name */
const songs = ['hey', 'summer', 'ukulele'];

/** Keep track of song */
let songIndex = 1;

/** Initially load song details into DOM */
loadSong(songs[songIndex]);

/** Update song details */
function loadSong(song) {
    songName.innerText = song;
    audio.src = `music/${song}.mp3`;
    audio.autoplay = false;
    imageCover.src = `images/${song}.jpg`;  
}

/** Play song */
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

/** Previous song */
function prevSong() {
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    
    if(songIndex > 2){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

/** Update progress bar */
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

/** Set progress bar */
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}
/**                     EVENT LISTENERS          */
playBtn.addEventListener('click', () => {
    
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});


/** Change song */
prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click',nextSong);

/** Time song update */
audio.addEventListener('timeupdate', (e) => {
    updateProgress(e);
});

/** Control progress bar */
progressContainer.addEventListener('click', setProgress);

/** Song end - go to next song */
audio.addEventListener('ended', nextSong);