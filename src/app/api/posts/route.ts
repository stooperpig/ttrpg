import { getPosts, ServerPost } from "@/app/_lib/posts";
import { NextResponse } from "next/server";

export interface ClientPost extends ServerPost {
    next: number
    previous: number
}

export async function GET() {
    const posts = getPosts();

    const clientPosts = posts.map(post => {
        return {
            ...post,
            previous: undefined,
            next: undefined
        }
    });

    return NextResponse.json(clientPosts);
}
