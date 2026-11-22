import {cache} from "react";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import Window from "@/components/Window";
import WindowStack from "@/components/WindowStack";
import {getPost} from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import {closeFocusedHref, go, readDesk, type SearchParams} from "@/lib/windows";

export const dynamic = "force-dynamic";

// metadata and page ask for the same post: one database call
const getOne = cache(getPost);

// first ~155 characters of the post, with the markdown symbols taken out
function excerpt(markdown: string) {
    const text = markdown
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")      // images
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")   // links: keep the text
        .replace(/[#>*_`~]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    return text.length > 155 ? text.slice(0, 154).trimEnd() + "…" : text;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{slug: string}>;
}): Promise<Metadata> {
    const {slug} = await params;
    const post = await getOne(slug);
    if (!post) return {};
    return {
        title: post.title,
        description: excerpt(post.body) || undefined,
        alternates: {canonical: `/blog/${slug}`},
    };
}

export default async function PostPage({
    params,
    searchParams,
}: {
    params: Promise<{slug: string}>;
    searchParams: Promise<SearchParams>;
}) {
    const {slug} = await params;
    const desk = readDesk(`/blog/${slug}`, await searchParams);
    const post = await getOne(slug);
    if(!post) notFound();

    return(
        <WindowStack desk={desk}>
            <Window id="blog-view" title={post.title} width={620} x={120} y={60} closeHref={closeFocusedHref(desk)}>
                <h1>{post.title}</h1>
                <p className="post-date">
                    {new Date(post.created_at).toLocaleDateString()}
                </p>
                <div className="post-body">
                     <ReactMarkdown>{post.body}</ReactMarkdown>
                </div>
                <p><Link href={go(desk, "/blog")}>Back to Diary</Link></p>
            </Window>
        </WindowStack>
    );
}
