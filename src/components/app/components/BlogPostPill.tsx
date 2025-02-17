"use effect";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BlogPostPill({
  title,
  description,
  date,
  link
}: {
  title: string;
  description: string;
  date: string;
  link: string;
}) {
  const [isHover, setHover] = useState(false);
  const router = useRouter();
  return (
    <div
      className="w-full md:w-11/12 cursor-pointer flex"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={()=> router.push(link)}
    >
        <div
          className={`max-w-[75%] md:w-[80%] md:max-w-[80%] transition-all ease-in-out ${
            isHover && "border-l-4 pl-5"
          }`}
        >
          <h3 className="font-bold text-sm md:text-xl">{title}</h3>
          <p className="text-xs md:text-base">{description}</p>
        </div>
        <p className="ml-auto text-xs md:text-base">{date}</p>
    </div>
  );
}
