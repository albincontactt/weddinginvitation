"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Volume2, VolumeX } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/bg-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0; // Start at 0 for fade in
    
    // Attempt to play automatically
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      fadeIn();
    }).catch(() => {
      // Browser autoplay was blocked; gracefully fallback to manual play
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, []);

  const fadeIn = () => {
    if (!audioRef.current) return;
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    audioRef.current.volume = 0;
    fadeInterval.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume < volume) {
        audioRef.current.volume = Math.min(volume, audioRef.current.volume + 0.05);
      } else {
        if (fadeInterval.current) clearInterval(fadeInterval.current);
      }
    }, 100);
  };

  const fadeOut = (callback: () => void) => {
    if (!audioRef.current) return;
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    fadeInterval.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0.05) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
      } else {
        if (fadeInterval.current) clearInterval(fadeInterval.current);
        callback();
      }
    }, 100);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      fadeOut(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
        localStorage.setItem("musicPlaying", "false");
      });
    } else {
      audioRef.current.play().then(() => {
        fadeIn();
        setIsPlaying(true);
        localStorage.setItem("musicPlaying", "true");
      }).catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 md:top-6 md:bottom-auto md:right-6 z-50 flex items-center gap-2"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card hidden md:flex items-center gap-2 px-4 py-2 rounded-full"
          >
            <button onClick={toggleMute} className="text-accent hover:text-primary transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 accent-accent cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-12 h-12 rounded-full glass-card flex items-center justify-center border-accent/50 shadow-lg text-accent hover:bg-white/30 dark:hover:bg-black/30 transition-colors relative"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
        title="Play Background Music"
      >
        {isPlaying ? (
          <div className="flex gap-[2px] items-end h-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-accent rounded-full"
                animate={{
                  height: ["4px", "16px", "4px"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ) : (
          <Music className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
}
