import Image from "next/image";
import { notFound } from "next/navigation";
import Window from "@/components/Window";
import WindowStack from "@/components/WindowStack";
import { getFilms, stars } from "@/lib/letterboxd";
import { closeFocusedHref, readDesk, type SearchParams } from "@/lib/windows";

export default async function FilmPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
}) {
    const { id } = await params;
    const desk = readDesk(`/films/${id}`, await searchParams);
    const films = await getFilms();
    const film = films.find((f) => f.id === id);

    if (!film) notFound();

    return (
        <WindowStack desk={desk}>
            <Window id="films-view" title={film.title} width={700} x={110} y={50} closeHref={closeFocusedHref(desk)}>
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
        </WindowStack>
    );
}
