"use client";

import BlogPostPill from "./BlogPostPill";
import { PostData } from "@/types/post";
import dayjs from "dayjs";
import BlogPostPillLoading from "./BlogPostPillLoading,";

export default function BlogPostSummary({
  postsData,
  limit,
  isLoading,
}: {
  postsData: any;
  limit?: boolean;
  isLoading?: boolean;
}) {
  if (!postsData) return <></>;
  if (limit) {
    postsData = postsData.slice(0, 3);
  }
  return (
    <div className="flex flex-col justify-start items-center w-full gap-10 relative mb-6 md:mb-16">
      {isLoading ?
      (
        <>
        <BlogPostPillLoading />
        <BlogPostPillLoading />
        <BlogPostPillLoading />
        </>

      )
:(
  <>
    {postsData.map((post: Partial<PostData>, index: number) => {
    return (
      <BlogPostPill key={index + (post.title ?? "")} postData={post} />
    );
  })}
  </>
)
      }

    </div>
  );
}
