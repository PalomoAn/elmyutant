import Image from "next/image";
import Link from "next/link";
import Window from "@/components/Window";
import { getFilms, stars } from "@/lib/letterboxd";

const WIDTHS = [46, 52, 44, 50, 48, 54, 45, 51];

function tone(rating: number | null) {
  if (rating === null) return "#3a3144";
  if (rating >= 4.5) return "var(--blood)"; // loved it
  if (rating >= 3.5) return "var(--plum)"; // liked it
  return "#3a3144";
}

export default async function FilmsPage() {
  const films = await getFilms();

  return (
    <Window title="Video Store">
      <div className="shelf">
        {films.map((film) => (
          <div
            key={film.id}
            className="tape3d"
            style={
              { "--w": `${WIDTHS[film.title.length % WIDTHS.length]}px` } as React.CSSProperties
            }
          >
            <Link
              href={`/films/${film.id}`}
              className="t-front"
              aria-label={`${film.title}, ${film.year}, ${stars(film.rating)}`}
            >
              <span className="stripe" style={{ background: tone(film.rating) }}>
                {film.rating ?? "–"}
              </span>
              <span className="stitle">
                <span>{film.title}</span>
              </span>
              <span className="syear">{film.year}</span>
            </Link>
            <span className="t-side">
              {film.poster && (
                <Image src={film.poster} alt="" fill sizes="130px" />
              )}
            </span>
          </div>
        ))}
      </div>
    </Window>
  );
}