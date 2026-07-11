"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingFlowerProps {
  size?: number;
  color?: string; // Optional SVG color
  className?: string;
  delay?: number;
  duration?: number;
}

export function FloatingFlower({
  size = 40,
  color = "#DAB8B8",
  className = "",
  delay = 0,
  duration = 20,
}: FloatingFlowerProps) {
  const [mounted, setMounted] = useState(false);
  const [randomX, setRandomX] = useState(0);

  useEffect(() => {
    setMounted(true);
    setRandomX(Math.random() * 20 - 10);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ y: 0, opacity: 0.6, rotate: 0 }}
      animate={{
        y: [0, -20, 0, 15, 0],
        x: [0, randomX, 0, -randomX, 0],
        rotate: [0, 10, -5, 15, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={`absolute ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C12 2 14.5 7 18 8.5C18 8.5 14.5 10 12 15C12 15 9.5 10 6 8.5C6 8.5 9.5 7 12 2Z"
          fill={color}
          opacity="0.7"
        />
        <path
          d="M12 15C12 15 15.5 17 17 21C17 21 13 20 12 17C12 17 11 20 7 21C7 21 8.5 17 12 15Z"
          fill={color}
          opacity="0.5"
        />
        <circle cx="12" cy="11.5" r="1.5" fill="#C9A66B" />
      </svg>
    </motion.div>
  );
}
