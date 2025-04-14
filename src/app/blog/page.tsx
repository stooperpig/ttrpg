'use client'

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { ClientPost } from '../api/posts/route';
import { useRouter } from 'next/navigation';

export default function ProDMBlog() {
    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<ClientPost[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            const res = await fetch(`/api/posts`);
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            } else {
                setPosts([]);
            }
            setLoading(false);
        }
        fetchPost();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (posts.length === 0) return <p>No blog posts found.</p>;

    const handlePostClick = (slug: string) => {
        router.push(`/blog/${slug}`);   
    }

    const renderPost = (post: ClientPost) => {
        return (
            <div className={styles.post} onClick={() => handlePostClick(post.slug)}>
                <div>
                    <img className={styles.image} src={post.image} />
                </div>
                <div className={styles.post_entry}>
                    <div className={styles.post_title}>{post.title}</div>
                    <div>{post.date} {post.author}</div>
                </div>
            </div>)
    }

    return (
        <div>
            <div className="top-section dice_study">
                <h2>Blog</h2>
            </div>
            <div className={styles.blog_section}>
                {posts.map((post: ClientPost, index: number) => {
                    return (<div key={index}>{renderPost(post)}</div>)
                })}
            </div>
        </div>)
}
