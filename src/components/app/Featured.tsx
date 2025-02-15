"use client"

import { useRef, useEffect } from "react";
import { FeaturedCarousel } from "./components/FeaturedCarousel";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Featured(): JSX.Element {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  let scaleValue = useTransform(scrollYProgress, [0, 0.7], ['0', '1']);

  return (
    <section id="featured" className="min-h-[55vh] lg:h-fit w-[80vw] md:w-[50vw] flex flex-col justify-between items-center relative mt-24 mb-12 md:mt-32 md:mb-24">
      <div className="flex flex-col items-center justify-between">
        <section ref={ref}>
          <motion.h1 
            className="relative text-3xl md:text-5xl mb-5 md:mb-16"
            style={{ opacity: scaleValue }}
          >
            things I built.
          </motion.h1>
        </section>
        
        <motion.div
          style={{ opacity: scaleValue}}
        >
        </motion.div>
      </div>
    </section>
  );
}
