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

import culinaryAI from "../../../img/culinaryAI.png"
import hackMelb from "../../../img/hackMelb.png"

export function FeaturedCarousel(): JSX.Element{
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const featuredProjects = [
    {
      title: "CulinaryAI",
      desc: "Generate recipes using the power of AI! Select ingredients and diet then watch the magic happen. Saving and favoriting your favorite recipes are also possible through an easy process of just connecting your Google account.",
      stack: ["Next.js", "TypeScript", "MongoDB", "OAuth"],
      img: culinaryAI
    },
    {
      title: "HackMelbourne",
      desc: "Part of my role as a Website Officer, I helped develop the revamped HackMelbourne website. In a group of 4 contributors, we developed this project in an agile manner, having 2 weeks sprints ensuring features were made in a timely and concise manner.",
      stack: ["Next.js", "TypeScript", "TailwindCSS"],
      img: hackMelb
    },
    {
      title:"Coming Soon",
      desc: "Coming Soon.",
      stack: [],
      img: ""
    }
  ]
  
  return (
    <Carousel className="w-[85vw] md:max-w-[60vw] pointer-events-none md:pointer-events-auto" orientation={isMobile ? "vertical" : "horizontal"}>
      <CarouselContent>
        {featuredProjects.map((project, index) => (
          <CarouselItem key={index} className="md:basis-[64%]">
                {isMobile ? (
                  <Card className="flex flex-col">
                    <CardHeader className="">
                      <CardTitle>{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="brightness-50 hover:brightness-100">
                      <Image src={project.img} alt="project image" className="rounded-md"></Image>
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
                  <Card className="flex flex-col">
                    <CardHeader className="">
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription >{project.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="invisible md:visible">
                      <Image src={project.img} alt="project image" className="brightness-75 hover:cursor-pointer hover:brightness-100 transition ease-in-out duration-500 rounded-md border"></Image>
                    </CardContent>
                      <CardFooter className="invisible md:visible">
                        <div className="flex gap-6">
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
