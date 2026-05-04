import { useEffect, useRef, useState, type PointerEvent } from "react";

/** Tiny working MacPaint-style doodler */
export function Paint() {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [color, setColor] = useState("#000000");
  const colors = ["#000000", "#ffffff", "#cc0000", "#000080", "#008000", "#ffcc00"];

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
  }, []);

  const pos = (e: PointerEvent<HTMLCanvasElement>) => {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    const sx = c.width / r.width;
    const sy = c.height / r.height;
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className={`h-5 w-5 border border-black ${color === c ? "ring-2 ring-[#000080]" : ""}`}
            style={{ background: c }}
            aria-label={c}
          />
        ))}
        <button
          type="button"
          className="bevel-button ml-auto px-2 py-0.5 text-[12px]"
          onClick={() => {
            const c = ref.current;
            if (!c) return;
            const ctx = c.getContext("2d");
            if (!ctx) return;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, c.width, c.height);
          }}
        >
          Clear
        </button>
      </div>
      <div className="bevel-in p-1 overflow-auto max-w-full">
        <canvas
          ref={ref}
          width={420}
          height={240}
          className="block max-w-full h-auto bg-white touch-none"
          onPointerDown={(e) => {
            drawing.current = true;
            const ctx = ref.current?.getContext("2d");
            if (!ctx) return;
            const p = pos(e);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const ctx = ref.current?.getContext("2d");
            if (!ctx) return;
            const p = pos(e);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }}
          onPointerUp={() => {
            drawing.current = false;
          }}
          onPointerLeave={() => {
            drawing.current = false;
          }}
        />
      </div>
      <p className="text-[10px] text-[#666]">
        Doodle something. It won&apos;t be saved — like all the best things.
      </p>
    </div>
  );
}
