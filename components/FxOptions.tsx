"use client";

import { useEffect, useState } from "react";
import { FX_KEY, type Fx } from "@/lib/fx";

const OPTIONS: { key: keyof Fx; text: string }[] = [
  { key: "scan", text: "Scanlines and screen edge shading" },
  { key: "glow", text: "Text glow" },
  { key: "motion", text: "Animations (candle, marquee, tape lift)" },
];

export default function FxOptions() {
  const [fx, setFx] = useState<Fx | null>(null);

  // read what the <head> script already put on <html>
  useEffect(() => {
    const d = document.documentElement.dataset;
    setFx({ scan: d.scan === "on", glow: d.glow === "on", motion: d.motion === "on" });
  }, []);

  function toggle(key: keyof Fx, value: boolean) {
    if (!fx) return;
    const next = { ...fx, [key]: value };
    setFx(next);
    document.documentElement.dataset[key] = value ? "on" : "off";
    try {
      localStorage.setItem(FX_KEY, JSON.stringify(next));
    } catch {}
  }

  if (!fx) return null;

  return (
    <>
      {OPTIONS.map(({ key, text }) => (
        <label key={key} className="opt">
          <input
            type="checkbox"
            checked={fx[key]}
            onChange={(e) => toggle(key, e.target.checked)}
          />
          <span>{text}</span>
        </label>
      ))}
      <p className="shelf-note">Saved on this device.</p>
    </>
  );
}