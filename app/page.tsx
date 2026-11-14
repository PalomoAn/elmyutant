import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>elMyutant </h1>
      <p>This is the homepage of my personal website built with Next.js.</p>
      <Link href="/blog">Blog</Link>
    </main>
  );
}