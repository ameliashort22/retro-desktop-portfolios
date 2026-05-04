import { useEffect, useState } from "react";

const STORAGE = "macos-notepad-text";

export function NotePad() {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(localStorage.getItem(STORAGE) ?? "Welcome to the Note Pad.\n\nType a thought. Your secret is safe with the year 1994.\n\n");
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE, text);
  }, [text]);
  return (
    <div className="bg-white" style={{ fontFamily: "var(--font-chicago)" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="w-full h-64 outline-none resize-none p-2 text-[12px] leading-tight"
        style={{
          fontFamily: "var(--font-chicago)",
          background: "white",
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 17px, #cdcdcd 17px 18px)",
        }}
      />
      <div className="text-[11px] text-platinum-dark p-1 border-t border-black">
        Saved automatically.
      </div>
    </div>
  );
}
