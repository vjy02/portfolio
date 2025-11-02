import { BlogCard } from "@/components/BlogCard";
import { AnimatedProjectCards } from "@/components/AnimatedProjectCards";

type BlogPost = {
  title: string;
  description: string;
  slug: string;
};

// once an hour as I won't be posting blog posts that often lol
export const revalidate = 3600;

export default async function Page() {
  const blogRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/posts`, {
    next: { revalidate: revalidate },
  });
  const blogPosts: BlogPost[] = await blogRes.json();
  const blogPost = blogPosts?.[0];

  return (
    <section className="text-sm flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">hi, i&apos;m Victor Yoshida</h2>
        <p>
          A <strong>frontend</strong> focused software engineer currently
          working at <strong>Canva</strong>. Based in{" "}
          <strong>Melbourne, Australia</strong> with a deep passion for building
          solutions to problems or tinkering something up just for fun
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">a recent yap</h2>
        {blogPost ? (
          <BlogCard
            title={blogPost.title}
            description={blogPost.description}
            link={`/blog/${blogPost.slug}`}
          />
        ) : (
          <p>No recent posts found.</p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">side quests</h2>
        <AnimatedProjectCards />
      </div>
    </section>
  );
}
