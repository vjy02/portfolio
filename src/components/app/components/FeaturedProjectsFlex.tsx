"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import culinaryAI from "../../../../public/img/culinaryAI.png";
import hackMelb from "../../../../public/img/hackMelb.png";
import groupSpace from "../../../../public/img/groupSpace.jpg";
import { IconButton } from "@mui/material";
import { useTheme } from "next-themes";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";

export function FeaturedProjectsGrid(): JSX.Element {
  const featuredProjects = [
    {
      title: "CulinaryAI",
      desc: "Generate recipes using the power of AI! Select ingredients and diet then watch the magic happen.",
      stack: ["Next.js", "TypeScript", "MongoDB", "OAuth"],
      img: culinaryAI,
      link: "https://culinaryaiv2.netlify.app/",
      repoLink: "https://github.com/vjy02/culinary-ai-v2.0",
    },
    {
      title: "HackMelbourne",
      desc: "Part of my role as a Website Officer, I helped develop the revamped HackMelbourne website.",
      stack: ["React.js", "TypeScript", "TailwindCSS"],
      img: hackMelb,
      link: "https://hack.melbourne/",
      repoLink: "https://github.com/HackMelbourne/HackMelbourne.github.io",
    },
    {
      title: "GroupSpace",
      desc: "Unihack 2024 project: A web app for tutors to create virtual spaces for student connections.",
      stack: ["React.js", "Firebase", "Node.js"],
      img: groupSpace,
      link: "https://devpost.com/software/groupspace",
      repoLink: "https://github.com/ReadME-hackathon/UNIHACK",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-[90%] self-start">
      {featuredProjects.map((project, index) => (
        <div
          key={index + project.title}
          className="cursor-default h-64 md:h-80 md:w-46 2xl:h-96 2xl:w-46 flex flex-col gap-2 md:justify-between md:p-4 md:border-gray-100 dark:border-gray-800 dark:hover:border-gray-600 md:border-2 rounded-md hover:border-gray-300 hover:-translate-y-2 transition-all ease-in-out duration-300 transform"
        >
          <div className="h-3/5 md:h-2/6 relative border rounded-xl">
            <Image
              src={project.img}
              alt=""
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div>
            <h1 className="text-lg md:text-base 2xl:text-xl font-semibold mb-2">
              {project.title}
            </h1>
            <p className="text-xs 2xl:text-sm font-light">{project.desc}</p>
          </div>

          <div className="flex gap-4 mt-2">
            {project.repoLink && (
              <button
                onClick={() => window.open(project.link, "_blank")}
                className="text-xs flex items-center py-2 px-3 gap-1 bg-gray-800 text-white md:border-gray-100 dark:border-gray-800 dark:bg-black dark:hover:border-gray-600 md:border-2 rounded-md hover:border-gray-500 duration-300 transform"
              >
                <GitHubIcon className="text-xs" />
                Code
              </button>
            )}
            {project.link && (
              <button
                onClick={() => window.open(project.link, "_blank")}
                className="flex text-xs items-center py-1 px-3 gap-1 md:border-gray-100 dark:border-gray-800 dark:hover:border-gray-600 md:border-2 rounded-md hover:border-gray-300 duration-300 transform"
              >
                <LaunchIcon className="text-xs" />
                Link
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
