import { useEffect, useState } from "react";

export function MenuBar({ onAbout }: { onAbout: () => void }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      let h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ampm}`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const items = ["File", "Edit", "View", "Special", "Help"];

  return (
    <div className="fixed top-0 left-0 right-0 h-[22px] bg-platinum-light border-b border-black flex items-center px-2 text-[12px] font-bold z-[9999] pixel-shadow"
         style={{ boxShadow: "0 1px 0 0 black, inset 0 1px 0 0 white" }}>
      <button onClick={onAbout} className="px-2 hover:bg-black hover:text-platinum-light leading-[22px]">
        <span style={{ fontSize: 14 }}>🍎</span>
      </button>
      <button onClick={onAbout} className="px-2 hover:bg-black hover:text-platinum-light leading-[22px] italic">
        Finder
      </button>
      {items.map((i) => (
        <button key={i} className="px-2 hover:bg-black hover:text-platinum-light leading-[22px]">{i}</button>
      ))}
      <div className="ml-auto px-2">{time}</div>
    </div>
  );
}
