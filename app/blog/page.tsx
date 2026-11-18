import Link from "next/link";
import Window from "@/components/Window";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await getPosts();

  return (
    <Window title="Diary">

      <h1>Blog Page</h1>
      {posts.length === 0 && <p> no posts yet</p>}
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Window>
  );
}