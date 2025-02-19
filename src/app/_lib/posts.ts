import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ServerPost = {
  image: string;
  title: string;
  date: string;
  author: string;
  tags?: string[];
  content: string;
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
        image: data.image,
        title: data.title,
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort newest first
}
