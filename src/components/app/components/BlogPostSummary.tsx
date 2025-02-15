import BlogPostPill from "./BlogPostPill";

export default function BlogPostSummary() {
  const postsData = [
    {
      title:
        "Mastering the Job Search: A Guide for Graduates and Interns in 2025",
      description:
        "Discover essential tips, from perfecting your CV to acing interviews, designed to help graduates secure their first job or internship.",
      date: "Feb. 2025",
      link: `${process.env.baseUrl}/blog/1`,
    },
    {
      title: "TBA",
      description: "TBA",
      date: "???",
      link: `${process.env.baseUrl}/blog/2`,
    },
    {
      title: "TBA",
      description: "TBA",
      date: "???",
      link: `${process.env.baseUrl}/blog/3`,
    },
    {
      title: "TBA",
      description: "TBA",
      date: "???",
      link: `${process.env.baseUrl}/blog/4`,
    },
  ];

  return (
    <div className="flex flex-col justify-start items-start w-full gap-10 relative">
      {postsData.map((post, index) => {
        return (
          <BlogPostPill
            key={index + post.title}
            title={post.title}
            description={post.description}
            date={post.date}
          />
        );
      })}
    </div>
  );
}
