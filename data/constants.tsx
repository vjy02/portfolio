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
    logo: "/canvalogo.png",
    date: "Feb. 2025 - Present",
    roles: [
      {
        title: "Software Engineer",
        description:
          "Focusing on enabling our Business and Enterprise users to best use Canva and develop Enterprise wanted features across the product.",
      },
      {
        title: "Associate Software Engineer",
        description:
          "Drove monetisation through Canva Teams. Developing, experimenting and productionising features that drove MAU/ARR gains.",
      },
    ],
  },
  {
    company: "Elentar",
    link: "https://www.elentar.com",
    logo: "/elentarlogo.png",
    date: "May 2024 - Feb. 2025",
    roles: [
      {
        title: "Software Engineer",
        description:
          "Founding frontend engineer, developed a web app used by national energy distributors to monitor and analyse their renewable energy devices.",
      },
    ],
  },
  {
    company: "Commonwealth Bank",
    link: "https://www.commbank.com.au",
    logo: "/cbalogo.png",
    date: "Nov. 2023 - Feb. 2024",
    roles: [
      {
        title: "Software Engineer Intern",
        description:
          "Created an automated internal test tool web app from scratch, replacing an old deprecated Java version used by test engineers.",
      },
    ],
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
    desc: "summarise reddit",
    color: "bg-[#FF4500] text-white",
    github: "https://github.com/vjy02/reddit-search",
    link: "https://github.com/vjy02/reddit-search",
    image: "/redditproject.PNG",
  },
  {
    title: "Clackmarket",
    desc: "keeb marketplace",
    color: "bg-teal-600 text-white",
    github: "https://github.com/vjy02/clackmarket",
    link: "https://www.clackmarket.com/",
    image: "/clackmarket.png",
  },
];
