import BlogPostPill from "./BlogPostPill";

export default function BlogPostSummary() {
  const postsData = [
    {
      title:
        "Mastering the Job Search: A Guide for Graduates and Interns in 2025",
      description:
        "Discover essential tips, from perfecting your CV to acing interviews, designed to help graduates secure their first job or internship.",
      date: "Feb. 2025",
    },
    {
      title:
        "Breaking Into the Industry: Graduate Jobs and Internships Demystified",
      description:
        "Learn how to stand out in a competitive job market and land your dream entry-level role with this comprehensive guide.",
      date: "Mar. 2025",
    },
    {
      title:
        "From Student to Professional: Landing Your First Graduate Job in 2025",
      description:
        "Navigate the transition from university to the workforce with strategies that will set you apart during your job hunt.",
      date: "Apr. 2025",
    },
    {
      title:
        "The Graduate's Playbook: Unlocking Internship Opportunities in 2025",
      description:
        "Get practical advice on how to secure internships that will help you build skills and gain valuable experience in your field.",
      date: "May. 2025",
    },
  ];

  return (
    <div className="flex flex-col justify-start items-start w-full gap-10">
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
