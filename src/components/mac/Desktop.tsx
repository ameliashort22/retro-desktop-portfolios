import { useCallback, useState, type ReactNode } from "react";
import { MenuBar, type Menu } from "@/components/mac/MenuBar";
import { MacWindow } from "@/components/mac/MacWindow";
import { DesktopIcon } from "@/components/mac/DesktopIcon";
import {
  FolderIcon, DocIcon, TrashIcon, AppIcon,
  CalcIcon, NoteIcon, PuzzleIcon, PaintIcon, MailIcon, HappyMacIcon,
} from "@/components/mac/PixelIcons";
import { AtlasCaseStudy, TutorialsCaseStudy } from "@/components/mac/CaseStudies";
import { Calculator } from "@/components/mac/apps/Calculator";
import { NotePad } from "@/components/mac/apps/NotePad";
import { Puzzle } from "@/components/mac/apps/Puzzle";
import { Paint } from "@/components/mac/apps/Paint";
import { ClippyAgent } from "@/components/mac/ClippyAgent";

type WinId =
  | "hd" | "about" | "readme" | "portfolio"
  | "atlas" | "tutorials" | "research"
  | "contact" | "trash"
  | "calc" | "note" | "puzzle" | "paint"
  | "aboutBox" | "alert";

interface WinDef {
  title: string;
  initial: { x: number; y: number; w: number; h: number };
  zoomable?: boolean;
  caseStudy?: boolean; // open zoomed by default
  content: ReactNode;
}

export function Desktop() {
  const [openWins, setOpenWins] = useState<WinId[]>(["readme"]);
  const [zOrder, setZOrder] = useState<WinId[]>(["readme"]);
  const [zoomed, setZoomed] = useState<Record<string, boolean>>({});
  const [trashFull, setTrashFull] = useState(true);
  const [emailCopied, setEmailCopied] = useState(false);
  const [hideIcons, setHideIcons] = useState(false);
  const [alert, setAlert] = useState<{ title: string; body: string } | null>(null);

  const focus = useCallback((id: WinId) => {
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);
  }, []);
  const open = useCallback((id: WinId, opts?: { zoomed?: boolean }) => {
    setOpenWins((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setZOrder((prev) => [...prev.filter((w) => w !== id), id]);
    if (opts?.zoomed) setZoomed((z) => ({ ...z, [id]: true }));
  }, []);
  const close = useCallback((id: WinId) => {
    setOpenWins((prev) => prev.filter((w) => w !== id));
    setZoomed((z) => { const n = { ...z }; delete n[id]; return n; });
  }, []);
  const toggleZoom = (id: WinId) => setZoomed((z) => ({ ...z, [id]: !z[id] }));

  const showAlert = (title: string, body: string) => {
    setAlert({ title, body });
    open("alert");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@ameliashort.design").catch(() => {});
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1800);
  };

  const wins: Record<WinId, WinDef> = {
    readme: {
      title: "Read Me",
      initial: { x: 60, y: 50, w: 360, h: 240 },
      content: (
        <div className="space-y-2 text-[12px]">
          <p><strong>Howdy 🤠</strong></p>
          <p>This here's my portfolio. Double-click any icon on the desktop to open it. Drag windows by their title bar. Click the fruit to learn more about this site.</p>
          <p>Most importantly, have fun!</p>
          <p className="italic text-platinum-dark">— Amelia Short</p>
        </div>
      ),
    },
    hd: {
      title: "amelia HD",
      initial: { x: 80, y: 80, w: 480, h: 300 },
      content: (
        <div>
          <div className="border-b border-black pb-1 mb-2 text-[11px] flex justify-between">
            <span>5 items</span><span>40 MB available</span>
          </div>
          <div className="grid grid-cols-4 gap-3 p-2">
            <FinderItem icon={<FolderIcon size={32} />} label="Portfolio" onOpen={() => open("portfolio")} />
            <FinderItem icon={<DocIcon size={32} />} label="About Me" onOpen={() => open("about")} />
            <FinderItem icon={<DocIcon size={32} />} label="Read Me" onOpen={() => open("readme")} />
            <FinderItem icon={<MailIcon size={32} />} label="Contact" onOpen={() => open("contact")} />
            <FinderItem icon={<FolderIcon size={32} />} label="Apps" onOpen={() => { open("note"); open("puzzle"); open("paint"); }} />
          </div>
        </div>
      ),
    },
    portfolio: {
      title: "Portfolio",
      initial: { x: 140, y: 110, w: 460, h: 280 },
      content: (
        <div>
          <div className="border-b border-black pb-1 mb-2 text-[11px] flex justify-between">
            <span>3 items</span><span>—</span>
          </div>
          <div className="grid grid-cols-3 gap-3 p-2">
            <FinderItem icon={<DocIcon size={32} />} label="Atlas Search Playground" onOpen={() => open("atlas", { zoomed: true })} />
            <FinderItem icon={<DocIcon size={32} />} label="Composable Tutorials" onOpen={() => open("tutorials", { zoomed: true })} />
            <FinderItem icon={<DocIcon size={32} />} label="CHI 2025 Research" onOpen={() => open("research", { zoomed: true })} />
          </div>
        </div>
      ),
    },
    about: {
      title: "About Me",
      initial: { x: 460, y: 80, w: 380, h: 330 },
      content: (
        <div className="space-y-3 text-[12px]">
          <div className="flex items-start gap-3">
            <div className="bevel-in bg-white p-1"><AppIcon size={48} /></div>
            <div>
              <div className="text-[20px] leading-none">Amelia Short</div>
              <div className="italic mt-1">Product Designer</div>
            </div>
          </div>
          <hr className="border-black" />
          <p>
            Designing at the intersection of human experience and AI-native interaction. From launching MongoDB Atlas's first code playground to leading research on how LLMs are reshaping user expectations, I translate emerging paradigms into elegant, accessible product experiences.
          </p>
          <p className="font-bold">tl;dr</p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>Product Designer @ MongoDB</li>
            <li>CHI 2025 Best Paper Award</li>
          </ul>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://docs.google.com/document/d/1gStbf9nPtDNNmcKmM3UYgYc91Mac7uVqeIDiqgt1g_c/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="bevel-button px-3 py-1"
            >
              Résumé
            </a>
          </div>
        </div>
      ),
    },
    atlas: {
      title: "atlas-search-playground.doc",
      initial: { x: 80, y: 60, w: 720, h: 520 },
      zoomable: true, caseStudy: true,
      content: <AtlasCaseStudy />,
    },
    tutorials: {
      title: "composable-tutorials.doc",
      initial: { x: 100, y: 70, w: 720, h: 520 },
      zoomable: true, caseStudy: true,
      content: <TutorialsCaseStudy />,
    },
    research: {
      title: "chi-2025-research.doc",
      initial: { x: 120, y: 80, w: 640, h: 460 },
      zoomable: true, caseStudy: true,
      content: (
        <article>
          <h1 className="text-[32px] leading-tight mb-1">Tracking and its potential for older adults with memory concerns</h1>
          <p className="italic text-platinum-dark mb-4">Short et al. · CHI 2025 · 🏆 Best Paper Award</p>

          <div className="bevel-in bg-white p-6 my-4 text-center">
            <div className="text-[14px] uppercase tracking-widest">Best Paper Award</div>
            <div className="text-[28px] mt-2">CHI 2025</div>
            <div className="text-[12px] mt-2 italic">Top 1% of accepted papers · ACM SIGCHI</div>
          </div>

          <h2 className="text-[18px] mb-2 pb-1 border-b-2 border-black">Abstract</h2>
          <p className="text-[13px] leading-relaxed">
          Much research on older people with memory concerns is focused on tracking and informed by the priorities of others. In this paper, we seek to understand the potential that people with memory concerns see in tracking. We conducted interviews with 29 participants with concerns about their memory and engaged in an affective writing approach. We find a range of potentials that can be traced to how participants are already self-tracking. Emotions associated with these potentials vary: from acceptance to resistance, and positive anticipation to aversion. Participants are emotionally motivated to foreclose possibilities in some instances and keep them open in others. While individual and unique, potential is structured by forces that include individual routines, relationships with others, and macro-level institutions and cultural contexts. We reflect on these findings in the context of research on self-tracking with older adults, designing with ambiguity, and forces that structure the experience of living with memory concerns.          </p>

          <h2 className="text-[18px] mt-6 mb-2 pb-1 border-b-2 border-black">Why this matters</h2>
          <p className="text-[13px] leading-relaxed">
          Most technology for people with memory concerns is designed for caregivers and doctors, leaving the person with memory loss in a passive role. This paper interviewed 29 older adults and found they're already actively self-tracking in meaningful ways — counting birds, following the news, setting alarms to stay accountable to others. Crucially, people don't always want ambiguity resolved: sometimes avoiding a definitive answer (like a dementia label or a number on a scale) is emotionally necessary, not a design flaw. The takeaway for designers is that building for this population without involving them produces tools that miss the point entirely, or cause harm.          </p>

          <div className="mt-8">
            <a href="https://dl.acm.org/doi/10.1145/3706598.3714093" target="_blank" rel="noreferrer"
               className="bevel-button px-3 py-1 text-[13px]">Read the publication →</a>
          </div>
        </article>
      ),
    },
    contact: {
      title: "Contact",
      initial: { x: 380, y: 240, w: 320, h: 200 },
      content: (
        <div className="space-y-3 text-[12px]">
          <p>Drop a line, send a pigeon, or copy my email below.</p>
          <div className="bevel-in bg-white px-2 py-1">ameliashort331@yahoo.com</div>
          <button onClick={copyEmail} className="bevel-button px-3 py-1">
            {emailCopied ? "Copied!" : "Copy Email"}
          </button>
          <hr className="border-black" />
          <div className="flex flex-wrap gap-2">
            <a href="https://www.linkedin.com/in/amelia-short/" target="_blank" rel="noreferrer" className="bevel-button px-3 py-1">LinkedIn</a>
          </div>
        </div>
      ),
    },
    trash: {
      title: "Trash",
      initial: { x: 220, y: 220, w: 360, h: 220 },
      content: (
        <div>
          <div className="border-b border-black pb-1 mb-2 text-[11px] flex justify-between">
            <span>{trashFull ? "2 items" : "Empty"}</span><span>—</span>
          </div>
          {trashFull ? (
            <>
              <div className="grid grid-cols-4 gap-x-36 gap-y-3 p-2">
                <FinderItem icon={<DocIcon size={32} />} label={"alarm_that_\nsnoozes_itself.fig"} onOpen={() => showAlert("Cannot open file", "“alarm_that_snoozes_itself.fig” is in the Trash.\nFor obvious reasons.")} />
                <FinderItem icon={<DocIcon size={32} />} label={"ai_therapist_\nthat_takes_sides.doc"} onOpen={() => showAlert("Cannot open file", "“ai_therapist_that_takes_sides.doc” is in the Trash.\nWhere it belongs.")} />
              </div>
              
              <div className="mt-3 px-2">
                <button onClick={() => setTrashFull(false)} className="bevel-button px-3 py-1">Empty Trash…</button>
              </div>
            </>
          ) : (
            <p className="p-2 italic">The Trash is empty. (All bad ideas have been thoroughly disposed of.)</p>
          )}
        </div>
      ),
    },
    calc: {
      title: "Calculator",
      initial: { x: 540, y: 320, w: 200, h: 260 },
      content: <Calculator />,
    },
    note: {
      title: "Note Pad",
      initial: { x: 220, y: 300, w: 320, h: 320 },
      content: <NotePad />,
    },
    puzzle: {
      title: "Puzzle",
      initial: { x: 600, y: 80, w: 240, h: 280 },
      content: <Puzzle />,
    },
    paint: {
      title: "Doodle It",
      initial: { x: 400, y: 100, w: 480, h: 380 },
      content: <Paint />,
    },
    aboutBox: {
      title: "About This Site",
      initial: { x: 0, y: 0, w: 420, h: 240 },
      content: (
        <div className="text-[12px]">
          <div className="flex items-start gap-3">
            <div className="bevel-in bg-white p-1"><HappyMacIcon size={48} /></div>
            <div>
              <div className="text-[16px]">Product Designer Portfolio</div>
              <div className="italic">© Amelia Short, {new Date().getFullYear()}</div>
              <div className="mt-1">Built-in memory: 8,192K</div>
              <div>Largest unused block: just enough for one really good idea.</div>
            </div>
          </div>
          <hr className="my-3 border-black" />
          <div className="bevel-in bg-white p-2">
            <div>Finder ········· 1.0</div>
            <div>Portfolio ······ ∞</div>
            <div>Sense of whimsy · 100%</div>
          </div>
        </div>
      ),
    },
    alert: {
      title: " ",
      initial: { x: 0, y: 0, w: 360, h: 160 },
      content: (
        <div className="flex gap-3 items-start text-[12px]">
          <div className="bevel-in bg-white p-1 shrink-0"><AppIcon size={32} /></div>
          <div className="flex-1">
            <div className="font-bold mb-1">{alert?.title}</div>
            <pre className="whitespace-pre-wrap">{alert?.body}</pre>
            <div className="mt-3 text-right">
              <button onClick={() => close("alert")} className="bevel-button px-4 py-1" style={{ boxShadow: "inset 1px 1px 0 white, inset -1px -1px 0 var(--platinum-dark), 0 0 0 2px black" }}>OK</button>
            </div>
          </div>
        </div>
      ),
    },
  };

  // Center special windows
  const centered: Partial<Record<WinId, boolean>> = { aboutBox: true, alert: true };

  // Build menus
  const activeId = zOrder[zOrder.length - 1];
  const isCaseStudyActive = activeId === "atlas" || activeId === "tutorials" || activeId === "research";
  const menus: Menu[] = [
    {
      label: "", isApple: true,
      items: [
        { label: "About This Site...", onClick: () => open("aboutBox") },
        { label: "", divider: true },
        { label: "Note Pad", onClick: () => open("note") },
        { label: "Puzzle", onClick: () => open("puzzle") },
        { label: "Doodle It", onClick: () => open("paint") },
        { label: "", divider: true },
        { label: "Chooser", disabled: true },
        { label: "Control Panels", disabled: true },
      ],
    },
    {
      label: "File",
      items: [
        { label: "New Folder", shortcut: "⌘N", onClick: () => showAlert("Sorry!", "Disk is full of personality already.") },
        { label: "Open", shortcut: "⌘O", onClick: () => open("hd") },
        { label: "Print Window…", shortcut: "⌘P", onClick: () => window.print() },
        { label: "Close Window", shortcut: "⌘W", onClick: () => activeId && close(activeId) },
        { label: "", divider: true },
        { label: "Get Info", shortcut: "⌘I", onClick: () => open("aboutBox") },
        { label: "Sharing…", disabled: true },
        { label: "Duplicate", disabled: true, shortcut: "⌘D" },
        { label: "Make Alias", disabled: true, shortcut: "⌘M" },
        { label: "Put Away", disabled: true, shortcut: "⌘Y" },
        { label: "", divider: true },
        { label: "Find…", shortcut: "⌘F", onClick: () => showAlert("Find", "Try double-clicking a folder. They're right there.") },
        { label: "Find Again", shortcut: "⌘G", disabled: true },
        { label: "", divider: true },
        { label: "Page Setup…", disabled: true },
        { label: "Print Desktop…", onClick: () => window.print() },
      ],
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", shortcut: "⌘Z", disabled: true },
        { label: "", divider: true },
        { label: "Cut", shortcut: "⌘X", disabled: true },
        { label: "Copy", shortcut: "⌘C", onClick: () => document.execCommand?.("copy") },
        { label: "Paste", shortcut: "⌘V", disabled: true },
        { label: "Clear", disabled: true },
        { label: "Select All", shortcut: "⌘A", disabled: true },
        { label: "", divider: true },
        { label: "Show Clipboard", disabled: true },
        { label: "Preferences…", disabled: true },
      ],
    },
    {
      label: "View",
      items: [
        { label: "by Icon", checked: true },
        { label: "by Name" },
        { label: "by Date" },
        { label: "by Size" },
        { label: "", divider: true },
        { label: "Clean Up Desktop", onClick: () => showAlert("Clean Up", "The desktop has been cleaned up.\n(It was already pretty tidy.)") },
        { label: hideIcons ? "Show Icons" : "Hide Icons", onClick: () => setHideIcons((v) => !v) },
        { label: "", divider: true },
        { label: "Zoom Window", disabled: !isCaseStudyActive, shortcut: "⌘Z", onClick: () => activeId && toggleZoom(activeId) },
      ],
    },
    {
      label: "Special",
      items: [
        { label: "Clean Up Window", onClick: () => showAlert("Clean Up", "Looks fine to me.") },
        { label: "Empty Trash…", disabled: !trashFull, onClick: () => { setTrashFull(false); showAlert("Empty Trash", "The Trash has been emptied. (Forever.)"); } },
        { label: "", divider: true },
        { label: "Eject Disk", shortcut: "⌘E", onClick: () => showAlert("Eject", "There is no disk in the drive.") },
        { label: "Erase Disk…", disabled: true },
        { label: "", divider: true },
        { label: "Restart", onClick: () => location.reload() },
        { label: "Shut Down", onClick: () => showAlert("Shut Down", "It is now safe to turn off your computer.\n\n(But maybe stick around — there's more to see.)") },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "About Balloon Help…", onClick: () => showAlert("Balloon Help", "Hover lovingly. Click curiously. Drag windows by their title bars. Double-click icons. The 1990s are very forgiving.") },
        { label: "Show Balloons", disabled: true },
        { label: "", divider: true },
        { label: "Guide", onClick: () => open("readme") },
        { label: "Shortcuts", onClick: () => showAlert("Shortcuts", "⌘O — Open\n⌘W — Close\n⌘P — Print\n⌘F — Find\nDouble-click a title bar — Zoom\nDouble-click a folder — Open\n\nGo on, try one.") },
      ],
    },
  ];

  const desktopIcons: { id: WinId; icon: ReactNode; label: string; pos: React.CSSProperties }[] = [
    { id: "readme", icon: <DocIcon size={32} />, label: "Read Me", pos: { right: 20, top: 32 } },
    { id: "portfolio", icon: <FolderIcon size={32} />, label: "Portfolio", pos: { right: 20, top: 110 } },
    { id: "about", icon: <DocIcon size={32} />, label: "About Me", pos: { right: 20, top: 188 } },
    { id: "contact", icon: <MailIcon size={32} />, label: "Contact", pos: { right: 20, top: 266 } },
    { id: "note", icon: <NoteIcon size={32} />, label: "Note Pad", pos: { right: 20, top: 344 } },
    { id: "puzzle", icon: <PuzzleIcon size={32} />, label: "Puzzle", pos: { right: 20, top: 422 } },
    { id: "paint", icon: <PaintIcon size={32} />, label: "Doodle It", pos: { right: 20, top: 500 } },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "var(--desktop)" }}>
      <MenuBar menus={menus} />
      <ClippyAgent />

      {/* Desktop dotted/stippled pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          marginTop: 20,
          backgroundImage: "radial-gradient(circle, black 0.5px, transparent 0.6px)",
          backgroundSize: "2px 2px",
          opacity: 0.35,
        }}
      />

      {!hideIcons && desktopIcons.map((ic) => (
        <DesktopIcon
          key={ic.id}
          icon={ic.icon}
          label={ic.label}
          onOpen={() => open(ic.id)}
          style={ic.pos}
        />
      ))}
      {!hideIcons && (
        <DesktopIcon
          icon={<TrashIcon size={32} full={trashFull} />}
          label="Trash"
          onOpen={() => open("trash")}
          style={{ right: 20, bottom: 16 }}
        />
      )}

      {/* Windows */}
      {openWins.map((id) => {
        const w = wins[id];
        const z = zOrder.indexOf(id) + 10;
        const active = zOrder[zOrder.length - 1] === id;
        const isZoomed = !!zoomed[id];

        // Center the small "centered" windows on first render
        const initial = centered[id]
          ? {
              ...w.initial,
              x: Math.max(20, Math.floor(window.innerWidth / 2 - w.initial.w / 2)),
              y: Math.max(60, Math.floor(window.innerHeight / 3 - w.initial.h / 2)),
            }
          : w.initial;

        return (
          <MacWindow
            key={id}
            title={w.title}
            initial={initial}
            zIndex={z}
            active={active}
            zoomed={isZoomed}
            onZoomToggle={w.zoomable ? () => toggleZoom(id) : undefined}
            onFocus={() => focus(id)}
            onClose={() => close(id)}
          >
            {w.content}
          </MacWindow>
        );
      })}
    </div>
  );
}

/** Finder list item (icon + label, double-click to open). */
function FinderItem({ icon, label, onOpen }: { icon: ReactNode; label: string; onOpen: () => void }) {
  const [sel, setSel] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); setSel(true); }}
      onDoubleClick={() => { setSel(false); onOpen(); }}
      onBlur={() => setSel(false)}
      className="flex flex-col items-center gap-1 focus:outline-none w-20"
    >
      <div className="w-8 h-8 flex items-center justify-center" style={{ filter: sel ? "invert(1)" : undefined }}>
        {icon}
      </div>
      <div
        className="text-[12px] leading-tight px-1 text-center whitespace-pre-line"
        style={{
          color: sel ? "white" : "black",
          background: sel ? "black" : "transparent",
        }}
      >
        {label}
      </div>
    </button>
  );
}
