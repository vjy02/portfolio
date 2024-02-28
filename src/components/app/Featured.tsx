"use client"

import { useRef, useEffect } from "react";
import { FeaturedCarousel } from "./custom-ui/FeaturedCarousel";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Featured(): JSX.Element {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  let scaleValue = useTransform(scrollYProgress, [0, 0.7], ['0', '1']);

  return (
    <div id="featured" className="min-h-[55vh] lg:h-[100vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-between">
        <section ref={ref}>
          <motion.h1 
            className="relative text-3xl md:text-5xl mb-5 md:mb-16 font-bold"
            style={{ opacity: scaleValue }}
          >
            Featured Projects
          </motion.h1>
        </section>
        
        <motion.div
          style={{ opacity: scaleValue}}
        >
          <FeaturedCarousel />
        </motion.div>
      </div>
    </div>
  );
}
