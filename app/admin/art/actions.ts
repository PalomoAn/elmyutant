"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import sharp from "sharp";
import { imageUrl } from "@/lib/illustrations";

const MAX_EDGE = 2000;
const QUALITY = 82;

const BUCKET = "illustrations";
const TABLE = "illustrations";
const MAX_BYTES = 10 * 1024 * 1024;

export async function uploadIllustration(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const file = formData.get("image") as File;
  const title = String(formData.get("title"));
  const description = String(formData.get("description") || "");
  const tags = String(formData.get("tags") || "")
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  if (!file || file.size === 0) throw new Error("Choose an image.");
  if (!file.type.startsWith("image/")) throw new Error("That file is not an image.");
  if (file.size > MAX_BYTES) throw new Error("Image is over 10 MB.");

  const input = Buffer.from(await file.arrayBuffer());

  const output = await sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
  console.log(`original ${(file.size / 1024).toFixed(0)} KB -> webp ${(output.length / 1024).toFixed(0)} KB`);


  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, output, { contentType: "image/webp" });

  if (uploadError) throw new Error(uploadError.message);

  const { error: insertError } = await supabase.from(TABLE).insert({
    title,
    description,
    image_path: path,
    tags,
  });

  if (insertError) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw new Error(insertError.message);
  }

  revalidatePath("/art");
  redirect("/admin/art");
}

export async function deleteIllustration(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin");

  const id = String(formData.get("id"));

  // 1. find the file path before the row disappears
  const { data: item } = await supabase
    .from(TABLE)
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  // 2. delete the row
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);

  // 3. delete the file
  if (item) {
    await supabase.storage.from(BUCKET).remove([item.image_path]);
  }

  revalidatePath("/art");
  redirect("/admin/art");
}