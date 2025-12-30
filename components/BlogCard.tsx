import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export const BlogCard = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => (
  <Link
    href={link}
    prefetch={true}
    className="group flex items-center justify-between pr-1 relative transition-all ease-out border-transparent border-l-1 hover:pl-4 hover:border-l-3 hover:border-gray-600"
  >
    <div className="transition-opacity duration-300 group-hover:opacity-90 max-w-10/12">
      <h3 className="font-bold">{title}</h3>
      <p className="text-xs text-gray-500 line-clamp-2 min-h-[2rem] mr-2">
        {description}
      </p>
    </div>
    <span className="flex items-center">
      <span className="block w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-4"></span>
      <IoIosArrowForward className="text-lg transition-transform duration-300" />
    </span>
  </Link>
);
