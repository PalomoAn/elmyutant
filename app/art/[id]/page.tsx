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
      <Image
        className="viewer-img"
        src={imageUrl(item.image_path)}
        alt={item.title}
        width={1200}
        height={1200}
        sizes="(max-width: 760px) 100vw, 720px"
      />

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
            <span key={tag} className="tag">{tag}</span>
          ))}
        </p>
      )}
    </Window>
  );
}