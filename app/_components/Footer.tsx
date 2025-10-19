import { RxExternalLink } from "react-icons/rx";
import { EXTERNAL_URL } from "../_lib/url";
import { getLastCommitDate } from "../_lib/getLastCommitDate";

export const Footer = () => {
  const lastUpdated = getLastCommitDate();
  return (
    <footer className="text-gray-600 flex flex-col justify-between min-h-16">
      <div className="flex gap-6">
        <a
          className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          href={EXTERNAL_URL.LINKEDIN}
        >
          <RxExternalLink />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          href={EXTERNAL_URL.GITHUB}
        >
          <RxExternalLink />
          Github
        </a>
      </div>
      <p className="text-sm text-gray-500">Last updated at {lastUpdated}</p>
    </footer>
  );
};
