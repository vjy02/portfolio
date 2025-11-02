import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { PROJECTS } from "@/data/constants";

export const AnimatedProjectCards = () => (
  <div className="flex flex-col gap-3 md:gap-1 md:flex-row justify-between">
    {PROJECTS.map(({ title, desc, image, github, link, color }, index) => (
      <div
        key={title}
        className={`
        relative group rounded p-5 duration-300
        ${color}
        h-64
        flex-grow-0 flex-shrink-0
        md:w-[calc(100%/3)]
        md:hover:w-[calc(100%/2)]
        transition-[width] duration-300
         ${index === PROJECTS.length - 1 ? "ml-auto" : ""}
      `}
      >
        <h3 className="font-semibold truncate">{title}</h3>
        <p className="text-xs mt-2 line-clamp-1">{desc}</p>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-5 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        )}
        {link && image && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-40 md:absolute md:bottom-0 md:left-0 md:h-42"
          >
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="object-cover mt-4 md:mt-0 opacity-80 md:opacity-60 group-hover:opacity-90 rounded md:rounded-t-none w-full h-3/4 md:h-full transition-all duration-400"
            />
          </a>
        )}
      </div>
    ))}
  </div>
);
