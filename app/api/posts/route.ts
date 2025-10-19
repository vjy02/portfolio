import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { remark } from 'remark';
import html from 'remark-html';

const notionClient = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient });

type NotionPage = PageObjectResponse | PartialPageObjectResponse;

const pageToPostTransformer = (page: NotionPage) => {
  if (!('properties' in page)) return null;

  let cover = '';
  if (page.cover) {
    if (page.cover.type === 'file') cover = page.cover.file.url;
    else if (page.cover.type === 'external') cover = page.cover.external.url;
  }

  // Safely handle slug formula
  let slug = '';
  const slugProp = page.properties.Slug;
  if (slugProp?.type === 'formula' && slugProp.formula.type === 'string') {
    slug = slugProp.formula.string || '';
  }

  return {
    id: page.id,
    cover,
    title:
      page.properties.Name?.type === 'title'
        ? page.properties.Name.title?.[0]?.plain_text || 'Untitled'
        : 'Untitled',
    tags:
      page.properties.Tags?.type === 'multi_select'
        ? page.properties.Tags.multi_select
        : [],
    description:
      page.properties.Description?.type === 'rich_text'
        ? page.properties.Description.rich_text?.[0]?.plain_text || ''
        : '',
    date:
      page.properties.Updated?.type === 'last_edited_time'
        ? page.properties.Updated.last_edited_time || ''
        : '',
    slug,
  };
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  try {
    if (!process.env.DATABASE_ID) {
      throw new Error('DATABASE_ID not set in environment');
    }

    if (slug) {
      // Use low-level request to query database by slug
      const response = await notionClient.request<{
        results: PageObjectResponse[];
      }>({
        path: `databases/${process.env.DATABASE_ID}/query`,
        method: 'post',
        body: {
          filter: {
            property: 'Slug',
            formula: { string: { equals: slug } },
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
      // Get all published posts
      const response = await notionClient.request<{
        results: PageObjectResponse[];
      }>({
        path: `databases/${process.env.DATABASE_ID}/query`,
        method: 'post',
        body: {
          filter: { property: 'Published', checkbox: { equals: true } },
          sorts: [{ property: 'Updated', direction: 'descending' }],
        },
      });

      const posts = response.results
        .map(pageToPostTransformer)
        .filter((p): p is NonNullable<typeof p> => p !== null);

      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
