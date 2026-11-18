import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Window from "@/components/Window";
import { getIllustration, getNeighbors, imageUrl } from "@/lib/illustrations";

export const dynamic = "force-dynamic";

export default async function ArtViewer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getIllustration(id);

  if (!item) notFound();

  const { prev, next } = await getNeighbors(id);

  return (
    <Window title={item.title} closeHref="/art">
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
          <Link href={`/art/${prev}`}>← Newer</Link>
        ) : (
          <span className="off">← Newer</span>
        )}
        <Link href="/art">All</Link>
        {next ? (
          <Link href={`/art/${next}`}>Older →</Link>
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
            <Link
              key={tag}
              href={`/art?tag=${encodeURIComponent(tag)}`}
              className="chip"
            >
              {tag}
            </Link>
          ))}
        </p>
      )}
    </Window>
  );
}