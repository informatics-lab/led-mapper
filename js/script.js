var nlights = 1;
var imgres = [500, 375];


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
      var that = this;
      setTimeout(function(){
        draw(that,context,cw,ch);
        var lightonrgba = getImgRGBA(imgres[0], imgres[1]);
        console.log("Shift!")
        setTimeout(function(){
            draw(that,context,cw,ch);
            calibrate(nlights, imgres, lightonrgba);
        }, 2000)
      }, 2000)

  },false);

},false);

function getImgRGBA(np, nq){
  var canvas = document.getElementById('canvasElement');
  var context = canvas.getContext('2d');

  return context.getImageData(0, 0, np, nq).data;
}

function drawRect(x, y){
  var canvas = document.getElementById('canvasElement');
  var context = canvas.getContext('2d');
  context.fillStyle = "red";
  context.fillRect(x, y, 10, 10);
}

function rgbaToPQI(rgba, np, nq){
  var intensities = [];
  for (var i=0; i<rgba.length; i=i+4){
    thisrgb = rgba.slice(i, i+3)
    intensity = (thisrgb[0] + thisrgb[1] + thisrgb[2]) / 3.0;
    intensities.push(intensity)
  }

  pqintensities = []
  for (var i=0; i<intensities.length; i=i+nq){
    pqintensities.push(intensities.slice(i, i+nq))
  }

  return pqintensities
}


function calibrate(nlights, imgres, lightonrgba){
  var white = "#ffffff", black = "#000000";
  var lighton = [white]; for (var i=0; i < (nlights-1); i++){lighton.push(black)};
  var lightoff = []; for (var i=0; i < (nlights); i++){lighton.push(black)};
  var positions = [];

  var minx = 100000000000, miny = 100000000000, maxx = 0, maxy = 0;

  for (var n=0; n<nlights; n++){
    // console.log(".");
    // requests.post(lighton)
    //lightonrgba = getImgRGBA(imgres[0], imgres[1]);

    // requests.post(lightsoff)
    lightoffrgba = getImgRGBA(imgres[0], imgres[1]);

    maxdiff = 0;
    maxpos = 0;
    for (var i=0; i<lightonrgba.length; i+=4){
      var onlum = (0.21*lightonrgba[i]) + (lightonrgba[i+1]*0.71) + (lightonrgba[i+2]*0.07)
      var offlum = (0.21*lightoffrgba[i]) + (lightoffrgba[i+1]*0.71) + (lightoffrgba[i+2]*0.07)
      var diff = onlum - offlum;
      if (diff > maxdiff) {maxdiff=diff; maxpos=i/4;}
    }

    var p = maxpos%imgres[0];
    var q = Math.floor(maxpos/imgres[0]);

    if (p > maxx){maxx = p;}
    if (p < minx){minx = p;}
    if (q > maxy){maxy = q;}
    if (q < miny){miny = q;}
    positions.push([p,q])
    
    console.log(positions)
    drawRect(p,q);

    lighton.unshift(black)
    lighton.pop()
  }

  console.log(positions)

  var normpositions = [];
  var imgpositions = [];
  for (var i=0; i<positions.length; i ++){
    var thispos = positions[i]
    var pos = [(p-minx)/(maxx-minx), (q-miny)/(maxy-miny)];
    normpositions.push(pos)
    imgpositions.push([pos[0]*imgres[0], pos[1]*imgres[1]])
  }

  return imgpositions
}