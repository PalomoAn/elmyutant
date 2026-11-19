"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  closeHref?: string;
  id?: string;
  width?: number;
  x?: number;
  y?: number;
};

export default function Window({
  title,
  children,
  closeHref = "/desktop",
  id,
  width,
  x,
  y,
}: Props) {
  const router = useRouter();
  const [pos, setPos] = useState({ dx: 0, dy: 0 });
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  const startX = x ?? 40;
  const startY = y ?? 24;

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return; // don't drag from the close button
    if (window.innerWidth < 760) return; // phone: windows stay put
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.dx, oy: pos.dy };
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    setPos({
      dx: Math.max(-startX, d.ox + e.clientX - d.sx), // keep the left edge on screen
      dy: Math.max(-startY, d.oy + e.clientY - d.sy), // keep the title bar under the menu bar
    });
  }

  function onPointerUp() {
    drag.current = null;
  }

  const style = {
    ...(width !== undefined && { "--w": `${width}px` }),
    ...(x !== undefined && { "--x": `${x}px` }),
    ...(y !== undefined && { "--y": `${y}px` }),
    translate: `${pos.dx}px ${pos.dy}px`,
  } as CSSProperties;

  return (
    <section className="mw" data-id={id} style={style}>
      <div
        className="mw-bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button aria-label="Close" onClick={() => router.push(closeHref)}>
          x
        </button>
        <span className="mw-title">{title}</span>
      </div>
      <div className="mw-body">{children}</div>
    </section>
  );
}