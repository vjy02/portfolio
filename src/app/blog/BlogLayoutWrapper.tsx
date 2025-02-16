"use client";
import Navbar from "@/components/app/Navbar";

export default function BlogLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Navbar isBlog={true} />
      {children}
    </div>
  );
} 