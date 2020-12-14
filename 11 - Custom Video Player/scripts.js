const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }   
}

function updateButton() {
    const newIcon = this.paused ? '►' : '&#9208;';
    toggle.innerHTML = newIcon;
}

function skip() {
    const skipSeconds = this.dataset.skip;
    video.currentTime += parseFloat(skipSeconds);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = video.currentTime*100 / video.duration;
    progressBar.style.flexBasis =  `${percent}%`;
}

function scrubVideo(e) { 
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrubVideo(e) );
