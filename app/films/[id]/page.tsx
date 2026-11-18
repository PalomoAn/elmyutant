import Image from "next/image";
import { notFound } from "next/navigation";
import Window from "@/components/Window";
import { getFilms } from "@/lib/letterboxd";
import { stars } from "@/lib/letterboxd";


export default async function FilmPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const films = await getFilms();
    const film = films.find((f) => f.id === id);

    if (!film) notFound();

    return (
        <Window title={film.title} closeHref="/films">
            <div className="film-detail">
                {film.poster && (
                    <div className="poster">
                        <Image src={film.poster} alt={film.title} fill sizes="200px" />
                    </div>
                )}
                <div>
                    <h2>
                        {film.title} ({film.year})
                    </h2>
                    <p className="post-date">
                        {stars(film.rating)} {film.liked && "♥"} {film.rewatch && "↻"} ·
                        watched {film.watched}
                    </p>
                    {film.review.length === 0 ? (
                        <p>No written review.</p>
                    ) : (
                        film.review.map((paragraph, i) => <p key={i}>{paragraph}</p>)
                    )}
                    <p>
                        <a href={film.link} target="_blank" rel="noopener noreferrer">
                            View on Letterboxd
                        </a>
                    </p>
                </div>
            </div>
        </Window>
    );
}