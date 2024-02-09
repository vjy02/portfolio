"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

import culinaryAI from "../../../../public/img/culinaryAI.png"
import hackMelb from "../../../../public/img/hackMelb.png"
import wordle from "../../../../public/img/wordle.png"

export function FeaturedCarousel(): JSX.Element{

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
  
  const isMobile = width <= 768;

  const featuredProjects = [
    {
      title: "CulinaryAI",
      desc: "Generate recipes using the power of AI! Select ingredients and diet then watch the magic happen. Saving and favoriting your favorite recipes are also possible through an easy process of just connecting your Google account.",
      stack: ["Next.js", "TypeScript", "MongoDB", "OAuth"],
      img: culinaryAI,
      link: "https://culinaryaiv2.netlify.app/"
    },
    {
      title: "HackMelbourne",
      desc: "Part of my role as a Website Officer, I helped develop the revamped HackMelbourne website. In a group of 4 contributors, we developed this project in an agile manner, having 2 weeks sprints ensuring features were made in a timely and concise manner.",
      stack: ["Next.js", "TypeScript", "TailwindCSS"],
      img: hackMelb,
      link: "https://github.com/HackMelbourne/HackMelbourne.github.io/tree/dev"
    },
    {
      title:"Javascript Projects",
      desc: "A collection of my various mini-projects made with vanilla javascript. Main goal here was to get a grasp of the basics of DOM manipulation without any framework adding layers of simplification. Made projects such as: Wordle clone, snake game, sudoku, tic-tac-toe, etc.",
      stack: ["Javascript", "HTML", "CSS"],
      img: wordle,
      link: "https://github.com/vjy02/vanilla-js-practices"
    }
  ]
  
  return (
    <Carousel className="w-[85vw] md:max-w-[63vw] pointer-events-none md:pointer-events-auto" orientation={isMobile ? "vertical" : "horizontal"}>
      <CarouselContent>
        {featuredProjects.map((project, index) => (
          <CarouselItem key={index} className="md:basis-[64%]">
                {isMobile ? (
                  <Card className="flex flex-col">
                    <CardHeader className="">
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="brightness-90 hover:brightness-100 h-[60%]">
                      <Image src={project.img} alt="project image" className="object-cover h-[100%] rounded-md"></Image>
                    </CardContent>
                    <CardFooter className="">
                      <div className="flex gap-2 md:gap-6">
                        {project.stack.map((tech,i) => {
                          return (
                            <Badge key={i} variant="outline" className="text-xs md:text-sm hover:cursor-default">{tech}</Badge>
                          )
                        })}
                      </div>
                    </CardFooter>
                  </Card>
                )
                :(
                  <Card className="flex flex-col px-3">
                    <CardHeader className="">
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription >{project.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="invisible md:visible md:h-[65%]">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Image src={project.img} alt="project image" className=" object-cover md:h-[100%] brightness-90 hover:cursor-pointer hover:brightness-100 transition ease-in-out duration-500 rounded-md border"></Image>
                      </a>
                    </CardContent>
                    <CardFooter className="invisible md:visible">
                      <div className="flex gap-2">
                        {project.stack.map((tech,i) => {
                          return (
                            <Badge key={i} variant="outline" className="text-xs md:text-sm">{tech}</Badge>
                          )
                        })}
                      </div>
                    </CardFooter>
                  </Card>
                  )
                }
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext />
    </Carousel>
  )
}
