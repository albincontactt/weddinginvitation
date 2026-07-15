"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

interface Particle {
  x: string; y: string;
  delay: number; duration: number;
  size: number; opacity: number;
}

interface Ray {
  angle: number; left: string;
  opacity: number; delay: number;
  duration: number; width: string;
}

export function CinematicBackground() {
  const { scrollYProgress } = useScroll();
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const rayY    = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const [stars, setStars] = useState<Particle[]>([]);
  const [rays,  setRays]  = useState<Ray[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 100 }, () => ({
        x:        `${Math.random() * 100}%`,
        y:        `${Math.random() * 100}%`,
        delay:    Math.random() * 9,
        duration: 2.5 + Math.random() * 5,
        size:     Math.random() * 2.2 + 0.4,
        opacity:  0.25 + Math.random() * 0.75,
      }))
    );
    setRays(
      Array.from({ length: 7 }, (_, i) => ({
        angle:    -22 + i * 8,
        left:     `${15 + i * 11}%`,
        opacity:  0.016 + Math.random() * 0.022,
        delay:    i * 1.3,
        duration: 7 + Math.random() * 6,
        width:    `${55 + Math.random() * 90}px`,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">

      {/* Layer 1 — Pure midnight black base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Layer 2 — Subtle deep gradient (very faint warm black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0700] via-[#050505] to-[#020202]" />

      {/* Layer 3 — Top cinematic spotlight bloom (gold) */}
      <div
        className="absolute top-[-8%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "110vw",
          height: "70vh",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 40%, transparent 68%)",
        }}
      />

      {/* Layer 4 — Side vignette blacks (deepen the edges) */}
      <div className="absolute inset-y-0 left-0 w-[18vw] bg-gradient-to-r from-[#000000]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[18vw] bg-gradient-to-l from-[#000000]/80 to-transparent pointer-events-none" />

      {/* Layer 5 — Lower warm gold pedestal glow */}
      <div
        className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "65vw",
          height: "45vh",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Layer 6 — Volumetric god-rays */}
      <motion.div style={{ y: rayY }} className="absolute inset-0 overflow-hidden">
        {rays.map((ray, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 origin-top"
            style={{
              left:   ray.left,
              width:  ray.width,
              rotate: ray.angle,
              background:
                "linear-gradient(to bottom, rgba(212,175,55,0.85) 0%, rgba(212,175,55,0.15) 40%, transparent 100%)",
            }}
            animate={{ opacity: [ray.opacity, ray.opacity * 2.8, ray.opacity] }}
            transition={{
              duration: ray.duration,
              repeat: Infinity,
              delay:  ray.delay,
              ease:   "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Layer 7 — Slow drifting gold aurora bands */}
      <motion.div style={{ y: auroraY }} className="absolute inset-0">
        <motion.div
          className="absolute left-[-15%] w-[70%] rounded-full blur-[140px]"
          style={{
            height: "30vh",
            top: "35%",
            background:
              "linear-gradient(90deg, rgba(180,140,20,0.12), rgba(212,175,55,0.07), transparent)",
          }}
          animate={{ x: ["0%", "14%", "0%"], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-15%] w-[60%] rounded-full blur-[140px]"
          style={{
            height: "25vh",
            top: "55%",
            background:
              "linear-gradient(270deg, rgba(180,140,20,0.12), rgba(212,175,55,0.06), transparent)",
          }}
          animate={{ x: ["0%", "-12%", "0%"], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        {/* Very faint warm ivory streak */}
        <motion.div
          className="absolute left-[25%] w-[50%] rounded-full blur-[160px]"
          style={{
            height: "18vh",
            top: "65%",
            background:
              "linear-gradient(90deg, transparent, rgba(245,240,228,0.04), transparent)",
          }}
          animate={{ scaleX: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />
      </motion.div>

      {/* Layer 8 — Film-grain noise texture */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{ backgroundImage: NOISE_SVG, backgroundSize: "200px 200px" }}
      />

      {/* Layer 9 — Scroll-parallax fine gold hairlines */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-[0.035]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            style={{ top: `${8 + i * 9}%` }}
          />
        ))}
      </motion.div>

      {/* Layer 10 — Star-field sparkles (gold + ivory) */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: s.x, top: s.y,
            width: s.size, height: s.size,
            background: i % 4 === 0 ? "#F8F4EC" : "#D4AF37",
          }}
          animate={{ opacity: [0, s.opacity, 0], scale: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay:  s.delay,
            ease:   "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
