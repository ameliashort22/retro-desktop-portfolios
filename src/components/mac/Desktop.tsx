import { useState, useCallback, type ReactNode } from "react";
import { MenuBar } from "@/components/mac/MenuBar";
import { MacWindow } from "@/components/mac/MacWindow";
import { DesktopIcon } from "@/components/mac/DesktopIcon";

type WinId = "about" | "atlas" | "tutorials" | "research" | "contact" | "trash" | "readme";

interface WinDef {
  id: WinId;
  title: string;
  initial: { x: number; y: number; w: number; h?: number };
  content: ReactNode;
}

export function Desktop() {
  const [openWins, setOpenWins] = useState<WinId[]>(["readme", "about"]);
  const [zOrder, setZOrder] = useState<WinId[]>(["about", "readme"]);
  const [trashFull, setTrashFull] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const focus = useCallback((id: WinId) => {
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);
  const open = useCallback((id: WinId) => {
    setOpenWins((prev) => (prev.includes(id) ? prev : [...prev, id]));
    focus(id);
  }, [focus]);
  const close = useCallback((id: WinId) => {
    setOpenWins((prev) => prev.filter((w) => w !== id));
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@ameliashort.design").catch(() => {});
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1800);
  };

  const wins: Record<WinId, WinDef> = {
    readme: {
      id: "readme",
      title: "Read Me First 📄",
      initial: { x: 60, y: 60, w: 320, h: 220 },
      content: (
        <div className="space-y-2 text-[12px] leading-snug">
          <p className="font-bold">Welcome to Amelia&apos;s Desktop.</p>
          <p>Double-click the icons on the right to explore. Drag windows by their title bars. Toss anything you don&apos;t like in the Trash.</p>
          <p className="italic text-muted-foreground">— System 8.0, est. 1997 (vibes only)</p>
        </div>
      ),
    },
    about: {
      id: "about",
      title: "About This Designer",
      initial: { x: 420, y: 90, w: 380, h: 320 },
      content: (
        <div className="space-y-3 text-[12px] leading-snug">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bevel-in bg-platinum flex items-center justify-center text-3xl shrink-0">👩‍💻</div>
            <div>
              <div className="text-[16px] font-bold">Amelia Short</div>
              <div className="italic">Product Designer</div>
            </div>
          </div>
          <hr className="border-platinum-dark" />
          <p>
            Designing at the intersection of human experience and AI-native interaction. From launching MongoDB Atlas&apos;s first code playground to leading research on how LLMs are reshaping user expectations, I translate emerging paradigms into elegant, accessible product experiences.
          </p>
          <p className="font-bold">Currently:</p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Product Designer @ MongoDB</li>
            <li>CHI 2025 Best Paper Award 🏆</li>
            <li>Available for chats over coffee ☕</li>
          </ul>
        </div>
      ),
    },
    atlas: {
      id: "atlas",
      title: "Atlas Search Playground",
      initial: { x: 180, y: 140, w: 420, h: 340 },
      content: (
        <div className="space-y-2 text-[12px] leading-snug">
          <div className="bevel-in bg-platinum h-32 flex items-center justify-center text-5xl">🔍</div>
          <div className="font-bold text-[14px]">Designing a frictionless first experience</div>
          <div className="italic">MongoDB · 2024</div>
          <p>Atlas Search&apos;s first interactive playground — a guided sandbox that lets developers go from zero to a working query in under 60 seconds. Shipped end-to-end: research, IA, visual design, prototyping.</p>
          <a href="https://ameliashort.design/atlas-search-playground" target="_blank" rel="noreferrer"
             className="inline-block bevel-button bg-platinum px-3 py-1 mt-1 font-bold hover:bg-platinum-light">
            Open Case Study →
          </a>
        </div>
      ),
    },
    tutorials: {
      id: "tutorials",
      title: "Composable Tutorials",
      initial: { x: 240, y: 180, w: 420, h: 320 },
      content: (
        <div className="space-y-2 text-[12px] leading-snug">
          <div className="bevel-in bg-platinum h-32 flex items-center justify-center text-5xl">📚</div>
          <div className="font-bold text-[14px]">Personalized documentation experiences</div>
          <div className="italic">MongoDB · 2024</div>
          <p>A documentation system where tutorials adapt to the reader&apos;s stack, language, and goal — so the right example is always the first one you see.</p>
          <a href="https://ameliashort.design/composable-tutorials" target="_blank" rel="noreferrer"
             className="inline-block bevel-button bg-platinum px-3 py-1 mt-1 font-bold hover:bg-platinum-light">
            Open Case Study →
          </a>
        </div>
      ),
    },
    research: {
      id: "research",
      title: "Research — CHI 2025 🏆",
      initial: { x: 300, y: 110, w: 420, h: 300 },
      content: (
        <div className="space-y-2 text-[12px] leading-snug">
          <div className="bevel-in bg-platinum h-28 flex items-center justify-center text-5xl">🧠</div>
          <div className="font-bold text-[14px]">Tracking and its potential for older adults with memory concerns</div>
          <div className="italic">Short et al. · CHI 2025 · 🏆 Best Paper Award</div>
          <p>A qualitative study exploring how self-tracking technologies can support — without surveilling — older adults navigating cognitive change.</p>
          <a href="https://dl.acm.org/doi/10.1145/3706598.3714093" target="_blank" rel="noreferrer"
             className="inline-block bevel-button bg-platinum px-3 py-1 mt-1 font-bold hover:bg-platinum-light">
            Read Publication →
          </a>
        </div>
      ),
    },
    contact: {
      id: "contact",
      title: "Get in Touch ✉️",
      initial: { x: 360, y: 220, w: 320, h: 240 },
      content: (
        <div className="space-y-3 text-[12px]">
          <p>Drop a line, send a pigeon, or copy my email below.</p>
          <div className="bevel-in bg-platinum-light px-2 py-1 font-mono">hello@ameliashort.design</div>
          <button onClick={copyEmail} className="bevel-button bg-platinum px-3 py-1 font-bold hover:bg-platinum-light">
            {emailCopied ? "✓ Copied!" : "Copy Email"}
          </button>
          <hr className="border-platinum-dark" />
          <div className="flex gap-2">
            <a href="https://www.linkedin.com/in/amelia-short/" target="_blank" rel="noreferrer"
               className="bevel-button bg-platinum px-3 py-1 font-bold hover:bg-platinum-light">LinkedIn</a>
            <a href="https://docs.google.com/document/d/1Cz_dRMRqZUCzDvFA4jcsodhksW97vlSKt8vFAplIUfs/edit" target="_blank" rel="noreferrer"
               className="bevel-button bg-platinum px-3 py-1 font-bold hover:bg-platinum-light">Résumé</a>
          </div>
        </div>
      ),
    },
    trash: {
      id: "trash",
      title: "Trash",
      initial: { x: 200, y: 240, w: 360, h: 240 },
      content: (
        <div className="space-y-3 text-[12px]">
          {trashFull ? (
            <>
              <p className="font-bold">Trash contains 1 item:</p>
              <ul className="bevel-in bg-platinum-light p-2">
                <li>📄 dribbble_clone_portfolio.psd</li>
              </ul>
              <button onClick={() => setTrashFull(false)} className="bevel-button bg-platinum px-3 py-1 font-bold">
                Empty Trash…
              </button>
            </>
          ) : (
            <>
              <p>The Trash is empty.</p>
              <p className="italic text-muted-foreground">(Generic portfolio templates have been thoroughly disposed of.)</p>
              <button onClick={() => setTrashFull(true)} className="bevel-button bg-platinum px-3 py-1 font-bold">
                Undo Empty Trash
              </button>
            </>
          )}
        </div>
      ),
    },
  };

  const icons: { id: WinId; emoji: string; label: string; top: number }[] = [
    { id: "about", emoji: "📇", label: "About Me", top: 40 },
    { id: "atlas", emoji: "🔍", label: "Atlas Playground", top: 130 },
    { id: "tutorials", emoji: "📚", label: "Composable Docs", top: 220 },
    { id: "research", emoji: "🏆", label: "CHI 2025", top: 310 },
    { id: "contact", emoji: "✉️", label: "Contact", top: 400 },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-desktop">
      <MenuBar onAbout={() => open("about")} />

      {/* Desktop background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "4px 4px",
          marginTop: 22,
        }}
      />

      {/* Desktop icons (right side) */}
      {icons.map((ic) => (
        <DesktopIcon
          key={ic.id}
          emoji={ic.emoji}
          label={ic.label}
          onOpen={() => open(ic.id)}
          style={{ right: 24, top: ic.top + 22 }}
        />
      ))}

      {/* Trash bottom right */}
      <DesktopIcon
        emoji={trashFull ? "🗑️" : "🚮"}
        label="Trash"
        onOpen={() => open("trash")}
        style={{ right: 24, bottom: 24 }}
      />

      {/* Hard drive top right-ish — opens readme */}
      <DesktopIcon
        emoji="💾"
        label="Macintosh HD"
        onOpen={() => open("readme")}
        style={{ left: 24, top: 44 }}
      />

      {/* Windows */}
      {openWins.map((id) => {
        const w = wins[id];
        const z = zOrder.indexOf(id) + 10;
        const active = zOrder[zOrder.length - 1] === id;
        return (
          <MacWindow
            key={id}
            title={w.title}
            initial={w.initial}
            zIndex={z}
            active={active}
            onFocus={() => focus(id)}
            onClose={() => close(id)}
          >
            {w.content}
          </MacWindow>
        );
      })}

      {/* Bottom-left signature */}
      <div className="absolute bottom-2 left-3 text-[10px] text-platinum-light/80 select-none pointer-events-none"
           style={{ textShadow: "1px 1px 0 black" }}>
        amelia short · system 8.0 · since &apos;97 (kinda)
      </div>
    </div>
  );
}
