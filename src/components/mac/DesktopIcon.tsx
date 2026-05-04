import type { ReactNode, CSSProperties } from "react";
import { useState } from "react";

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onOpen: () => void;
  style?: CSSProperties;
}

export function DesktopIcon({ label, icon, onOpen, style }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
      onDoubleClick={() => { setSelected(false); onOpen(); }}
      onBlur={() => setSelected(false)}
      className="absolute flex flex-col items-center w-20 gap-[2px] focus:outline-none"
      style={style}
    >
      <div
        className="w-8 h-8 flex items-center justify-center"
        style={{ filter: selected ? "invert(1)" : undefined }}
      >
        {icon}
      </div>
      <div
        className="text-[12px] leading-tight px-1 text-center"
        style={{
          fontFamily: "var(--font-chicago)",
          color: selected ? "white" : "black",
          background: selected ? "black" : "white",
          padding: "0 2px",
          maxWidth: 78,
        }}
      >
        {label}
      </div>
    </button>
  );
}
