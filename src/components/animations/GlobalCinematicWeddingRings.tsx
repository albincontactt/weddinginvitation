"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function GlobalCinematicWeddingRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ring refs
  const ringLeftRef = useRef<HTMLDivElement>(null);
  const ringRightRef = useRef<HTMLDivElement>(null);
  const interlockFrontRef = useRef<HTMLDivElement>(null); // For the realistic overlap
  
  // Climax FX refs
  const tightGlowRef = useRef<HTMLDivElement>(null);
  const lensFlareRef = useRef<HTMLDivElement>(null);
  const sparkBurstRef = useRef<HTMLDivElement>(null);
  const floatingParticlesRef = useRef<HTMLDivElement>(null);

  const [ringSize, setRingSize] = useState(180);
  const [sparks, setSparks] = useState<{ x: number; y: number; delay: number; size: number; color: string }[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number; dur: number; size: number }[]>([]);

  useEffect(() => {
    const updateSize = () => {
      setRingSize(window.innerWidth < 768 ? 120 : 180);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const colors = ["#FFFFFF", "#FFF8D6", "#FCE38A", "#D4AF37"];
    
    // Tiny floating gold particles (very low density, 1-3px)
    setParticles(
      Array.from({ length: 25 }, () => ({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        delay: Math.random() * 4,
        dur: Math.random() * 5 + 5,
        size: Math.random() * 2 + 1,
      }))
    );

    // Climax sparks (only for the interlock point)
    setSparks(
      Array.from({ length: 18 }, () => ({
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        delay: Math.random() * 1.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
  }, []);

  useGSAP(() => {
    // 1. Initial State Setup
    gsap.set(ringLeftRef.current, { x: "-48vw", rotation: -45, opacity: 0, scale: 0.9, willChange: "transform" });
    gsap.set(ringRightRef.current, { x: "48vw", rotation: 45, opacity: 0, scale: 0.9, willChange: "transform" });
    gsap.set(interlockFrontRef.current, { x: "48vw", rotation: 45, opacity: 0, scale: 0.9, willChange: "transform" });
    gsap.set([tightGlowRef.current, sparkBurstRef.current, lensFlareRef.current], { opacity: 0, scale: 0.5 });
    
    // Continuous subtle floating movement for luxury feel
    gsap.to(ringLeftRef.current, { y: -8, rotation: "-=2", duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(ringRightRef.current, { y: 8, rotation: "+=2", duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(interlockFrontRef.current, { y: 8, rotation: "+=2", duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Animate ambient floating particles (slow upward drift, fade in/out)
    if (floatingParticlesRef.current) {
      const motes = gsap.utils.toArray(floatingParticlesRef.current.children);
      motes.forEach((mote: any, i) => {
        gsap.to(mote, {
          y: "-=150",
          opacity: 0.8,
          duration: particles[i]?.dur || 6,
          repeat: -1,
          yoyo: true,
          delay: particles[i]?.delay || 0,
          ease: "sine.inOut"
        });
      });
    }

    // 2. Page Scroll Journey Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: () => {
          const finaleSection = document.getElementById("finale-section");
          if (finaleSection) {
            // End exactly when the finale section is centered in the viewport
            return `+=${finaleSection.offsetTop - window.innerHeight / 2}`;
          }
          return "bottom center";
        },
        scrub: true, // perfectly synchronized scrub, no jumps/snaps
      }
    });

    // Fade rings in as soon as scrolling starts
    tl.to([ringLeftRef.current, ringRightRef.current], { opacity: 1, duration: 0.05, ease: "power1.inOut" }, 0);
    
    // Slow, synchronized movement toward the center
    const interlockOffset = window.innerWidth < 768 ? 15 : 25; // How much they overlap
    tl.to(ringLeftRef.current, { x: -interlockOffset, rotation: -10, scale: 1, ease: "none" }, 0);
    tl.to(ringRightRef.current, { x: interlockOffset, rotation: 10, scale: 1, ease: "none" }, 0);
    tl.to(interlockFrontRef.current, { x: interlockOffset, rotation: 10, scale: 1, ease: "none" }, 0);

    // 3. Finale Climax Trigger
    ScrollTrigger.create({
      trigger: "#finale-section",
      start: "top center", 
      end: "bottom bottom",
      onEnter: () => {
        // Show interlock clipping layer to create the physical interlocking illusion
        gsap.to(interlockFrontRef.current, { opacity: 1, duration: 0.3 });
        
        // Warm golden glow & Lens Flare
        gsap.to([tightGlowRef.current, lensFlareRef.current], { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" });
        gsap.to(sparkBurstRef.current, { opacity: 1, duration: 0.5 });
        
        // Release elegant sparkling particles
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
        // Reverse climax when scrolling back up
        gsap.to(interlockFrontRef.current, { opacity: 0, duration: 0.3 });
        gsap.to([tightGlowRef.current, sparkBurstRef.current, lensFlareRef.current], { opacity: 0, scale: 0.5, duration: 0.8, ease: "power2.in" });
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
      
      {/* Ambient Floating Particles */}
      <div ref={floatingParticlesRef} className="absolute inset-0 flex items-center justify-center z-0">
        {particles.map((p, i) => (
          <div key={i} className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: p.size, height: p.size,
              marginLeft: p.x, marginTop: p.y,
              opacity: 0, // GSAP will animate this
              boxShadow: `0 0 ${p.size * 2}px #FFF8D6`,
            }}
          />
        ))}
      </div>

      {/* Climax: Warm Golden Glow */}
      <div ref={tightGlowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] flex items-center justify-center z-15">
        <div className="absolute w-[80px] h-[120px] bg-[#D4AF37] opacity-40 rounded-full blur-[30px] mix-blend-screen" />
        <div className="absolute w-[40px] h-[80px] bg-[#FFFFFF] opacity-60 rounded-full blur-[15px] mix-blend-screen" />
      </div>

      {/* Climax: Cinematic Lens Flare */}
      <div ref={lensFlareRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-15">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-[#FCE38A] to-transparent opacity-70 blur-[1px]" />
      </div>

      {/* Climax: Sparkling Particles */}
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

      {/* Left Ring (Back Layer) */}
      <div ref={ringLeftRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
        <Image 
          src="/wedding_band.png" 
          alt="Wedding Ring" 
          width={ringSize} 
          height={ringSize} 
          className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          priority
        />
      </div>

      {/* Right Ring (Middle Layer) */}
      <div ref={ringRightRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]">
        <Image 
          src="/wedding_band.png" 
          alt="Wedding Ring" 
          width={ringSize} 
          height={ringSize} 
          className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          priority
        />
      </div>

      {/* Right Ring (Front Clipped Layer for Interlock Illusion) */}
      {/* We duplicate the Right ring but clip it to only show the bottom/front half. 
          When this fades in, it overlaps the Left ring, completing the illusion of 3D interlocking. */}
      <div ref={interlockFrontRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
           style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}>
        <Image 
          src="/wedding_band.png" 
          alt="Wedding Ring Interlock" 
          width={ringSize} 
          height={ringSize} 
          className="object-contain"
          priority
        />
      </div>

    </div>
  );
}
