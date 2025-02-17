import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const postsDirectory = path.join(process.cwd(), '/src/content');
  
  try {
    const filenames = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContents);

        return {
          title: data.title,
          date: data.date,
          description: data.description,
          slug: filename.replace('.md', ''),
        };
      })
    );

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching posts' });
  }
}
