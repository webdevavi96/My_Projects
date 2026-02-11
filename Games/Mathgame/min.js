const formData = document.querySelector("#formData");
const choices = document.querySelector("#choice");
const lineLength = document.querySelector("#length_line");
const warningBlock = document.querySelector("#warning-block");
const warningText = document.querySelector("#warning-text");
const fixedValue = document.querySelector("#input1");
const result = document.querySelector("#input2");

let newLineLength = null;
let choice = null;
let newFixedValue = null;

choices.addEventListener("change", (e) => {
  if (e.target.value == "") return;
  choice = e.target.value;
});

lineLength.addEventListener("input", (e) => {
  newLineLength = parseFloat(e.target.value);

  if (isNaN(newLineLength) || newLineLength <= 0) {
    warningBlock.classList.remove("hidden");
    warningText.textContent =
      "Length must be greater than 0 and a Positive Number.";
  } else {
    warningBlock.classList.add("hidden");
  }
});

fixedValue.addEventListener("input", (e) => {
  const value = parseFloat(e.target.value);

  if (isNaN(value) || value <= 0) {
    warningBlock.classList.remove("hidden");
    warningText.textContent =
      "Value must be greater than 0 and a Positive Number.";
  } else {
    warningBlock.classList.add("hidden");
  }

  if (choice == "fixed-radius") newFixedValue = parseFloat(value);
  else newFixedValue = parseInt(value);
});

formData.addEventListener("submit", (e) => {
  e.preventDefault();

  if (choice == "fixed-radius") {
    let numberOfCircles = Math.floor(
      newLineLength / (2 * Math.PI * newFixedValue),
    );

    if (numberOfCircles <= 0) {
      result.value = `The line length is too short to form a circle with a radius of ${newFixedValue} m.`;
    }

    result.value = `${numberOfCircles} Circles.`;
  } else {
    let radius = newLineLength / (2 * Math.PI * newFixedValue);

    if (radius <= 0 || !isFinite(radius)) {
      result.value =
        "Invalid input. Please enter a positive number of circles.";
      return;
    }

    result.value = `Each circle must have a radius of ${radius.toFixed(3)} meters.`;
  }
});
