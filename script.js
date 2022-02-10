// Canvas size variables
var exportWidth = 1220;
var exportHeight = 723.55;

// Dynamic element creation
const main = document.querySelector("main");
main.classList.add("maincontent");

const uiContainer = document.createElement("div");
uiContainer.classList.add("uiContainer");
main.append(uiContainer);

main.append(document.createElement("canvas"));
const c = document.querySelector("canvas");
c.height = exportHeight;
c.width = exportWidth;

// establish context for drawing to canvas
let ctx = c.getContext("2d");

// load image validation
var img = new Image(); // Create new img element
img.src = "stock img/shutterstock_322049537.jpg";
img.addEventListener(
  "load",
  function () {
    scaleToFill(img, c);
  },
  false
);

// function to scale to fill image
function scaleToFill(img, canvas) {
  // get the scale
  var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = canvas.width / 2 - (img.width / 2) * scale;
  var y = canvas.height / 2 - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// function to create a new element, add classname, and appened to main
function makeNewElement(name, className, appendPlacement) {
  const uiContainer = document.createElement(name);
  uiContainer.classList.add(className);
  main.append(appendPlacement);
}
