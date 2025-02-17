"use client";

import BlogPostPill from "./BlogPostPill";
import { PostData } from "@/types/post";
export default function BlogPostSummary({
  postsData,
}: {
  postsData: Partial<PostData>[];
}) {
  if (!postsData) return <></>
  return (
    <div className="flex flex-col justify-start items-center w-full gap-10 relative">
      {postsData.map((post: Partial<PostData>, index: number) => {
        return (
          <BlogPostPill
            key={index + (post.title ?? "")}
            postData={post}
          />
        );
      })}
    </div>
  );
}
