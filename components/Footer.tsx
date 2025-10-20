import { SOCIAL_URL } from "@/lib/data";
import { getLastCommitDate } from "@/hooks/getLastCommitDate";

export const Footer = () => {
  const lastUpdated = getLastCommitDate();
  return (
    <footer className="text-gray-600 flex flex-col justify-between min-h-16 gap-10 mt-20 mb-4">
      <div className="flex gap-6 text-sm">
        {SOCIAL_URL.map((socialInfo) => (
          <a
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
            key={socialInfo.name}
            href={socialInfo.url}
          >
            {socialInfo.icon}
            {socialInfo.name}
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500">Last updated at {lastUpdated}</p>
    </footer>
  );
};
