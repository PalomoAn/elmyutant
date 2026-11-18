import { supabase } from "@/lib/supabase";

const BUCKET = "illustrations";
const TABLE = "illustrations";

export type Illustration = {
  id: string;
  title: string;
  description: string;
  image_path: string;
  tags: string[];
  created_at: string;
};

export function imageUrl(path: string) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await supabase.from(TABLE).select("tags");
  if (error) throw new Error(error.message);

  const all = (data ?? []).flatMap((row) => row.tags ?? []);
  return Array.from(new Set(all)).sort();
}

export async function getIllustrations(tag?: string): Promise<Illustration[]> {
  let query = supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (tag) query = query.contains("tags", [tag]);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getIllustration(id: string): Promise<Illustration | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function getNeighbors(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("id")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  const ids = (data ?? []).map((row) => row.id);
  const i = ids.findIndex((x) => x === id);

  return {
    prev: i > 0 ? ids[i - 1] : null,
    next: i !== -1 && i < ids.length - 1 ? ids[i + 1] : null,
  };
}