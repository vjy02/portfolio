import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

export const FOOTER_ITEMS = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/victoryoshida02",
    icon: <FaLinkedin />,
  },
  {
    name: "Github",
    url: "https://github.com/vjy02/",
    icon: <FaGithub />,
  },
  {
    name: "Resume",
    url: "https://drive.google.com/file/d/1iodvGx4BBUiv2N_dYpuDZCga66FYzn5g/view?usp=sharing",
    icon: <FaFilePdf />,
  },
];

export const JOB_EXPERIENCES = [
  {
    company: "Canva",
    link: "https://www.canva.com",
    role: "Associate Software Engineer",
    date: "Feb. 2025 - Present",
    description:
      "Helping drive product growth to our B2B focused offerings through feature development and experimentation.",
  },
  {
    company: "Elentar",
    link: "https://www.elentar.com",
    date: "May 2024 - Feb. 2025",
    description:
      "Founding frontend engineer, developed a complex web app dashboard used by national energy distributors to analyse, monitor & generate reports about their renewable energy devices.",
  },
  {
    company: "Commonwealth Bank",
    link: "https://www.commbank.com.au",
    role: "Software Engineer Intern",
    date: "Nov. 2023 - Feb. 2024",
    description:
      "Created an automated test tool web app from scratch, replacing an old deprecated Java version used by 15+ test engineers.",
  },
];

export const PROJECTS = [
  {
    title: "HackMelbourne",
    desc: "website revamp",
    color: "bg-neutral-800 text-white",
    github: "https://github.com/HackMelbourne/HackMelbourne.github.io",
    link: "https://hack.melbourne/",
    image: "/hackmelbourne.PNG",
  },
  {
    title: "Reddit Search",
    desc: "budget gemini",
    color: "bg-[#FF4500] text-white",
    github: "https://github.com/vjy02/reddit-search",
    link: "https://github.com/vjy02/reddit-search",
    image: "/redditproject.PNG",
  },
  {
    title: "CulinaryAI",
    desc: "first project",
    color: "bg-emerald-600 text-white",
    github: "https://github.com/vjy02/culinary-ai-v2.0",
    link: "https://github.com/vjy02/culinary-ai-v2.0",
    image: "/culinaryai.PNG",
  },
];
