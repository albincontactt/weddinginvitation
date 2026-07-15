"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   SVG Ring — detailed with inner-glow ring + outer halo
───────────────────────────────────────────────────────── */
function Ring({
  gradientId,
  flip = false,
  shimmer = false,
}: {
  gradientId: string;
  flip?: boolean;
  shimmer?: boolean;
}) {
  return (
    <svg
      width="130"
      height="130"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="md:w-[180px] md:h-[180px] w-[110px] h-[110px]"
    >
      <defs>
        {/* Main gold gradient */}
        <linearGradient
          id={gradientId}
          x1={flip ? "150" : "10"}
          y1="10"
          x2={flip ? "10" : "150"}
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#FFFBEA" />
          <stop offset="20%"  stopColor="#F5D060" />
          <stop offset="50%"  stopColor="#D4AF37" />
          <stop offset="75%"  stopColor="#A67C00" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        {/* Shimmer highlight gradient */}
        <linearGradient
          id={`${gradientId}-shimmer`}
          x1={flip ? "130" : "30"}
          y1="30"
          x2={flip ? "30" : "130"}
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%"  stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Glow filter */}
        <filter id={`${gradientId}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer halo ring */}
      <circle
        cx="80" cy="80" r="73"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        strokeOpacity="0.2"
      />

      {/* Main ring band */}
      <circle
        cx="80" cy="80" r="66"
        stroke={`url(#${gradientId})`}
        strokeWidth="11"
        filter={`url(#${gradientId}-glow)`}
      />

      {/* Diamond-cut highlight shimmer */}
      {shimmer && (
        <circle
          cx="80" cy="80" r="66"
          stroke={`url(#${gradientId}-shimmer)`}
          strokeWidth="11"
          strokeDasharray="60 350"
          strokeDashoffset="0"
        />
      )}

      {/* Inner glow ring */}
      <circle
        cx="80" cy="80" r="60"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />

      {/* 4 tiny diamond-cut facet marks */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx  = 80 + 66 * Math.cos(rad);
        const cy  = 80 + 66 * Math.sin(rad);
        return (
          <circle key={deg} cx={cx} cy={cy} r="3" fill={`url(#${gradientId})`} fillOpacity="0.7" />
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Arrival burst — expands once rings meet
───────────────────────────────────────────────────────── */
function ArrivalBurst({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={visible ? { opacity: [0, 0.9, 0], scale: [0.3, 2.2, 3.5] } : { opacity: 0 }}
      transition={{ duration: 1.8, ease: "easeOut" }}
      className="absolute w-[320px] h-[320px] md:w-[460px] md:h-[460px] rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0.15) 40%, transparent 70%)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────── */
export function GlobalCinematicRings() {
  const { scrollYProgress } = useScroll();

  // Smooth spring — buttery motion
  const smooth = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 55,
    restDelta: 0.001,
  });

  // ── Journey: corners → centre ────────────────────────
  // Rings start far off-screen (truly in the corners) and arrive at centre by 90% scroll
  const xLeft  = useTransform(smooth, [0, 0.9], ["-48vw", "-16px"]);
  const yLeft  = useTransform(smooth, [0, 0.9], ["-48vh",  "0px"]);
  const xRight = useTransform(smooth, [0, 0.9], [ "48vw",  "16px"]);
  const yRight = useTransform(smooth, [0, 0.9], ["-48vh",  "0px"]);

  // Tilt during travel — creates a sense of 3-D tumbling in
  const rotLeft  = useTransform(smooth, [0, 0.9], [-25,  0]);
  const rotRight = useTransform(smooth, [0, 0.9], [ 25,  0]);

  // ── Interlock appearance ──────────────────────────────
  const interlockOpacity = useTransform(smooth, [0.84, 0.96], [0, 1]);
  const glowOpacity      = useTransform(smooth, [0.82, 0.97], [0, 1]);
  const glowScale        = useTransform(smooth, [0.84, 1.0],  [0.5, 1.6]);

  // ── Idle float after interlocking ────────────────────
  const floatY = useMotionValue(0);

  // Track whether rings have fully arrived
  const [arrived, setArrived]       = useState(false);
  const [burstShown, setBurstShown] = useState(false);
  const arrivedRef = useRef(false);

  useEffect(() => {
    const unsub = smooth.onChange((v) => {
      if (v >= 0.92 && !arrivedRef.current) {
        arrivedRef.current = true;
        setArrived(true);
        setBurstShown(true);
        // Start gentle float loop
        animate(floatY, -12, {
          duration: 2.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        });
      }
      if (v < 0.85 && arrivedRef.current) {
        arrivedRef.current = false;
        setArrived(false);
        setBurstShown(false);
        floatY.stop();
        floatY.set(0);
      }
    });
    return unsub;
  }, [smooth, floatY]);

  // Combine scroll position with idle float
  const finalYLeft  = arrived ? floatY : yLeft;
  const finalYRight = arrived ? floatY : yRight;

  // Stars around the interlock
  const [sparks, setSparks] = useState<{ x: number; y: number; delay: number; size: number; color: string }[]>([]);
  useEffect(() => {
    const colors = ["#D4AF37", "#F5D060", "#FFF8DC", "#FFE066", "#FFFBEA"];
    setSparks(
      Array.from({ length: 36 }, () => ({
        x:     (Math.random() - 0.5) * 420,
        y:     (Math.random() - 0.5) * 420,
        delay: Math.random() * 3,
        size:  Math.random() * 4.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">

      {/* ── Central glow — grows as rings approach ─────── */}
      <motion.div
        className="absolute w-[340px] h-[340px] md:w-[500px] md:h-[500px] rounded-full"
        style={{
          opacity: glowOpacity,
          scale:   glowScale,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.30) 0%, rgba(212,175,55,0.10) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Arrival burst ──────────────────────────────── */}
      {burstShown && <ArrivalBurst visible={burstShown} />}

      {/* ── Sparkle particles around interlock ────────── */}
      <motion.div style={{ opacity: interlockOpacity }} className="absolute flex items-center justify-center">
        {sparks.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:       s.size,
              height:      s.size,
              marginLeft:  s.x,
              marginTop:   s.y,
              background:  s.color,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0], y: [0, -30] }}
            transition={{
              duration:   2.2 + Math.random(),
              repeat:     Infinity,
              delay:      s.delay,
              ease:       "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* ── Light rays from interlock ─────────────────── */}
      <motion.div
        style={{ opacity: interlockOpacity }}
        className="absolute flex items-center justify-center"
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <div
            key={angle}
            className="absolute origin-left"
            style={{
              rotate:     `${angle}deg`,
              width:      "120px",
              height:     "1px",
              background: "linear-gradient(to right, rgba(212,175,55,0.5), transparent)",
            }}
          />
        ))}
      </motion.div>

      {/* ── LEFT RING ─────────────────────────────────── */}
      <motion.div
        style={{
          x:      xLeft,
          y:      arrived ? finalYLeft : yLeft,
          rotate: rotLeft,
        }}
        className="absolute drop-shadow-[0_0_28px_rgba(212,175,55,0.5)] z-10"
      >
        <Ring gradientId="ringGoldL" shimmer />
      </motion.div>

      {/* ── RIGHT RING ────────────────────────────────── */}
      <motion.div
        style={{
          x:      xRight,
          y:      arrived ? finalYRight : yRight,
          rotate: rotRight,
        }}
        className="absolute drop-shadow-[0_0_28px_rgba(212,175,55,0.5)] z-10"
      >
        <Ring gradientId="ringGoldR" flip shimmer />
      </motion.div>

      {/* ── INTERLOCK OVERLAY ARC (left ring in front) ── */}
      {/* This arc appears above the right ring to create 3-D interlock */}
      <motion.div
        style={{
          x:      arrived ? 0 : xLeft,
          y:      arrived ? (finalYLeft as any) : yLeft,
          rotate: rotLeft,
          opacity: interlockOpacity,
        }}
        className="absolute z-30"
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-[180px] md:h-[180px] w-[110px] h-[110px]"
        >
          <defs>
            <linearGradient id="arcGoldPremium" x1="80" y1="14" x2="146" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#FFFBEA" />
              <stop offset="40%"  stopColor="#F5D060" />
              <stop offset="80%"  stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#A67C00" />
            </linearGradient>
            <filter id="arcGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* The arc that passes in FRONT of the right ring — top-right quarter */}
          <path
            d="M146 80 A66 66 0 0 0 80 14"
            stroke="url(#arcGoldPremium)"
            strokeWidth="11"
            strokeLinecap="round"
            filter="url(#arcGlow)"
          />
          {/* Inner echo arc */}
          <path
            d="M140 80 A60 60 0 0 0 80 20"
            stroke="rgba(255,248,220,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

    </div>
  );
}
