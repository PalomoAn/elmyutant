import { redirect } from "next/navigation";
import Link from "next/link";
import Window from "@/components/Window";
import { createClient } from "@/lib/supabase-server";
import { uploadIllustration } from "./actions";
import { deleteIllustration } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminArt() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const { data: items } = await supabase
    .from("illustrations")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  return (
    <Window title="Upload art">
      <form action={uploadIllustration} className="form">
        <label>Image <input name="image" type="file" accept="image/*" required /></label>
        <label>Title <input name="title" required /></label>
        <label>Description <textarea name="description" rows={3} /></label>
        <label>Tags (comma separated) <input name="tags" placeholder="ink, goth, cats" /></label>
        <button type="submit">Upload</button>
      </form>

      <h2>All illustrations</h2>
      <ul className="post-list">
        {(items ?? []).map((item) => (
          <li key={item.id}>
            {item.title}
            <form action={deleteIllustration} className="inline-form">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>

      <p><Link href="/admin/posts">← Back to posts</Link></p>
    </Window>
  );
}