import { useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import Button from '../Button/Button';
import styles from './Demo.module.scss';
import Leaderboard from '../Leaderboard/Leaderboard';

async function test() {
  var model = undefined;
  var video = document.getElementById('video');
  const liveView = document.getElementById('liveView');
  var bboxes = [];
  if (liveView) {

  // We will create a tempory canvas to render to store frames from 
  // the web cam stream for classification.
  var videoRenderCanvas = document.createElement('canvas');
  var videoRenderCanvasCtx = videoRenderCanvas.getContext('2d');

  // Lets create a canvas to render our findings to the DOM.
  var displayedCanvas = document.createElement('canvas');
  displayedCanvas.setAttribute('class', 'overlay');
  liveView.appendChild(displayedCanvas);

  var birdClicked = false;
  var endVideo = false;

  function handleClick(event) {
    var bboxesCopy = [...bboxes];
    for (let i = 0; i < bboxesCopy.length; i++) {
      var bbox = bboxesCopy[i];
      var x = bbox[0];
      var y = bbox[1];
      var w = bbox[2];
      var h = bbox[3];
      if (event.offsetX > x && event.offsetX < x + w && event.offsetY > y && event.offsetY < y + h) {
        birdClicked = true;
        console.log('hit!');
      }
    }
  }


  /********************************************************************
  // Continuously grab image from displayed stream and classify it.
  ********************************************************************/
  var previousSegmentationComplete = true;

  function maskObject(bbox) {
    var canvas = displayedCanvas;

    var ctx = canvas.getContext('2d');
    // Get data from our overlay canvas which is attempting to estimate background.
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    
    // Get data from the live displayed view which has all data.
    var liveData = videoRenderCanvasCtx.getImageData(0, 0, canvas.width, canvas.height);
    var dataL = liveData.data;

    if (birdClicked) {
      // Update video
      var scale = 1.5;
      var minX = bbox[0];
      var minY = bbox[1];
      var width = bbox[2];
      var height = bbox[3];
      //  Define scaled dimensions.
      var newWidth = width * scale;
      var newHeight = height * scale;
      // Calculate the offset to place new bounding box so scaled from center of current bounding box.
      var offsetX = (newWidth - width) / 2;
      var offsetY = (newHeight - height) / 2;
      var newXMin = minX - offsetX;
      var newYMin = minY - offsetY;
      
      // Now loop through update backgound understanding with new data
      // if not inside a bounding box.
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          // If outside bounding box and we found a body, update background.
          if ((x < newXMin || x > newXMin + newWidth) || ( y < newYMin || y > newYMin + newHeight)) {
            // Convert xy co-ords to array offset.
            let n = y * canvas.width + x;
    
            data[n * 4] = dataL[n * 4];
            data[n * 4 + 1] = dataL[n * 4 + 1];
            data[n * 4 + 2] = dataL[n * 4 + 2];
            data[n * 4 + 3] = 255;            
    
          }
        }
      }
    }

    else {
      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          // Convert xy co-ords to array offset.
          let n = y * canvas.width + x;

          data[n * 4] = dataL[n * 4];
          data[n * 4 + 1] = dataL[n * 4 + 1];
          data[n * 4 + 2] = dataL[n * 4 + 2];
          data[n * 4 + 3] = 255;            
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  var prev_box = undefined;

  function predict() {
    if (previousSegmentationComplete) {
      model.detect(video).then(predictions => {

        bboxes = []; // empty bboxes

        // Add bboxes with score > 0.5
        predictions.sort((a, b) => b.score - a.score);
        for (let n = 0; n < predictions.length; n++) {
          if (predictions[n].score > 0.2) {
            bboxes.push(predictions[n].bbox);
            const p = document.createElement('p');
            p.innerText = predictions[n].class  + ' - with ' 
                + Math.round(parseFloat(predictions[n].score) * 100) 
                + '% confidence.';
            p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
                + (predictions[n].bbox[1] - 10) + 'px; width: ' 
                + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

            const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
            highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
                + predictions[n].bbox[1] + 'px; width: ' 
                + predictions[n].bbox[2] + 'px; height: '
                + predictions[n].bbox[3] + 'px;';

          }
        }

        videoRenderCanvasCtx.drawImage(video, 0, 0);
        previousSegmentationComplete = false;
        if (bboxes.length > 0) {
          prev_box = bboxes[0];
        }
        maskObject(prev_box);
        previousSegmentationComplete = true;
        
        window.requestAnimationFrame(predict);
      });
    }
  }

  function handleEnd(event) {
    console.log('ended');
  }

  // Load the model;
  cocoSsd.load().then(loadedModel => {
    // detect objects in the image.
    model = loadedModel;
    console.log("Loaded");
    var loading = document.getElementById('loading');
    loading.style.display = 'none';
    var crosshair = document.getElementById('crosshair');
    crosshair.style.display = 'block';

    // Video stuff
    liveView.addEventListener('click', handleClick);

    video.addEventListener('ended', handleEnd);


    // Set up canvases
    displayedCanvas.width = video.videoWidth;
    displayedCanvas.height = video.videoHeight;
    videoRenderCanvas.width = video.videoWidth;
    videoRenderCanvas.height = video.videoHeight;
    let displayedCanvasCtx = displayedCanvas.getContext('2d');
    displayedCanvasCtx.drawImage(video, 0, 0);
    
    video.play();
    console.log('plays');
    predict();
  }).catch(err => {
    console.log(err);
  });
}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function Demo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [start, setStarted] = useState(false);
  const [mouseClicked, setMouseClicked] = useState(false);
  const [source, setSource] = useState(`/videos/5.mp4`);
  function handleMouseMove(e) {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    test();
    setMouseClicked(false);
  }, [start, mouseClicked]);

  useEffect(() => {
    if (mouseClicked) {
      setSource(`/videos/${getRandomInt(5)}.mp4`);
    }
  }, [mouseClicked]);

  return (
    <div className={styles.demo} onMouseMove={(ev) => {handleMouseMove(ev)}}>
      <div style={{width: '75%', height: '100%', float: 'left'}}>
      {!start && <div style={{paddingTop: '150px', textAlign: 'center', height: '500px'}}>
        <p>Want to see how effective ASDA is? See for yourself! Play the ASDA game and see how many seagulls you can shoot!</p>
        <Button onClick={() => {setStarted(true)}}>Start</Button>
        </div>}
      {
        start && 
        <>
        <img id="crosshair" className={styles.seagullshooter} style={{position: 'absolute', left: mousePosition.x, top: mousePosition.y, width: 200, height: 200, zIndex: 10}} src="/cross.png" alt="img"/>
        <div id="loading">Loading...</div>
        <div style={{width: '50%', height: 'calc(100vw * 9 / 16)', marginTop: '100px', 'marginLeft': '50px', position: 'relative', alignItems: 'center'}} id="liveView" className="videoView">
          <video id="video" style={{display: 'none', width: '100%', height: '100%', objectFit: 'contain'}} onClick={()=>{setMouseClicked(true)}}>
            <source src={source} type="video/mp4"/>
          </video>
        </div>
        </>
      }
      {

      }
      </div>
      <div style={{width: '25%', height: '100%', float: 'right'}}>
        <Leaderboard />
      </div>
    </div>
  )
}