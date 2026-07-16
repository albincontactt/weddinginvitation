"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Animated Callout Line — draws a connecting line with a dot
───────────────────────────────────────────────────────── */
function CalloutLine({
  label,
  subLabel,
  side,
  delay,
}: {
  label: string;
  subLabel: string;
  side: "left" | "right";
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className={`flex items-center gap-3 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Text block */}
      <div className={`text-${side === "left" ? "right" : "left"}`}>
        <motion.p
          className="font-cinzel text-[#D4AF37] text-[11px] md:text-xs uppercase tracking-[0.22em] font-semibold"
          initial={{ x: side === "left" ? 20 : -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.2 }}
        >
          {label}
        </motion.p>
        <motion.p
          className="font-poppins text-[#C9B99A] text-[10px] md:text-[11px] leading-snug mt-0.5 max-w-[130px] font-light"
          initial={{ x: side === "left" ? 20 : -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: delay + 0.35 }}
        >
          {subLabel}
        </motion.p>
      </div>

      {/* Line + dot */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {side === "right" && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
        )}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-[#D4AF37]/80 to-[#D4AF37]/20 origin-left"
          style={{ width: 60 }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.1, ease: "easeOut" }}
        />
        {side === "left" && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Floating Dust Particles
───────────────────────────────────────────────────────── */
function DustParticles() {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; delay: number; dur: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 6,
        dur: Math.random() * 5 + 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
            filter: "blur(0.4px)",
          }}
          animate={{
            y: [0, -80, -160],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Diamond Sparkle
───────────────────────────────────────────────────────── */
function DiamondSparkle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ left: x, top: y }}
      animate={{
        scale: [0, 1.4, 0],
        opacity: [0, 1, 0],
        rotate: [0, 45, 90],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        delay,
        repeatDelay: Math.random() * 3 + 1,
        ease: "easeInOut",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 0 L7.9 6.1 L14 7 L7.9 7.9 L7 14 L6.1 7.9 L0 7 L6.1 6.1 Z"
          fill="#D4AF37"
          opacity="0.95"
        />
        <path
          d="M7 0 L7.9 6.1 L14 7 L7.9 7.9 L7 14 L6.1 7.9 L0 7 L6.1 6.1 Z"
          fill="white"
          opacity="0.45"
        />
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Section
───────────────────────────────────────────────────────── */
export function WeddingRingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yText = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const sparkPositions = [
    { x: "12%", y: "20%" },
    { x: "82%", y: "18%" },
    { x: "8%", y: "68%" },
    { x: "88%", y: "72%" },
    { x: "45%", y: "8%" },
    { x: "55%", y: "88%" },
    { x: "25%", y: "45%" },
    { x: "75%", y: "50%" },
  ];

  return (
    <section
      id="rings"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden bg-transparent"
    >
      {/* ── Section border lines ── */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      {/* ── Ambient deep glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "900px",
            height: "900px",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.09) 0%, rgba(212,175,55,0.03) 45%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Floating dust ── */}
      <DustParticles />

      {/* ── Diamond sparkles (scattered) ── */}
      {sparkPositions.map((pos, i) => (
        <DiamondSparkle
          key={i}
          x={pos.x}
          y={pos.y}
          delay={i * 0.45}
        />
      ))}

      {/* ── Corner ornaments ── */}
      {["top-5 left-6", "top-5 right-6", "bottom-5 left-6", "bottom-5 right-6"].map(
        (pos, i) => (
          <motion.span
            key={i}
            className={`absolute ${pos} text-[#D4AF37]/20 text-4xl pointer-events-none select-none`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.15 + 0.3 }}
          >
            {i % 2 === 0 ? "✦" : "✿"}
          </motion.span>
        )
      )}

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-cinzel text-[#D4AF37] text-xs uppercase tracking-[0.4em] mb-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
            A Symbol of Eternal Love
          </p>
          <h2 className="font-cormorant text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5F0E8] drop-shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            The Rings
          </h2>
          <motion.div
            className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
          />
        </motion.div>

        {/* ── Main layout: callouts | ring image | callouts ── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">

          {/* ── Left callouts ── */}
          <motion.div
            className="flex flex-col gap-8 md:gap-10 md:pr-8 lg:pr-12 flex-1 items-end"
            style={{ y: yText }}
          >
            <CalloutLine
              label="Platinum Band"
              subLabel="950 Pt, hand-forged, comfort-fit"
              side="left"
              delay={0.7}
            />
            <CalloutLine
              label="Pavé Diamonds"
              subLabel="Micro-set brilliant-cut, VS1 clarity"
              side="left"
              delay={0.9}
            />
            <CalloutLine
              label="Solitaire Stone"
              subLabel="1.5ct round diamond, D-colour"
              side="left"
              delay={1.1}
            />
          </motion.div>

          {/* ── Ring image — centrepiece ── */}
          <motion.div
            ref={imageRef}
            className="relative flex-shrink-0"
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow halo behind image */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.1) 50%, transparent 75%)",
                filter: "blur(35px)",
                transform: "scale(1.3)",
              }}
            />

            {/* Outer decorative ring border */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[#D4AF37]/20"
              style={{ margin: "-18px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#D4AF37]/10"
              style={{ margin: "-32px", borderStyle: "dashed" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            />

            {/* The ring photo */}
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.25),0_30px_80px_rgba(0,0,0,0.8)]">
              {/* Inner vignette overlay */}
              <div className="absolute inset-0 z-10 pointer-events-none rounded-full"
                style={{
                  background: "radial-gradient(circle, transparent 55%, rgba(5,5,5,0.6) 100%)",
                }}
              />
              <Image
                src="/rings-showcase.png"
                alt="Platinum wedding rings — Joji & Vandana"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Subtle shimmer sweep */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
              style={{ margin: 0 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 35%, rgba(255,248,220,0.18) 50%, transparent 65%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Centre badge */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 glass-card border-[#D4AF37]/35 whitespace-nowrap shadow-[0_0_30px_rgba(212,175,55,0.2)]"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <p className="font-cinzel text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-[0.3em]">
                Joji &amp; Vandana · 17 August 2026
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right callouts ── */}
          <motion.div
            className="flex flex-col gap-8 md:gap-10 md:pl-8 lg:pl-12 flex-1 items-start"
            style={{ y: yText }}
          >
            <CalloutLine
              label="Halo Setting"
              subLabel="Split-shank with diamond accents"
              side="right"
              delay={0.7}
            />
            <CalloutLine
              label="Engraving"
              subLabel="&quot;Forever & Always&quot; inside band"
              side="right"
              delay={0.9}
            />
            <CalloutLine
              label="Certification"
              subLabel="GIA certified, conflict-free stones"
              side="right"
              delay={1.1}
            />
          </motion.div>
        </div>

        {/* ── Bottom inscription ── */}
        <motion.div
          className="text-center mt-20 md:mt-24"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-[#C9B99A] italic font-light max-w-lg mx-auto leading-relaxed">
            &ldquo;With this ring, I thee wed — a promise etched in platinum and sealed with every facet of light.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <span className="text-[#D4AF37]/70 text-sm">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
