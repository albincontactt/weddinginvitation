"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Story", href: "#love-story" },
    { name: "Couple", href: "#couple" },
    { name: "Details", href: "#details" },
    { name: "Locations", href: "#locations" },
    { name: "Rings", href: "#rings" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 w-[90%] md:w-auto"
        >
          <nav className="glass-card py-3 px-6 md:px-10 rounded-full flex items-center justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-poppins text-sm text-darkText hover:text-accent transition-colors whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
