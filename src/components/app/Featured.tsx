"use client"

import { useRef } from "react";
import { FeaturedCarousel } from "./custom-ui/FeaturedCarousel";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Featured(): JSX.Element {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref
  });
  let scaleValue = useTransform(scrollYProgress, [0.2, 1], ['1', '0.1']);

  return (
    <div id="featured" className="min-h-[55vh] lg:h-[100vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-between">
        <section           ref={ref}>
        <h1 
          className="relative text-3xl md:text-5xl mb-5 md:mb-16 font-bold"
        >
          Featured Projects
          <motion.div className="-z-10 absolute -bottom-3 left-0 right-0 h-1 bg-current" style={{ scaleX: scaleValue }}></motion.div>
        </h1>
        </section>
        
        <motion.div
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.75
          }}
        >
          <FeaturedCarousel />
        </motion.div>
      </div>
    </div>
  );
}
