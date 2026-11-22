import Link from "next/link";
import Marquee from "@/components/Marquee";
import { CandleIcon } from "@/components/icons";
import { SITE } from "@/lib/config";
import { go, type Desk } from "@/lib/windows";

const SKILLS = ["React", "Python", "Supabase", "Node.js", "Express", "ESP32", "SSE", "GraphQL", "Jupyter", "SHAP"];

export default function WelcomeContent({ desk }: { desk: Desk }) {
  return (
    <div className="welcome">
      <div className="logo">
        <CandleIcon />
        <span className="logotype">{SITE.name}</span>
        <CandleIcon />
      </div>
      <h1>{SITE.tagline}</h1>
      <p>
        hi, i&apos;m Jose. i draw, i watch too many films, and i write when the
        mood hits. by day i&apos;m a freelance developer: full-stack, IoT and data.
      </p>
      <p>
        <span className="led" aria-hidden="true" />
        available for new projects
      </p>
      <div className="pills">
        <Link className="pill" href={go(desk, "/work")}>View my work</Link>
      </div>
      <Marquee items={SKILLS} />
    </div>
  );
}
