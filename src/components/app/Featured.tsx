"use client";

import { useRef, useEffect } from "react";
import { FeaturedProjectsFlex } from "./components/FeaturedProjectsFlex";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Featured(): JSX.Element {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  let scaleValue = useTransform(scrollYProgress, [0, 0.7], ["0", "1"]);

  return (
    <motion.section
      className="min-h-[55vh] w-[80vw] md:w-[50vw] flex flex-col justify-between items-center relative"
      style={{ opacity: scaleValue }}
    >
      <h1
        className="relative text-3xl md:text-5xl mt-24 mb-12 md:mt-32 md:mb-24"
        ref={ref}
      >
        things I built.
      </h1>
      <FeaturedProjectsFlex />
      <div id="featured" className="absolute -bottom-48"></div>
    </motion.section>
  );
}
