import { useState } from "react";

const keypad = [
  ["AC", "+/−", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "=", ""],
];

function App() {
  const [display, setDisplay] = useState("0");
  const [pendingOp, setPendingOp] = useState(null);
  const [operand, setOperand] = useState(null);
  const [overwrite, setOverwrite] = useState(true);

  // Reset everything back to an initial state
  const clearAll = () => {
    setDisplay("0");
    setPendingOp(null);
    setOperand(null);
    setOverwrite(true);
  };

  // Execute the arithmetic operation for lhs (stored) and rhs (current input)
  const applyOperation = (lhs, rhs, op) => {
    switch (op) {
      case "+":
        return lhs + rhs;
      case "−":
        return lhs - rhs;
      case "×":
        return lhs * rhs;
      case "÷":
        return rhs === 0 ? "Error" : lhs / rhs;
      default:
        return rhs;
    }
  };

  // Append digit input, honoring overwrite flag
  const handleDigit = (digit) => {
    if (overwrite || display === "Error") {
      setDisplay(digit);
    } else {
      setDisplay((prev) => (prev === "0" ? digit : prev + digit));
    }
    setOverwrite(false);
  };

  // Add a decimal point only once
  const handleDecimal = () => {
    if (overwrite || display === "Error") {
      setDisplay("0.");
      setOverwrite(false);
      return;
    }
    setDisplay((prev) => (prev.includes(".") ? prev : `${prev}.`));
    setOverwrite(false);
  };

  // Flip sign of the current display value
  const handleToggleSign = () => {
    if (display === "Error") return;
    setDisplay((prev) => {
      if (prev === "0") return "0";
      return prev.startsWith("-") ? prev.slice(1) : `-${prev}`;
    });
  };

  // Convert current value to percentage
  const handlePercent = () => {
    if (display === "Error") return clearAll();
    const current = parseFloat(display) || 0;
    setDisplay((current / 100).toString());
    setOverwrite(true);
  };

  // Capture or chain operations, computing intermediate results as needed
  const startOperation = (op) => {
    if (display === "Error") {
      clearAll();
      return;
    }

    const current = parseFloat(display);

    if (operand === null) {
      setOperand(current);
    } else if (pendingOp) {
      const result = applyOperation(operand, current, pendingOp);
      if (result === "Error") {
        setDisplay("Error");
        setOperand(null);
        setPendingOp(null);
        setOverwrite(true);
        return;
      }
      setOperand(result);
      setDisplay(result.toString());
    }

    setPendingOp(op);
    setOverwrite(true);
  };

  // Resolve the pending operation
  const handleEquals = () => {
    if (!pendingOp || operand === null || display === "Error") return;

    const current = parseFloat(display);
    const result = applyOperation(operand, current, pendingOp);

    setPendingOp(null);
    setOperand(null);
    setOverwrite(true);

    if (result === "Error") {
      setDisplay("Error");
      return;
    }

    setDisplay(result.toString());
  };

  // Route button labels to their corresponding handlers
  const handleClick = (label) => {
    console.log(`Clicked: ${label}`);

    const numeric = Number(label);
    const isDigit = !Number.isNaN(numeric) && label.trim() !== "";

    if (isDigit) {
      handleDigit(label);
      return;
    }

    switch (label) {
      case "AC":
        clearAll();
        break;
      case "+/−":
        handleToggleSign();
        break;
      case "%":
        handlePercent();
        break;
      case "÷":
      case "×":
      case "−":
      case "+":
        startOperation(label);
        break;
      case "=":
        handleEquals();
        break;
      case ".":
        handleDecimal();
        break;
      default:
        break;
    }
  };

  return (
    <main className=" flex max-w-5xl flex-col text-slate-100">
      <section className="grid gap-6">
        <div className="rounded-2xl bg-slate-900/60 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur">
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-slate-950/80 p-6 shadow-inner ring-1 ring-black/40">
              <div className="mb-6 rounded-lg bg-slate-900/80 px-3 py-4 text-right text-5xl font-semibold tracking-tight text-white ring-1 ring-white/10">
                {display}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {keypad.flat().map((label, idx) =>
                  label ? (
                    <button
                      onClick={() => handleClick(label)}
                      key={`${label}-${idx}`}
                      type="button"
                      className="rounded-lg bg-slate-800/80 px-4 py-3 text-lg font-semibold text-white shadow-sm ring-1 ring-white/5 transition hover:-translate-y-[1px] hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                    >
                      {label}
                    </button>
                  ) : (
                    <span key={`spacer-${idx}`} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
