import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full h-12 flex gap-6 items-center justify-between text-sm mb-6">
      <Link href="/" className="text-xl font-bold font-sans-override flex">
        Victor
        <span className="hidden md:inline ml-1">Yoshida</span>
      </Link>
      <div className="flex gap-8 ">
        <Link href="/work" className="hover:underline underline-offset-6">
          work
        </Link>
        <Link href="/projects" className="hover:underline underline-offset-6">
          projects
        </Link>
        <Link href="/blog" className="hover:underline underline-offset-6">
          blog
        </Link>
      </div>
    </nav>
  );
};
