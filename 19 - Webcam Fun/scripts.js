const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function redEffect(pixels) {
    for (let index = 0; index < pixels.data.length; index+=4) {
         pixels.data[index + 0] = pixels.data[index + 0] +100; 
         pixels.data[index + 1] = pixels.data[index + 1] - 50;
         pixels.data[index + 2] = pixels.data[index + 2] * 0.5;}
    return pixels;
}

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error(`oh no !!`, err);
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0, 0);
    }
    ), 16}

function rgbSplit(pixels) {
    for (let index = 0; index < pixels.data.length; index+=4) {
        pixels.data[index -150] = pixels.data[index + 0]; 
        pixels.data[index + 100] = pixels.data[index + 1];
        pixels.data[index - 150] = pixels.data[index + 2];}
   return pixels;
}


function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="pics">`;
    console.log('photo taken');
    strip.insertBefore(link, strip.firstChild);
}




getVideo();
video.addEventListener('canplay', paintToCanvas);
