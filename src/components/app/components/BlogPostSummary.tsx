"use client";

import BlogPostPill from "./BlogPostPill";
import { PostData } from "@/types/post";
import dayjs from "dayjs";

export default function BlogPostSummary({
  postsData,
  limit,
}: {
  postsData: Partial<PostData>[];
  limit?: boolean;
}) {
  if (!postsData) return <></>;
  postsData = postsData.sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1
  );
  if (limit) {
    postsData = postsData.slice(0, 3);
  }
  return (
    <div className="flex flex-col justify-start items-center w-full gap-10 relative">
      {postsData.map((post: Partial<PostData>, index: number) => {
        return (
          <BlogPostPill key={index + (post.title ?? "")} postData={post} />
        );
      })}
    </div>
  );
}
