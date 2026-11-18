import Image from "next/image";
import Window from "@/components/Window";
import { getFilms } from "@/lib/letterboxd";
import Link from "next/link";
import { stars } from "@/lib/letterboxd";


export default async function FilmsPage() {
    const films = await getFilms();

    return (
        <Window title="Films">
            <div className="shelf">
                {films.map((film) => (
                    <figure key={film.id} className="film">
                         <Link href={`/films/${film.id}`}>
                        <div className="poster">
                            {film.poster && (
                                <Image src={film.poster} alt={film.title} fill sizes="150px" />
                            )}
                        </div>
                        </Link>
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