import {supabase} from "@/lib/supabase";
import { error } from "console";

export type Post = {
  id: number;
  slug: string;
  title: string;
  body: string;
  published: boolean;
  created_at: string;
};

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}