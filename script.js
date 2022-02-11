// Canvas size variables
var exportWidth = 1220;
var exportHeight = 723.55;
var stockImg = new Image(); // Create new img element
stockImg.src = "stock img/placeholderimg.png";
var meshImg = new Image(); // Create new img element
meshImg.src = "mesh/testMesh.png";

// Dynamic element creation
// Containers
const main = document.querySelector("main");
main.classList.add("maincontent");

const uiContainer = document.createElement("div");
uiContainer.classList.add("uiContainer");
main.append(uiContainer);

// Elements
main.append(document.createElement("canvas"));
const c = document.querySelector("canvas");
c.height = exportHeight;
c.width = exportWidth;

const fileInput = document.createElement("input");
uiContainer.append(fileInput);
fileInput.classList.add("uiElement");
fileInput.type = "file";
fileInput.setAttribute("id", "fileUpload");
const fileInputLabel = document.createElement("label");
fileInputLabel.classList.add("uiElement");
fileInputLabel.setAttribute("for", "fileUpload");
fileInputLabel.innerHTML = "Stock Image";
uiContainer.prepend(fileInputLabel);

// load image validation
stockImg.addEventListener(
  "load",
  function () {
    // will execute on stockImg load
    drawImg(stockImg, c);
    drawMesh(meshImg, c);
  },
  false
);
// meshImg.addEventListener(
//   "load",
//   function () {
//     // will execute on meshImg load
//     drawImg(stockImg, c);
//     drawMesh(meshImg, c);
//   },
//   false
// );

// Function to scale to fill image, draw img to canvas // Main draw function
function drawImg(img, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // get the scale
  var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = canvas.width / 2 - (img.width / 2) * scale;
  var y = canvas.height / 2 - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function drawMesh(img, canvas) {
  let ctx = canvas.getContext("2d");

  ctx.globalCompositeOperation = "color";
  ctx.drawImage(img, -5, -5, canvas.width + 10, canvas.height + 10);
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(img, -5, -5, canvas.width + 10, canvas.height + 10);
}

fileInput.addEventListener("change", function () {
  console.log(fileInput.files[0]);
  stockImg.src = URL.createObjectURL(fileInput.files[0]);
  drawImg(stockImg, c);
  drawMesh(meshImg, c);
});
