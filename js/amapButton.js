var addDataButton = document.getElementById("addDataButton");
var addData = document.getElementById("addData")
var isClicked = true;

function rotateButton() {
  if (isClicked) {
    addDataButton.classList.add("clicked");
    addData.style.display = 'none'
    isClicked = false;
  } else {
    addDataButton.classList.remove("clicked");
    addData.style.display = 'block'
    isClicked = true;
  }
}
