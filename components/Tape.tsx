"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

export default function Tape({
  href,
  label,
  width,
  side,
  children,
}: {
  href: string;
  label: string;
  width: number;
  side: ReactNode;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pulled, setPulled] = useState(false);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // ctrl/cmd/shift/middle click: let the browser open a new tab as usual
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    // reduced motion: skip the animation, normal navigation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault(); // stop the link from navigating right now
    setPulled(true);
    setTimeout(() => router.push(href), 280); // wait for the animation (ms)
  }

  return (
    <div
      className={pulled ? "tape3d pulled" : "tape3d"}
      style={{ "--w": `${width}px` } as CSSProperties}
    >
      <Link href={href} className="t-front" aria-label={label} onClick={handleClick}>
        {children}
      </Link>
      <span className="t-side">{side}</span>
    </div>
  );
}