'use client'

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
export default function Home() {

  return (
    <div className="flex flex-col w-[85%] h-[60vh] md:h-[90vh] gap-4 md:gap-5 justify-center border border-red-300 ">
      <div>
        <h3 className="text-xl md:text-3xl mb-2">
          Hello, I'm Victor.
        </h3>
        <h1 className="text-3xl md:text-5xl">
          I'm a software engineer based in Melbourne.
        </h1>     
      </div>

      <div className="flex w-[40%] md:w-[10%] justify-between">
        <IconButton aria-label="Github.com" onClick={() => window.open('https://github.com/vjy02')} style={{ color: 'black' }}>
          <GitHubIcon />
        </IconButton>

        <IconButton aria-label="Linkedin.com" onClick={() => window.open('https://www.linkedin.com/in/victoryoshida02/')} style={{ color: 'black' }}>
          <LinkedInIcon />
        </IconButton>

        <IconButton style={{ color: 'black' }}>
          <EmailIcon />
        </IconButton>
      </div>

    </div>
  )
}