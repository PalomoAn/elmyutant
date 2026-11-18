import Image from "next/image";
import Window from "@/components/Window";
import { getFilms, stars, type Film } from "@/lib/letterboxd";
import { SITE } from "@/lib/config";
import Tape from "@/components/Tape";
import Link from "next/link";

const WIDTHS = [46, 52, 44, 50, 48, 54, 45, 51];

function tone(rating: number | null) {
  if (rating === null) return "#3a3144";
  if (rating >= 4.5) return "var(--blood)"; // loved it
  if (rating >= 3.5) return "var(--plum)"; // liked it
  return "#3a3144";
}

type SortKey = "recent" | "rating" | "year";
const SORT_KEYS: SortKey[] = ["recent", "rating", "year"];

const SORTERS: Record<SortKey, (a: Film, b: Film) => number> = {
  recent: () => 0, // the feed already comes newest first
  rating: (a, b) => (b.rating ?? -1) - (a.rating ?? -1),
  year: (a, b) => b.year - a.year,
};

export default async function FilmsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const mode: SortKey = SORT_KEYS.includes(sort as SortKey) ? (sort as SortKey) : "recent";

  const films = await getFilms();
  const sorted = [...films].sort(SORTERS[mode]);
  return (
    <Window title="Video Store">

      <p className="shelf-note">
        My latest films, from Letterboxd.{" "}
        <a
          href={`https://letterboxd.com/${SITE.letterboxd}/films/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See all on Letterboxd →
        </a>
      </p>
<nav className="chips">
  {SORT_KEYS.map((key) => (
    <Link
      key={key}
      href={`/films?sort=${key}`} 
      className={key === mode ? "chip on" : "chip"}
    >
      {key}
    </Link>
  ))}
</nav>
      <div className="shelf">
        {sorted.map((film) => (
          <Tape
            key={film.id}
            href={`/films/${film.id}`}
            label={`${film.title}, ${film.year}, ${stars(film.rating)}`}
            width={WIDTHS[film.title.length % WIDTHS.length]}
            side={
              film.poster ? (
                <Image src={film.poster} alt="" fill sizes="130px" />
              ) : null
            }
          >
            <span className="stripe" style={{ background: tone(film.rating) }}>
              {film.rating ?? "–"}
            </span>
            <span className="stitle">
              <span>{film.title}</span>
            </span>
            <span className="syear">{film.year}</span>
          </Tape>
        ))}
      </div>
    </Window>
  );
}