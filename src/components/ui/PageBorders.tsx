"use client";

import { motion } from "framer-motion";

const ORNAMENTS = ["❖", "✦", "♦", "✦", "❖"];

export function PageBorders() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">

      {/* ── TOP border line ─────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />

      {/* ── BOTTOM border line ──────────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent" />

      {/* ── Corner bracket ornaments ─────────────────────── */}
      {/* Top-left */}
      <div className="absolute top-3 left-3 text-[#D4AF37]/30 text-lg leading-none select-none">
        <div>┌</div>
      </div>
      {/* Top-right */}
      <div className="absolute top-3 right-3 text-[#D4AF37]/30 text-lg leading-none select-none">
        <div>┐</div>
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-3 left-3 text-[#D4AF37]/30 text-lg leading-none select-none">
        <div>└</div>
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-3 right-3 text-[#D4AF37]/30 text-lg leading-none select-none">
        <div>┘</div>
      </div>

      {/* ── LEFT border ─────────────────────────────────── */}
      <div className="absolute inset-y-0 left-0 w-6 md:w-10 flex flex-col items-center py-10">
        {/* Top static line segment */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#D4AF37]/25" />

        {/* Ornament chain */}
        {ORNAMENTS.map((o, i) => (
          <motion.span
            key={i}
            className="text-[#D4AF37]/25 text-[10px] my-2.5 select-none"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {o}
          </motion.span>
        ))}

        {/* Animated shimmer line */}
        <div className="flex-1 relative w-[1px] overflow-hidden">
          <div className="absolute inset-0 bg-[#D4AF37]/18" />
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "40%",
              background:
                "linear-gradient(to bottom, transparent, rgba(212,175,55,0.55), transparent)",
            }}
            animate={{ y: ["0%", "250%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Bottom ornament chain */}
        {[...ORNAMENTS].reverse().map((o, i) => (
          <motion.span
            key={`b-${i}`}
            className="text-[#D4AF37]/25 text-[10px] my-2.5 select-none"
            animate={{ opacity: [0.2, 0.55, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6 + 1,
              ease: "easeInOut",
            }}
          >
            {o}
          </motion.span>
        ))}

        {/* Bottom static line segment */}
        <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-[#D4AF37]/25" />
      </div>

      {/* ── RIGHT border ────────────────────────────────── */}
      <div className="absolute inset-y-0 right-0 w-6 md:w-10 flex flex-col items-center py-10">
        {/* Top static line segment */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#D4AF37]/25" />

        {/* Ornament chain */}
        {ORNAMENTS.map((o, i) => (
          <motion.span
            key={i}
            className="text-[#D4AF37]/25 text-[10px] my-2.5 select-none"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5 + 0.8,
              ease: "easeInOut",
            }}
          >
            {o}
          </motion.span>
        ))}

        {/* Animated shimmer line */}
        <div className="flex-1 relative w-[1px] overflow-hidden">
          <div className="absolute inset-0 bg-[#D4AF37]/18" />
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "40%",
              background:
                "linear-gradient(to bottom, transparent, rgba(212,175,55,0.55), transparent)",
            }}
            animate={{ y: ["0%", "250%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
          />
        </div>

        {/* Bottom ornament chain */}
        {[...ORNAMENTS].reverse().map((o, i) => (
          <motion.span
            key={`b-${i}`}
            className="text-[#D4AF37]/25 text-[10px] my-2.5 select-none"
            animate={{ opacity: [0.2, 0.55, 0.2] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6 + 1.8,
              ease: "easeInOut",
            }}
          >
            {o}
          </motion.span>
        ))}

        {/* Bottom static line segment */}
        <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-[#D4AF37]/25" />
      </div>
    </div>
  );
}
