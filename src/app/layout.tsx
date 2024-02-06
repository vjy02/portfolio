import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/app/Navbar";
import { Providers } from "./providers"
import "./globals.css";
import 'dotenv/config'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Victor Yoshida",
  description: "Portfolio website of Victor Yoshida"
};

export interface ColorMode{
  font: string,
  bg: string
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚫ </text></svg>"/>
      </head>
        <body className={`${inter.className}`}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
    </html>
  );
}
