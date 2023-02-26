var model = undefined;
var video = document.getElementById('video');
const liveView = document.getElementById('liveView');
// Keep a reference of all the child elements we create
// so we can remove them easily on each render.
var children = [];
var bboxes = [];

function handleClick(event) {
  var bboxesCopy = [...bboxes];
  for (let i = 0; i < bboxesCopy.length; i++) {
    var bbox = bboxesCopy[i];
    var x = bbox[0];
    var y = bbox[1];
    var w = bbox[2];
    var h = bbox[3];
    if (event.offsetX > x && event.offsetX < x + w && event.offsetY > y && event.offsetY < y + h) {
      // var p = child.nextSibling;
      // var text = p.innerText;
      console.log("Bird clicked: " + i);
    }
  }
}

function predict() {
  model.detect(video).then(predictions => {
    // console.log('Predictions: ', predictions);
    // Remove any highlighting we did previous frame.
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);
    bboxes = []; // empty bboxes

    // Now lets loop through predictions and draw them to the live view if
    // they have a high confidence score.
    for (let n = 0; n < predictions.length; n++) {
      // If we are over 66% sure we are sure we classified it right, draw it!
      if (predictions[n].score > 0.5) {
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

        // liveView.appendChild(highlighter);
        // liveView.appendChild(p);
        // children.push(highlighter);
        // children.push(p);
        bboxes.push(predictions[n].bbox);
      }
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
  video.play();
  predict();
});