"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { id } = params;
  return (
    <section className="flex flex-col w-[80vw] md:w-[50vw] min-h-[35vh] md:h-[60vh] mt-[10vh] items-center">
      <h1>This is a page for blog {id}</h1>
    </section>
  );
}
