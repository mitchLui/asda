var model = undefined;
var video = document.getElementById('video');
const liveView = document.getElementById('liveView');
var bboxes = [];

// We will create a tempory canvas to render to store frames from 
// the web cam stream for classification.
var videoRenderCanvas = document.createElement('canvas');
var videoRenderCanvasCtx = videoRenderCanvas.getContext('2d');

// Lets create a canvas to render our findings to the DOM.
var webcamCanvas = document.createElement('canvas');
webcamCanvas.setAttribute('class', 'overlay');
liveView.appendChild(webcamCanvas);

// Create a canvas to render ML findings from to manipulate.
var bodyPixCanvas = document.createElement('canvas');
bodyPixCanvas.setAttribute('class', 'overlay');
var bodyPixCanvasCtx = bodyPixCanvas.getContext('2d');
bodyPixCanvasCtx.fillStyle = '#FF0000';

liveView.appendChild(bodyPixCanvas);

var birdClicked = false;

function handleClick(event) {
  var bboxesCopy = [...bboxes];
  for (let i = 0; i < bboxesCopy.length; i++) {
    var bbox = bboxesCopy[i];
    var x = bbox[0];
    var y = bbox[1];
    var w = bbox[2];
    var h = bbox[3];
    if (event.offsetX > x && event.offsetX < x + w && event.offsetY > y && event.offsetY < y + h) {
      console.log("Bird clicked: " + i);
      // if (previousSegmentationComplete) {
      //   videoRenderCanvasCtx.drawImage(video, 0, 0);
      //   previousSegmentationComplete = false;
      //   maskObject(bbox);
      //   previousSegmentationComplete = true;
      // }
      // else {
      //   console.log("Segmentation process not complete");
      // }
      birdClicked = true;
    }
  }
}

/********************************************************************
// Continuously grab image from webcam stream and classify it.
********************************************************************/
var previousSegmentationComplete = true;

function maskObject(bbox) {
  var canvas = webcamCanvas;

  var ctx = canvas.getContext('2d');
  // Get data from our overlay canvas which is attempting to estimate background.
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  
  // Get data from the live webcam view which has all data.
  var liveData = videoRenderCanvasCtx.getImageData(0, 0, canvas.width, canvas.height);
  var dataL = liveData.data;

  // Update video
  var scale = 1.3;
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
      if (birdClicked && (x < newXMin || x > newXMin + newWidth) || ( y < newYMin || y > newYMin + newHeight)) {
        // Convert xy co-ords to array offset.
        let n = y * canvas.width + x;

        data[n * 4] = dataL[n * 4];
        data[n * 4 + 1] = dataL[n * 4 + 1];
        data[n * 4 + 2] = dataL[n * 4 + 2];
        data[n * 4 + 3] = 255;            

      } else if (!birdClicked) {
        // No bird found at all, update all pixels.
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

function predict() {
  model.detect(video).then(predictions => {
    bboxes = []; // empty bboxes

    // Add bboxes with score > 0.5
    for (let n = 0; n < predictions.length; n++) {
      if (predictions[n].score > 0.5) {
        bboxes.push(predictions[n].bbox);
      }
    }

    if (previousSegmentationComplete) {
      videoRenderCanvasCtx.drawImage(video, 0, 0);
      previousSegmentationComplete = false;
      maskObject(bboxes);
      previousSegmentationComplete = true;
    }

    window.requestAnimationFrame(predict);
  });
}

// Load the model.
cocoSsd.load().then(loadedModel => {
  // detect objects in the image.
  model = loadedModel;
  console.log("Loaded");
  var loading = document.getElementById('loading');
  loading.style="display: none;";

  // Video stuff
  video.style="display: block;";
  liveView.addEventListener('click', handleClick);

  video.addEventListener('loadedmetadata', function() {
    // Set up canvases
    webcamCanvas.width = video.videoWidth;
    webcamCanvas.height = video.videoHeight;
    videoRenderCanvas.width = video.videoWidth;
    videoRenderCanvas.height = video.videoHeight;
    bodyPixCanvas.width = video.videoWidth;
    bodyPixCanvas.height = video.videoHeight;
    let webcamCanvasCtx = webcamCanvas.getContext('2d');
    webcamCanvasCtx.drawImage(video, 0, 0);
    console.log("Video metadata loaded");
  });

  // Start the video
  video.play();
  predict();
});