"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function TogetherForeverSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      id="together-forever"
      ref={ref}
      className="min-h-[120vh] relative bg-transparent flex flex-col items-center justify-start pt-24 pb-32 pointer-events-none"
    >

      {/* ── Background glow ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "80vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.07) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── Arch decoration ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full flex justify-center opacity-70 z-0">
        <div className="w-[92vw] md:w-[65vw] max-w-3xl h-[46vw] md:h-[32vw] max-h-[400px] rounded-t-full border-[1.5px] border-[#D4AF37]/20 shadow-[0_-12px_70px_rgba(212,175,55,0.08)_inset]" />
      </div>

      {/* ── Text Content ── */}
      <div className="relative z-30 w-full flex flex-col items-center text-center px-6 pointer-events-none">

        {/* ── TOP TEXT: Together Forever ── */}
        <motion.h2
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#FFF8DC] via-[#D4AF37] to-[#A67C00] drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          Together Forever
        </motion.h2>

        {/* ── GAP for interlocked rings ──
            This empty block reserves the vertical space where the two fixed rings
            will visually sit when they meet. Ring SVGs are ~220px on desktop so
            we give a comfortable margin on all breakpoints.                       */}
        <div className="h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] w-full shrink-0" aria-hidden />

        {/* ── Decorative gold divider ── */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
          <span className="text-[#D4AF37] text-xl">✦</span>
          <div className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        </motion.div>

        {/* ── BOTTOM TEXT: Joji ❤️ Vandana ── */}
        <div className="flex items-center justify-center font-cormorant text-4xl md:text-6xl font-bold text-[#F5F0E8] tracking-widest overflow-hidden py-2 relative">

          {/* Golden sweep shimmer */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2, delay: 1.6, ease: "easeInOut" }}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
              skewX: "-20deg",
            }}
          />

          <motion.span
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            Joji
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.9, type: "spring", bounce: 0.5 }}
            className="inline-block text-red-500 mx-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
          >
            ❤️
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            Vandana
          </motion.span>
        </div>

      </div>
    </section>
  );
}
