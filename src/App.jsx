import { useMemo, useState } from "react";

function formatNumber(value) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2).replace(/\.?0+$/, "");
}

function parseValue(value) {
  if (value.trim() === "") {
    return null;
  }

  const number = Number(value);
  return Number.isNaN(number) ? null : number;
}

export default function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [message, setMessage] = useState("Enter two numbers to see their sum.");
  const [isError, setIsError] = useState(false);
  const [total, setTotal] = useState(0);

  const canReset = useMemo(() => firstNumber !== "" || secondNumber !== "" || total !== 0, [firstNumber, secondNumber, total]);

  function handleSubmit(event) {
    event.preventDefault();

    const first = parseValue(firstNumber);
    const second = parseValue(secondNumber);

    if (first === null || second === null) {
      setTotal(0);
      setIsError(true);
      setMessage("Please enter valid values in both fields.");
      return;
    }

    const sum = first + second;
    const formattedSum = formatNumber(sum);

    setTotal(formattedSum);
    setIsError(false);
    setMessage(`${formatNumber(first)} + ${formatNumber(second)} = ${formattedSum}`);
  }

  function handleReset() {
    setFirstNumber("");
    setSecondNumber("");
    setTotal(0);
    setIsError(false);
    setMessage("Enter two numbers to see their sum.");
  }

  return (
    <main className="calculator-shell" aria-labelledby="app-title">
      <section className="calculator-panel">
        <div className="heading-row">
          <div>
            <p className="eyebrow">React Number Adder</p>
            <h1 id="app-title">Add two numbers</h1>
          </div>
          <div className="total-badge" aria-label="Current result">
            <span>{total}</span>
          </div>
        </div>

        <form className="calculator-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="firstNumber">First number</label>
          <input
            id="firstNumber"
            name="firstNumber"
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={firstNumber}
            onChange={(event) => setFirstNumber(event.target.value)}
            required
          />

          <label htmlFor="secondNumber">Second number</label>
          <input
            id="secondNumber"
            name="secondNumber"
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={secondNumber}
            onChange={(event) => setSecondNumber(event.target.value)}
            required
          />

          <div className="button-row">
            <button type="submit">Add numbers</button>
            <button type="button" className="secondary-button" onClick={handleReset} disabled={!canReset}>
              Reset
            </button>
          </div>
        </form>

        <output className={`result-box${isError ? " result-error" : ""}`} aria-live="polite">
          {message}
        </output>
      </section>
    </main>
  );
}
