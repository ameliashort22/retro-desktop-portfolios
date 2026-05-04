import { useEffect, useRef, useState } from "react";
import { AppleIcon } from "./PixelIcons";

export interface MenuItem {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
  checked?: boolean;
}
export interface Menu {
  label: string;
  items: MenuItem[];
  isApple?: boolean;
}

interface MenuBarProps {
  menus: Menu[];
}

export function MenuBar({ menus }: MenuBarProps) {
  const [open, setOpen] = useState<number | null>(null);
  const [time, setTime] = useState("");
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-[20px] bg-white flex items-center text-[12px] z-[9999] select-none"
      style={{ borderBottom: "1px solid black", boxShadow: "0 1px 0 0 black" }}
    >
      {menus.map((menu, idx) => {
        const isOpen = open === idx;
        return (
          <div key={menu.label} className="relative h-full">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                setOpen(isOpen ? null : idx);
              }}
              onMouseEnter={() => { if (open !== null) setOpen(idx); }}
              className={`h-full px-3 flex items-center leading-none ${
                isOpen ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
            >
              {menu.isApple ? <AppleIcon size={14} /> : menu.label}
            </button>
            {isOpen && (
              <div
                className="absolute left-0 top-full bg-white border border-black pixel-shadow min-w-[180px] py-1"
                style={{ marginTop: -1 }}
              >
                {menu.items.map((item, i) =>
                  item.divider ? (
                    <div key={i} className="my-1 border-t border-platinum-dark mx-2" />
                  ) : (
                    <button
                      key={i}
                      disabled={item.disabled}
                      onClick={() => {
                        if (item.disabled) return;
                        item.onClick?.();
                        setOpen(null);
                      }}
                      className={`w-full text-left px-4 py-[2px] flex items-center justify-between gap-6 leading-tight ${
                        item.disabled
                          ? "text-platinum-dark"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      <span>
                        {item.checked ? "✓ " : "  "}
                        {item.label}
                      </span>
                      {item.shortcut && (
                        <span className="text-[11px] tracking-wider">{item.shortcut}</span>
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
      <div className="ml-auto px-3">{time}</div>
    </div>
  );
}
