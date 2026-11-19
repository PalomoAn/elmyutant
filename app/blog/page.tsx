import Link from "next/link";
import Window from "@/components/Window";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await getPosts();

  return (
    <Window title="Diary" width={520} x={100} y={50}>
      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.length > 0 && (
        <div className="explorer">
          <div className="cols">
            <span>Name</span>
            <span className="s">Modified</span>
          </div>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="row">
              <span>{post.slug}.txt</span>
              <span className="s">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </Window>
  );
}