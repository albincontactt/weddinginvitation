"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function TogetherForeverSection() {
  const [sparks, setSparks] = useState<{ x: number; y: number; delay: number; size: number; color: string }[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate sparks for the center glow
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

    // Floating golden dust particles
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
    <section
      id="together-forever"
      className="min-h-[120vh] relative flex flex-col items-center justify-center overflow-hidden py-32 bg-transparent"
    >
      {/* Hide the old global rings without touching page.tsx */}
      <style>{`
        main > div.fixed.inset-0.pointer-events-none.z-20 {
          display: none !important;
        }
      `}</style>

      {/* ── Background Elements (Altar, Arch) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "80vw",
          height: "55vh",
          background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.07) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full flex justify-center opacity-70">
        <div className="w-[92vw] md:w-[65vw] max-w-3xl h-[46vw] md:h-[32vw] max-h-[400px] rounded-t-full border-[1.5px] border-[#D4AF37]/20 shadow-[0_-12px_70px_rgba(212,175,55,0.08)_inset]" />
      </div>

      {/* Floating golden dust */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
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
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: [0, 0.6, 0], y: -50 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── 3D Rings Animation Sequence ── */}
      <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-none">
        
        {/* Golden Bloom & Lens Flares (Triggered at T=5s) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full z-0"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: [0, 1, 0.4], scale: [0.5, 1.2, 1] }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 4, delay: 5, ease: "easeOut" }}
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0.2) 30%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Volumetric Light Rays (Triggered at T=5s) */}
        <motion.div
          className="absolute top-1/2 left-1/2 flex items-center justify-center z-0"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: [0, 0.8, 0.3], scale: [0.8, 1.2, 1], rotate: 20 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 6, delay: 5, ease: "easeOut" }}
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

        {/* Cinematic Star Sparkles (Triggered at T=5s) */}
        <motion.div className="absolute top-1/2 left-1/2 flex items-center justify-center z-10">
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
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 2 + Math.random(),
                delay: 5 + s.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* ── Engagement Ring (Left) ── */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
          initial={{ x: "-50vw", y: "-40vh", rotate: -80, scale: 1.2 }}
          whileInView={{
            x: ["-50vw", "-18px", "-18px"],
            y: ["-40vh", "0px", "-5px"],
            rotate: [-80, -10, -10],
            scale: [1.2, 1, 1]
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            times: [0, 0.9, 1],
            duration: 5.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 5.5 }}
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
        </motion.div>

        {/* ── Wedding Band (Right) ── */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
          initial={{ x: "50vw", y: "-40vh", rotate: 80, scale: 1.2 }}
          whileInView={{
            x: ["50vw", "18px", "18px"],
            y: ["-40vh", "0px", "-5px"],
            rotate: [80, 15, 15],
            scale: [1.2, 1, 1]
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            times: [0, 0.9, 1],
            duration: 5.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 5.5 }}
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
        </motion.div>
      </div>

      {/* ── Text Content (Reveals After T=7.5s) ── */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 mt-4 pointer-events-none">
        
        {/* Title: Together Forever */}
        <motion.h2
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#FFF8DC] via-[#D4AF37] to-[#A67C00] drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 7.5, ease: "easeOut" }}
        >
          Together Forever
        </motion.h2>

        <div className="flex items-center gap-4 my-4">
          <motion.div
            className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 0.6, scaleX: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 8.5 }}
          />
          <motion.span
            className="text-[#D4AF37] text-xl"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 8.5 }}
          >
            ✦
          </motion.span>
          <motion.div
            className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 0.6, scaleX: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 8.5 }}
          />
        </div>

        {/* Names: Joji ❤️ Vandana */}
        <div className="flex items-center justify-center font-cormorant text-4xl md:text-6xl font-bold text-[#F5F0E8] mb-8 tracking-widest overflow-hidden py-2 relative">
          
          {/* Golden sweep effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2, delay: 9.5, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
              transform: "skewX(-20deg)",
            }}
          />

          <motion.span
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 8.5, ease: "easeOut" }}
          >
            Joji
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 9.2, type: "spring", bounce: 0.5 }}
            className="inline-block text-red-500 mx-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
          >
            ❤️
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 8.5, ease: "easeOut" }}
          >
            Vandana
          </motion.span>
        </div>

      </div>
    </section>
  );
}
