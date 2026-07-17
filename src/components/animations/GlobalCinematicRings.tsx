"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ─────────────────────────────────────────────────────────
   Shared SVG defs for realistic gold gradients (rendered once)
───────────────────────────────────────────────────────── */
function GoldDefs() {
  return (
    <defs>
      {/* High-contrast, realistic metallic gold gradient */}
      <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FFF8D6" />
        <stop offset="25%"  stopColor="#D4AF37" />
        <stop offset="45%"  stopColor="#735100" />
        <stop offset="55%"  stopColor="#FCE38A" />
        <stop offset="75%"  stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#523900" />
      </linearGradient>

      <linearGradient id="goldBandFlip" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#FFF8D6" />
        <stop offset="25%"  stopColor="#D4AF37" />
        <stop offset="45%"  stopColor="#735100" />
        <stop offset="55%"  stopColor="#FCE38A" />
        <stop offset="75%"  stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#523900" />
      </linearGradient>

      {/* Sharp metallic highlight sweep */}
      <linearGradient id="goldShimmer" x1="15%" y1="15%" x2="85%" y2="85%">
        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
        <stop offset="45%"  stopColor="#ffffff" stopOpacity="0.85" />
        <stop offset="55%"  stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

      {/* Realistic Diamond facets */}
      <radialGradient id="diamondCore" cx="40%" cy="30%" r="60%">
        <stop offset="0%"   stopColor="#FFFFFF" />
        <stop offset="40%"  stopColor="#F0FAFF" />
        <stop offset="70%"  stopColor="#CDEEFF" />
        <stop offset="100%" stopColor="#8AD6FF" stopOpacity="0.6" />
      </radialGradient>

      <linearGradient id="diamondFacetA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#D2EFFF" />
      </linearGradient>
      
      <linearGradient id="diamondFacetB" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#E5F4FF" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>

      <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="diamondGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function EngagementRing({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldDefs />
      {/* Outer rim highlight */}
      <circle cx="80" cy="80" r="69.5" stroke="#FFF5CC" strokeWidth="0.75" strokeOpacity="0.7" />
      {/* Main band - reduced stroke for elegance */}
      <circle cx="80" cy="80" r="65" stroke="url(#goldBand)" strokeWidth="8.5" filter="url(#goldGlow)" />
      {/* Sharp shimmer overlay */}
      <circle cx="80" cy="80" r="65" stroke="url(#goldShimmer)" strokeWidth="8.5" strokeDasharray="45 355" strokeDashoffset="-25" />
      {/* Inner rim highlight */}
      <circle cx="80" cy="80" r="60.5" stroke="#FFE066" strokeWidth="0.75" strokeOpacity="0.8" />
      
      {/* Diamond Setting (Prongs) */}
      <g transform="translate(80,18)">
        <rect x="-6" y="-3" width="12" height="9" rx="1.5" fill="url(#goldBand)" />
        <rect x="-8" y="-5" width="3" height="7" rx="1" fill="#D4AF37" />
        <rect x="5"  y="-5" width="3" height="7" rx="1" fill="#D4AF37" />
        <rect x="-5" y="-7" width="3" height="7" rx="1" fill="#D4AF37" />
        <rect x="2"  y="-7" width="3" height="7" rx="1" fill="#D4AF37" />
      </g>
      
      {/* Solitaire Diamond */}
      <g transform="translate(80,12)" filter="url(#diamondGlow)">
        <ellipse cx="0" cy="0" rx="9.5" ry="3.5" fill="#D2E8F8" opacity="0.7" />
        <polygon points="0,-11 9.5,0 -9.5,0"   fill="url(#diamondCore)"   opacity="0.95" />
        <polygon points="0,-11 9.5,0 4,-6"     fill="url(#diamondFacetA)" opacity="0.85" />
        <polygon points="0,-11 -9.5,0 -4,-6"   fill="url(#diamondFacetB)" opacity="0.85" />
        <polygon points="0,-11 4,-6 -4,-6"     fill="#FFFFFF"             opacity="0.9" />
        <polygon points="9.5,0 -9.5,0 0,7"     fill="url(#diamondFacetB)" opacity="0.8" />
        <polygon points="9.5,0 4,-6 0,7"       fill="#E5F2FA"             opacity="0.7" />
        <polygon points="-9.5,0 -4,-6 0,7"     fill="#FFFFFF"             opacity="0.7" />
        <polygon points="0,-8 7,-1.5 -7,-1.5"  fill="#FFFFFF"             opacity="0.5" />
        <circle cx="0" cy="6" r="1.2" fill="#FFFFFF" opacity="0.9" />
        <path d="M0,-13 L1,-9 L0,-5 L-1,-9 Z" fill="#FFFFFF" opacity="0.8" />
        <path d="M-5,-8 L-1.5,-7 L1.5,-7 L5,-8" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
      </g>
      
      {/* Micro Pavé Details on top arc */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const x = 80 + 65 * Math.cos(rad);
        const y = 80 + 65 * Math.sin(rad);
        return <circle key={deg} cx={x} cy={y} r="1.5" fill="#FFFFFF" opacity="0.5" />;
      })}
    </svg>
  );
}

function WeddingBand({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldDefs />
      <circle cx="80" cy="80" r="69.5" stroke="#FFF5CC" strokeWidth="0.75" strokeOpacity="0.7" />
      <circle cx="80" cy="80" r="65" stroke="url(#goldBandFlip)" strokeWidth="8.5" filter="url(#goldGlow)" />
      <circle cx="80" cy="80" r="65" stroke="url(#goldShimmer)" strokeWidth="8.5" strokeDasharray="30 370" strokeDashoffset="130" />
      <circle cx="80" cy="80" r="60.5" stroke="#FFE066" strokeWidth="0.75" strokeOpacity="0.8" />
      
      {/* Continuous Pavé Diamond Channel */}
      {Array.from({ length: 24 }, (_, i) => {
        const deg = (i / 24) * 360 - 90;
        const rad = (deg * Math.PI) / 180;
        const x = 80 + 65 * Math.cos(rad);
        const y = 80 + 65 * Math.sin(rad);
        return (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r="2.2" fill="#FFFFFF" opacity="0.85" />
            <circle r="1.1" fill="#F0FAFF" opacity="0.9" />
            {i % 6 === 0 && (
              <>
                <path d="M0,-3 L0.5,-0.8 L0,0.8 L-0.5,-0.8 Z" fill="white" opacity="0.9" />
                <path d="M-3,0 L-0.8,0.5 L0.8,0 L-0.8,-0.5 Z" fill="white" opacity="0.9" />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   Interlocking Arc Overlay (Left Ring Overlap)
───────────────────────────────────────────────────────── */
function InterlockArc({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arcGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FFF8D6" />
          <stop offset="30%"  stopColor="#FCE38A" />
          <stop offset="60%"  stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6300" />
        </linearGradient>
        <filter id="arcGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* 8.5 stroke width matching rings */}
      <path
        d="M145 80 A65 65 0 0 0 80 15"
        stroke="url(#arcGold)"
        strokeWidth="8.5"
        strokeLinecap="round"
        filter="url(#arcGlow)"
      />
      <path
        d="M145 80 A65 65 0 0 0 80 15"
        stroke="#FFFFFF"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeDasharray="20 200"
        strokeDashoffset="-15"
        opacity="0.5"
      />
      {[0, 25, 50, 75, 100].map((pct, i) => {
        const t = pct / 100;
        const angle = (0 + t * (-90 - 0)) * (Math.PI / 180);
        const x = 80 + 65 * Math.cos(angle);
        const y = 80 + 65 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="1.8" fill="#FFFFFF" opacity="0.8" />;
      })}
    </svg>
  );
}

export function GlobalCinematicRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringLeftRef = useRef<HTMLDivElement>(null);
  const ringRightRef = useRef<HTMLDivElement>(null);
  const interlockArcRef = useRef<HTMLDivElement>(null);
  const tightGlowRef = useRef<HTMLDivElement>(null);
  const sparkBurstRef = useRef<HTMLDivElement>(null);

  // Considerably smaller and more elegant ring sizes
  const [ringSize, setRingSize] = useState(150);

  useEffect(() => {
    const updateSize = () => {
      setRingSize(window.innerWidth < 768 ? 100 : 150);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const [sparks, setSparks] = useState<{ x: number; y: number; delay: number; size: number; color: string }[]>([]);

  useEffect(() => {
    // Generate fewer, more delicate sparks exclusively for the overlap area
    const colors = ["#FFFFFF", "#FFF8D6", "#FCE38A", "#D4AF37"];
    setSparks(
      Array.from({ length: 15 }, () => ({
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 120, // Taller spread to cover the top and bottom intersections
        delay: Math.random() * 1.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
  }, []);

  useGSAP(() => {
    // Initial off-screen/faded states
    gsap.set(ringLeftRef.current, { x: "-48vw", rotation: -60, opacity: 0 });
    gsap.set(ringRightRef.current, { x: "48vw", rotation: 60, opacity: 0 });
    gsap.set(interlockArcRef.current, { x: "-48vw", rotation: -60, opacity: 0 });
    gsap.set([tightGlowRef.current, sparkBurstRef.current], { opacity: 0, scale: 0.5 });
    
    // Subtle float
    gsap.to(ringLeftRef.current, { y: -6, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(ringRightRef.current, { y: 6, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(interlockArcRef.current, { y: -6, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Scroll mapping
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: () => {
          const togetherSection = document.getElementById("together-forever");
          if (togetherSection) {
            return `+=${togetherSection.offsetTop - window.innerHeight / 2}`;
          }
          return "bottom center";
        },
        scrub: 1.5,
      }
    });

    tl.to([ringLeftRef.current, ringRightRef.current], { opacity: 1, duration: 0.1 }, 0);
    // Move closer to center (smaller rings overlap beautifully at roughly x = +/- 14)
    tl.to(ringLeftRef.current, { x: -14, rotation: -10, ease: "power1.inOut" }, 0);
    tl.to(interlockArcRef.current, { x: -14, rotation: -10, ease: "power1.inOut" }, 0);
    tl.to(ringRightRef.current, { x: 14, rotation: 10, ease: "power1.inOut" }, 0);

    // Final interlock climax
    ScrollTrigger.create({
      trigger: "#together-forever",
      start: "top center", 
      end: "bottom bottom",
      onEnter: () => {
        // Show interlock
        gsap.to(interlockArcRef.current, { opacity: 1, duration: 0.5 });
        // Show very localized glow at the joint
        gsap.to(tightGlowRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" });
        gsap.to(sparkBurstRef.current, { opacity: 1, duration: 0.5 });
        
        if (sparkBurstRef.current) {
          const sparkElements = gsap.utils.toArray(sparkBurstRef.current.children);
          sparkElements.forEach((spark: any, i) => {
            gsap.fromTo(spark, 
              { scale: 0, opacity: 1 }, 
              { scale: 1.5, opacity: 0, duration: 1 + Math.random(), delay: sparks[i]?.delay || 0, repeat: -1, ease: "power1.out" }
            );
          });
        }
      },
      onLeaveBack: () => {
        gsap.to(interlockArcRef.current, { opacity: 0, duration: 0.5 });
        gsap.to([tightGlowRef.current, sparkBurstRef.current], { opacity: 0, scale: 0.5, duration: 0.8, ease: "power2.in" });
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Extremely localized, tight glow exactly where the rings overlap */}
      <div ref={tightGlowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] flex items-center justify-center pointer-events-none z-25">
        {/* Glow behind the front arc but in front of the back ring */}
        <div className="absolute w-[60px] h-[120px] bg-[#FFF8D6] opacity-30 rounded-full blur-[25px]" />
        <div className="absolute w-[30px] h-[80px] bg-[#FFFFFF] opacity-50 rounded-full blur-[12px]" />
      </div>

      {/* Sparkles tightly packed around the joint */}
      <div ref={sparkBurstRef} className="absolute top-1/2 left-1/2 flex items-center justify-center z-40">
        {sparks.map((s, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: s.size, height: s.size,
              marginLeft: s.x, marginTop: s.y,
              background: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            }}
          />
        ))}
      </div>

      {/* Left Ring (Engagement) */}
      <div ref={ringLeftRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] z-20">
        <EngagementRing size={ringSize} />
      </div>

      {/* Right Ring (Wedding Band) */}
      <div ref={ringRightRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] z-10">
        <WeddingBand size={ringSize} />
      </div>

      {/* Interlock Arc (Left ring front overlap) */}
      <div ref={interlockArcRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-30">
        <InterlockArc size={ringSize} />
      </div>
    </div>
  );
}
