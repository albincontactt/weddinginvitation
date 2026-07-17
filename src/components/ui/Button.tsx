"use client";

import { ReactNode } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "outline" | "gold";
  href?: string;
}

export function Button({ children, variant = "primary", href, className = "", ...props }: ButtonProps) {
  const baseClasses = "relative overflow-hidden rounded-full font-poppins font-semibold px-8 py-4 transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-white shadow-lg hover:shadow-xl border-2 border-primary hover:bg-opacity-90",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
    gold: "bg-[#D4AF37] text-black font-bold shadow-md hover:bg-[#C59B27] hover:shadow-lg border-none"
  };

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Ripple effect could be added here, but scale and shadow work well for premium feel */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
}
