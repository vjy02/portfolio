export default function BlogPostPill({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="flex w-full md:w-11/12">
      <div className="max-w-[75%] md:max-w-[80%]">
        <h3 className="font-bold text-sm md:text-xl">
          {title}
        </h3>
        <p className="text-xs md:text-base">
          {description}
        </p>
      </div>
      <p className="ml-auto text-xs md:text-base">{date}</p>
    </div>
  );
}
