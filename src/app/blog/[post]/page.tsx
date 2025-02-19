"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname().split("/")[2];
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const res = await fetch(`/api/posts?slug=${pathname}`);
      const result = await res.json();
      setContent(result.htmlContent);
    };
    fetchContent();
  }, [pathname]);

  return (
    <div className="flex flex-col w-[80vw] md:w-[50vw] min-h-[35vh] md:h-fit mt-32 justify-center mx-auto items-center md:mb-28">
      {!content ? (
        <h3>Loading blog post...</h3>
      ) : (
        <article
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
