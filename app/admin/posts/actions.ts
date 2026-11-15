"use server";

import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";
import { createClient } from "@/lib/supabase-server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createPost(formData: FormData) {
    
    const supabase = await createClient();

    const {data:{user}}= await supabase.auth.getUser();
    if(!user) redirect("/admin");

    const title = String(formData.get("title"));
    const slugInput = String(formData.get("slug") || "");
    const body = String(formData.get("body"));
    const published = Boolean(formData.get("published"));
    
    const {error} = await supabase.from("posts").insert({
        title,
        slug: slugify(slugInput || title),
        body,
        published,
    });
    
    if (error) throw new Error(error.message);
    revalidatePath("/blog");
    redirect("/admin/posts");
}

export async function updatePost(formData: FormData) {
    
    const supabase = await createClient();

    const {data:{user}}= await supabase.auth.getUser(); 
    if(!user) redirect("/admin");

    const id = String(formData.get("id"));
    const title = String(formData.get("title"));
    const slugInput = String(formData.get("slug") || "");
    const body = String(formData.get("body"));
    const published = Boolean(formData.get("published"));

    const {error} = await supabase.from("posts").update({
        title,
        slug: slugify(slugInput || title),
        body,
        published,
    }).eq("id", id);

    if (error) throw new Error(error.message);
    
    revalidatePath("/blog");
    redirect("/admin/posts");
}   

export async function deletePost(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const id = String(formData.get("id"));

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/blog");
  redirect("/admin/posts");
}