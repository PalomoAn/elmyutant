import Image from "next/image";
import Window from "@/components/Window";
import { getFilms } from "@/lib/letterboxd";

function stars(rating: number | null) {
    if (rating === null) return "unrated";
    const full = Math.floor(rating);
    return "★".repeat(full) + (rating % 1 ? "½" : "");
}
export default async function FilmsPage() {
    const films = await getFilms();

    return (
        <Window title="Films">
            <div className="shelf">
                {films.map((film) => (
                    <figure key={film.id} className="film">
                        <div className="poster">
                            {film.poster && (
                                <Image src={film.poster} alt={film.title} fill sizes="150px" />
                            )}
                        </div>
                        <figcaption>
                            <strong>{film.title}</strong> ({film.year})
                            <br />
                            {stars(film.rating)} {film.liked && "♥"}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </Window>
    );
}