import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { getPosts } from "@/lib/posts";
import { getIllustrations } from "@/lib/illustrations";
import { getFilms } from "@/lib/letterboxd";

// served as /sitemap.xml, rebuilt at most once an hour
export const revalidate = 3600;

// one source failing (Supabase down, Letterboxd slow) shouldn't empty the whole sitemap
async function safe<T>(load: () => Promise<T[]>): Promise<T[]> {
  try {
    return await load();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, drawings, films] = await Promise.all([
    safe(getPosts),
    safe(() => getIllustrations()),
    safe(getFilms),
  ]);

  const windows = ["/", "/work", "/blog", "/art", "/films"].map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
  }));

  return [
    ...windows,
    ...posts.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: p.created_at })),
    ...drawings.map((d) => ({ url: `${SITE.url}/art/${d.id}`, lastModified: d.created_at })),
    ...films.map((f) => ({ url: `${SITE.url}/films/${f.id}` })),
  ];
}
