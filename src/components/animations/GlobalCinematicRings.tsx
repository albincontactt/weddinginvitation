"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ─────────────────────────────────────────────────────────
   Shared SVG defs for gold gradients (rendered once)
───────────────────────────────────────────────────────── */
function GoldDefs() {
  return (
    <defs>
      <linearGradient id="goldBand" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#FFF5CC" />
        <stop offset="12%"  stopColor="#D4AF37" />
        <stop offset="28%"  stopColor="#FFE066" />
        <stop offset="48%"  stopColor="#B8860B" />
        <stop offset="65%"  stopColor="#FFD700" />
        <stop offset="82%"  stopColor="#C8960C" />
        <stop offset="100%" stopColor="#FFF0A0" />
      </linearGradient>

      <linearGradient id="goldBandFlip" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#FFF5CC" />
        <stop offset="12%"  stopColor="#D4AF37" />
        <stop offset="28%"  stopColor="#FFE066" />
        <stop offset="48%"  stopColor="#B8860B" />
        <stop offset="65%"  stopColor="#FFD700" />
        <stop offset="82%"  stopColor="#C8960C" />
        <stop offset="100%" stopColor="#FFF0A0" />
      </linearGradient>

      <linearGradient id="goldShimmer" x1="20%" y1="20%" x2="80%" y2="80%">
        <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
        <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>

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

function EngagementRing({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldDefs />
      <circle cx="80" cy="80" r="70" stroke="#FFF5CC" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="80" cy="80" r="63" stroke="url(#goldBand)" strokeWidth="13" filter="url(#goldGlow)" />
      <circle cx="80" cy="80" r="63" stroke="url(#goldShimmer)" strokeWidth="13" strokeDasharray="55 345" strokeDashoffset="-20" />
      <circle cx="80" cy="80" r="56.5" stroke="#FFE066" strokeWidth="1" strokeOpacity="0.6" />
      <g transform="translate(80,21)">
        <rect x="-7" y="-4" width="14" height="12" rx="2" fill="url(#goldBand)" />
        <rect x="-9" y="-6" width="4" height="8" rx="1.5" fill="#D4AF37" />
        <rect x="5"  y="-6" width="4" height="8" rx="1.5" fill="#D4AF37" />
        <rect x="-7" y="-8" width="4" height="8" rx="1.5" fill="#D4AF37" />
        <rect x="3"  y="-8" width="4" height="8" rx="1.5" fill="#D4AF37" />
      </g>
      <g transform="translate(80,14)" filter="url(#diamondGlow)">
        <ellipse cx="0" cy="0" rx="11" ry="4" fill="#C8D8E8" opacity="0.6" />
        <polygon points="0,-13 11,0 -11,0"    fill="url(#diamondCore)"   opacity="0.95" />
        <polygon points="0,-13 11,0 5,-7"     fill="url(#diamondFacetA)" opacity="0.85" />
        <polygon points="0,-13 -11,0 -5,-7"   fill="url(#diamondFacetB)" opacity="0.85" />
        <polygon points="0,-13 5,-7 -5,-7"    fill="#FFFFFF"             opacity="0.9" />
        <polygon points="11,0 -11,0 0,8"      fill="url(#diamondFacetB)" opacity="0.8" />
        <polygon points="11,0 5,-7 0,8"       fill="#DCEEF8"             opacity="0.7" />
        <polygon points="-11,0 -5,-7 0,8"     fill="#FFFFFF"             opacity="0.7" />
        <polygon points="0,-10 8,-2 -8,-2"    fill="#FFFFFF"             opacity="0.5" />
        <circle cx="0" cy="7" r="1.5" fill="#FFFFFF" opacity="0.9" />
        <path d="M0,-15 L1,-10 L0,-5 L-1,-10 Z" fill="#FFFFFF" opacity="0.8" />
        <path d="M-6,-9 L-2,-8 L2,-8 L6,-9"     stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
      </g>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const x = 80 + 63 * Math.cos(rad);
        const y = 80 + 63 * Math.sin(rad);
        return <circle key={deg} cx={x} cy={y} r="1.8" fill="#FFFFFF" opacity="0.6" />;
      })}
    </svg>
  );
}

function WeddingBand({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <GoldDefs />
      <circle cx="80" cy="80" r="70" stroke="#FFF5CC" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="80" cy="80" r="63" stroke="url(#goldBandFlip)" strokeWidth="13" filter="url(#goldGlow)" />
      <circle cx="80" cy="80" r="63" stroke="url(#goldShimmer)" strokeWidth="13" strokeDasharray="40 360" strokeDashoffset="120" />
      <circle cx="80" cy="80" r="56.5" stroke="#FFE066" strokeWidth="1" strokeOpacity="0.6" />
      {Array.from({ length: 20 }, (_, i) => {
        const deg = (i / 20) * 360 - 90;
        const rad = (deg * Math.PI) / 180;
        const x = 80 + 63 * Math.cos(rad);
        const y = 80 + 63 * Math.sin(rad);
        return (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r="2.8" fill="#FFFFFF" opacity="0.85" />
            <circle r="1.4" fill="#E8F8FF" opacity="0.9" />
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
   Interlocking Arc Overlay
───────────────────────────────────────────────────────── */
function InterlockArc({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <path
        d="M143 80 A63 63 0 0 0 80 17"
        stroke="url(#arcGold)"
        strokeWidth="13"
        strokeLinecap="round"
        filter="url(#arcGlow)"
      />
      <path
        d="M143 80 A63 63 0 0 0 80 17"
        stroke="#FFFFFF"
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray="30 200"
        strokeDashoffset="-10"
        opacity="0.4"
      />
      {[0, 22, 45, 68, 90].map((pct, i) => {
        const t = pct / 100;
        const angle = (0 + t * (-90 - 0)) * (Math.PI / 180);
        const x = 80 + 63 * Math.cos(angle);
        const y = 80 + 63 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="2.2" fill="#FFFFFF" opacity="0.85" />;
      })}
    </svg>
  );
}

export function GlobalCinematicRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const ringLeftRef = useRef<HTMLDivElement>(null);
  const ringRightRef = useRef<HTMLDivElement>(null);
  const interlockArcRef = useRef<HTMLDivElement>(null);
  
  const bloomContainerRef = useRef<HTMLDivElement>(null);
  const glowCoreRef = useRef<HTMLDivElement>(null);
  const glowRaysRef = useRef<HTMLDivElement>(null);
  const lensFlareRef = useRef<HTMLDivElement>(null);
  
  const particlesRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  const [ringSize, setRingSize] = useState(210);

  useEffect(() => {
    const updateSize = () => {
      setRingSize(window.innerWidth < 768 ? 140 : 210);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Set up particles
  const [sparks, setSparks] = useState<{ x: number; y: number; delay: number; size: number; color: string }[]>([]);
  const [dust, setDust] = useState<{ x: number; y: number; delay: number; dur: number }[]>([]);

  useEffect(() => {
    const colors = ["#D4AF37", "#FFD700", "#FFF8DC", "#FFE066", "#FFFFFF", "#FFC300"];
    setSparks(
      Array.from({ length: 60 }, () => ({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        delay: Math.random() * 2,
        size: Math.random() * 6 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
    setDust(
      Array.from({ length: 45 }, () => ({
        x: (Math.random() - 0.5) * 700,
        y: (Math.random() - 0.5) * 700,
        delay: Math.random() * 3,
        dur: Math.random() * 4 + 4,
      }))
    );
  }, []);

  useGSAP(() => {
    // Initial states
    gsap.set(ringLeftRef.current, { x: "-48vw", rotation: -70, opacity: 0 });
    gsap.set(ringRightRef.current, { x: "48vw", rotation: 70, opacity: 0 });
    gsap.set(interlockArcRef.current, { x: "-48vw", rotation: -70, opacity: 0 });
    
    gsap.set([bloomContainerRef.current, glowCoreRef.current, glowRaysRef.current, lensFlareRef.current, particlesRef.current], { opacity: 0, scale: 0.5 });
    
    // Add continuous subtle floating animation to the rings (yoyo)
    gsap.to(ringLeftRef.current, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(ringRightRef.current, { y: 8, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(interlockArcRef.current, { y: -8, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Scroll-driven animation spanning the entire page up to the together-forever section
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
        scrub: 1.5, // Smooth scrubbing
      }
    });

    // Fade rings in immediately as user starts scrolling
    tl.to([ringLeftRef.current, ringRightRef.current], { opacity: 1, duration: 0.1 }, 0);
    
    // Move rings inward and rotate
    tl.to(ringLeftRef.current, { x: -20, rotation: -12, ease: "power1.inOut" }, 0);
    tl.to(interlockArcRef.current, { x: -20, rotation: -12, ease: "power1.inOut" }, 0);
    tl.to(ringRightRef.current, { x: 20, rotation: 12, ease: "power1.inOut" }, 0);

    // Continuous rotation of the glow rays
    gsap.to(glowRaysRef.current, { rotation: 360, duration: 60, repeat: -1, ease: "none" });
    
    // Animate dust particles continuously
    if (dustRef.current) {
      const dustMotes = gsap.utils.toArray(dustRef.current.children);
      dustMotes.forEach((mote: any, i) => {
        gsap.to(mote, {
          y: -100 - Math.random() * 100,
          opacity: 0,
          duration: dust[i]?.dur || 5,
          repeat: -1,
          delay: dust[i]?.delay || 0,
          ease: "none"
        });
      });
    }

    // Set up a ScrollTrigger specifically for the final interlock climax when hitting the together-forever section
    ScrollTrigger.create({
      trigger: "#together-forever",
      start: "top center", 
      end: "bottom bottom",
      onEnter: () => {
        // Climax animation! Rings interlock, bloom happens
        gsap.to(interlockArcRef.current, { opacity: 1, duration: 0.5 });
        gsap.to([bloomContainerRef.current, glowCoreRef.current, lensFlareRef.current], { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5, 
          ease: "power2.out",
          stagger: 0.2
        });
        gsap.to(glowRaysRef.current, { opacity: 0.8, scale: 1, duration: 1.5, ease: "power2.out" });
        gsap.to(particlesRef.current, { opacity: 1, duration: 0.5 });
        
        // Trigger particle bursts
        if (particlesRef.current) {
          const sparkElements = gsap.utils.toArray(particlesRef.current.children);
          sparkElements.forEach((spark: any, i) => {
            gsap.fromTo(spark, 
              { scale: 0, opacity: 1 }, 
              { 
                scale: 2, 
                opacity: 0, 
                duration: 1.5 + Math.random(), 
                delay: sparks[i]?.delay || 0,
                repeat: -1,
                ease: "power1.out"
              }
            );
          });
        }
      },
      onLeaveBack: () => {
        gsap.to(interlockArcRef.current, { opacity: 0, duration: 0.5 });
        gsap.to([bloomContainerRef.current, glowCoreRef.current, glowRaysRef.current, lensFlareRef.current, particlesRef.current], { 
          opacity: 0, 
          scale: 0.5, 
          duration: 1, 
          ease: "power2.in"
        });
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Bloom & Glow Layers */}
      <div ref={bloomContainerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[800px] h-[800px]"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.65) 0%, rgba(212,175,55,0.2) 35%, transparent 65%)", filter: "blur(60px)" }}
      />
      
      <div ref={glowCoreRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[350px] h-[350px]"
        style={{ background: "radial-gradient(circle, rgba(255,248,180,0.95) 0%, rgba(212,175,55,0.55) 45%, transparent 75%)", filter: "blur(20px)" }}
      />

      {/* Lens Flare */}
      <div ref={lensFlareRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,230,50,0.6) 35%, rgba(255,255,200,1) 50%, rgba(255,230,50,0.6) 65%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />
      <div ref={lensFlareRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[400px]"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(255,230,50,0.4) 35%, rgba(255,255,200,0.8) 50%, rgba(255,230,50,0.4) 65%, transparent 100%)",
          filter: "blur(2px)",
        }}
      />

      {/* Volumetric Rays */}
      <div ref={glowRaysRef} className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center">
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
          <div key={angle} className="absolute origin-left"
            style={{
              rotate: `${angle}deg`,
              width: angle % 90 === 0 ? "350px" : angle % 45 === 0 ? "250px" : "180px",
              height: angle % 90 === 0 ? "2.5px" : "1.5px",
              background: "linear-gradient(to right, rgba(212,175,55,0.85), rgba(255,220,50,0.35), transparent)",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Sparkle Particles Burst */}
      <div ref={particlesRef} className="absolute top-1/2 left-1/2 flex items-center justify-center">
        {sparks.map((s, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              width: s.size, height: s.size,
              marginLeft: s.x, marginTop: s.y,
              background: s.color,
              boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            }}
          />
        ))}
      </div>

      {/* Floating Golden Dust */}
      <div ref={dustRef} className="absolute top-1/2 left-1/2 flex items-center justify-center opacity-60">
        {dust.map((d, i) => (
          <div key={i} className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: 2.5, height: 2.5,
              marginLeft: d.x, marginTop: d.y,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Left Ring (Engagement) */}
      <div ref={ringLeftRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] z-20">
        <EngagementRing size={ringSize} />
      </div>

      {/* Right Ring (Wedding Band) */}
      <div ref={ringRightRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] z-10">
        <WeddingBand size={ringSize} />
      </div>

      {/* Interlock Arc (Left ring front overlap) */}
      <div ref={interlockArcRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
        <InterlockArc size={ringSize} />
      </div>
    </div>
  );
}
