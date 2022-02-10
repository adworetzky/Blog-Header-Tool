// canvas size variables
var exportWidth = 1220;
var exportHeight = 723.55;

// Dynamic element creation
const main = document.querySelector("main");
main.classList.add("maincontent");
console.log(main);

const uiContainer = document.createElement("div");
uiContainer.classList.add("uiContainer");
main.append(uiContainer);

const c = document.createElement("canvas");
c.height = exportHeight;
c.width = exportWidth;
main.append(c);

// function to create a new element, add classname, and appened to main
function makeNewElement(name, className, appendPlacement) {
  const uiContainer = document.createElement(name);
  uiContainer.classList.add(className);
  main.append(appendPlacement);
}
