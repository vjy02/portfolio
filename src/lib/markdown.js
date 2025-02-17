import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import path from 'path';
import { promises as fs } from 'fs';

// This function will be used server-side, in getStaticProps or getServerSideProps
export async function getPostData(slug) {
  const filePath = path.join(process.cwd(), '/src/content', `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');  // Use async readFile
  const { content, data } = matter(fileContents);
  const processedContent = await remark().use(html).process(content); // Ensure async processing
  return { slug, contentHtml: processedContent.toString(), ...data };
}

// This function should also be used server-side
export async function getAllPostSlugs() {
  const directory = path.join(process.cwd(), '/src/content');
  const filenames = await fs.readdir(directory);  // Async readDirectory
  return filenames.map(file => file.replace(/\.md$/, ''));
}
