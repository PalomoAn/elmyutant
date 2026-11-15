import { redirect } from "next/navigation";
import Window from "@/components/Window";
import { createClient } from "@/lib/supabase-server";
import { createPost } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPosts() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, published, created_at")
    .order("created_at", { ascending: false });

  return (
    <Window title="Write">
      <form action={createPost} className="form">
        <label>Title <input name="title" required /></label>
        <label>Slug (optional) <input name="slug" /></label>
        <label>Body <textarea name="body" rows={10} required /></label>
        <label className="check">
          <input name="published" type="checkbox" /> Publish now
        </label>
        <button type="submit">Save post</button>
      </form>

      <h2>All posts</h2>
      <ul className="post-list">
        {(posts ?? []).map((post) => (
          <li key={post.id}>
            <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>{" "}
             {!post.published && <em>(draft)</em>}
          </li>
        ))}
      </ul>
    </Window>
  );
}