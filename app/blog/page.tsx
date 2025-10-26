import { BlogCard } from "@/components/BlogCard";

type BlogPost = {
  title: string;
  description: string;
  slug: string;
};

export const revalidate = 3600;

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/posts`, {
    next: { revalidate: 3600 },
  });
  const blogPosts: BlogPost[] = await res.json();

  if (!blogPosts || blogPosts.length === 0) {
    return <p className="text-center mt-10">No blog posts found.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-2">My Blog</h1>
      {blogPosts.map((post) => (
        <BlogCard
          key={post.slug}
          title={post.title}
          description={post.description}
          link={`/blog/${post.slug}`}
        />
      ))}
    </div>
  );
}
