import { notFound, redirect } from "next/navigation";
import Window from "@/components/Window";
import { createClient } from "@/lib/supabase-server";
import { updatePost, deletePost } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return (
    <Window title={`Edit: ${post.title}`} closeHref="/admin/posts">
      <form action={updatePost} className="form">
        <input type="hidden" name="id" value={post.id} />
        <label>Title <input name="title" defaultValue={post.title} required /></label>
        <label>Slug <input name="slug" defaultValue={post.slug} /></label>
        <label>Body <textarea name="body" rows={12} defaultValue={post.body} required /></label>
        <label className="check">
          <input name="published" type="checkbox" defaultChecked={post.published} /> Published
        </label>
        <button type="submit">Save changes</button>
      </form>

      <form action={deletePost} className="form">
        <input type="hidden" name="id" value={post.id} />
        <button type="submit" className="danger">Delete post</button>
      </form>
    </Window>
  );
}