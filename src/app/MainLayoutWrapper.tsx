"use client";
import Navbar from "@/components/app/Navbar";

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Navbar isBlog={false} />
      {children}
    </div>
  );
} 