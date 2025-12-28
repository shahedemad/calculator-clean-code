const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");
    const value = btn.getAttribute("data-value");

    handleButton(value, type);
  });
});

function handleButton(value, type) {
  if (type === "equal") {
    calculateResult();
  } else if (type === "clear") {
    clearDisplay();
  } else if (type === "delete") {
    deleteLast();
  } else if (type === "operator") {
    addOperator(value);
  } else if (type === "digit") {
    addDigit(value);
  }
}

function calculateResult() {
  try {
    display.value = Function('"use strict";return (' + display.value + ')')();
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function addOperator(op) {
  display.value += op;
}

function addDigit(digit) {
  display.value += digit;
}