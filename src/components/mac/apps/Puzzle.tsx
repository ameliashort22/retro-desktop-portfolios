import { useMemo, useState } from "react";

/** Classic 15-puzzle: 4x4 grid, sliding tiles. */
export function Puzzle() {
  const initial = useMemo(() => {
    const a = Array.from({ length: 15 }, (_, i) => i + 1).concat([0]);
    // shuffle with valid moves to ensure solvability
    let blank = 15;
    for (let i = 0; i < 200; i++) {
      const moves: number[] = [];
      const row = Math.floor(blank / 4), col = blank % 4;
      if (row > 0) moves.push(blank - 4);
      if (row < 3) moves.push(blank + 4);
      if (col > 0) moves.push(blank - 1);
      if (col < 3) moves.push(blank + 1);
      const m = moves[Math.floor(Math.random() * moves.length)];
      [a[blank], a[m]] = [a[m], a[blank]];
      blank = m;
    }
    return a;
  }, []);
  const [tiles, setTiles] = useState<number[]>(initial);

  const move = (idx: number) => {
    const blank = tiles.indexOf(0);
    const r1 = Math.floor(idx / 4), c1 = idx % 4;
    const r2 = Math.floor(blank / 4), c2 = blank % 4;
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return;
    const next = tiles.slice();
    [next[idx], next[blank]] = [next[blank], next[idx]];
    setTiles(next);
  };

  const won = tiles.every((v, i) => (i === 15 ? v === 0 : v === i + 1));

  return (
    <div className="bg-platinum p-2 inline-block" style={{ fontFamily: "var(--font-chicago)" }}>
      <div className="bevel-in p-1 grid grid-cols-4 gap-1 bg-black">
        {tiles.map((v, i) => (
          <button
            key={i}
            onClick={() => move(i)}
            className={`w-10 h-10 text-[16px] font-bold ${
              v === 0 ? "bg-black" : "bevel-button hover:bg-platinum-light"
            }`}
            style={{ visibility: v === 0 ? "hidden" : "visible" }}
          >
            {v || ""}
          </button>
        ))}
      </div>
      <div className="text-center mt-2 text-[12px]">
        {won ? "★ You solved it! ★" : "Slide tiles to order 1–15."}
      </div>
    </div>
  );
}
