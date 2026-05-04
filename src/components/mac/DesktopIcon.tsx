import type { ReactNode } from "react";

interface DesktopIconProps {
  label: string;
  emoji: string;
  onOpen: () => void;
  style?: React.CSSProperties;
}

export function DesktopIcon({ label, emoji, onOpen, style }: DesktopIconProps) {
  return (
    <button
      onDoubleClick={onOpen}
      onClick={onOpen}
      className="absolute flex flex-col items-center w-20 gap-1 text-platinum-light focus:outline-none group"
      style={style}
    >
      <div className="text-4xl leading-none drop-shadow-[1px_1px_0_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform">
        {emoji}
      </div>
      <div className="text-[11px] font-bold px-1 leading-tight text-center"
           style={{ background: "transparent", color: "white", textShadow: "1px 1px 0 black" }}>
        {label}
      </div>
    </button>
  );
}

export function DesktopIconWithChildren({ children, onOpen, style }: { children: ReactNode; onOpen: () => void; style?: React.CSSProperties }) {
  return (
    <button onDoubleClick={onOpen} onClick={onOpen} className="absolute" style={style}>
      {children}
    </button>
  );
}
