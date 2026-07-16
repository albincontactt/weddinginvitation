"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function TogetherForeverSection() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll for buttery cinematic motion
  const smooth = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 60,
    restDelta: 0.001,
  });

  /* ── 1. RINGS MOVEMENT (0.0 -> 0.85) ── */
  // Rings start at corners, travel to center and arrive at scroll = 0.85
  const xLeft = useTransform(smooth, [0, 0.85], ["-45vw", "-18px"]);
  const yLeft = useTransform(smooth, [0, 0.85], ["-40vh", "-5px"]);
  const rotLeft = useTransform(smooth, [0, 0.85], [-80, -10]);

  const xRight = useTransform(smooth, [0, 0.85], ["45vw", "18px"]);
  const yRight = useTransform(smooth, [0, 0.85], ["-40vh", "-5px"]);
  const rotRight = useTransform(smooth, [0, 0.85], [80, 15]);

  /* ── 2. GLOW & BLOOM (0.85 -> 0.88) ── */
  // Appear exactly when rings interlock
  const glowOpacity = useTransform(smooth, [0.84, 0.86], [0, 1]);
  const glowScale = useTransform(smooth, [0.84, 0.87], [0.5, 1.2]);
  
  const raysOpacity = useTransform(smooth, [0.85, 0.87], [0, 0.8]);
  const raysRotate = useTransform(smooth, [0.85, 1], [0, 45]);

  /* ── 3. TEXT REVEAL (0.87 -> 0.92) ── */
  const titleOpacity = useTransform(smooth, [0.87, 0.89], [0, 1]);
  const titleY = useTransform(smooth, [0.87, 0.89], [20, 0]);

  const namesOpacity = useTransform(smooth, [0.89, 0.91], [0, 1]);
  const nameLeftX = useTransform(smooth, [0.89, 0.91], [-30, 0]);
  const nameRightX = useTransform(smooth, [0.89, 0.91], [30, 0]);
  const heartScale = useTransform(smooth, [0.90, 0.92], [0, 1]);
  
  const sweepX = useTransform(smooth, [0.91, 0.95], ["-100%", "100%"]);

  /* ── 4. SCROLL AWAY (0.95 -> 1.0) ── */
  // When scrolling past the section (to the footer), move the entire fixed container up
  const containerY = useTransform(smooth, [0.95, 1], ["0vh", "-60vh"]);

  // Particles
  const [sparks, setSparks] = useState<{ x: number; y: number; delay: number; size: number; color: string }[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const colors = ["#D4AF37", "#F5D060", "#FFF8DC", "#FFE066", "#FFFFFF"];
    setSparks(
      Array.from({ length: 40 }, () => ({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        delay: Math.random() * 3,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );

    setParticles(
      Array.from({ length: 60 }, () => ({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4,
      }))
    );
  }, []);

  return (
    <section id="together-forever" className="min-h-[120vh] relative bg-transparent pointer-events-none">
      
      {/* Hide the old global rings without touching page.tsx */}
      <style>{`
        main > div.fixed.inset-0.pointer-events-none.z-20 {
          display: none !important;
        }
      `}</style>

      {/* FIXED OVERLAY FOR ENTIRE ANIMATION */}
      <motion.div 
        className="fixed inset-0 z-40 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
        style={{ y: containerY }}
      >
        
        {/* Floating golden dust */}
        <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0 flex items-center justify-center">
          {particles.map((p, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full bg-[#D4AF37]"
              style={{
                width: 2,
                height: 2,
                marginLeft: p.x,
                marginTop: p.y,
                filter: "blur(0.5px)",
              }}
              animate={{ y: [0, -50] }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* ── Title Text ── */}
        <motion.div 
          className="absolute top-[20%] flex flex-col items-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h2 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#FFF8DC] via-[#D4AF37] to-[#A67C00] drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]">
            Together Forever
          </h2>
          <div className="flex items-center gap-4 my-2">
            <div className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
            <span className="text-[#D4AF37] text-xl">✦</span>
            <div className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
          </div>
        </motion.div>

        {/* ── 3D Rings & Bloom ── */}
        <div className="relative w-full h-[400px] flex items-center justify-center">
          
          {/* Golden Bloom */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full z-0"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background: "radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0.2) 30%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Volumetric Light Rays */}
          <motion.div
            className="absolute top-1/2 left-1/2 flex items-center justify-center z-0"
            style={{ opacity: raysOpacity, scale: glowScale, rotate: raysRotate }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <div
                key={`ray-${angle}`}
                className="absolute origin-left"
                style={{
                  rotate: `${angle}deg`,
                  width: "250px",
                  height: "2px",
                  background: "linear-gradient(to right, rgba(255,248,220,0.8), transparent)",
                  filter: "blur(1px)",
                }}
              />
            ))}
          </motion.div>

          {/* Cinematic Star Sparkles */}
          <motion.div style={{ opacity: glowOpacity }} className="absolute top-1/2 left-1/2 flex items-center justify-center z-10">
            {sparks.map((s, i) => (
              <motion.div
                key={`spark-${i}`}
                className="absolute rounded-full"
                style={{
                  width: s.size,
                  height: s.size,
                  marginLeft: s.x,
                  marginTop: s.y,
                  background: s.color,
                  boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
                }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: s.delay,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>

          {/* Engagement Ring (Left) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
            style={{ x: xLeft, y: yLeft, rotate: rotLeft }}
          >
            <Image
              src="/engagement_ring.png"
              alt="Platinum Engagement Ring"
              width={280}
              height={280}
              className="w-[180px] h-[180px] md:w-[280px] md:h-[280px]"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </motion.div>

          {/* Wedding Band (Right) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
            style={{ x: xRight, y: yRight, rotate: rotRight }}
          >
            <Image
              src="/wedding_band.png"
              alt="Platinum Wedding Band"
              width={260}
              height={260}
              className="w-[160px] h-[160px] md:w-[260px] md:h-[260px]"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </motion.div>
        </div>

        {/* ── Names Text ── */}
        <motion.div 
          className="absolute bottom-[20%] flex items-center justify-center font-cormorant text-4xl md:text-6xl font-bold text-[#F5F0E8] tracking-widest overflow-hidden py-2"
          style={{ opacity: namesOpacity }}
        >
          {/* Golden sweep effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              x: sweepX,
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
              transform: "skewX(-20deg)",
            }}
          />

          <motion.span style={{ x: nameLeftX }}>Joji</motion.span>
          <motion.span
            style={{ scale: heartScale }}
            className="inline-block text-red-500 mx-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
          >
            ❤️
          </motion.span>
          <motion.span style={{ x: nameRightX }}>Vandana</motion.span>
        </motion.div>

      </motion.div>
    </section>
  );
}
