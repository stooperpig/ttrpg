"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import Link from "next/link";
import { ClientPost } from "@/app/api/posts/route";
import styles from "./page.module.css";
import { useParams } from "next/navigation";

export default function BlogPost() {
    const params = useParams<{ slug?: string }>();

    const [post, setPost] = useState<ClientPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.slug) {
            async function fetchPost() {
                setLoading(true);
                const res = await fetch(`/api/posts/${params?.slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                } else {
                    setPost(null);
                }
                setLoading(false);
            }
            fetchPost();
        }
    }, [params]);

    const renderImage = (url: string) => {
        if (url === undefined)
            return null;
        else {
            return (<img src={url} className={styles.image} />);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>No blog posts found.</p>;

    if (params.slug === undefined) {
        return (
            <div>No blog post found</div>
        )
    } else {
        return (
            <div className="top-section">
                <div>
                    {renderImage(post.image)}
                    <h1>{post.title}</h1>
                    <p>{post.date}</p>
                    <p>{post.author}</p>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: marked(post.content) }} />

                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                        {post.previous !== undefined ? <Link href={`/blog/${post.previous}`}>← Previous</Link> : <span />}
                        {post.next !== undefined ? <Link href={`/blog/${post.next}`}>Next →</Link> : <span />}
                    </div>
            </div>
            </div>
        );
    }
}
