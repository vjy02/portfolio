import BlogPostSummary from "@/components/app/components/BlogPostSummary";
import { getAllPostSlugs, getPostData } from "@/lib/markdown";

export default async function Page() {
  const slugs = await getAllPostSlugs();
  const allPosts = await Promise.all(slugs.map((slug) => getPostData(slug)));

  return (
    <section className="flex flex-col w-[80vw] md:w-[50vw] h-fit mt-[10vh] items-center justify-center mx-auto">
      <div className="mb-16 mt-8 md:mt-16 flex flex-col gap-4 items-center">
        <h1 className="relative text-3xl md:text-5xl">
          hi, welcome to my blog.
        </h1>
        <p className="text-xs md:text-sm">
          still working on filling this page up!
        </p>
      </div>
      <BlogPostSummary postsData={allPosts} />
    </section>
  );
}
