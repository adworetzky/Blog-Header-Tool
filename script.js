// Canvas size variables
let exportWidth = 1200;
let exportHeight = 672;
let counter = 1;

let stockImg = new Image();
stockImg.src = "stock img/placeholderimg.png";
let maskImg = new Image();
let meshImg = new Image();

// fill an array with src links to mesh and mask files
let meshArray = [];
for (let index = 0; index <= 49; index++) {
  meshArray[index] = "mesh/mesh" + index + ".png";
}

let maskArray = [];
for (let index = 0; index <= 19; index++) {
  maskArray[index] = "mask/Mask" + index + ".png";
}

// set random initial mesh and mask to display
let randMesh = getRand(0, meshArray.length);
let randMask = getRand(0, maskArray.length);
maskImg.src = maskArray[randMask];

// Dynamic element creation

// Containers
const main = document.querySelector("main");
main.classList.add("maincontent");

const uiContainer = document.createElement("div");
uiContainer.classList.add("uiContainer");
main.append(uiContainer);

const c = document.createElement("canvas");
main.append(c);
c.setAttribute("id", "canvas");
c.height = exportHeight;
c.width = exportWidth;

const maskUI = document.createElement("div");
document.querySelector("body").append(maskUI);
maskUI.setAttribute("id", "maskUI");

// Elements

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
fileInputLabel.innerHTML = "Stock Image:";
fileInput.insertAdjacentElement("beforebegin", fileInputLabel);

//Sliders
const vertSlider = document.createElement("input");
uiContainer.append(vertSlider);
vertSlider.classList.add("uiElement");
vertSlider.type = "range";
vertSlider.min = -50;
vertSlider.max = 50;
vertSlider.value = 0;
vertSlider.setAttribute("id", "vertSlider");
const vertSliderLabel = document.createElement("label");
vertSliderLabel.classList.add("uiElementLabel");
vertSliderLabel.setAttribute("for", "vertSlider");
vertSliderLabel.innerHTML = "Image Position: ";
vertSlider.insertAdjacentElement("beforebegin", vertSliderLabel);

// Selects
const meshColorSelect = document.createElement("select");
uiContainer.append(meshColorSelect);
meshColorSelect.classList.add("uiElement");
meshColorSelect.setAttribute("id", "meshColorSelect");
let optBlue = document.createElement("option");
optBlue.value = "blue ";
optBlue.innerHTML = "Blue";
meshColorSelect.appendChild(optBlue);
let optRed = document.createElement("option");
optRed.value = "red ";
optRed.innerHTML = "Red";
meshColorSelect.appendChild(optRed);
let optPink = document.createElement("option");
optPink.value = "pink ";
optPink.innerHTML = "Pink";
meshColorSelect.appendChild(optPink);
const meshColorSelectLabel = document.createElement("label");
meshColorSelectLabel.classList.add("uiElementLabel");
meshColorSelectLabel.setAttribute("for", "meshSelect");
meshColorSelectLabel.innerHTML = "Mesh Color:";
meshColorSelect.insertAdjacentElement("beforebegin", meshColorSelectLabel);
let randMeshColor = Math.random();
if (randMeshColor <= 0.33) {
  meshColorSelect.value = "blue ";
} else if (randMeshColor > 0.33 && randMeshColor < 0.66) {
  meshColorSelect.value = "red ";
} else if (randMeshColor >= 0.66) {
  meshColorSelect.value = "pink ";
}

const meshSelect = document.createElement("select");
uiContainer.append(meshSelect);
meshSelect.classList.add("uiElement");
meshSelect.setAttribute("id", "meshSelect");
meshSelect.value = meshArray[randMesh];
const meshSelectLabel = document.createElement("label");
meshSelectLabel.classList.add("uiElementLabel");
meshSelectLabel.setAttribute("for", "meshSelect");
meshSelectLabel.innerHTML = "Mesh Selection:";
meshSelect.insertAdjacentElement("beforebegin", meshSelectLabel);
for (let i = 0; i < meshArray.length; i++) {
  let opt = document.createElement("option");
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
maskSelectLabel.innerHTML = "Mask Selection:";
maskSelect.insertAdjacentElement("beforebegin", maskSelectLabel);
for (let i = 0; i < maskArray.length; i++) {
  let opt = document.createElement("option");
  opt.value = maskArray[i];
  opt.innerHTML = "Mask:" + (i + 1);
  maskSelect.appendChild(opt);
}
maskSelect.value = maskArray[randMask];

const maskThumbnail = makeThumbnails();
makeThumbnailEventListeners();

//Buttons
const reloadButton = createButton("Reload", "reloadButton");
const randomButton = createButton("Randomize", "randomButton");
const saveButton = createButton("Save", "saveButton");

const directions = document.createElement("p");
uiContainer.append(directions);
directions.innerHTML =
  "Hotkeys:<br>Left and Right arrows = Mesh Selection<br>Up and Down arrows = Mask Selection<br> 1 = Blue, 2 = Red, 3= Pink<br>S key = Save";
directions.classList.add("uiElement");
directions.setAttribute("id", "directions");

// focus on mesh selector on load
window.onload = function () {
  document.getElementById("meshSelect").focus();
};

// Initial Drawn Canvas
combineTempandMeshpath();
drawCanvas();

// function to handle drawing mesh to c1 canvas
function drawMesh(img, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw mask
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);

  // draw mesh inside mask
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// function to take c1 canvas and draw it overtop of c canvas
function drawImg(img, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // get the scale
  let scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  let x = canvas.width / 2 - (img.width / 2) * scale;
  let y = canvas.height / 2 - (img.height / 2) * scale;

  let offset = (img.height * scale - canvas.height) / 2;
  vertSlider.min = -offset;
  vertSlider.max = offset;
  if (offset > 0) {
    console.log(offset);
  } else {
    console.log("This image needs no nudge so offset is 0");
  }
  // Draw stock image
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(
    img,
    x,
    y + parseInt(vertSlider.value),
    (img.width + 1) * scale,
    (img.height + 1) * scale
  );
  if (offset == 0) {
    vertSlider.style.display = "none";
    vertSliderLabel.style.display = "none";
  } else {
    vertSlider.style.display = "block";
    vertSliderLabel.style.display = "block";
  }

  // Draw mesh (previously masked)
  if (meshColorSelect.value == "red ") {
    ctx.globalAlpha = 0.75;
  } else if (meshColorSelect.value == "pink ") {
    ctx.globalAlpha = 1;
  } else if (meshColorSelect.value == "blue ") {
    ctx.globalAlpha = 0.75;
  }
  ctx.globalCompositeOperation = "color";
  ctx.drawImage(c1, -5, -5, canvas.width + 10, canvas.height + 10);
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(c1, -5, -5, canvas.width + 10, canvas.height + 10);
  if (meshColorSelect.value == "pink ") {
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(c1, -5, -5, canvas.width + 10, canvas.height + 10);
  }
  ctx.globalAlpha = 1;
}

// Combined Draw function, Use to keep order of layer intact
function drawCanvas() {
  for (var i = 0; i < maskThumbnail.length; ++i) {
    if (maskThumbnail[i].src == maskImg.src) {
      maskThumbnail[i].classList.replace("thumbnails", "thumbnails-selected");
    } else {
      maskThumbnail[i].classList.replace("thumbnails-selected", "thumbnails");
    }
  }
  let ctx0 = c.getContext("2d");
  ctx0.clearRect(0, 0, c.width, c.height);
  let ctx1 = c1.getContext("2d");
  ctx1.clearRect(0, 0, c1.width, c1.height);
  let allImages = [stockImg, meshImg, maskImg];
  $(allImages).imagesLoaded(function () {
    drawMesh(meshImg, c1);
    drawImg(stockImg, c);
    console.log("Canvas Drawn Counter: " + counter);
    counter++;
  });
}

// redraw canvas on image upload event
fileInput.addEventListener("change", function () {
  console.log(fileInput.files[0]);
  stockImg.src = URL.createObjectURL(fileInput.files[0]);
  vertSlider.value = 0;
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

vertSlider.addEventListener("input", function () {
  drawCanvas();
  console.log("Position Updated");
});

randomButton.addEventListener("click", function () {
  // set random initial mesh and mask to display

  let randMeshColor = Math.random();
  if (randMeshColor <= 0.5) {
    meshColorSelect.value = "blue ";
  } else if (randMeshColor > 0.5 && randMeshColor < 0.75) {
    meshColorSelect.value = "red ";
  } else if (randMeshColor >= 0.75) {
    meshColorSelect.value = "pink ";
  }

  let randMesh = getRand(0, meshArray.length);
  meshImg.src = meshColorSelect.value + meshArray[randMesh];
  meshSelect.value = meshArray[randMesh];
  let randMask = getRand(0, maskArray.length);
  maskImg.src = maskArray[randMask];
  maskSelect.value = maskArray[randMask];
  console.log("Random mask and mesh selected");
  drawCanvas();
  console.log("Random mask and mesh drawn");
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
  meshImg.src = meshColorSelect.value + meshSelect.value;
}

meshColorSelect.addEventListener("change", function () {
  combineTempandMeshpath();
  drawCanvas();
});

document.onkeyup = function (e) {
  switch (e.keyCode) {
    case 37:
      if (meshSelect.selectedIndex > 0) {
        meshSelect.selectedIndex--;
        combineTempandMeshpath();
      } else {
        meshSelect.selectedIndex = 49;
      }
      break;
    case 38:
      maskSelect.selectedIndex++;
      maskImg.src = maskSelect.value;
      break;
    case 39:
      meshSelect.selectedIndex++;
      combineTempandMeshpath();
      break;
    case 40:
      if (maskSelect.selectedIndex > 0) {
        maskSelect.selectedIndex--;
      } else {
        maskSelect.selectedIndex = 19;
      }
      maskImg.src = maskSelect.value;
      break;
    case 49:
      meshColorSelect.value = "blue ";
      combineTempandMeshpath();
      break;
    case 97:
      meshColorSelect.value = "blue ";
      combineTempandMeshpath();
      break;
    case 50:
      meshColorSelect.value = "red ";
      combineTempandMeshpath();
      break;
    case 98:
      meshColorSelect.value = "red ";
      combineTempandMeshpath();
      break;
    case 51:
      meshColorSelect.value = "pink ";
      combineTempandMeshpath();
      break;
    case 99:
      meshColorSelect.value = "pink ";
      combineTempandMeshpath();
      break;
    case 83:
      const sKeyEvent = new Event("click");
      saveButton.dispatchEvent(sKeyEvent);
      break;
  }
  drawCanvas();
};

function getRand(minimum, maximum) {
  let min = Math.floor(minimum);
  let max = Math.floor(maximum);
  let random = Math.floor(Math.random() * (max - min) + min);
  return random;
}

function createButton(buttonText, id) {
  const x = document.createElement("button");
  uiContainer.append(x);
  x.innerHTML = buttonText;
  x.classList.add("uiElement");
  x.setAttribute("id", id);
  return x;
}

function makeThumbnails(i) {
  var thumbnails = [];

  for (var i = 0; i < maskArray.length; ++i) {
    thumbnails[i] = document.createElement("img");
    thumbnails[i].src = "mask/Mask" + i + ".png";

    thumbnails[i].classList.add("thumbnails");
    thumbnails[i].setAttribute("id", "maskThumbnail" + i);
    maskUI.append(thumbnails[i]);
  }
  console.log(thumbnails);
  return thumbnails;
}

function makeThumbnailEventListeners() {
  for (let index = 0; index < maskThumbnail.length; index++) {
    maskThumbnail[index].addEventListener("click", function () {
      maskImg.src = maskThumbnail[index].src;
      maskSelect.selectedIndex = index;
      drawCanvas();
    });
  }
}
