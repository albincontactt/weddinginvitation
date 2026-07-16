"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function TogetherForeverSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="together-forever"
      ref={ref}
      className="min-h-screen relative bg-transparent flex flex-col items-center justify-center py-20 pointer-events-none"
    >

      {/* ── Background glow ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 3 }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 50%, transparent 75%)",
        }}
      />

      {/* ── Arch decoration ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full flex justify-center opacity-60 z-0">
        <div className="w-[92vw] md:w-[65vw] max-w-3xl h-[46vw] md:h-[32vw] max-h-[380px] rounded-t-full border-[1.5px] border-[#D4AF37]/20 shadow-[0_-12px_70px_rgba(212,175,55,0.06)_inset]" />
      </div>

      {/* ══════════════════════════════════════════════
          Layout:
            [Together Forever]   ← top text
            [gap — rings live here]
            [divider ✦ divider]
            [Joji ❤️ Vandana]    ← bottom text
          ══════════════════════════════════════════════ */}
      <div className="relative z-30 w-full flex flex-col items-center text-center px-6 pointer-events-none select-none">

        {/* ── TOP TEXT: Together Forever ── */}
        <motion.h2
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#FFF8DC] via-[#D4AF37] to-[#A67C00] drop-shadow-[0_0_30px_rgba(212,175,55,0.7)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
        >
          Together Forever
        </motion.h2>

        {/* ── RING SPACE ──
            Reserve height for the rings (SVG ~140px mobile / ~220px desktop).
            The fixed GlobalCinematicRings overlay will visually sit here.
            Using flex + min-height so it scales on every breakpoint.            */}
        <div
          className="w-full"
          style={{ height: "clamp(200px, 32vw, 380px)" }}
          aria-hidden
        />

        {/* ── Decorative gold divider ── */}
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="h-[1.5px] w-16 md:w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#D4AF37] text-xl drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">✦</span>
          <div className="h-[1.5px] w-16 md:w-28 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* ── BOTTOM TEXT: Joji ❤️ Vandana ── */}
        <div className="relative flex items-center justify-center font-cormorant text-4xl md:text-6xl font-bold text-[#F5F0E8] tracking-widest overflow-hidden py-2">

          {/* Golden shimmer sweep */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ x: "-110%" }}
            whileInView={{ x: "110%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2.2, delay: 1.2, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)",
              transform: "skewX(-20deg)",
            }}
          />

          <motion.span
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            Joji
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring", bounce: 0.55 }}
            className="inline-block text-red-500 mx-4 drop-shadow-[0_0_14px_rgba(239,68,68,0.7)]"
          >
            ❤️
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            Vandana
          </motion.span>
        </div>

      </div>
    </section>
  );
}
