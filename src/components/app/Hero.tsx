'use client'

import { useTheme } from "next-themes";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import { FileTextIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button"
export default function Home(): JSX.Element {
  const { theme } = useTheme();
  return (
    <div id="hero" className="flex flex-col w-[85vw] min-h-[35vh] md:min-h-[100vh] md:h-[100vh] mt-[10vh] md:mt-0 gap-4 md:gap-5 justify-center">
      <div>
        <h3 className="text-xl md:text-3xl mb-2">
          Hello, my name is Victor.
        </h3>
        <h1 className="text-3xl md:text-5xl">
          I am a software engineer based in Melbourne.
        </h1>     
      </div>

      <div className="flex w-[40%] md:w-[11%] justify-between">
        <IconButton aria-label="Github.com" onClick={() => window.open('https://github.com/vjy02')} sx={{ '&:hover': { backgroundColor: theme === 'dark' ? 'white' : 'black' }, '& .icon': { color: theme === 'dark' ? 'white' : 'black' }, '&:hover .icon': { color: theme === 'dark' ? 'black' : 'white' }}}>
            <GitHubIcon className="icon"/>
        </IconButton>

        <IconButton aria-label="Linkedin.com" onClick={() => window.open('https://www.linkedin.com/in/victoryoshida02/')} sx={{ '&:hover': { backgroundColor: theme === 'dark' ? 'white' : 'black' }, '& .icon': { color: theme === 'dark' ? 'white' : 'black' }, '&:hover .icon': { color: theme === 'dark' ? 'black' : 'white' }}}>
            <LinkedInIcon className="icon"/>
        </IconButton>

        <IconButton sx={{ '&:hover': { backgroundColor: theme === 'dark' ? 'white' : 'black' }, '& .icon': { color: theme === 'dark' ? 'white' : 'black' }, '&:hover .icon': { color: theme === 'dark' ? 'black' : 'white' }}} >
            <EmailIcon className="icon"/>
        </IconButton>
      </div>
      <Button className="w-32 mt-2 md:w-36 md:mt-6">
          <FileTextIcon className="mr-2 h-4 w-4"/>
          <a href="/VYResume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
      </Button>
    </div>
  )
}