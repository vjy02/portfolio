"use client";

import Hero from "../components/app/Hero";
import Featured from "../components/app/Featured";
import ContactMe from "../components/app/ContactMe";
import Experience from "../components/app/BlogPosts";

import useOnScreen from "../hooks/onView";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import BlogPosts from "../components/app/BlogPosts";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const contactMeRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const heroInView = useOnScreen(heroRef);
  const featuredInView = useOnScreen(featuredRef);
  const contactMeInView = useOnScreen(contactMeRef);
  const experienceInView = useOnScreen(experienceRef);

  // Priority check to determine which one to mark
  const currentView = heroInView
    ? "hero"
    : experienceInView
    ? "experience"
    : featuredInView
    ? "featured"
    : contactMeInView
    ? "contact"
    : null;

  const { theme } = useTheme();
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1000
  );
  const isMobile = width <= 768;
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-10 md:p-0">
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={experienceRef}>
        <BlogPosts />
      </div>
      <div ref={featuredRef}>
        <Featured />
      </div>
      <div ref={contactMeRef}>
        <ContactMe />
      </div>
      {/* Page Indicator Component */}
      <div
        className={`flex fixed -top-10 right-1/4 px-0 py-[10px] h-full items-center justify-between ${
          isMobile ? "hidden" : ""
        }`}
      >
        <div className="block list-none m-0 p-0">
          <a
            className={`block px-[2px] mx-0 my-[2px] ${
              theme === "dark" ? "bg-gray-500" : "bg-gray-200"
            } transition-all duration-300 ease-in-out ${
              currentView === "hero"
                ? `py-[19px] ${
                    theme === "dark"
                      ? "bg-white py-[30px]"
                      : "bg-gray-900 py-[30px]"
                  }`
                : "py-[15px]"
            }`}
          >
            <span></span>
          </a>
          <a
            className={`block px-[2px] mx-0 my-[2px] ${
              theme === "dark" ? "bg-gray-500" : "bg-gray-200"
            } transition-all duration-300 ease-in-out ${
              currentView === "experience"
                ? `py-[19px] ${
                    theme === "dark"
                      ? "bg-white py-[30px]"
                      : "bg-gray-900 py-[30px]"
                  }`
                : "py-[15px]"
            }`}
          >
            <span></span>
          </a>
          <a
            className={`block px-[2px] mx-0 my-[2px] ${
              theme === "dark" ? "bg-gray-500" : "bg-gray-200"
            } transition-all duration-300 ease-in-out ${
              currentView === "featured"
                ? `py-[19px] ${
                    theme === "dark"
                      ? "bg-white py-[30px]"
                      : "bg-gray-900 py-[30px]"
                  }`
                : "py-[15px]"
            }`}
          >
            <span></span>
          </a>
          <a
            className={`block px-[2px] mx-0 my-[2px] ${
              theme === "dark" ? "bg-gray-500" : "bg-gray-200"
            } transition-all duration-300 ease-in-out ${
              currentView === "contact"
                ? `py-[19px] ${
                    theme === "dark"
                      ? "bg-white py-[30px]"
                      : "bg-gray-900 py-[30px]"
                  }`
                : "py-[15px]"
            }`}
          >
            <span></span>
          </a>
        </div>
      </div>
    </div>
  );
}
