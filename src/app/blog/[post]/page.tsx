"use client"

import { usePathname } from 'next/navigation'

export default function Page() {
  const pathname = usePathname().split("/")[2]
  const data = JSON.parse(sessionStorage.getItem(pathname) ?? "");
  return (
    <div className="flex flex-col w-[80vw] md:w-[50vw] min-h-[35vh] md:h-fit mt-[10vh] justify-center mx-auto">
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </div>
  );
}
