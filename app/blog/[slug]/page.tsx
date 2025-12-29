import { notFound } from "next/navigation";

type BlogPostData = {
  post: {
    title: string;
    description: string;
  };
  htmlContent: string;
};

async function getPost(slug: string): Promise<BlogPostData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/posts?slug=${slug}`,
    { next: { revalidate: 60 * 60 } }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/posts`, {
    next: { revalidate: 60 * 60 },
  });
  const posts = await res.json();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPost(slug);
  const title = postData?.post?.title ?? "Victor Yoshida";
  const description = postData?.post?.description ?? "My personal portfolio";
  return {
    title,
    description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <article
      className="prose prose-sm mx-auto mt-8"
      dangerouslySetInnerHTML={{ __html: post.htmlContent }}
    />
  );
}
