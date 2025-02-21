import { getPosts, ServerPost } from "@/app/_lib/posts";
import { NextResponse } from "next/server";

export interface ClientPost extends ServerPost {
    next: string | undefined
    previous: string | undefined
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    //const index = searchParams.get("index") ? parseInt(searchParams.get("index") as string, 10) : 0;

    const posts = getPosts();
    //const post = posts[index];

    if (!slug) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const index = posts.findIndex(post => post.slug === slug);

    if (index === -1) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = posts[index];

    const clientPost: ClientPost = {
        ...post,
        previous: index >= posts.length - 1 ? undefined : posts[index + 1].slug,
        next: index > 0 ? posts[index - 1].slug : undefined
    }

    return NextResponse.json(clientPost);
}