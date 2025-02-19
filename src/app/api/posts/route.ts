import { getPosts, ServerPost } from "@/app/_lib/posts";
import { NextResponse } from "next/server";

export interface ClientPost extends ServerPost {
    next: number
    previous: number
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const index = searchParams.get("index") ? parseInt(searchParams.get("index") as string, 10) : 0;

    const posts = getPosts();
    const post = posts[index];

    if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const clientPost: ClientPost = {
        ...post,
        previous: index >= posts.length - 1 ? -1 : index + 1,
        next: index > 0 ? index - 1 : -1
    }

    return NextResponse.json(clientPost);
}
