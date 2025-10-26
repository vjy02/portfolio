"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

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
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
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
      className="prose prose-sm pt-4 dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
    />
  );
}
