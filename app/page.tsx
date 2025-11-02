import { BlogCard } from "@/components/BlogCard";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "@/lib/data";

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
        <h2 className="font-semibold text-lg">recent yaps</h2>
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
        <h2 className="font-semibold text-lg">side quests</h2>
        <AnimatedProjectCards />
      </div>
    </section>
  );
}

const AnimatedProjectCards = () => (
  <div className="flex flex-col gap-1 md:flex-row">
    {PROJECTS.map(({ title, desc, image, github, link, color }) => (
      <div
        key={title}
        className={`
        relative group rounded p-5 transition-[flex-grow] duration-500
        ${color}
        h-64
        flex-1
        hover:flex-[2]
        min-w-0
        will-change: flex-grow;
      `}
      >
        <h3 className="font-semibold truncate">{title}</h3>
        <p className="text-xs mt-2 line-clamp-1">{desc}</p>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-5 md:opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        )}
        {link && image && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-40 md:absolute md:bottom-0 md:left-0 md:h-42"
          >
            <Image
              src={image}
              alt={title}
              width={300}
              height={160}
              className="object-cover mt-4 md:mt-0 opacity-80 md:opacity-60 group-hover:opacity-90 rounded md:rounded-t-none w-full h-full transition-all duration-400"
            />
          </a>
        )}
      </div>
    ))}
  </div>
);
