import Image from "next/image";
import Link from "next/link";
import Window from "@/components/Window";
import { getIllustrations, imageUrl } from "@/lib/illustrations";

export const dynamic = "force-dynamic";

export default async function ArtPage() {
  const items = await getIllustrations();

  return (
    <Window title="Drawings">
      {items.length === 0 && <p>No drawings yet.</p>}
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