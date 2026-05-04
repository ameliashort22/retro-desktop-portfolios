import { useState } from "react";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [reset, setReset] = useState(false);

  const press = (key: string) => {
    if ("0123456789".includes(key)) {
      if (display === "0" || reset) { setDisplay(key); setReset(false); }
      else setDisplay(display + key);
    } else if (key === ".") {
      if (!display.includes(".")) setDisplay(display + ".");
    } else if (key === "C") {
      setDisplay("0"); setPrev(null); setOp(null);
    } else if (key === "=") {
      if (prev !== null && op) {
        const cur = parseFloat(display);
        let r = 0;
        if (op === "+") r = prev + cur;
        if (op === "-") r = prev - cur;
        if (op === "×") r = prev * cur;
        if (op === "÷") r = cur === 0 ? 0 : prev / cur;
        setDisplay(String(r)); setPrev(null); setOp(null); setReset(true);
      }
    } else {
      // operator
      setPrev(parseFloat(display));
      setOp(key);
      setReset(true);
    }
  };

  const buttons = [
    ["C", "÷", "×", "-"],
    ["7", "8", "9", "+"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", "0", ".", "="],
  ];

  return (
    <div className="bg-platinum p-2 inline-block" style={{ fontFamily: "var(--font-mono)" }}>
      <div className="bevel-in p-1 mb-2 text-right text-[16px] font-bold tabular-nums truncate" style={{ minHeight: 24 }}>
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {["C","÷","×","-",
          "7","8","9","+",
          "4","5","6","=",
          "1","2","3"," ",
          "0",".","",""].map((k, i) => (
          k === "" || k === " " ? <div key={i} /> :
          <button
            key={i}
            onClick={() => press(k)}
            className="bevel-button h-8 text-[14px] font-bold hover:bg-platinum-light"
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
