import { IoIosArrowForward } from "react-icons/io";
import { SOCIAL_URL } from "@/lib/data";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="text-sm flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">about</h2>
        <p>
          I&apos;m a <strong>frontend</strong> focused software engineer
          currently working at <strong>Canva</strong>. Based in{" "}
          <strong>Melbourne, Australia</strong> with a deep passion for building
          solutions to problems or tinkering something up just for fun
        </p>
        <p>
          You can reach out to me via everyones favorite platform{" "}
          <a
            href="https://www.linkedin.com/in/victoryoshida02"
            className="font-bold underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          or send over an email to <strong>test@gmail.com</strong>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">recent blog</h2>
        <Link
          href="/"
          className="group flex items-center justify-between relative py-2 pr-4 transition-all ease-out border-transparent border-l-1 hover:pl-4 hover:border-l-4 hover:border-gray-600"
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
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">some projects</h2>
        <div className="flex gap-1">
          <div className="flex-1 min-w-0 h-64 bg-red-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
            <h3 className="font-semibold truncate">HackMelbourne</h3>
          </div>
          <div className="flex-1 min-w-0 h-64 bg-green-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
            <h3 className="font-semibold truncate">CulinaryAI</h3>
          </div>
          <div className="flex-1 min-w-0 h-64 bg-blue-400 rounded p-6 transition-all duration-300 hover:flex-[2]">
            <h3 className="font-semibold truncate">RateMyDorm</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
