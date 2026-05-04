import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";

interface MacWindowProps {
  title: string;
  children: ReactNode;
  initial: { x: number; y: number; w: number; h: number };
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  active: boolean;
  /** When true, this window fills the desktop (case-study mode) and is not draggable. */
  zoomed?: boolean;
  onZoomToggle?: () => void;
}

export function MacWindow({
  title,
  children,
  initial,
  zIndex,
  onFocus,
  onClose,
  active,
  zoomed,
  onZoomToggle,
}: MacWindowProps) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (zoomed) return;
    onFocus();
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
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

  const styleZoomed: React.CSSProperties = {
    left: 8, top: 30, width: "calc(100vw - 16px)", height: "calc(100vh - 38px)",
  };
  const styleWindow: React.CSSProperties = {
    left: pos.x, top: pos.y, width: initial.w, height: initial.h,
  };

  return (
    <div
      ref={ref}
      onMouseDown={onFocus}
      className="absolute bevel-out pixel-shadow-lg select-none flex flex-col"
      style={{ ...(zoomed ? styleZoomed : styleWindow), zIndex }}
    >
      {/* Title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={() => onZoomToggle?.()}
        className={`relative flex items-center h-[19px] border-b border-black ${zoomed ? "" : "cursor-move"}`}
        style={{
          background: active ? "white" : "var(--platinum)",
          backgroundImage: active
            ? "repeating-linear-gradient(to bottom, black 0 1px, white 1px 2px)"
            : "none",
        }}
      >
        {/* Close box */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          onPointerDown={(e) => e.stopPropagation()}
          className="ml-1 w-[11px] h-[11px] border border-black bg-white hover:bg-black"
          aria-label="Close"
        />
        {/* Title (white background to mask stripes) */}
        <div className="absolute left-1/2 -translate-x-1/2 px-2 text-[12px] font-normal whitespace-nowrap"
             style={{ background: active ? "white" : "var(--platinum)", lineHeight: "16px" }}>
          {title}
        </div>
        {/* Zoom box (right) */}
        {onZoomToggle && (
          <button
            onClick={(e) => { e.stopPropagation(); onZoomToggle(); }}
            onPointerDown={(e) => e.stopPropagation()}
            className="ml-auto mr-1 w-[11px] h-[11px] border border-black bg-white relative"
            aria-label="Zoom"
          >
            <span className="absolute inset-[2px] border border-black" />
          </button>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 bg-white overflow-auto" style={{ borderTop: "1px solid black" }}>
        <div className={zoomed ? "p-6 max-w-3xl mx-auto" : "p-3"}>{children}</div>
      </div>
    </div>
  );
}
