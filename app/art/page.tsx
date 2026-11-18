import Image from "next/image";
import Link from "next/link";
import Window from "@/components/Window";
import { getAllTags, getIllustrations, imageUrl } from "@/lib/illustrations";

export const dynamic = "force-dynamic";

export default async function ArtPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [items, tags] = await Promise.all([getIllustrations(tag), getAllTags()]);

  return (
    <Window title="Drawings">
      <nav className="chips">
        <Link href="/art" className={!tag ? "chip on" : "chip"}>all</Link>
        {tags.map((t) => (
          <Link
            key={t}
            href={`/art?tag=${encodeURIComponent(t)}`}
            className={t === tag ? "chip on" : "chip"}
          >
            {t}
          </Link>
        ))}
      </nav>

      {items.length === 0 && <p>No drawings here yet.</p>}

      <ul className="gallery">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/art/${item.id}`} className="tile">
              <Image
                src={imageUrl(item.image_path)}
                alt={item.title}
                width={240}
                height={240}
                sizes="(max-width: 600px) 45vw, 240px"
              />
              <span className="tile-title">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Window>
  );
}