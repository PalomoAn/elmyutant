import Link from "next/link";

export default function Blog() {
  return (
    <main>
      <h1>Blog Page</h1>
      <p>This is the blog page of my personal website built with Next.js.</p>
      <Link href="/">Go back to Home</Link>
    </main>
  );
}