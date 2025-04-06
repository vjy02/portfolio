"use client";

import Hero from "../components/app/Hero";
import Featured from "../components/app/Featured";
import ContactMe from "../components/app/ContactMe";
import Experience from "../components/app/BlogPosts";

import useOnScreen from "../hooks/onView";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import BlogPosts from "../components/app/BlogPosts";
import MainLayoutWrapper from "./MainLayoutWrapper";
import { getAllPostSlugs, getPostData } from "@/lib/markdown";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const contactMeRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  const heroInView = useOnScreen(heroRef);
  const featuredInView = useOnScreen(featuredRef);
  const contactMeInView = useOnScreen(contactMeRef);
  const experienceInView = useOnScreen(postsRef);

  // Priority check to determine which one to mark
  const currentView = heroInView
    ? "hero"
    : experienceInView
    ? "experience"
    : contactMeInView
    ? "contact"
    : featuredInView
    ? "featured"
    : null;

  const { theme } = useTheme();
  return (
    <MainLayoutWrapper>
      <div className="flex flex-col items-center p-10 md:p-0" style={{scrollbarGutter: "stable"}}>
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={postsRef}>
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
          className="hidden md:flex fixed -top-10 right-[20%] px-0 py-[10px] h-full items-center justify-between"
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
    </MainLayoutWrapper>
  );
}
