"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname().split("/")[2];
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch(`/api/posts/data?slug=${pathname}`); 
      const result = await res.json();
      setContent(result.content);
    };
    fetchContent();
  }, [pathname]);

  if (!content) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-[80vw] md:w-[50vw] min-h-[35vh] md:h-fit mt-[10vh] justify-center mx-auto">
      <article className="prose lg:prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
