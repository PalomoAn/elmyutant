"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";

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

  const style = {
    ...(width !== undefined && { "--w": `${width}px` }),
    ...(x !== undefined && { "--x": `${x}px` }),
    ...(y !== undefined && { "--y": `${y}px` }),
  } as CSSProperties;

  return (
    <section className="mw" data-id={id} style={style}>
      <div className="mw-bar">
        <button aria-label="Close" onClick={() => router.push(closeHref)}>
          x
        </button>
        <span className="mw-title">{title}</span>
      </div>
      <div className="mw-body">{children}</div>
    </section>
  );
}