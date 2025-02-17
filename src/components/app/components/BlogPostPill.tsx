"use effect";

import { PostData } from "@/types/post";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogPostPill({postData}: {postData:Partial<PostData>}) {
  const [isHover, setHover] = useState(false);
  const router = useRouter();
  function handleClick() {
    sessionStorage.setItem(`${postData.slug}`, JSON.stringify(postData));
    router.push(`blog/${postData.slug}`);
  }
  return (
    <div
      className="w-full md:w-11/12 cursor-pointer flex"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div
        className={`max-w-[75%] md:w-[80%] md:max-w-[80%] transition-all ease-in-out ${
          isHover && "border-l-4 pl-5"
        }`}
      >
        <h3 className="font-bold text-sm md:text-xl">{postData.title}</h3>
        <p className="text-xs md:text-base">{postData.description}</p>
      </div>
      <p className="ml-auto text-xs md:text-base">{postData.date}</p>
    </div>
  );
}
