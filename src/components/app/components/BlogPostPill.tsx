"use effect"

import { useState } from "react";

export default function BlogPostPill({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) {
    const [isHover, setHover] = useState(false)
  return (
    <div className="flex w-full md:w-11/12 cursor-pointer" onMouseOver={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <div className={`max-w-[75%] md:max-w-[80%] transition-all ease-in-out ${isHover && "border-l-4 pl-5"}`}>
        <h3 className="font-bold text-sm md:text-xl">
          <a href="" className="hover:underline">
            {title}
          </a>
        </h3>
        <p className="text-xs md:text-base">{description}</p>
      </div>
      <p className="ml-auto text-xs md:text-base">{date}</p>
    </div>
  );
}
