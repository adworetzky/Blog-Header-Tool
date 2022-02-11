// Canvas size variables
var exportWidth = 1220;
var exportHeight = 723;
var stockImg = new Image(); // Create new img element
stockImg.src = "stock img/placeholderimg.png";
var maskImg = new Image(); // Create new img element
maskImg.src = "mask/Mask.png";
var meshImg = new Image(); // Create new img element

let imgArray = [];
for (let index = 0; index <= 49; index++) {
  imgArray[index] = "mesh/mesh" + index + ".png";
}
meshImg.src = imgArray[7];
// Dynamic element creation
// Containers
const main = document.querySelector("main");
main.classList.add("maincontent");

const uiContainer = document.createElement("div");
uiContainer.classList.add("uiContainer");
main.append(uiContainer);

// Elements
const c = document.createElement("canvas");
main.append(c);
c.setAttribute("id", "canvas");
c.height = exportHeight;
c.width = exportWidth;
const c1 = document.createElement("canvas");
c1.setAttribute("id", "canvas1");
c1.height = exportHeight;
c1.width = exportWidth;

const fileInput = document.createElement("input");
uiContainer.append(fileInput);
fileInput.classList.add("uiElement");
fileInput.type = "file";
fileInput.setAttribute("id", "fileUpload");
const fileInputLabel = document.createElement("label");
fileInputLabel.classList.add("uiElementLabel");
fileInputLabel.setAttribute("for", "fileUpload");
fileInputLabel.innerHTML = "Stock Image";
fileInput.insertAdjacentElement("beforebegin", fileInputLabel);

const meshSelect = document.createElement("select");
uiContainer.append(meshSelect);
meshSelect.classList.add("uiElement");
meshSelect.setAttribute("id", "meshSelect");
const meshSelectLabel = document.createElement("label");
meshSelectLabel.classList.add("uiElementLabel");
meshSelectLabel.setAttribute("for", "meshSelect");
meshSelectLabel.innerHTML = "Mesh Selection";
meshSelect.insertAdjacentElement("beforebegin", meshSelectLabel);
for (var i = 0; i < imgArray.length; i++) {
  var opt = document.createElement("option");
  opt.value = imgArray[i];
  opt.innerHTML = "Mesh:" + (i + 1);
  meshSelect.appendChild(opt);
}

// load image validation
stockImg.addEventListener(
  "load",
  function () {
    // will execute on stockImg load
    console.log("stockImg loaded");
    drawMesh(meshImg, c1);
    drawImg(stockImg, c);
  },
  false
);
meshImg.addEventListener(
  "load",
  function () {
    // will execute on meshImg load
    console.log("meshImg loaded");
    drawMesh(meshImg, c1);
    drawImg(stockImg, c);
  },
  false
);
maskImg.addEventListener(
  "load",
  function () {
    // will execute on meshImg load
    console.log("maskImg loaded");
    drawMesh(meshImg, c1);
    drawImg(stockImg, c);
  },
  false
);

// Function to scale to fill image, draw img to canvas // Main draw function

function drawMesh(img, canvas) {
  console.log("draw function trigger");

  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-in";

  ctx.drawImage(img, -5, -5, canvas.width + 10, canvas.height + 10);
  // ctx.globalCompositeOperation = "multiply";
  // ctx.drawImage(img, -5, -5, canvas.width + 10, canvas.height + 10);
}
function drawImg(img, canvas) {
  let ctx = canvas.getContext("2d");
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // get the scale
  var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = canvas.width / 2 - (img.width / 2) * scale;
  var y = canvas.height / 2 - (img.height / 2) * scale;

  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(img, x, y, (img.width + 1) * scale, (img.height + 1) * scale);
  ctx.globalCompositeOperation = "color";
  ctx.drawImage(c1, x, y, (img.width + 1) * scale, (img.height + 1) * scale);
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.8;
  ctx.drawImage(c1, x, y, (img.width + 1) * scale, (img.height + 1) * scale);
}

fileInput.addEventListener("change", function () {
  console.log(fileInput.files[0]);
  stockImg.src = URL.createObjectURL(fileInput.files[0]);
  drawMesh(meshImg, c1);
  drawImg(stockImg, c);
});

meshSelect.addEventListener("change", function () {
  meshImg.src = meshSelect.value;

  drawMesh(meshImg, c1);
  drawImg(stockImg, c);
});
