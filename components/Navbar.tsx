import Link from "next/link";
import Image from "next/image";
import logoStatic from "@/public/logo.svg";
import logoHover from "@/public/logo-hover.svg";

export const Navbar = () => {
  return (
    <nav className="w-full h-12 flex gap-6 items-center justify-between text-sm mb-6">
      <Link
        href="/"
        className="relative group inline-flex items-center justify-center hover:cursor-pointer"
      >
        <div className="relative w-[35px] h-[35px] transition-all duration-200 group-hover:opacity-0">
          <Image
            src={logoStatic}
            alt="Logo"
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute w-[47px] h-[47px] invisible md:visible transition-all duration-200 opacity-0 group-hover:opacity-100">
          <Image
            src={logoHover}
            alt="Logo hover"
            className="object-contain"
          />
        </div>
      </Link>
      <div className="flex gap-8">
        <Link href="/work" className="hover:font-bold transition-all" prefetch>
          work
        </Link>
        <Link href="/blog" className="hover:font-bold transition-all">
          blog
        </Link>
      </div>
    </nav>
  );
};
