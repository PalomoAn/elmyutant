import Image from "next/image";
import Window from "@/components/Window";
import { getFilms, stars } from "@/lib/letterboxd";
import { SITE } from "@/lib/config";
import Tape from "@/components/Tape";

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

      <div className="shelf">
        {films.map((film) => (
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