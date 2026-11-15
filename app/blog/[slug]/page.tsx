import {notFound} from "next/navigation";
import Link from "next/link";
import Window from "@/components/Window";
import {getPost} from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function PostPage({params}:{params:Promise<{slug:string}>}) {


    const {slug} = await params;
    const post = await getPost(slug);
    if(!post) notFound();

    return(
        <Window title={post.title} closeHref="/blog">
            <h1>{post.title}</h1>
            <p className="post-date">
                {new Date(post.created_at).toLocaleDateString()}
            </p>
            <div className="post-body">{post.body}</div>
            <p><Link href="/blog">Back to Diary</Link></p>
        </Window>
    );
}