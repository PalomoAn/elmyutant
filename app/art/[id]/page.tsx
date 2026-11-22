import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Window from "@/components/Window";
import WindowStack from "@/components/WindowStack";
import { getIllustration, getNeighbors, imageUrl } from "@/lib/illustrations";
import { closeFocusedHref, go, readDesk, type SearchParams } from "@/lib/windows";

export const dynamic = "force-dynamic";

export default async function ArtViewer({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const desk = readDesk(`/art/${id}`, await searchParams);
  const item = await getIllustration(id);

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
