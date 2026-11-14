import Link from "next/link";
import Window from "@/components/Window";

export default function Blog() {
  return (
    <Window title="Diary">
      <h1>Blog Page</h1>
      <p>This is the blog page of my personal website built with Next.js.</p>
      <Link href="/">Go back to Home</Link>
    </Window>
  );
}