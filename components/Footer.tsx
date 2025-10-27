import { FOOTER_ITEMS } from "@/lib/data";
import { getDeployDate } from "@/hooks/getDeployDate";

export const Footer = () => {
  const lastUpdated = getDeployDate();
  return (
    <footer className="text-gray-600 flex flex-col justify-between min-h-16 gap-10 mt-20 mb-4">
      <div className="flex gap-6 text-sm">
        {FOOTER_ITEMS.map((footerItem) => (
          <a
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
            key={footerItem.name}
            href={footerItem.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {footerItem.icon}
            {footerItem.name}
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500">Last updated at {lastUpdated}</p>
    </footer>
  );
};
