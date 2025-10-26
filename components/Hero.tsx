import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="text-sm flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">hi, i&apos;m Victor Yoshida</h2>
        <p>
          A <strong>frontend</strong> focused software engineer currently
          working at <strong>Canva</strong>. Based in{" "}
          <strong>Melbourne, Australia</strong> with a deep passion for building
          solutions to problems or tinkering something up just for fun
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">recent blog</h2>
        <AnimatedBlogCard />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">some projects</h2>
        <AnimatedProjectCards />
      </div>
    </section>
  );
};

const AnimatedBlogCard = () => {
  return (
    <Link
      href="/"
      className="group flex items-center justify-between relative py-2 pr-4 transition-all ease-out border-transparent border-l-1 hover:pl-4 hover:border-l-3 hover:border-gray-600"
    >
      <div className="transition-opacity duration-300 group-hover:opacity-90">
        <h3 className="font-bold">The Job Search Guide</h3>
        <p className="text-xs text-gray-500">
          A short description of the blog.
        </p>
      </div>
      <span className="flex items-center">
        <span className="block w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-4"></span>
        <IoIosArrowForward className="text-lg transition-transform duration-300" />
      </span>
    </Link>
  );
};

const AnimatedProjectCards = () => {
  return (
    <div className="flex gap-1 flex-col md:flex-row">
      <div className="md:flex-1 min-w-0 h-64 bg-red-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
        <h3 className="font-semibold truncate">WIP</h3>
      </div>
      <div className="md:flex-1 min-w-0 h-64 bg-green-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
        <h3 className="font-semibold truncate">WIP</h3>
      </div>
      <div className="md:flex-1 min-w-0 h-64 bg-blue-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
        <h3 className="font-semibold truncate">WIP</h3>
      </div>
    </div>
  );
};
