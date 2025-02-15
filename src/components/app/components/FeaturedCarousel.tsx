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
import Link from "next/link";

export function FeaturedCarousel(): JSX.Element {
  const featuredProjects = [
    {
      title: "CulinaryAI",
      desc: "Generate recipes using the power of AI! Select ingredients and diet then watch the magic happen. Saving and favoriting your favorite recipes are also possible through an easy process of just connecting your Google account.",
      stack: ["Next.js", "TypeScript", "MongoDB", "OAuth"],
      img: culinaryAI,
      link: "https://culinaryaiv2.netlify.app/",
    },
    {
      title: "HackMelbourne",
      desc: "Part of my role as a Website Officer, I helped develop the revamped HackMelbourne website. In a group of 4 contributors, we developed this project in an agile manner, having 2 weeks sprints ensuring features were made in a timely and concise manner.",
      stack: ["React.js", "TypeScript", "TailwindCSS"],
      img: hackMelb,
      link: "https://hack.melbourne/",
    },
    {
      title: "GroupSpace",
      desc: "My first hackathon was at Unihack 2024 where my team developed GroupSpace. It's a web application that enables tutors to establish virtual spaces where students can connect based on shared criteria such as availability, target grades, hobbies, and more.",
      stack: ["React.js", "Firebase", "Node.js"],
      img: groupSpace,
      link: "https://devpost.com/software/groupspace",
    },
  ];

  return (
    <Carousel className="w-10/12 mx-auto pointer-events-auto md:mr-32">
      <CarouselContent>
        {featuredProjects.map((project, index) => (
          <CarouselItem key={index} className="basis-[80%] md:basis-[60%] md:min-h-[500px]">
            <Link href={project.link} target="_blank">
              <Card
                className="flex flex-col px-3 py-2 bg-cover bg-center p-6 rounded-lg shadow-lg md:h-full cursor-pointer"
                style={{
                  backgroundImage: `url(${project.img.src})`,
                }}
              >
                <CardContent className="h-[30vh] md:h-[65%]">
                  {/* Card content goes here */}
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="" />
      <CarouselNext className="" />
    </Carousel>
  );
}
