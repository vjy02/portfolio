import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET() {
  const postsDirectory = path.join(process.cwd(), '/src/content'); 
  const fileNames = await fs.readdir(postsDirectory); 

  const posts = await Promise.all(fileNames.map(async (fileName) => {
    const filePath = path.join(postsDirectory, fileName); 
    const fileContents = await fs.readFile(filePath, 'utf8'); 

    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''), 
      title: data.title,
      date: data.date,
      description: data.description,
      content, 
    };
  }));
  posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return new Response(JSON.stringify(posts), { status: 200 });
}
