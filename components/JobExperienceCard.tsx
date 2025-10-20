import { JobExperienceCardProps } from "@/lib/type";

export const JobExperienceCard = ({
  company,
  date,
  role = "Software Engineer",
  description,
}: JobExperienceCardProps) => {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <h3 className="font-bold">{company}</h3>
        <h3 className="text-xs">{date}</h3>
      </div>
      <h3 className="text-xs text-gray-600">{role}</h3>
      <p className="text-xs mt-2">{description}</p>
    </div>
  );
};
