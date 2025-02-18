import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { remark } from 'remark';
import html from 'remark-html';
const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient });

const pageToPostTransformer = (page: any) => {
  let cover = '';
  if (page.cover) {
    if (page.cover.type === 'file') {
      cover = page.cover.file.url;
    } else if (page.cover.type === 'external') {
      cover = page.cover.external.url;
    }
  }

  return {
    id: page.id,
    cover,
    title: page.properties.Name?.title?.[0]?.plain_text || 'Untitled',
    tags: page.properties.Tags?.multi_select || [],
    description: page.properties.Description?.rich_text?.[0]?.plain_text || '',
    date: page.properties.Updated?.last_edited_time || '',
    slug: page.properties.Slug?.formula?.string || '',
  };
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      // Get single blog post
      const response = await notionClient.databases.query({
        database_id: process.env.DATABASE_ID ?? '',
        filter: {
            property: 'Slug',
            formula: {
              string: {
                equals: slug,
              },
            },
          },
      });

      if (response.results.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      const page = response.results[0];
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const markdown = n2m.toMarkdownString(mdBlocks);
      const htmlContent = await remark().use(html).process(markdown.parent);
      const post = pageToPostTransformer(page);

      return NextResponse.json({ post, htmlContent: htmlContent.toString() });
    } else {
      // Get all published blog posts
      const response = await notionClient.databases.query({
        database_id: process.env.DATABASE_ID ?? '',
        filter: {
          property: 'Published',
          checkbox: { equals: true },
        },
        sorts: [{ property: 'Updated', direction: 'descending' }],
      });

      const posts = response.results.map(pageToPostTransformer);
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
