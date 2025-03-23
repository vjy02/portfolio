"use client";

import BlogPostSummary from "@/components/app/components/BlogPostSummary";
import { getAllPostSlugs, getPostData } from "@/lib/markdown";
import { useEffect, useState } from "react";

export default function Page() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch(`/api/posts`);
      const data = await res.json();
      setBlogPosts(data);
    };
    fetchContent();
  }, []);

  return (
    <section className="flex flex-col w-[85vw] md:w-[50vw] h-fit mt-[10vh] items-center justify-center mx-auto">
      <div className="mb-16 mt-12 md:mt-16 flex flex-col gap-4 items-start w-full md:items-center">
        <h1 className="relative text-3xl md:text-5xl">
          hi, welcome to my blog.
        </h1>
        <p className="text-xs md:text-sm self-start md:self-auto">
          still working on filling this page up!
        </p>
      </div>
      {blogPosts.length !== 0 ? (
        <BlogPostSummary postsData={blogPosts} />
      ) : (
        <BlogPostSummary postsData={blogPosts} isLoading={true} />
      )}
    </section>
  );
}
