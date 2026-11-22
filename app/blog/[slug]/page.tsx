import {notFound} from "next/navigation";
import Link from "next/link";
import Window from "@/components/Window";
import WindowStack from "@/components/WindowStack";
import {getPost} from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import {closeFocusedHref, go, readDesk, type SearchParams} from "@/lib/windows";

export const dynamic = "force-dynamic";

export default async function PostPage({
    params,
    searchParams,
}: {
    params: Promise<{slug: string}>;
    searchParams: Promise<SearchParams>;
}) {
    const {slug} = await params;
    const desk = readDesk(`/blog/${slug}`, await searchParams);
    const post = await getPost(slug);
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
