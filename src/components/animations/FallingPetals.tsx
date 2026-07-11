"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PetalProps {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
  rotation: number;
  isWhite: boolean;
}

export function FallingPetals() {
  const [petals, setPetals] = useState<PetalProps[]>([]);

  useEffect(() => {
    // Generate petals only on client to avoid hydration mismatch
    const generatedPetals: PetalProps[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      animationDuration: 10 + Math.random() * 15, // 10-25 seconds
      delay: Math.random() * 10,
      size: 15 + Math.random() * 20, // 15-35px
      rotation: Math.random() * 360,
      isWhite: Math.random() > 0.5,
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-50px]"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            duration: petal.animationDuration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full h-full ${petal.isWhite ? 'opacity-20' : 'opacity-40'}`}
          >
            <path
              d="M12 2C12 2 14.5 7 18 8.5C18 8.5 14.5 10 12 15C12 15 9.5 10 6 8.5C6 8.5 9.5 7 12 2Z"
              fill={petal.isWhite ? "#FFFFFF" : "#DAB8B8"}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
