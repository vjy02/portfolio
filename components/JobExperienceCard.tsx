import Image from "next/image";

type Role = {
  title: string;
  description?: string;
};

export type JobExperienceCardProps = {
  company: string;
  date: string;
  logo: string;
  link?: string;
  roles: Role[];
};

export const JobExperienceCard = ({
  company,
  date,
  logo,
  link,
  roles,
}: JobExperienceCardProps) => {
  return (
    <div>
      <div className="flex gap-3 w-full">
        <Image
          src={logo}
          height={500}
          width={500}
          alt={company + " logo"}
          className="w-10 h-10 mt-1"
          priority
        />
        <div className="flex justify-between w-full">
          <div>
            <h3 className="font-bold">{company}</h3>
            <p className="text-xs">{date}</p>
          </div>
          {link && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link}
              className="text-xs text-gray-500 underline underline-offset-2 hover:cursor-pointer hover:text-inherit transition-colors md:block hidden"
            >
              {link.replace(/^https:\/\//, "")}
            </a>
          )}
        </div>
      </div>
      <div className="relative mt-4 pl-6">
        <span className="absolute left-2 top-1 bottom-1 w-px bg-gray-200" />
        {roles.map((role) => (
          <div key={role.title} className="relative mb-6 last:mb-0">
            <span className="absolute -left-[19.5px] top-1 w-2 h-2 rounded-full bg-gray-300" />
            <p className="text-xs text-gray-600">{role.title}</p>
            {role.description && (
              <p className="text-xs mt-2">{role.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
