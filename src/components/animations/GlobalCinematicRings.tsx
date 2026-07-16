"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Platinum Defs - reusable gradients for realistic metal
───────────────────────────────────────────────────────── */
function PlatinumDefs({ id, flip }: { id: string; flip?: boolean }) {
  return (
    <>
      <linearGradient id={id} x1={flip ? "150" : "10"} y1="10" x2={flip ? "10" : "150"} y2="150" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#F8FAFC" />
        <stop offset="20%"  stopColor="#94A3B8" />
        <stop offset="45%"  stopColor="#FFFFFF" />
        <stop offset="70%"  stopColor="#64748B" />
        <stop offset="90%"  stopColor="#E2E8F0" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <linearGradient id={`${id}-shimmer`} x1={flip ? "130" : "30"} y1="30" x2={flip ? "30" : "130"} y2="130" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
        <stop offset="45%"  stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Diamond Gradients */}
      <linearGradient id="diamondFacet1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <linearGradient id="diamondFacet2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <linearGradient id="diamondFacet3" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#7DD3FC" />
      </linearGradient>
      <linearGradient id="diamondFacet4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="100%" stopColor="#BAE6FD" />
      </linearGradient>
      <radialGradient id="diamondGlowGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
        <stop offset="40%" stopColor="#BAE6FD" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
      </radialGradient>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Base Ring
───────────────────────────────────────────────────────── */
function PlatinumRingBase({ gradientId, shimmer }: { gradientId: string; shimmer?: boolean }) {
  return (
    <>
      <circle cx="80" cy="80" r="73" stroke={`url(#${gradientId})`} strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="80" cy="80" r="66" stroke={`url(#${gradientId})`} strokeWidth="11" filter={`url(#${gradientId}-glow)`} />
      {shimmer && (
        <circle cx="80" cy="80" r="66" stroke={`url(#${gradientId}-shimmer)`} strokeWidth="11" strokeDasharray="60 350" strokeDashoffset="0" />
      )}
      <circle cx="80" cy="80" r="60.5" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="80" cy="80" r="71.5" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Engagement Ring (Solitaire + Pavé)
───────────────────────────────────────────────────────── */
function EngagementRing() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[220px] md:h-[220px] w-[140px] h-[140px]">
      <defs>
        <PlatinumDefs id="platLeft" flip={false} />
      </defs>
      <PlatinumRingBase gradientId="platLeft" shimmer />
      
      {/* Pavé */}
      <circle cx="80" cy="80" r="66" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="0.1 9" strokeLinecap="round" fill="none" opacity="0.95" />
      <circle cx="80" cy="80" r="66" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="0.1 9" strokeLinecap="round" fill="none" opacity="0.8" />
      
      {/* Solitaire Diamond */}
      <g transform="translate(33.4, 33.4) rotate(-45)">
        <ellipse cx="0" cy="-9" rx="28" ry="28" fill="url(#diamondGlowGradient)" opacity="0.9" />
        <path d="M-13,-2 L-15,-9 M13,-2 L15,-9" stroke="url(#platLeft)" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="-16,-9 16,-9 20,-2 -20,-2" fill="url(#diamondFacet1)" />
        <polygon points="-20,-2 0,18 20,-2" fill="url(#diamondFacet2)" />
        <polygon points="-16,-9 0,-2 16,-9" fill="url(#diamondFacet3)" />
        <polygon points="-20,-2 0,-2 0,18" fill="url(#diamondFacet4)" />
        <path d="M0,-14 L2.5,-6 L10,-3 L2.5,0 L0,8 L-2.5,0 L-10,-3 L-2.5,-6 Z" fill="#FFFFFF" opacity="0.9" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Wedding Band (Matching Pavé)
───────────────────────────────────────────────────────── */
function WeddingBand() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[220px] md:h-[220px] w-[140px] h-[140px]">
      <defs>
        <PlatinumDefs id="platRight" flip={true} />
      </defs>
      <PlatinumRingBase gradientId="platRight" shimmer />
      <circle cx="80" cy="80" r="66" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="0.1 9" strokeLinecap="round" fill="none" opacity="0.95" />
      <circle cx="80" cy="80" r="66" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="0.1 9" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}

export function GlobalCinematicRings() {
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 60,
    restDelta: 0.001,
  });

  /* ── 1. RINGS MOVEMENT (0.0 -> 0.85) ── */
  const xLeft  = useTransform(smooth, [0, 0.85, 1.0], ["-45vw", "-18px", "-18px"]);
  const yLeft  = useTransform(smooth, [0, 0.85, 1.0], ["-40vh",  "0px",   "0px"]);
  const rotLeft = useTransform(smooth, [0, 0.85, 1.0], [-80, -10, -10]);

  const xRight  = useTransform(smooth, [0, 0.85, 1.0], ["45vw",  "18px", "18px"]);
  const yRight  = useTransform(smooth, [0, 0.85, 1.0], ["-40vh", "0px",  "0px"]);
  const rotRight = useTransform(smooth, [0, 0.85, 1.0], [80, 15, 15]);

  /* ── 2. GLOW & BLOOM (appears at interlock) ── */
  const glowOpacity = useTransform(smooth, [0.82, 0.87], [0, 1]);
  const glowScale   = useTransform(smooth, [0.82, 0.90], [0.4, 1.3]);
  const raysOpacity = useTransform(smooth, [0.84, 0.88], [0, 0.85]);
  const raysRotate  = useTransform(smooth, [0.85, 1.0],  [0, 60]);
  const sparkOpacity = useTransform(smooth, [0.84, 0.88], [0, 1]);

  /* ── 3. INTERLOCK ARC overlay ── */
  const arcOpacity  = useTransform(smooth, [0.82, 0.88], [0, 1]);

  /* ── 4. FADE OUT near footer ── */
  const masterOpacity = useTransform(smooth, [0.96, 0.99], [1, 0]);

  /* Sparkle particles */
  const [sparks, setSparks] = useState<{ x: number; y: number; delay: number; size: number; color: string }[]>([]);
  /* Floating dust */
  const [dust, setDust] = useState<{ x: number; y: number; delay: number; dur: number }[]>([]);

  useEffect(() => {
    const sparkColors = ["#D4AF37", "#F5D060", "#FFF8DC", "#FFE066", "#FFFFFF", "#BAE6FD"];
    setSparks(
      Array.from({ length: 48 }, () => ({
        x:     (Math.random() - 0.5) * 500,
        y:     (Math.random() - 0.5) * 500,
        delay: Math.random() * 4,
        size:  Math.random() * 5 + 1.5,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
      }))
    );
    setDust(
      Array.from({ length: 30 }, () => ({
        x:   (Math.random() - 0.5) * 600,
        y:   (Math.random() - 0.5) * 600,
        delay: Math.random() * 5,
        dur:   Math.random() * 4 + 5,
      }))
    );
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-20 pointer-events-none flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity: masterOpacity }}
    >
      {/* ── Large ambient glow ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "700px",
          height: "700px",
          opacity: glowOpacity,
          scale: glowScale,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0.18) 35%, transparent 65%)",
          filter: "blur(55px)",
        }}
      />

      {/* ── Tighter bright bloom ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "280px",
          height: "280px",
          opacity: glowOpacity,
          scale: glowScale,
          background:
            "radial-gradient(circle, rgba(255,248,220,0.9) 0%, rgba(212,175,55,0.4) 45%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      {/* ── Lens flare streak ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-y-1/2"
        style={{
          width: "500px",
          height: "2px",
          marginLeft: "-250px",
          opacity: glowOpacity,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,248,220,0.6) 40%, rgba(255,255,255,0.9) 50%, rgba(255,248,220,0.6) 60%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* ── Volumetric light rays ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{ opacity: raysOpacity, rotate: raysRotate }}
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <div
            key={`ray-${angle}`}
            className="absolute origin-left"
            style={{
              rotate: `${angle}deg`,
              width:  angle % 90 === 0 ? "280px" : "180px",
              height: angle % 90 === 0 ? "2px"   : "1.5px",
              background:
                "linear-gradient(to right, rgba(212,175,55,0.7), transparent)",
              filter: "blur(1px)",
            }}
          />
        ))}
      </motion.div>

      {/* ── Diamond sparkles ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{ opacity: sparkOpacity }}
      >
        {sparks.map((s, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              width:      s.size,
              height:     s.size,
              marginLeft: s.x,
              marginTop:  s.y,
              background: s.color,
              boxShadow:  `0 0 ${s.size * 3}px ${s.color}`,
            }}
            animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
            transition={{
              duration:    2 + Math.random(),
              delay:       s.delay,
              repeat:      Infinity,
              repeatDelay: Math.random() * 1.5,
              ease:        "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* ── 4-point star sparkles ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{ opacity: sparkOpacity }}
      >
        {[
          { x: -100, y: -80 }, { x: 110, y: -90 },
          { x: -130, y: 60 }, { x: 120, y: 70 },
          { x: 0,    y: -140 }, { x: -60, y: 130 },
          { x: 70,   y: 120 },
        ].map((pos, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{ marginLeft: pos.x, marginTop: pos.y }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 45, 90] }}
            transition={{
              duration:    1.8,
              delay:       i * 0.3,
              repeat:      Infinity,
              repeatDelay: 2,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill="#D4AF37" opacity="0.9"/>
              <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" fill="#FFF8DC" opacity="0.5"/>
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Floating golden dust ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{ opacity: glowOpacity }}
      >
        {dust.map((d, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width:      2,
              height:     2,
              marginLeft: d.x,
              marginTop:  d.y,
              filter:     "blur(0.5px)",
            }}
            animate={{ y: [0, -60], opacity: [0, 0.7, 0] }}
            transition={{
              duration:    d.dur,
              repeat:      Infinity,
              delay:       d.delay,
              ease:        "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ── Warm ambient halo ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width:  "350px",
          height: "350px",
          opacity: glowOpacity,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
          filter: "blur(5px)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Engagement Ring (Left) ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        style={{ x: xLeft, y: yLeft, rotate: rotLeft }}
      >
        <div className="drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          <EngagementRing />
        </div>
      </motion.div>

      {/* ── Wedding Band (Right) ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        style={{ x: xRight, y: yRight, rotate: rotRight }}
      >
        <div className="drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          <WeddingBand />
        </div>
      </motion.div>

      {/* ── Interlock Overlay Arc (left ring front portion) ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
        style={{ x: xLeft, y: yLeft, rotate: rotLeft, opacity: arcOpacity }}
      >
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[220px] md:h-[220px] w-[140px] h-[140px]">
          <defs>
            <PlatinumDefs id="arcPlat" flip={false} />
          </defs>
          <path d="M146 80 A66 66 0 0 0 80 14" stroke="url(#arcPlat)" strokeWidth="11" strokeLinecap="round" filter="url(#arcPlat-glow)" />
          <path d="M140.5 80 A60.5 60.5 0 0 0 80 19.5" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
          <path d="M151.5 80 A71.5 71.5 0 0 0 80 8.5"  stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
          <path d="M146 80 A66 66 0 0 0 80 14" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="0.1 9" strokeLinecap="round" fill="none" opacity="0.95" />
          <path d="M146 80 A66 66 0 0 0 80 14" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="0.1 9" strokeLinecap="round" fill="none" opacity="0.8" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
