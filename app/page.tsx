import Link from "next/link";

import {SITE} from "@/lib/config";

export default function Home() {
  return (
    <main>
      <h1>{SITE.name}</h1>
      <p>This is the homepage of my personal website built with Next.js.</p>
      <Link href="/blog">Blog</Link>
    </main>
  );
}