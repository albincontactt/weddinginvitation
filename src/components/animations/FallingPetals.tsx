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
  color: string;
  shape: "petal" | "circle" | "star";
  driftX: number;
}

const PETAL_COLORS = [
  "#FFFFFF",   // white
  "#FFFDD0",   // cream
  "#FFB6C1",   // blush pink
  "#FFDAB9",   // soft peach
  "#E6E6FA",   // light lavender
  "#FFF0F5",   // lavender blush
  "#D4AF37",   // gold (sparse)
];

function PetalSVG({ color, shape }: { color: string; shape: string }) {
  if (shape === "circle") {
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full opacity-60">
        <circle cx="12" cy="12" r="8" fill={color} />
      </svg>
    );
  }
  if (shape === "star") {
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full opacity-50">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill={color} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full opacity-55">
      <path
        d="M12 2C15 2 18 5 18 9C18 14 12 22 12 22C12 22 6 14 6 9C6 5 9 2 12 2Z"
        fill={color}
      />
    </svg>
  );
}

export function FallingPetals() {
  const [petals, setPetals] = useState<PetalProps[]>([]);

  useEffect(() => {
    const shapes: PetalProps["shape"][] = ["petal", "petal", "petal", "circle", "star"];
    const generated: PetalProps[] = [...Array(40)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 14 + Math.random() * 14,
      delay: Math.random() * -20,
      size: 10 + Math.random() * 18,
      rotation: Math.random() * 360,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      driftX: (Math.random() - 0.5) * 120,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-60px]"
          style={{ left: `${petal.left}%`, width: petal.size, height: petal.size }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.driftX * 0.4, petal.driftX],
            rotate: [petal.rotation, petal.rotation + 540],
          }}
          transition={{
            duration: petal.animationDuration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <PetalSVG color={petal.color} shape={petal.shape} />
        </motion.div>
      ))}
    </div>
  );
}
