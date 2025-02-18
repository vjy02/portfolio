"use effect";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function BlogPostPill({ postData }: { postData: any }) {
  const router = useRouter();

  return (
    <div
      className="w-full md:w-11/12 cursor-pointer flex"
      onClick={() => router.push(`blog/${postData.slug}`)}
    >
      <div
        className="max-w-[75%] md:w-[80%] md:max-w-[80%] transition-all ease-in-out border-transparent border-0 border-solid border-l-4 pl-4 hover:translate-x-5 hover:border-gray-400 hover:dark:border-slate-300"
      >
        <h3 className="font-bold text-sm md:text-xl">{postData.title}</h3>
        <p className="text-xs md:text-base">{postData.description}</p>
      </div>
      <p className="ml-auto text-xs md:text-base">
        {dayjs(postData.date).format("MM/YYYY")}
      </p>
    </div>
  );
}
