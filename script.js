// Canvas size variables
var exportWidth = 1200;
var exportHeight = 672;
let counter = 1;

var stockImg = new Image();
stockImg.src = "stock img/placeholderimg.png";
var maskImg = new Image();
var meshImg = new Image();

// fill an array with src links to mesh and mask files
let meshArray = [];
for (let index = 0; index <= 49; index++) {
  meshArray[index] = "mesh/mesh" + index + ".png";
}

let maskArray = [];
for (let index = 0; index <= 13; index++) {
  maskArray[index] = "mask/Mask" + index + ".png";
}

// set random initial mesh and mask to display
let min = Math.floor(0);
let max = Math.floor(49);
let randMesh = Math.floor(Math.random() * (max - min) + min);

min = Math.floor(0);
max = Math.floor(13);
let randMask = Math.floor(Math.random() * (max - min) + min);
maskImg.src = maskArray[randMask];

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

const meshTempSelect = document.createElement("select");
uiContainer.append(meshTempSelect);
meshTempSelect.classList.add("uiElement");
meshTempSelect.setAttribute("id", "meshTempSelect");
var optCool = document.createElement("option");
optCool.value = "cool ";
optCool.innerHTML = "Cool";
meshTempSelect.appendChild(optCool);
var optWarm = document.createElement("option");
optWarm.value = "warm ";
optWarm.innerHTML = "Warm";
meshTempSelect.appendChild(optWarm);
meshTempSelect.value = "cool ";

const meshTempSelectLabel = document.createElement("label");
meshTempSelectLabel.classList.add("uiElementLabel");
meshTempSelectLabel.setAttribute("for", "meshSelect");
meshTempSelectLabel.innerHTML = "Mesh Temperature";
meshTempSelect.insertAdjacentElement("beforebegin", meshTempSelectLabel);

const meshSelect = document.createElement("select");
uiContainer.append(meshSelect);
meshSelect.classList.add("uiElement");
meshSelect.setAttribute("id", "meshSelect");

const meshSelectLabel = document.createElement("label");
meshSelectLabel.classList.add("uiElementLabel");
meshSelectLabel.setAttribute("for", "meshSelect");
meshSelectLabel.innerHTML = "Mesh Selection";
meshSelect.insertAdjacentElement("beforebegin", meshSelectLabel);
for (var i = 0; i < meshArray.length; i++) {
  var opt = document.createElement("option");
  opt.value = meshArray[i];
  opt.innerHTML = "Mesh:" + (i + 1);
  meshSelect.appendChild(opt);
}

const maskSelect = document.createElement("select");
uiContainer.append(maskSelect);
maskSelect.classList.add("uiElement");
maskSelect.setAttribute("id", "maskSelect");

const maskSelectLabel = document.createElement("label");
maskSelectLabel.classList.add("uiElementLabel");
maskSelectLabel.setAttribute("for", "maskSelect");
maskSelectLabel.innerHTML = "Mask Selection";
maskSelect.insertAdjacentElement("beforebegin", maskSelectLabel);
for (var i = 0; i < maskArray.length; i++) {
  var opt = document.createElement("option");
  opt.value = maskArray[i];
  opt.innerHTML = "Mask:" + (i + 1);
  maskSelect.appendChild(opt);
}
maskSelect.value = maskArray[randMask];

const reloadButton = document.createElement("button");
uiContainer.append(reloadButton);
reloadButton.innerHTML = "Reload";
reloadButton.classList.add("uiElement");
reloadButton.setAttribute("id", "reloadButton");

const randomButton = document.createElement("button");
uiContainer.append(randomButton);
randomButton.innerHTML = "Randomize";
randomButton.classList.add("uiElement");
randomButton.setAttribute("id", "randomButton");

const saveButton = document.createElement("button");
uiContainer.append(saveButton);
saveButton.innerHTML = "Save";
saveButton.classList.add("uiElement");
saveButton.setAttribute("id", "saveButton");

// focus on mesh selector on load
window.onload = function () {
  document.getElementById("meshSelect").focus();
};
combineTempandMeshpath();
//load image validation
stockImg.addEventListener(
  "load",
  function () {
    // will execute on stockImg load
    console.log("stockImg loaded");
    drawCanvas();
  },
  false
);
meshImg.addEventListener(
  "load",
  function () {
    // will execute on meshImg load
    console.log("meshImg loaded");
    drawCanvas();
  },
  false
);
maskImg.addEventListener(
  "load",
  function () {
    // will execute on maskImg load
    console.log("maskImg loaded");
    drawCanvas();
  },
  false
);

// function to handle drawing mesh to c1 canvas
function drawMesh(img, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw mask
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);

  // draw mesh inside mask
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(img, -5, -5, canvas.width + 10, canvas.height + 10);
}

// function to take c1 canvas and draw it overtop of c canvas
function drawImg(img, canvas) {
  let ctx = canvas.getContext("2d");

  // get the scale
  var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  var x = canvas.width / 2 - (img.width / 2) * scale;
  var y = canvas.height / 2 - (img.height / 2) * scale;

  // Draw stock image
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(img, x, y, (img.width + 1) * scale, (img.height + 1) * scale);

  // Draw mesh (previously masked)
  if (meshTempSelect.value == "warm ") {
    ctx.globalAlpha = 0.65;
  } else {
    ctx.globalAlpha = 1;
  }
  ctx.globalCompositeOperation = "color";
  ctx.drawImage(c1, x, y, (img.width + 1) * scale, (img.height + 1) * scale);
  ctx.globalCompositeOperation = "multiply";

  ctx.drawImage(c1, x, y, (img.width + 1) * scale, (img.height + 1) * scale);
  ctx.globalAlpha = 1;
}

// Combined Draw function, Use to keep order of layer intact
function drawCanvas() {
  if (stockImg.complete && meshImg.complete && maskImg.complete) {
    drawMesh(meshImg, c1);
    drawImg(stockImg, c);
    console.log("Draw Function Counter: " + counter);
    counter++;
  } else {
    console.error(
      "Load Status: Stock Image: " +
        stockImg.complete +
        " , Mesh Image: " +
        meshImg.complete +
        " , Mask Image: " +
        meshImg.complete
    );
  }
}

// redraw canvas on image upload event
fileInput.addEventListener("change", function () {
  console.log(fileInput.files[0]);
  stockImg.src = URL.createObjectURL(fileInput.files[0]);
  drawCanvas();
  console.log("File Uploaded");
});

// redraw canvas on mesh select event
meshSelect.addEventListener("change", function () {
  combineTempandMeshpath();
  drawCanvas();
  console.log("Mesh changed");
});

maskSelect.addEventListener("change", function () {
  combineTempandMeshpath();
  maskImg.src = maskSelect.value;
  drawCanvas();
  console.log("Mask changed");
});

randomButton.addEventListener("click", function () {
  // set random initial mesh and mask to display

  let randMeshTemp = Math.round(Math.random());

  if (randMeshTemp == 0) {
    meshTempSelect.value = "cool ";
  } else {
    meshTempSelect.value = "warm ";
  }

  let min = Math.floor(0);
  let max = Math.floor(49);
  let randMesh = Math.floor(Math.random() * (max - min) + min);
  meshImg.src = meshTempSelect.value + meshArray[randMesh];
  meshSelect.value = meshArray[randMesh];
  min = Math.floor(0);
  max = Math.floor(13);
  let randMask = Math.floor(Math.random() * (max - min) + min);
  maskImg.src = maskArray[randMask];
  maskSelect.value = maskArray[randMask];
  drawCanvas();
  console.log("Random mask and mesh selected!");
});

reloadButton.addEventListener("click", function () {
  drawCanvas();
  console.log("Canvas Reloaded");
});

saveButton.addEventListener("click", function () {
  // set random initial mesh and mask to display
  const link = document.createElement("a");
  let d = new Date(),
    h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
    m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes(),
    s = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
  link.download = "Blog Header Image-" + h + "." + m + "." + s + ".png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
  console.log("Image Saved! You're welcome, Eric");
});

function combineTempandMeshpath() {
  meshImg.src = meshTempSelect.value + meshSelect.value;
}

meshTempSelect.addEventListener("change", function () {
  combineTempandMeshpath();
  drawCanvas();
});
