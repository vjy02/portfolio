import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
  }

  const postsDirectory = path.join(process.cwd(), '/src/content');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content); 
    return NextResponse.json({ content: processedContent.toString() });
  } catch (error) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }
}