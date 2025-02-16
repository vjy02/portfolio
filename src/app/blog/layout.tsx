import type { Metadata } from "next";
import BlogLayoutWrapper from "./BlogLayoutWrapper";

export const metadata: Metadata = {
  title: "Blog - Victor Yoshida",
  description: "Victor Yoshida's blog posts and articles",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlogLayoutWrapper>{children}</BlogLayoutWrapper>;
}
