import Image from "next/image";

export type JobExperienceCardProps = {
  company: string;
  date: string;
  description: string;
  logo: string;
  role?: string;
  icon?: React.ReactNode;
  link?: string;
};

export const JobExperienceCard = ({
  company,
  date,
  logo,
  role = "Software Engineer",
  description,
  link,
}: JobExperienceCardProps) => {
  return (
    <div>
      <p className="text-xs">{date}</p>
      <div className="flex items-center pt-2 gap-3 w-full">
        <Image
          src={logo}
          height={500}
          width={500}
          alt={company + " logo"}
          className="w-9 h-9"
          priority
        />
        <div className="w-full">
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
        </div>
      </div>
      <p className="text-xs mt-2">{description}</p>
    </div>
  );
};
