var video = document.querySelector("#videoElement");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {
   navigator.getUserMedia({video: true}, handleVideo, videoError);
}

function handleVideo(stream) {
   video.src = window.URL.createObjectURL(stream);
}

function videoError(e) {
   // do something
}

function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);
    setTimeout(draw,1000,v,c,w,h);
}

document.addEventListener('DOMContentLoaded', function(){
  var v = document.getElementById('videoElement');
  var canvas = document.getElementById('canvasElement');
  var context = canvas.getContext('2d');

  var cw = Math.floor(canvas.clientWidth );
  var ch = Math.floor(canvas.clientHeight );
  canvas.width = cw;
  canvas.height = ch;

  v.addEventListener('play', function(){
      draw(this,context,cw,ch);
  },false);

},false);


function rgbaToPQI(rgba, np, nq){
  var intensities = [];
  for (var i=0; i<rgba.length(); i=i+4){
    thisrgb = rgba.slice(i, i+3)
    intensity = (thisrgb[0] + thisrgb[1] + thisrgb[2]) / 3.0;
    intensities.push(intensity)
  }

  pqintensities = []
  for (var i=0; i<intensities.length(); i=i+nq){
    pqintensities.push(intensities.slice(i, i+nq))
  }

  return pqintensities
}