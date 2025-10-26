export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { remark } from 'remark';
import html from 'remark-html';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints';

if (!process.env.NOTION_TOKEN || !process.env.DATABASE_ID) {
  throw new Error('NOTION_TOKEN and DATABASE_ID must be set in environment variables');
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

type Post = {
  id: string;
  cover: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
  slug: string;
};

const transformPage = (
  page: PageObjectResponse | PartialPageObjectResponse
): Post | null => {
  if (!('properties' in page)) return null;

  const cover =
    page.cover?.type === 'file'
      ? page.cover.file.url
      : page.cover?.type === 'external'
        ? page.cover.external.url
        : '';

  let slug = '';
  const slugProp = page.properties?.Slug;
  if (slugProp?.type === 'formula' && slugProp.formula.type === 'string') {
    slug = slugProp.formula.string || '';
  } else if (slugProp?.type === 'rich_text') {
    slug = slugProp.rich_text?.[0]?.plain_text || '';
  }

  return {
    id: page.id,
    cover,
    title:
      page.properties?.Name?.type === 'title'
        ? page.properties.Name.title?.[0]?.plain_text || 'Untitled'
        : 'Untitled',
    tags:
      page.properties?.Tags?.type === 'multi_select'
        ? page.properties.Tags.multi_select.map((t) => t.name)
        : [],
    description:
      page.properties?.Description?.type === 'rich_text'
        ? page.properties.Description.rich_text?.[0]?.plain_text || ''
        : '',
    date:
      page.properties?.Updated?.type === 'last_edited_time'
        ? page.properties.Updated.last_edited_time || ''
        : '',
    slug,
  };
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    const dbMeta: DatabaseObjectResponse = await notion.request({
      path: `databases/${process.env.DATABASE_ID}`,
      method: 'get',
    });

    const dataSourceId = dbMeta.data_sources?.[0]?.id;
    if (!dataSourceId) {
      return NextResponse.json(
        { error: 'No data_source_id found for this database' },
        { status: 500 }
      );
    }

    // Single post fetch
    if (slug) {
      const response: QueryDataSourceResponse = await notion.request({
        path: `data_sources/${dataSourceId}/query`,
        method: 'post',
        body: {
          filter: {
            property: 'Slug',
            formula: { string: { equals: slug } },
          },
        },
      });

      if (!response.results || response.results.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      const page = response.results[0] as PageObjectResponse;
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const markdown = n2m.toMarkdownString(mdBlocks);
      const htmlContent = await remark().use(html).process(markdown.parent || '');
      const post = transformPage(page);

      return NextResponse.json({ post, htmlContent: htmlContent.toString() });
    }

    // Fetch all posts
    const allPosts: QueryDataSourceResponse = await notion.request({
      path: `data_sources/${dataSourceId}/query`,
      method: 'post',
      body: {
        filter: {
          property: 'Published',
          checkbox: { equals: true },
        },
        sorts: [{ property: 'Updated', direction: 'descending' }],
      },
    });

    const posts = allPosts.results
      .filter(
        (item): item is PageObjectResponse | PartialPageObjectResponse =>
          item.object === "page"
      )
      .map(transformPage)
      .filter((p): p is Post => p !== null);

    return NextResponse.json(posts);
  } catch (error: unknown) {
    console.error('Error fetching posts:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
