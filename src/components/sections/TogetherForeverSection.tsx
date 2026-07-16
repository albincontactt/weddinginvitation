"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function TogetherForeverSection() {
  const ref = useRef<HTMLElement>(null);

  return (
    /*
      This section is exactly 100vh tall.
      The fixed rings (GlobalCinematicRings) stop at screen center (50vh).
      We place "Together Forever" near the top of this section and
      "Joji ❤️ Vandana" near the bottom, leaving the screen-center area
      free for the interlocked rings — matching the reference photo.
    */
    <section
      id="together-forever"
      ref={ref}
      className="relative bg-transparent pointer-events-none"
      style={{ height: "100vh" }}
    >
      {/* ── Background radial glow (behind rings) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 2.5 }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 45%, transparent 72%)",
        }}
      />

      {/* ── Arch decoration at top ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full flex justify-center opacity-60 z-0">
        <div className="w-[92vw] md:w-[65vw] max-w-3xl h-[40vw] md:h-[28vw] max-h-[340px] rounded-t-full border-[1.5px] border-[#D4AF37]/25 shadow-[0_-12px_70px_rgba(212,175,55,0.07)_inset]" />
      </div>

      {/* ════════════════════════════════════════════════
          INNER LAYOUT — absolute so we can pin to exact
          vertical positions within the 100vh section.
          Together Forever → top ~12%
          [screen center 50vh] → rings stop here
          Joji ❤️ Vandana → bottom ~12%
          ════════════════════════════════════════════════ */}

      {/* ── TOP TEXT: Together Forever ── */}
      <div className="absolute left-0 right-0 top-[10%] flex justify-center px-6 z-30 select-none">
        <motion.h2
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-[#FFF8DC] via-[#D4AF37] to-[#A67C00] drop-shadow-[0_0_30px_rgba(212,175,55,0.7)]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
        >
          Together Forever
        </motion.h2>
      </div>

      {/* ── BOTTOM AREA: divider + names — pinned to bottom 12% ── */}
      <div className="absolute left-0 right-0 bottom-[8%] flex flex-col items-center gap-3 px-6 z-30 select-none">

        {/* Decorative gold divider */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="h-[1.5px] w-14 md:w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <span className="text-[#D4AF37] text-lg drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦</span>
          <div className="h-[1.5px] w-14 md:w-28 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Joji ❤️ Vandana */}
        <div className="relative flex items-center justify-center font-cormorant text-4xl md:text-6xl font-bold text-[#F5F0E8] tracking-widest overflow-hidden py-1">

          {/* Golden shimmer sweep */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ x: "-110%" }}
            whileInView={{ x: "110%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2, delay: 1.0, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)",
              transform:  "skewX(-20deg)",
            }}
          />

          <motion.span
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          >
            Joji
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring", bounce: 0.55 }}
            className="inline-block text-red-500 mx-4 drop-shadow-[0_0_14px_rgba(239,68,68,0.7)]"
          >
            ❤️
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          >
            Vandana
          </motion.span>
        </div>

      </div>
    </section>
  );
}
