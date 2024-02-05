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

export function FeaturedCarousel(): JSX.Element{
  let [current, setCurrent] = useState(0)
  let isMobile = window.innerWidth <= 768;
  useEffect(()=>{
    isMobile = window.innerWidth <= 768
  },[window.innerWidth])

  return (
    <Carousel className="w-[85vw] md:max-w-[60vw] pointer-events-none md:pointer-events-auto" orientation={isMobile ? "vertical" : "horizontal"}>
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-[64%]">
                {isMobile ? (
                  <Card className="flex flex-col">
                    <CardHeader className="">
                      <CardTitle>CulinaryAI</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <Image src={culinaryAI} alt="project image" className="rounded-md brightness-50"></Image>
                    </CardContent>
                    <CardFooter className="">
                      <div className="flex gap-2 md:gap-6">
                        <Badge variant="outline" className="text-xs md:text-sm">Next.js</Badge>
                        <Badge variant="outline" className="text-xs md:text-sm">Typescript</Badge>
                        <Badge variant="outline" className="text-xs md:text-sm">MongoDB</Badge>
                        <Badge variant="outline" className="text-xs md:text-sm">OAuth</Badge>
                      </div>
                    </CardFooter>
                  </Card>
                )
                :(
                  <Card className="flex flex-col">
                    <CardHeader className="">
                      <CardTitle>CulinaryAI</CardTitle>
                      <CardDescription >Generate recipes using the power of AI! Select ingredients and diet then watch the magic happen. Saving and favoriting your favorite recipes are also possible through an easy process of just connecting your Google account.</CardDescription>
                    </CardHeader>
                    <CardContent className="invisible md:visible">
                      <Image src={culinaryAI} alt="project image" className="rounded-md brightness-50"></Image>
                    </CardContent>
                      <CardFooter className="invisible md:visible">
                        <div className="flex gap-6">
                          <Badge variant="outline" className="text-sm">Next.js</Badge>
                          <Badge variant="outline" className="text-sm">Typescript</Badge>
                          <Badge variant="outline" className="text-sm">MongoDB</Badge>
                          <Badge variant="outline" className="text-sm">OAuth</Badge>
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
