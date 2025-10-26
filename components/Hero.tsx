import { BlogCard } from "@/components/BlogCard";

type BlogPost = {
  title: string;
  description: string;
  slug: string;
};

// once an hour as I won't be posting blog posts that often lol
export const revalidate = 3600;

export const Hero = async () => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const blogRes = await fetch(`${baseUrl}/api/posts`, {
    next: { revalidate: 60 },
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
        <h2 className="font-semibold text-lg">recent blog</h2>
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

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">some projects</h2>
        <AnimatedProjectCards />
      </div>
    </section>
  );
};

const AnimatedProjectCards = () => (
  <div className="flex gap-1 flex-col md:flex-row">
    <div className="md:flex-1 min-w-0 h-64 bg-red-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
      <h3 className="font-semibold truncate">WIP</h3>
    </div>
    <div className="md:flex-1 min-w-0 h-64 bg-green-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
      <h3 className="font-semibold truncate">WIP</h3>
    </div>
    <div className="md:flex-1 min-w-0 h-64 bg-blue-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
      <h3 className="font-semibold truncate">WIP</h3>
    </div>
  </div>
);
