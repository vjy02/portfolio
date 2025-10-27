import { JobExperienceCardProps } from "@/lib/type";

export const JobExperienceCard = ({
  company,
  date,
  role = "Software Engineer",
  description,
  link,
}: JobExperienceCardProps) => {
  return (
    <div>
      <p className="text-xs">{date}</p>
      <div className="flex justify-between">
        <h3 className="font-bold">{company}</h3>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className="text-xs text-gray-500 underline underline-offset-2 hover:cursor-pointer hover:text-inherit transition-colors"
        >
          {link?.replace(/^https:\/\//, "")}
        </a>
      </div>
      <p className="text-xs text-gray-600">{role}</p>
      <p className="text-xs mt-2">{description}</p>
    </div>
  );
};
