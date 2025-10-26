"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type BlogPostData = {
  title: string;
  description: string;
  htmlContent: string;
};

export default function Page() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/posts?slug=${slug}`);
      const data: BlogPostData = await res.json();
      setBlogPost(data);
      setLoading(false);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center mt-10 min-h-96 flex items-center justify-center">
        Loading blog post...
      </p>
    );
  if (!blogPost)
    return <p className="text-center mt-10 min-h-screen">Post not found</p>;

  return (
    <article
      className="prose prose-sm dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
    />
  );
}
