"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent, PointerEvent, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  closeHref?: string;
  id?: string;
  width?: number;
  x?: number;
  y?: number;
  // set on a window that sits behind the focused one: clicking it goes here
  focusHref?: string;
};

// drag offsets survive the remount that every focus change causes
const POS_KEY = "mw-pos:";

// every navigation remounts the windows; remember when each id left the screen
const lastSeen = new Map<string, number>();
const STILL_MS = 1500;

export default function Window({
  title,
  children,
  closeHref = "/desktop",
  id,
  width,
  x,
  y,
  focusHref,
}: Props) {
  const router = useRouter();
  const [pos, setPos] = useState({ dx: 0, dy: 0 });
  const latest = useRef(pos);
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);

  const startX = x ?? 40;
  const startY = y ?? 24;

  const [still, setStill] = useState(false);
  const decided = useRef(false); // Strict Mode runs this effect twice; decide once

  useLayoutEffect(() => {
    if (!id) return;
    // the same window was on screen a moment ago (next drawing, new filter,
    // brought to front): it isn't opening, so no pop. Runs before paint.
    if (!decided.current) {
      decided.current = true;
      if (Date.now() - (lastSeen.get(id) ?? 0) < STILL_MS) setStill(true);
    }
    try {
      const saved = JSON.parse(sessionStorage.getItem(POS_KEY + id) ?? "null");
      if (saved && typeof saved.dx === "number" && typeof saved.dy === "number") {
        latest.current = saved;
        setPos(saved);
      }
    } catch {}
    return () => {
      lastSeen.set(id, Date.now());
    };
  }, [id]);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return; // don't drag from the close button
    if (window.innerWidth < 760) return; // phone: windows stay put
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.dx, oy: pos.dy, moved: false };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    d.moved = true;
    const next = {
      dx: Math.max(-startX, d.ox + e.clientX - d.sx), // keep the left edge on screen
      dy: Math.max(-startY, d.oy + e.clientY - d.sy), // keep the title bar under the menu bar
    };
    latest.current = next;
    setPos(next);
  }

  function onPointerUp() {
    if (drag.current?.moved) {
      if (id) {
        try {
          sessionStorage.setItem(POS_KEY + id, JSON.stringify(latest.current));
        } catch {}
      }
    }
    drag.current = null;
  }

  function onClick(e: MouseEvent<HTMLElement>) {
    if (!focusHref) return;
    // links, buttons and form fields do their own thing
    if ((e.target as HTMLElement).closest("a, button, input, label, select, textarea")) return;
    router.push(focusHref, { scroll: false });
  }

  const style = {
    ...(width !== undefined && { "--w": `${width}px` }),
    ...(x !== undefined && { "--x": `${x}px` }),
    ...(y !== undefined && { "--y": `${y}px` }),
    translate: `${pos.dx}px ${pos.dy}px`,
  } as CSSProperties;

  return (
    <section
      className="mw"
      data-id={id}
      data-behind={focusHref ? "" : undefined}
      data-still={still ? "" : undefined}
      style={style}
      onClick={onClick}
    >
      <div
        className="mw-bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button aria-label="Close" onClick={() => router.push(closeHref, { scroll: false })}>
          x
        </button>
        <span className="mw-title">{title}</span>
      </div>
      <div className="mw-body">{children}</div>
    </section>
  );
}
