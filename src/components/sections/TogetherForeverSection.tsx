"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── Diamond sparkle types ─────────────────────────────── */
interface Spark {
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
  isDiamond: boolean;
}

/* ─── Single light ray ───────────────────────────────────── */
function LightRay({ angle, opacity }: { angle: number; opacity: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 origin-left"
      style={{
        rotate:     `${angle}deg`,
        width:      "180px",
        height:     "1.5px",
        marginTop:  "-0.75px",
        marginLeft: 0,
        background: `linear-gradient(to right, rgba(212,175,55,${opacity}), transparent)`,
        filter:     "blur(0.5px)",
      }}
    />
  );
}

/* ─── Component ─────────────────────────────────────────── */
export function TogetherForeverSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0.45, 1], [0, 1]);
  const contentY       = useTransform(scrollYProgress, [0.45, 1], [70, 0]);
  const glowScale      = useTransform(scrollYProgress, [0.55, 1], [0.3, 1.3]);
  const glowOpacity    = useTransform(scrollYProgress, [0.55, 1], [0, 1]);
  const altarOpacity   = useTransform(scrollYProgress, [0.65, 1], [0, 0.8]);
  const raysOpacity    = useTransform(scrollYProgress, [0.70, 1], [0, 1]);
  const archScale      = useTransform(scrollYProgress, [0.2, 0.8], [0.92, 1]);
  const archOpacity    = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  // Color palette for sparkles
  const SPARK_COLORS = ["#D4AF37", "#F5D060", "#FFF8DC", "#FFE066", "#FFFBEA", "#FFD700"];

  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    setSparks(
      Array.from({ length: 42 }, () => ({
        x:         (Math.random() - 0.5) * 480,
        y:         (Math.random() - 0.5) * 480,
        delay:     Math.random() * 3.5,
        size:      Math.random() * 5 + 1.5,
        color:     SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        isDiamond: Math.random() > 0.6,
      }))
    );
  }, []);

  const RAY_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  return (
    <section
      id="together-forever"
      ref={ref}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden py-32"
    >

      {/* ── Altar light from below (warm radial glow) ─── */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: altarOpacity,
          width:   "80vw",
          height:  "55vh",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0.07) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── Floral arch top border ───────────────────────── */}
      <motion.div
        style={{ scale: archScale, opacity: archOpacity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none w-full flex justify-center"
      >
        {/* Outer arch */}
        <div
          className="w-[92vw] md:w-[65vw] max-w-3xl h-[46vw] md:h-[32vw] max-h-[400px] rounded-t-full"
          style={{
            border:     "1.5px solid rgba(212,175,55,0.20)",
            boxShadow:  "0 -12px 70px rgba(212,175,55,0.08) inset, 0 0 40px rgba(212,175,55,0.04)",
          }}
        />
        {/* Inner arch echo */}
        <div
          className="absolute w-[80vw] md:w-[56vw] max-w-2xl h-[40vw] md:h-[28vw] max-h-[340px] rounded-t-full top-4"
          style={{ border: "1px solid rgba(212,175,55,0.10)" }}
        />
      </motion.div>

      {/* ── Floral corner accents ────────────────────────── */}
      {[
        { pos: "top-4 left-4",    o: "✿" },
        { pos: "top-4 right-4",   o: "✿" },
        { pos: "bottom-4 left-4", o: "❋" },
        { pos: "bottom-4 right-4",o: "❋" },
      ].map(({ pos, o }) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} text-[#D4AF37]/25 text-4xl select-none`}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {o}
        </motion.div>
      ))}

      {/* ── Central golden glow ──────────────────────────── */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[460px] md:h-[460px] rounded-full pointer-events-none"
        style={{
          scale:      glowScale,
          opacity:    glowOpacity,
          background:
            "radial-gradient(circle, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.08) 50%, transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Light rays emanating outward ─────────────────── */}
      <motion.div style={{ opacity: raysOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {RAY_ANGLES.map((angle) => (
          <LightRay key={angle} angle={angle} opacity={0.35} />
        ))}
      </motion.div>

      {/* ── Sparkle particles ────────────────────────────── */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {sparks.map((s, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              width:      s.size,
              height:     s.size,
              marginLeft: s.x,
              marginTop:  s.y,
            }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -50] }}
            transition={{
              duration:   2.5 + Math.random() * 1.5,
              repeat:     Infinity,
              delay:      s.delay,
              ease:       "easeOut",
            }}
          >
            {s.isDiamond ? (
              <span style={{ color: s.color, fontSize: s.size + 4, lineHeight: 1 }}>✦</span>
            ) : (
              <div
                className="rounded-full"
                style={{ width: "100%", height: "100%", background: s.color }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* ── Placeholder space for global rings ───────────── */}
      <div className="h-44 md:h-52 w-full" aria-hidden />

      {/* ── Text content ─────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center text-center px-6 mt-8"
      >
        {/* Title */}
        <h2 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold mb-4 gold-shimmer drop-shadow-[0_0_40px_rgba(212,175,55,0.5)]">
          Together Forever
        </h2>

        {/* Ornamental divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-[1px] w-20 md:w-36 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
          <motion.span
            className="text-[#D4AF37] text-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
          <div className="h-[1px] w-20 md:w-36 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
        </div>

        {/* Names */}
        <p className="font-cormorant text-4xl md:text-6xl font-bold text-[#F5F0E8] mb-8 tracking-widest">
          Joji{" "}
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-red-400 mx-2"
          >
            ❤️
          </motion.span>{" "}
          Vandana
        </p>

        {/* Quote */}
        <motion.p
          className="font-cormorant text-xl md:text-3xl text-[#F5F0E8]/80 italic leading-relaxed max-w-2xl font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          &ldquo;Two hearts...
          <br />
          One soul...
          <br />
          One beautiful journey begins forever.&rdquo;
        </motion.p>

        {/* Bottom ornament row */}
        <motion.div
          className="mt-12 flex gap-4 text-[#D4AF37]/50 text-lg"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>✦</span>
          <span>❖</span>
          <span>✿</span>
          <span>❖</span>
          <span>✦</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
