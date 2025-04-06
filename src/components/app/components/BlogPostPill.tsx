"use effect";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function BlogPostPill({ postData }: { postData: any }) {
  const router = useRouter();

  return (
    <div
      className="w-11/12 cursor-pointer flex"
      onClick={() => router.push(`blog/${postData.slug}`)}
    >
      <div
        className=":w-[80%] max-w-[80%] transition-all ease-in-out border-transparent border-0 md:border-solid md:border-l-4 md:pl-6 md:hover:translate-x-5 md:hover:border-gray-400 md:hover:dark:border-slate-300"
      >
        <h3 className="font-bold text-sm md:text-xl">{postData.title}</h3>
        <p className="text-xs md:text-base mt-1">{postData.description}</p>
      </div>
      <h3 className="ml-auto text-xs md:text-base">
        {dayjs(postData.date).format("MM/YYYY")}
      </h3>
    </div>
  );
}
