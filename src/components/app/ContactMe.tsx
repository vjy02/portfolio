import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

export default function ContactMe(): JSX.Element {
  const { theme } = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  let scaleValue = useTransform(scrollYProgress, [0, 0.4], ["0", "1"]);
  return (
    <motion.section
    style={{ opacity: scaleValue }}
      id="contact-me"
      className="min-h-[40vh] md:min-h-[55vh] w-[80vw] md:w-[50vw] flex flex-col items-center relative md:mt-16"
    >
      <h1 className="relative text-3xl md:text-5xl mt-24 mb-12 md:mt-32 md:mb-24" ref={ref}>
        let&apos;s connect.
      </h1>
      <div
        className="flex w-[60%] md:w-[25%] justify-between"
      >
        <IconButton
          aria-label="Github.com"
          onClick={() => window.open("https://github.com/vjy02")}
          sx={{
            fontSize: "2rem", 
            "&:hover": {
              backgroundColor: theme === "dark" ? "white" : "black",
            },
            "& .icon": { color: theme === "dark" ? "white" : "black" },
            "&:hover .icon": { color: theme === "dark" ? "black" : "white" },
          }}
        >
          <GitHubIcon className="icon" sx={{ fontSize: "inherit" }} />
        </IconButton>
        <IconButton
          aria-label="Linkedin.com"
          onClick={() =>
            window.open("https://www.linkedin.com/in/victoryoshida02/")
          }
          sx={{
            fontSize: "2rem", 
            "&:hover": {
              backgroundColor: theme === "dark" ? "white" : "black",
            },
            "& .icon": { color: theme === "dark" ? "white" : "black" },
            "&:hover .icon": { color: theme === "dark" ? "black" : "white" },
          }}
        >
          <LinkedInIcon className="icon" sx={{ fontSize: "inherit" }} />
        </IconButton>

        <IconButton
          href="mailto:victorjohyoshida@gmail.com"
          sx={{
            fontSize: "2rem", 
            "&:hover": {
              backgroundColor: theme === "dark" ? "white" : "black",
            },
            "& .icon": { color: theme === "dark" ? "white" : "black" },
            "&:hover .icon": { color: theme === "dark" ? "black" : "white" },
          }}
        >
          <EmailIcon className="icon" sx={{ fontSize: "inherit" }} />
        </IconButton>
      </div>
      <footer className="text-xs md:text-sm text-center text-gray-500 dark:text-gray-300 w-full absolute bottom-0 md:bottom-8">
        <p>&copy; {new Date().getFullYear()} Victor Yoshida. All rights reserved.</p>
      </footer>
    </motion.section>
  );
}
