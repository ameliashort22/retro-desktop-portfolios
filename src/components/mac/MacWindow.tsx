import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";

interface MacWindowProps {
  title: string;
  children: ReactNode;
  initial: { x: number; y: number; w: number; h?: number };
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  active: boolean;
}

export function MacWindow({ title, children, initial, zIndex, onFocus, onClose, active }: MacWindowProps) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    onFocus();
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    setPos({
      x: Math.max(-200, Math.min(window.innerWidth - 80, e.clientX - drag.current.dx)),
      y: Math.max(22, Math.min(window.innerHeight - 40, e.clientY - drag.current.dy)),
    });
  };
  const onPointerUp = () => { drag.current = null; };

  useEffect(() => { onFocus(); /* eslint-disable-next-line */ }, []);

  return (
    <div
      ref={ref}
      onMouseDown={onFocus}
      className="absolute bg-platinum bevel-out pixel-shadow select-none"
      style={{
        left: pos.x,
        top: pos.y,
        width: initial.w,
        height: initial.h,
        zIndex,
      }}
    >
      {/* Title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex items-center h-[19px] px-1 border-b border-black cursor-move"
        style={{
          background: active
            ? "repeating-linear-gradient(to bottom, var(--titlebar) 0 1px, var(--titlebar-stripe) 1px 2px)"
            : "var(--platinum)",
        }}
      >
        {/* Close box */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          onPointerDown={(e) => e.stopPropagation()}
          className="w-[13px] h-[13px] bevel-button bg-platinum hover:bg-platinum-light"
          aria-label="Close"
        />
        <div className="flex-1 text-center text-[12px] font-bold leading-none truncate px-2"
             style={{ background: active ? "var(--platinum-light)" : "transparent", margin: "0 4px", padding: "2px 8px" }}>
          {title}
        </div>
        <div className="w-[13px] h-[13px]" />
      </div>
      {/* Content */}
      <div className="bevel-in bg-platinum-light m-1 overflow-auto" style={{ height: initial.h ? initial.h - 28 : "auto", maxHeight: "70vh" }}>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
