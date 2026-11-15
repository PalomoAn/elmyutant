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

export async function getIllustrations(): Promise<Illustration[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}