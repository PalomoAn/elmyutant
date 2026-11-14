import Link from "next/link";

import {SITE} from "@/lib/config";
import DesktopIcons from "@/components/DesktopIcons";

export default function Home() {
  return (
    <main>
      <h1>{SITE.name}</h1>
      <DesktopIcons />
      <p>This is the homepage of my personal website built with Next.js.</p>
      <Link href="/blog">Blog</Link>
    </main>
  );
} 