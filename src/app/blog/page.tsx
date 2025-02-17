import BlogPostSummary from "@/components/app/components/BlogPostSummary";

export default function Page() {
  return (
    <section className="flex flex-col w-[80vw] md:w-[50vw] min-h-[35vh] md:h-fit mt-[10vh] items-center justify-center mx-auto">
      <h1 className="relative text-3xl md:text-5xl mb-24 mt-10">
        hi, welcome to my blog.
        <h4 className="absolute text-xs md:text-sm md:left-1/2 md:-translate-x-1/2 mt-4">still working on filling this page up!</h4>
      </h1>
      <BlogPostSummary />
    </section>
  );
}
