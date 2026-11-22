import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { go, type Desk } from "@/lib/windows";

export default async function DiaryContent({ desk }: { desk: Desk }) {
  const posts = await getPosts();

  return (
    <>
      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.length > 0 && (
        <div className="explorer">
          <div className="cols">
            <span>Name</span>
            <span className="s">Modified</span>
          </div>
          {posts.map((post) => (
            <Link key={post.id} href={go(desk, `/blog/${post.slug}`)} className="row">
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
    </>
  );
}
