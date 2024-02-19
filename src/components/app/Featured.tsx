"use client"

import { FeaturedCarousel } from "./custom-ui/FeaturedCarousel";
import { motion } from "framer-motion";

export default function Featured(): JSX.Element {
  return (
    <div id="featured" className="min-h-[55vh] lg:h-[100vh] flex justify-center items-center">
      <div className="flex flex-col items-center justify-between">
        <motion.h1 
          whileInView={{ opacity: 1, y : 0 }}
          initial={{  opacity: 0, y: 5 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
          className="text-3xl md:text-5xl mb-5 md:mb-16 font-bold"
        >
          Featured Projects
        </motion.h1>
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
