"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClientPost } from "@/app/api/posts/route";
import styles from "./blog_panel.module.css";

export default function BlogPanel() {
  const searchParams = useSearchParams();
  const index = searchParams.get("index") ? parseInt(searchParams.get("index") as string, 10) : 0;

  const [post, setPost] = useState<ClientPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const res = await fetch(`/api/posts?index=${index}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        setPost(null);
      }
      setLoading(false);
    }
    fetchPost();
  }, [index]);

  const renderImage = (url: string)=> {
    if (url===undefined)
      return null;
    else {
      return (<img src={url} className={styles.blog_image}/>);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>No blog posts found.</p>;

  return (
    <div>
      {renderImage(post.image)}
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <p>{post.author}</p>
      <div className={styles.blog_content} dangerouslySetInnerHTML={{ __html: marked(post.content) }} />

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        {post.previous !== -1 ? <Link href={`/blog?index=${post.previous}`}>← Previous</Link> : <span />}
        {post.next !== -1 ? <Link href={`/blog?index=${post.next}`}>Next →</Link> : <span />}
      </div>
    </div>
  );
}
