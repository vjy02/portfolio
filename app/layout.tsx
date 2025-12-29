import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Victor Yoshida",
    template: "%s | Victor Yoshida",
  },
  description: "My personal portfolio",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
    other: [
      {
        rel: "icon",
        url: "/logo.svg",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/logo.svg",
        sizes: "16x16",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexMono.variable} antialiased max-w-xl mx-auto w-full min-h-screen px-8 py-3`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
