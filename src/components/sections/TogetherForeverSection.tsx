"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function TogetherForeverSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const smooth = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 60,
    restDelta: 0.001,
  });

  // Since GlobalCinematicRings handles the rings reaching the center at global scroll 0.85,
  // we just need to animate the text in the normal document flow when this section is in view.
  // When this section is exactly in the center of the viewport, the rings will interlock over it.
  
  // We'll use whileInView for the text so it plays naturally as you scroll down to it.

  return (
    <section 
      id="together-forever" 
      ref={ref}
      className="min-h-[120vh] relative bg-transparent flex flex-col items-center justify-center pointer-events-none"
    >
      
      {/* ── Background Elements (Altar, Arch) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 3 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "80vw",
          height: "55vh",
          background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.07) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full flex justify-center opacity-70 z-0">
        <div className="w-[92vw] md:w-[65vw] max-w-3xl h-[46vw] md:h-[32vw] max-h-[400px] rounded-t-full border-[1.5px] border-[#D4AF37]/20 shadow-[0_-12px_70px_rgba(212,175,55,0.08)_inset]" />
      </div>

      {/* ── Text Content ── */}
      <div className="relative z-30 flex flex-col items-center text-center px-6 mt-4 pointer-events-none">
        
        {/* Title: Together Forever */}
        <motion.h2
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-[#FFF8DC] via-[#D4AF37] to-[#A67C00] drop-shadow-[0_0_25px_rgba(212,175,55,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          Together Forever
        </motion.h2>

        {/* Space for the rings to sit exactly between the title and names */}
        <div className="h-[220px] md:h-[300px] w-full" aria-hidden />

        <div className="flex items-center gap-4 my-4">
          <motion.div
            className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 0.6, scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1, delay: 1 }}
          />
          <motion.span
            className="text-[#D4AF37] text-xl"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            ✦
          </motion.span>
          <motion.div
            className="h-[1.5px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 0.6, scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>

        {/* Names: Joji ❤️ Vandana */}
        <div className="flex items-center justify-center font-cormorant text-4xl md:text-6xl font-bold text-[#F5F0E8] mb-8 tracking-widest overflow-hidden py-2 relative">
          
          {/* Golden sweep effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
              transform: "skewX(-20deg)",
            }}
          />

          <motion.span
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          >
            Joji
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, delay: 1.5, type: "spring", bounce: 0.5 }}
            className="inline-block text-red-500 mx-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
          >
            ❤️
          </motion.span>

          <motion.span
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
          >
            Vandana
          </motion.span>
        </div>

      </div>
    </section>
  );
}
