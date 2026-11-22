import { cache } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Window from "@/components/Window";
import WindowStack from "@/components/WindowStack";
import { getIllustration, getNeighbors, imageUrl } from "@/lib/illustrations";
import { SITE } from "@/lib/config";
import { closeFocusedHref, go, readDesk, type SearchParams } from "@/lib/windows";

export const dynamic = "force-dynamic";

// metadata and page ask for the same drawing: one database call
const getItem = cache(getIllustration);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description || `A drawing by ${SITE.name}: ${item.title}.`,
    alternates: { canonical: `/art/${id}` },
  };
}

export default async function ArtViewer({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const desk = readDesk(`/art/${id}`, await searchParams);
  const item = await getItem(id);

  if (!item) notFound();

  const { prev, next } = await getNeighbors(id);

  return (
    <WindowStack desk={desk}>
      <Window id="art-view" title={item.title} closeHref={closeFocusedHref(desk)}>
        <div className="viewer-frame">
          <Image
            className="viewer-img"
            src={imageUrl(item.image_path)}
            alt={item.title}
            fill
            sizes="(max-width: 760px) 100vw, 720px"
          />
        </div>

        <nav className="viewer-nav">
          {prev ? (
            <Link href={go(desk, `/art/${prev}`)}>← Newer</Link>
          ) : (
            <span className="off">← Newer</span>
          )}
          <Link href={go(desk, "/art", { tag: null })}>All</Link>
          {next ? (
            <Link href={go(desk, `/art/${next}`)}>Older →</Link>
          ) : (
            <span className="off">Older →</span>
          )}
        </nav>

        {item.description && <p>{item.description}</p>}

        <p className="post-date">
          {new Date(item.created_at).toLocaleDateString()}
        </p>

        {item.tags.length > 0 && (
          <p className="tags">
            {item.tags.map((tag) => (
              <Link key={tag} href={go(desk, "/art", { tag })} className="chip">
                {tag}
              </Link>
            ))}
          </p>
        )}
      </Window>
    </WindowStack>
  );
}
