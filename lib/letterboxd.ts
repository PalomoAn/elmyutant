import { XMLParser } from "fast-xml-parser";
import { SITE } from "@/lib/config";

export type Film = {
    id: string;
    title: string;
    year: number;
    rating: number | null;
    watched: string;
    rewatch: boolean;
    liked: boolean;
    link: string;
    poster: string | null;
    review: string[]; // plain-text paragraphs; empty if there is no written review
};

export function stars(rating: number | null) {
    if (rating === null) return "unrated";
    const full = Math.floor(rating);
    return "★".repeat(full) + (rating % 1 ? "½" : "");
}

function decode(text: string) {
    return text
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&");
}

function parseDescription(html: string) {
    const poster = html.match(/<img src="([^"]+)"/)?.[1] ?? null;
    const review = html
        .split("</p>")
        .map((chunk) =>
            decode(
                chunk
                    .replace(/<img[^>]*>/g, "")
                    .replace(/<br\s*\/?>/g, "\n")
                    .replace(/<[^>]+>/g, "")
            ).trim()
        )
        .filter(Boolean);
    return { poster, review };
}

export async function getFilms(): Promise<Film[]> {
    const res = await fetch(`https://letterboxd.com/${SITE.letterboxd}/rss/`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Letterboxd feed failed: ${res.status}`);

    const parser = new XMLParser({
        parseTagValue: false,
        isArray: (name) => name === "item",
    });
    const xml = parser.parse(await res.text());
    const items = (xml.rss.channel.item ?? []).filter(
        (item: any) => item["letterboxd:filmTitle"]
    );

    return items.map((item: any): Film => {
        const { poster, review } = parseDescription(String(item.description ?? ""));
        const isWatchOnly = String(item.guid).startsWith("letterboxd-watch-");

        return {
            id: String(item.guid),
            title: decode(String(item["letterboxd:filmTitle"])),
            year: Number(item["letterboxd:filmYear"]),
            rating: item["letterboxd:memberRating"]
                ? Number(item["letterboxd:memberRating"])
                : null,
            watched: String(item["letterboxd:watchedDate"]),
            rewatch: item["letterboxd:rewatch"] === "Yes",
            liked: item["letterboxd:memberLike"] === "Yes",
            link: String(item.link),
            poster,
            review: isWatchOnly ? [] : review,
        };
    });
}