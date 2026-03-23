"use client";

import { motion } from "framer-motion";
import React from "react";

type Direction = "left" | "right" | "top" | "bottom";

interface AnimatedPageProps {
  children: React.ReactNode;
  direction?: Direction;
  duration?: number;
}

export const AnimatedPage = ({
  children,
  direction = "right",
  duration = 0.5,
}: AnimatedPageProps) => {
  const getOffset = () => {
    switch (direction) {
      case "left":
        return { x: -20, y: 0 };
      case "right":
        return { x: 20, y: 0 };
      case "top":
        return { x: 0, y: -20 };
      case "bottom":
        return { x: 0, y: 20 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...initialOffset }}
      transition={{ duration, ease: "easeInOut" }}
      style={{ overflow: "visible" }}
    >
      {children}
    </motion.div>
  );
};
