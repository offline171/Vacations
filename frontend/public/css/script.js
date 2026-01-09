const hiddenTextBox = document.getElementById("hiddenTextBox");
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", () => {
  hiddenTextBox.classList.toggle("visible");
});