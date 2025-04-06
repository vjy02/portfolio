"use client";

import { useTheme } from "next-themes";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import profileImg from "../../../public/img/portrait.jpg";
import Image from "next/image";

export default function Home(): JSX.Element {
  const { theme } = useTheme();

  return (
    <section
      id="hero"
      className="flex flex-col w-[80vw] md:w-[50vw] min-h-[35vh] md:h-[60vh] mt-[10vh] md:mt-0 gap-4 md:gap-5 justify-end"
    >
      <div

      >
        <h3 className="text-xl md:text-3xl mb-2">Hello, my name is Victor.</h3>
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Crafting web{" "}
          <span className="gradient-text relative">experiences.</span>
        </h1>
        <div className="flex flex-col md:flex-row md:gap-10">
          <h4 className="text-sm md:text-md font-semibold mb-4">
            📍 Melbourne, Australia
          </h4>
          <h4 className="text-sm md:text-md font-semibold">💼 SWE @ Canva</h4>
        </div>
      </div>

      <div
        className="flex w-[45%] md:w-[15%] justify-between"
      >
        <IconButton
          aria-label="Github.com"
          onClick={() => window.open("https://github.com/vjy02")}
          sx={{
            "&:hover": {
              backgroundColor: theme === "dark" ? "white" : "black",
            },
            "& .icon": { color: theme === "dark" ? "white" : "black" },
            "&:hover .icon": { color: theme === "dark" ? "black" : "white" },
          }}
        >
          <GitHubIcon className="icon" />
        </IconButton>

        <IconButton
          aria-label="Linkedin.com"
          onClick={() =>
            window.open("https://www.linkedin.com/in/victoryoshida02/")
          }
          sx={{
            "&:hover": {
              backgroundColor: theme === "dark" ? "white" : "black",
            },
            "& .icon": { color: theme === "dark" ? "white" : "black" },
            "&:hover .icon": { color: theme === "dark" ? "black" : "white" },
          }}
        >
          <LinkedInIcon className="icon" />
        </IconButton>

        <IconButton
          href="mailto:victorjohyoshida@gmail.com"
          sx={{
            "&:hover": {
              backgroundColor: theme === "dark" ? "white" : "black",
            },
            "& .icon": { color: theme === "dark" ? "white" : "black" },
            "&:hover .icon": { color: theme === "dark" ? "black" : "white" },
          }}
        >
          <EmailIcon className="icon" />
        </IconButton>
      </div>

      <div
      >
        <Button
          variant="ring"
          className="w-32 mt-2 md:w-36 md:mt-6"
          onClick={() =>
            window.open(
              "https://drive.google.com/file/d/1iodvGx4BBUiv2N_dYpuDZCga66FYzn5g/view?usp=sharing",
              "_blank"
            )
          }
        >
          <FileTextIcon className="mr-2 h-4 w-4" />
          Resume
        </Button>
      </div>
    </section>
  );
}
