import Image from "next/image";
import Link from "next/link";
import { getAllTags, getIllustrations, imageUrl } from "@/lib/illustrations";
import { go, type Desk } from "@/lib/windows";

export default async function ArtContent({ desk }: { desk: Desk }) {
  const { tag } = desk;
  const [items, tags] = await Promise.all([getIllustrations(tag), getAllTags()]);

  return (
    <>
      <nav className="chips">
        <Link href={go(desk, "/art", { tag: null })} className={!tag ? "chip on" : "chip"}>all</Link>
        {tags.map((t) => (
          <Link
            key={t}
            href={go(desk, "/art", { tag: t })}
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
            <Link href={go(desk, `/art/${item.id}`)} className="tile">
              <Image
                src={imageUrl(item.image_path)}
                alt={item.title}
                width={0}
                height={0}
                sizes="(max-width: 720px) 50vw, 240px"
              />
              <span className="tile-title">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
