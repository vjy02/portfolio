"use client";

import Hero from "../components/app/Hero";
import Featured from "../components/app/Featured";
import ContactMe from "../components/app/ContactMe";
import Experience from "../components/app/Experience";

import useOnScreen from "../hooks/onView";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const contactMeRef = useRef<HTMLDivElement>(null);
  //const experiencesRef = useRef<HTMLDivElement>(null);

  const heroInView = useOnScreen(heroRef);
  const featuredInView = useOnScreen(featuredRef);
  const contactMeInView = useOnScreen(contactMeRef);
  //const experiencesInView = useOnScreen(experiencesRef)

  const { theme } = useTheme();
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1000);
  const isMobile = width <= 768;
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 p-10 md:p-0">
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={featuredRef}>
        <Featured />
      </div>
      <div ref={contactMeRef}>
        <ContactMe />
      </div>
      <div className={`fixed flex top-0 right-[55px] px-0 py-[10px] h-full items-center justify-between ${isMobile ? "hidden" : ""}`}>
        <div className="block list-none m-0 p-0">
          <a
            className={`block px-[2px] py-[9px] mx-0 my-[2px] ${theme === 'dark' ? 'bg-gray-500' : "bg-gray-200"} transition-all duration-300 ease-in-out 
            ${heroInView ? `py-[19px] ${theme === 'dark' ? 'bg-white' : 'bg-slate-900'}` : ""}`}
          >
            <span></span>
          </a>
          <a
            className={`block px-[2px] py-[9px] mx-0 my-[2px] ${theme === 'dark' ? 'bg-gray-500' : "bg-gray-200"} transition-all duration-300 ease-in-out ${
              featuredInView ? `py-[19px] ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'}` : ""}`}
          >
            <span></span>
          </a>
          <a
            className={`block px-[2px] py-[9px] mx-0 my-[2px] ${theme === 'dark' ? 'bg-gray-500' : "bg-gray-200"} transition-all duration-300 ease-in-out ${
              contactMeInView ? `py-[19px] ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'}` : ""}`}
          >
            <span></span>
          </a>
        </div>
      </div>
    </div>
  );
}
