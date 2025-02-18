"use effect";

import { PostData } from "@/types/post";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogPostPill({ postData }: { postData: any }) {
  const [isHover, setHover] = useState(false);
  const router = useRouter();

  return (
    <div
      className="w-full md:w-11/12 cursor-pointer flex"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={()=> router.push(`blog/${postData.slug}`)}
    >
      <div
        className={`max-w-[75%] md:w-[80%] md:max-w-[80%] transition-all ease-in-out ${
          isHover && "border-l-4 pl-5"
        }`}
      >
        <h3 className="font-bold text-sm md:text-xl">{postData.title}</h3>
        <p className="text-xs md:text-base">{postData.description}</p>
      </div>
      <p className="ml-auto text-xs md:text-base">{dayjs(postData.date).format("MM/YYYY")}</p>
    </div>
  );
}
