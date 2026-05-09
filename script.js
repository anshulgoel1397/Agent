const form = document.querySelector("#adderForm");
const firstInput = document.querySelector("#firstNumber");
const secondInput = document.querySelector("#secondNumber");
const result = document.querySelector("#result");
const badgeValue = document.querySelector("#badgeValue");

function formatNumber(value) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/\.?0+$/, "");
}

function showMessage(message, isError = false) {
  result.textContent = message;
  result.classList.toggle("result-error", isError);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const first = Number(firstInput.value);
  const second = Number(secondInput.value);

  if (firstInput.value === "" || secondInput.value === "" || Number.isNaN(first) || Number.isNaN(second)) {
    badgeValue.textContent = "0";
    showMessage("Please enter valid values in both fields.", true);
    return;
  }

  const sum = first + second;
  const formattedSum = formatNumber(sum);

  badgeValue.textContent = formattedSum;
  showMessage(`${formatNumber(first)} + ${formatNumber(second)} = ${formattedSum}`);
});
