"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function WeddingRingsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["-30vw", "-15px"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["30vw", "15px"]);
  
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-45, 0]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [45, 0]);

  const glowOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const [particles, setParticles] = useState<Array<{left: string, top: string, duration: number, delay: number, yMove: number, scale: number}>>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    const generated = [...Array(30)].map(() => ({
      left: `${50 + (Math.random() - 0.5) * 60}%`,
      top: `${50 + (Math.random() - 0.5) * 60}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
      yMove: -50 - Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
    }));
    setParticles(generated);
  }, []);

  return (
    <section id="rings" ref={containerRef} className="h-[60vh] md:h-[80vh] relative bg-background flex items-center justify-center overflow-hidden">
        
      {/* Glow */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full blur-[80px] pointer-events-none"
      />

      {/* Floating Particles */}
      <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent/60 blur-[1px]"
            initial={{
              left: p.left,
              top: p.top,
              scale: p.scale,
            }}
            animate={{
              y: [0, p.yMove],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Rings */}
      <div className="relative w-full h-[300px] flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex items-center justify-center w-full h-full"
        >
          {/* Left Ring */}
          <motion.div 
            style={{ x: xLeft, rotate: rotateLeft }}
            className="absolute drop-shadow-[0_0_20px_rgba(201,166,107,0.3)] z-10"
          >
            <svg width="120" height="120" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[180px] md:h-[180px]">
              <circle cx="70" cy="70" r="60" stroke="url(#goldGradientLeft)" strokeWidth="8" />
              <defs>
                <linearGradient id="goldGradientLeft" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFF1B9" />
                  <stop offset="0.4" stopColor="#C9A66B" />
                  <stop offset="1" stopColor="#8B6914" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Right Ring */}
          <motion.div 
            style={{ x: xRight, rotate: rotateRight }}
            className="absolute drop-shadow-[0_0_20px_rgba(201,166,107,0.3)] z-0"
          >
            <svg width="120" height="120" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[180px] md:h-[180px]">
              <circle cx="70" cy="70" r="60" stroke="url(#goldGradientRight)" strokeWidth="8" />
              <defs>
                <linearGradient id="goldGradientRight" x1="130" y1="10" x2="10" y2="130" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFF1B9" />
                  <stop offset="0.6" stopColor="#C9A66B" />
                  <stop offset="1" stopColor="#8B6914" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Interlock overlay (arc of left ring over right ring) */}
          <motion.div 
            style={{ x: xLeft, rotate: rotateLeft, opacity: glowOpacity }}
            className="absolute z-20 drop-shadow-[0_0_20px_rgba(201,166,107,0.3)]"
          >
            <svg width="120" height="120" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[180px] md:h-[180px]">
              <path d="M130 70 A60 60 0 0 0 70 10" stroke="url(#goldGradientLeft)" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
