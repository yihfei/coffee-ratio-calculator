let calculateTarget = "coffee"; // default: calculate coffee

const coffeeInput = document.getElementById("coffeeInput");
const waterInput = document.getElementById("waterInput");
const ratioInput = document.getElementById("ratioInput");
const ratioValue = document.getElementById("ratioValue");
const output = document.getElementById("output");


const boxes = {
  coffee: document.getElementById("coffeeBox"),
  water: document.getElementById("waterBox"),
  ratio: document.getElementById("ratioBox")
};


Object.entries(boxes).forEach(([key, box]) => {
  box.addEventListener("click", (e) => {
    // only calculate if the click is not on the input
    if (e.target.tagName.toLowerCase() !== 'input') {
      calculateTarget = key;
      updateState();
      calculate();
    }
  });
});

[coffeeInput, waterInput].forEach(input => {
  input.addEventListener("input", () => calculate());
});

ratioInput.addEventListener("input", () => {
    ratioValue.textContent = `1:${ratioInput.value}`;
    calculate();
  });
  

function updateState() {
  Object.entries(boxes).forEach(([key, box]) => {
    const input = document.getElementById(`${key}Input`);
    if (key === calculateTarget) {
      box.classList.add("selected");
      input.disabled = true;
    } else {
      box.classList.remove("selected");
      input.disabled = false;
    }
  });
  calculate();
}

function calculate() {
  const coffee = parseFloat(coffeeInput.value);
  const water = parseFloat(waterInput.value);
  const ratio = parseFloat(ratioInput.value);

  let message = "";

  if (coffee <= 0 || water <= 0 || ratio <= 0) {
    message = "Please enter only positive values";
  } else if (calculateTarget === "coffee" && !isNaN(water) && !isNaN(ratio)) {
    const result = water / ratio;
    coffeeInput.value = result.toFixed(1);
    message = `→ Coffee needed: ${result.toFixed(1)}g`;
  } else if (calculateTarget === "water" && !isNaN(coffee) && !isNaN(ratio)) {
    const result = coffee * ratio;
    waterInput.value = result.toFixed(1);
    message = `→ Water needed: ${result.toFixed(1)}g`;
  } else if (calculateTarget === "ratio" && !isNaN(water) && !isNaN(coffee) && coffee !== 0) {
    const result = water / coffee;
    ratioInput.value = result.toFixed(1);
    message = `→ Ratio: 1:${result.toFixed(1)}`;
  } else {
    if (calculateTarget === "coffee") {
        message = `Enter water weight and ratio`;
    } else if (calculateTarget === "water") {
        message = `Enter coffee and ratio`;
    } else if (calculateTarget === "ratio") {
        message = `Enter the coffee and water`;
    } else {
        message = `Enter the two values to calculate the ${calculateTarget}.`;
    }  }

  output.textContent = message;
}

updateState();
