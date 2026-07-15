"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "../animations/FadeIn";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yCurtain    = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yChandelier = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yLanterns   = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yContent    = useTransform(scrollYProgress, [0, 0.6], [0, 100]);
  const opContent   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* 1. Warm top glow / light rays */}
      <motion.div
        style={{ y: yChandelier }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[55vh] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/6 to-transparent blur-[90px] pointer-events-none"
      />

      {/* 2. Left curtain */}
      <motion.div
        style={{ y: yCurtain }}
        className="absolute top-0 left-0 w-[22%] md:w-[18%] h-full bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent rounded-br-[80px] border-r border-[#D4AF37]/12 pointer-events-none [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      />
      {/* 2. Right curtain */}
      <motion.div
        style={{ y: yCurtain }}
        className="absolute top-0 right-0 w-[22%] md:w-[18%] h-full bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent rounded-bl-[80px] border-l border-[#D4AF37]/12 pointer-events-none [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
      />

      {/* 3. Chandelier */}
      <motion.div
        style={{ y: yChandelier }}
        className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10"
      >
        {/* Chain */}
        <div className="w-[2px] h-14 bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/60" />
        {/* Body */}
        <motion.div
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-28 h-[3px] rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.8)] mb-1" />
          <div className="w-44 h-[3px] rounded-full bg-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.8)] mb-3" />
          <div className="flex gap-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-gradient-to-b from-[#F5F0E8]/70 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ height: 40 + i * 8 }}
              />
            ))}
          </div>
          {/* Crystal drops */}
          <div className="flex gap-5 mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#FFF8DC]/80 shadow-[0_0_8px_rgba(255,248,220,0.9)]"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 4. Left lantern */}
      <motion.div
        style={{ y: yLanterns }}
        className="absolute top-10 left-[14%] hidden md:flex flex-col items-center pointer-events-none z-10"
      >
        <div className="w-[1.5px] h-20 bg-gradient-to-b from-[#D4AF37]/70 to-[#D4AF37]/40" />
        <motion.div
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="w-10 h-14 border-2 border-[#D4AF37]/70 rounded-t-full rounded-b-lg bg-[#D4AF37]/10 shadow-[0_0_18px_rgba(212,175,55,0.4)] flex items-center justify-center backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#FFF8DC]/80 animate-pulse" />
        </motion.div>
      </motion.div>

      {/* 4. Right lantern */}
      <motion.div
        style={{ y: yLanterns }}
        className="absolute top-16 right-[14%] hidden md:flex flex-col items-center pointer-events-none z-10"
      >
        <div className="w-[1.5px] h-24 bg-gradient-to-b from-[#D4AF37]/70 to-[#D4AF37]/40" />
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="w-12 h-16 border-2 border-[#D4AF37]/70 rounded-t-full rounded-b-lg bg-[#D4AF37]/10 shadow-[0_0_18px_rgba(212,175,55,0.4)] flex items-center justify-center backdrop-blur-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#FFF8DC]/80 animate-pulse" />
        </motion.div>
      </motion.div>

      {/* 5. Floral vine top decoration */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        className="absolute top-0 left-0 right-0 h-36 pointer-events-none opacity-30 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&auto=format&fit=crop&q=60')] bg-cover bg-top [mask-image:linear-gradient(to_bottom,black_20%,transparent)]"
      />

      {/* Hero text */}
      <motion.div
        style={{ y: yContent, opacity: opContent }}
        className="relative z-20 flex flex-col items-center text-center px-6 mt-28 md:mt-20"
      >
        <FadeIn delay={0.2} direction="down">
          <p className="font-cinzel text-[#D4AF37] tracking-[0.35em] uppercase text-sm md:text-base mb-8 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
            Together with our Families
          </p>
        </FadeIn>

        <FadeIn delay={0.55} direction="up">
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-9xl text-[#F5F0E8] font-bold mb-3 drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">
            JOJI JONEY
          </h1>
          <p className="font-cormorant text-4xl md:text-6xl text-[#D4AF37] font-medium italic my-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            &amp;
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-9xl text-[#F5F0E8] font-bold mb-10 drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">
            VANDANA
          </h1>
        </FadeIn>

        <FadeIn delay={1.0} direction="up">
          <p className="font-poppins text-[#C9B99A] max-w-md mx-auto text-sm md:text-base leading-relaxed mb-8 font-light">
            Joyfully Invite You To Celebrate Their Wedding
          </p>
        </FadeIn>

        <FadeIn delay={1.2}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-20 md:w-32 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.9)]">✧</span>
            <div className="h-[1px] w-20 md:w-32 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
        </FadeIn>

        <FadeIn delay={1.45} direction="up">
          <div className="glass-card px-11 py-5 mb-16 inline-block shadow-[0_0_30px_rgba(212,175,55,0.12)]">
            <p className="font-cinzel text-[#F5F0E8] font-semibold text-xl md:text-2xl tracking-[0.22em]">
              17 AUGUST 2026
            </p>
          </div>
        </FadeIn>
      </motion.div>

      {/* Scroll indicator */}
      <FadeIn delay={2.2} direction="none" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => document.getElementById("countdown")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="font-cinzel text-[10px] text-[#D4AF37] uppercase tracking-widest mb-2 drop-shadow-md">
            Scroll
          </span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent" />
        </motion.div>
      </FadeIn>
    </section>
  );
}
