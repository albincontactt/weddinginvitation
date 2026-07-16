"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────
   Shared SVG defs for gold gradients (rendered once)
───────────────────────────────────────────────────────── */
function GoldDefs() {
  return (
    <defs>
      {/* ── Rich warm gold band gradient ── */}
      <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FFF5CC" />
        <stop offset="12%"  stopColor="#D4AF37" />
        <stop offset="28%"  stopColor="#FFE066" />
        <stop offset="48%"  stopColor="#B8860B" />
        <stop offset="65%"  stopColor="#FFD700" />
        <stop offset="82%"  stopColor="#C8960C" />
        <stop offset="100%" stopColor="#FFF0A0" />
      </linearGradient>

      {/* ── Flip variant for right ring ── */}
      <linearGradient id="goldBandFlip" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#FFF5CC" />
        <stop offset="12%"  stopColor="#D4AF37" />
        <stop offset="28%"  stopColor="#FFE066" />
        <stop offset="48%"  stopColor="#B8860B" />
        <stop offset="65%"  stopColor="#FFD700" />
        <stop offset="82%"  stopColor="#C8960C" />
        <stop offset="100%" stopColor="#FFF0A0" />
      </linearGradient>

      {/* ── Shimmer highlight sweep ── */}
      <linearGradient id="goldShimmer" x1="20%" y1="20%" x2="80%" y2="80%">
        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
        <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      {/* ── Diamond facets ── */}
      <radialGradient id="diamondCore" cx="40%" cy="30%" r="60%">
        <stop offset="0%"   stopColor="#FFFFFF" />
        <stop offset="35%"  stopColor="#E8F8FF" />
        <stop offset="70%"  stopColor="#B9E8FF" />
        <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.5" />
      </radialGradient>

      <linearGradient id="diamondFacetA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#BAE6FD" />
      </linearGradient>
      <linearGradient id="diamondFacetB" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#E0F2FE" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>

      {/* ── Glow filter ── */}
      <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="diamondGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/* ─────────────────────────────────────────────────────────
   Engagement Ring — gold band with solitaire diamond
───────────────────────────────────────────────────────── */
function EngagementRing({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs />

      {/* Outer edge highlight */}
      <circle cx="80" cy="80" r="70" stroke="#FFF5CC" strokeWidth="1" strokeOpacity="0.5" />

      {/* Main band */}
      <circle
        cx="80" cy="80" r="63"
        stroke="url(#goldBand)"
        strokeWidth="13"
        filter="url(#goldGlow)"
      />

      {/* Shimmer overlay on band */}
      <circle
        cx="80" cy="80" r="63"
        stroke="url(#goldShimmer)"
        strokeWidth="13"
        strokeDasharray="55 345"
        strokeDashoffset="-20"
      />

      {/* Inner edge highlight */}
      <circle cx="80" cy="80" r="56.5" stroke="#FFE066" strokeWidth="1" strokeOpacity="0.6" />

      {/* Prong basket (setting) */}
      <g transform="translate(80,21)">
        {/* Setting base */}
        <rect x="-7" y="-4" width="14" height="12" rx="2" fill="url(#goldBand)" />
        {/* Side prongs */}
        <rect x="-9" y="-6" width="4" height="8" rx="1.5" fill="#D4AF37" />
        <rect x="5"  y="-6" width="4" height="8" rx="1.5" fill="#D4AF37" />
        <rect x="-7" y="-8" width="4" height="8" rx="1.5" fill="#D4AF37" />
        <rect x="3"  y="-8" width="4" height="8" rx="1.5" fill="#D4AF37" />
      </g>

      {/* Solitaire diamond (round brilliant) */}
      <g transform="translate(80,14)" filter="url(#diamondGlow)">
        {/* Girdle */}
        <ellipse cx="0" cy="0" rx="11" ry="4" fill="#C8D8E8" opacity="0.6" />
        {/* Crown facets */}
        <polygon points="0,-13 11,0 -11,0"    fill="url(#diamondCore)"   opacity="0.95" />
        <polygon points="0,-13 11,0 5,-7"     fill="url(#diamondFacetA)" opacity="0.85" />
        <polygon points="0,-13 -11,0 -5,-7"   fill="url(#diamondFacetB)" opacity="0.85" />
        <polygon points="0,-13 5,-7 -5,-7"    fill="#FFFFFF"             opacity="0.9" />
        {/* Pavilion */}
        <polygon points="11,0 -11,0 0,8"      fill="url(#diamondFacetB)" opacity="0.8" />
        <polygon points="11,0 5,-7 0,8"       fill="#DCEEF8"             opacity="0.7" />
        <polygon points="-11,0 -5,-7 0,8"     fill="#FFFFFF"             opacity="0.7" />
        {/* Table highlight */}
        <polygon points="0,-10 8,-2 -8,-2"    fill="#FFFFFF"             opacity="0.5" />
        {/* Culet sparkle */}
        <circle cx="0" cy="7" r="1.5" fill="#FFFFFF" opacity="0.9" />
        {/* 4-point star gleam */}
        <path d="M0,-15 L1,-10 L0,-5 L-1,-10 Z" fill="#FFFFFF" opacity="0.8" />
        <path d="M-6,-9 L-2,-8 L2,-8 L6,-9"     stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* Micro pavé dots along top arc */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const r = 63;
        const rad = ((deg - 90) * Math.PI) / 180;
        const x = 80 + r * Math.cos(rad);
        const y = 80 + r * Math.sin(rad);
        return (
          <circle
            key={deg}
            cx={x}
            cy={y}
            r="1.8"
            fill="#FFFFFF"
            opacity="0.6"
          />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Wedding Band — gold pavé band
───────────────────────────────────────────────────────── */
function WeddingBand({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs />

      {/* Outer edge */}
      <circle cx="80" cy="80" r="70" stroke="#FFF5CC" strokeWidth="1" strokeOpacity="0.5" />

      {/* Main band */}
      <circle
        cx="80" cy="80" r="63"
        stroke="url(#goldBandFlip)"
        strokeWidth="13"
        filter="url(#goldGlow)"
      />

      {/* Shimmer overlay */}
      <circle
        cx="80" cy="80" r="63"
        stroke="url(#goldShimmer)"
        strokeWidth="13"
        strokeDasharray="40 360"
        strokeDashoffset="120"
      />

      {/* Inner edge */}
      <circle cx="80" cy="80" r="56.5" stroke="#FFE066" strokeWidth="1" strokeOpacity="0.6" />

      {/* Pavé channel — evenly spaced diamond dots */}
      {Array.from({ length: 20 }, (_, i) => {
        const r = 63;
        const deg = (i / 20) * 360 - 90;
        const rad = (deg * Math.PI) / 180;
        const x = 80 + r * Math.cos(rad);
        const y = 80 + r * Math.sin(rad);
        return (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r="2.8" fill="#FFFFFF" opacity="0.85" />
            <circle r="1.4" fill="#E8F8FF" opacity="0.9" />
            {/* tiny star gleam on every 4th */}
            {i % 4 === 0 && (
              <>
                <path d="M0,-4 L0.5,-1 L0,1 L-0.5,-1 Z" fill="white" opacity="0.9" />
                <path d="M-4,0 L-1,0.5 L1,0 L-1,-0.5 Z" fill="white" opacity="0.9" />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Sparkle particles (generated once on client)
───────────────────────────────────────────────────────── */
type Spark = { x: number; y: number; delay: number; size: number; color: string };
type Dust  = { x: number; y: number; delay: number; dur: number };

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */
export function GlobalCinematicRings() {
  const { scrollYProgress } = useScroll();

  /* Smooth spring so rings glide, not jump */
  const smooth = useSpring(scrollYProgress, {
    damping: 38,
    stiffness: 55,
    restDelta: 0.001,
  });

  /* ── POSITIONS ──────────────────────────────────────────
     At scroll = 0   → rings sit at top-left / top-right
                        corners of the viewport
     At scroll = 0.82 → rings meet at screen center
  ───────────────────────────────────────────────────────── */
  const xLeft  = useTransform(smooth, [0, 0.82, 1], ["-47vw", "-20px", "-20px"]);
  const yLeft  = useTransform(smooth, [0, 0.82, 1], ["-46vh",   "0px",   "0px"]);
  const rotLeft = useTransform(smooth, [0, 0.82, 1],  [-65,       -8,      -8]);

  const xRight  = useTransform(smooth, [0, 0.82, 1], ["47vw",  "20px",  "20px"]);
  const yRight  = useTransform(smooth, [0, 0.82, 1], ["-46vh",  "0px",   "0px"]);
  const rotRight = useTransform(smooth, [0, 0.82, 1],  [65,       12,      12]);

  /* ── GLOW & BLOOM (fires when rings meet) ─────────────── */
  const glowOpacity  = useTransform(smooth, [0.79, 0.84], [0, 1]);
  const glowScale    = useTransform(smooth, [0.79, 0.88], [0.3, 1.4]);
  const raysOpacity  = useTransform(smooth, [0.81, 0.86], [0, 0.9]);
  const raysRotate   = useTransform(smooth, [0.83, 1.0],  [0, 55]);
  const sparkOpacity = useTransform(smooth, [0.81, 0.86], [0, 1]);

  /* ── INTERLOCK ARC (left ring front portion) ─────────── */
  const arcOpacity   = useTransform(smooth, [0.80, 0.85], [0, 1]);

  /* ── FADE OUT near footer ─────────────────────────────── */
  const masterOpacity = useTransform(smooth, [0.96, 0.99], [1, 0]);

  /* Client-side particles */
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [dust,   setDust]   = useState<Dust[]>([]);

  useEffect(() => {
    const colors = ["#D4AF37", "#FFD700", "#FFF8DC", "#FFE066", "#FFFFFF", "#FFC300"];
    setSparks(
      Array.from({ length: 52 }, () => ({
        x:     (Math.random() - 0.5) * 520,
        y:     (Math.random() - 0.5) * 520,
        delay: Math.random() * 4,
        size:  Math.random() * 5.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
    setDust(
      Array.from({ length: 35 }, () => ({
        x:     (Math.random() - 0.5) * 640,
        y:     (Math.random() - 0.5) * 640,
        delay: Math.random() * 5,
        dur:   Math.random() * 4 + 5,
      }))
    );
  }, []);

  /* Ring pixel sizes */
  const ringSize = typeof window !== "undefined" && window.innerWidth < 768 ? 130 : 210;

  return (
    <motion.div
      className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden"
      style={{ opacity: masterOpacity }}
    >
      {/* ══ BLOOM LAYERS ══════════════════════════════════ */}

      {/* Outer warm bloom */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "750px", height: "750px",
          opacity: glowOpacity,
          scale:   glowScale,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.60) 0%, rgba(212,175,55,0.20) 35%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Tight bright core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "300px", height: "300px",
          opacity: glowOpacity,
          scale:   glowScale,
          background:
            "radial-gradient(circle, rgba(255,248,180,0.95) 0%, rgba(212,175,55,0.50) 40%, transparent 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Horizontal lens flare streak */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-y-1/2"
        style={{
          width: "600px", height: "2px",
          marginLeft: "-300px",
          opacity: glowOpacity,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,230,50,0.55) 35%, rgba(255,255,200,0.95) 50%, rgba(255,230,50,0.55) 65%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* Vertical flare */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2"
        style={{
          width: "2px", height: "400px",
          marginTop: "-200px",
          opacity: glowOpacity,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,230,50,0.4) 35%, rgba(255,255,200,0.8) 50%, rgba(255,230,50,0.4) 65%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* ══ VOLUMETRIC LIGHT RAYS ═════════════════════════ */}
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{ opacity: raysOpacity, rotate: raysRotate }}
      >
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
          <div
            key={angle}
            className="absolute origin-left"
            style={{
              rotate: `${angle}deg`,
              width:  angle % 90 === 0 ? "320px" : angle % 45 === 0 ? "220px" : "150px",
              height: angle % 90 === 0 ? "2.5px" : "1.5px",
              background:
                "linear-gradient(to right, rgba(212,175,55,0.80), rgba(255,220,50,0.3), transparent)",
              filter: "blur(1px)",
            }}
          />
        ))}
      </motion.div>

      {/* ══ SPARKLE PARTICLES ═════════════════════════════ */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{ opacity: sparkOpacity }}
      >
        {sparks.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:      s.size,
              height:     s.size,
              marginLeft: s.x,
              marginTop:  s.y,
              background: s.color,
              boxShadow:  `0 0 ${s.size * 3}px ${s.color}`,
            }}
            animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
            transition={{
              duration:    2 + Math.random(),
              delay:       s.delay,
              repeat:      Infinity,
              repeatDelay: Math.random() * 2,
              ease:        "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* ══ 4-POINT GOLD STARS ════════════════════════════ */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{ opacity: sparkOpacity }}
      >
        {[
          { x: -110, y: -90 }, { x: 120, y: -95 },
          { x: -140, y:  55 }, { x: 130, y:  65 },
          { x:    0, y: -155 },{ x:  -65, y: 135 },
          { x:   75, y: 130 }, { x: -170, y: -10 },
          { x:  175, y: -15 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ marginLeft: pos.x, marginTop: pos.y }}
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0], rotate: [0, 45, 90] }}
            transition={{
              duration: 2,
              delay: i * 0.28,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 0 L10.2 7.8 L18 9 L10.2 10.2 L9 18 L7.8 10.2 L0 9 L7.8 7.8 Z"
                fill="#D4AF37" opacity="0.95"
              />
              <path
                d="M9 0 L10.2 7.8 L18 9 L10.2 10.2 L9 18 L7.8 10.2 L0 9 L7.8 7.8 Z"
                fill="#FFFFFF" opacity="0.45"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* ══ FLOATING GOLDEN DUST ══════════════════════════ */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-center"
        style={{ opacity: glowOpacity }}
      >
        {dust.map((d, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width:      2.5,
              height:     2.5,
              marginLeft: d.x,
              marginTop:  d.y,
              filter:     "blur(0.4px)",
            }}
            animate={{ y: [0, -70], opacity: [0, 0.75, 0] }}
            transition={{
              duration:    d.dur,
              repeat:      Infinity,
              delay:       d.delay,
              ease:        "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* ══ PULSING AMBIENT HALO ══════════════════════════ */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "380px", height: "380px",
          opacity: glowOpacity,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ══ ENGAGEMENT RING (from top-left) ═══════════════ */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ x: xLeft, y: yLeft, rotate: rotLeft }}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="drop-shadow-[0_0_24px_rgba(212,175,55,0.5)]"
        >
          <EngagementRing size={ringSize} />
        </motion.div>
      </motion.div>

      {/* ══ WEDDING BAND (from top-right) ═════════════════ */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ x: xRight, y: yRight, rotate: rotRight }}
      >
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="drop-shadow-[0_0_24px_rgba(212,175,55,0.5)]"
        >
          <WeddingBand size={ringSize} />
        </motion.div>
      </motion.div>

      {/* ══ INTERLOCK ARC — left ring front portion ═══════ */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        style={{ x: xLeft, y: yLeft, rotate: rotLeft, opacity: arcOpacity }}
      >
        <svg
          width={ringSize}
          height={ringSize}
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="arcGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#FFF5CC" />
              <stop offset="30%"  stopColor="#FFD700" />
              <stop offset="60%"  stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#FFF0A0" />
            </linearGradient>
            <filter id="arcGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Right-top quarter arc that overlaps the wedding band */}
          <path
            d="M143 80 A63 63 0 0 0 80 17"
            stroke="url(#arcGold)"
            strokeWidth="13"
            strokeLinecap="round"
            filter="url(#arcGlow)"
          />
          {/* Shimmer on arc */}
          <path
            d="M143 80 A63 63 0 0 0 80 17"
            stroke="#FFFFFF"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray="30 200"
            strokeDashoffset="-10"
            opacity="0.4"
          />
          {/* Pavé dots on arc */}
          {[0, 22, 45, 68, 90].map((pct, i) => {
            const t = pct / 100;
            const startAngle = 0; // 3 o'clock
            const endAngle   = -90; // 12 o'clock
            const angle = (startAngle + t * (endAngle - startAngle)) * (Math.PI / 180);
            const r = 63;
            const x = 80 + r * Math.cos(angle);
            const y = 80 + r * Math.sin(angle);
            return (
              <circle key={i} cx={x} cy={y} r="2.2" fill="#FFFFFF" opacity="0.85" />
            );
          })}
        </svg>
      </motion.div>
    </motion.div>
  );
}
