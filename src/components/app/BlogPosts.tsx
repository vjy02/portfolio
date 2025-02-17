"use client"

import Image from "next/image";
import BlogPostSummary from "./components/BlogPostSummary";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { getAllPostSlugs, getPostData } from "@/lib/markdown";
import { PostData } from "@/types/post";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  let scaleValue = useTransform(scrollYProgress, [0, 0.7], ["0", "1"]);
  const [posts, setPosts] = useState<PostData[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts/all-metadata');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        console.error('Error fetching posts');
      }
    };
    fetchPosts();
  }, []);
  return (
    <motion.section
      className="min-h-[55vh] lg:h-fit w-[80vw] md:w-[50vw] flex flex-col justify-start items-center relative"
      style={{ opacity: scaleValue }}
    >
      <h1
        className="text-3xl md:text-5xl mt-24 mb-12 md:mt-32 md:mb-24"
        ref={ref}
      >
        things I wrote.
      </h1>
      <BlogPostSummary postsData={posts} limit={true}/>
    </motion.section>
  );
}
