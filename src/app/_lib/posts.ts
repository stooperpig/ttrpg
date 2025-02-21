import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ServerPost = {
  author: string;
  content: string;
  date: string;
  image: string;
  slug: string;
  tags?: string[];
  title: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPosts(): ServerPost[] {
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      return {
        author: data.author,
        content,
        date: data.date,
        image: data.image,
        slug: data.slug,
        tags: data.tags || [],
        title: data.title
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort newest first
}
