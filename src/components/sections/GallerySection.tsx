"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../animations/FadeIn";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import Image from "next/image";

const images = [
  "/images/gallery/photo1.jpg",
  "/images/gallery/photo2.jpg",
  "/images/gallery/photo3.jpg",
  "/images/gallery/photo4.jpg",
  "/images/gallery/photo5.jpg",
  "/images/gallery/photo6.jpg",
];

const GalleryItem = ({ 
  src, 
  index, 
  onClick, 
  onLoadStatus 
}: { 
  src: string; 
  index: number; 
  onClick: () => void;
  onLoadStatus: (index: number, loaded: boolean) => void;
}) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  const isPlaceholder = status !== "loaded";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl aspect-[3/4] w-full ${isPlaceholder ? 'cursor-default' : 'cursor-pointer group'}`}
      onClick={() => {
        if (status === "loaded") onClick();
      }}
    >
      {/* Placeholder Fallback Background & Content */}
      <div className="absolute inset-0 bg-background/50 border-2 border-accent/40 flex flex-col items-center justify-center transition-colors duration-500 hover:bg-background/80">
        {/* Soft floral background pattern (radial gradient for soft look) */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/40 to-transparent" />
        
        {/* Glassmorphism Card */}
        <div className="relative z-10 p-4 sm:p-6 glass-card border border-accent/30 text-center mx-4 flex flex-col items-center shadow-lg">
          <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-accent mb-4 animate-pulse" />
          <h3 className="font-cormorant text-xl sm:text-2xl md:text-3xl font-bold text-darkText mb-2 whitespace-nowrap">
            Photo Coming Soon
          </h3>
          <p className="font-cinzel text-accent uppercase tracking-widest text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
            Joji <span className="text-red-400 animate-pulse inline-block">❤️</span> Vandana
          </p>
        </div>
        
        {/* Soft sparkle animation */}
        <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
        <div className="absolute bottom-12 left-8 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-4 w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <Image
        src={src}
        alt={`Gallery Image ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized={true}
        className={`object-cover transform transition-all duration-700 group-hover:scale-110 z-20 ${status === "loaded" ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => {
          setStatus("loaded");
          onLoadStatus(index, true);
        }}
        onError={() => {
          setStatus("error");
          onLoadStatus(index, false);
        }}
      />
      
      {/* Hover Overlay for real images */}
      {status === "loaded" && (
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors z-30 pointer-events-none" />
      )}
    </motion.div>
  );
};

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleLoadStatus = (index: number, loaded: boolean) => {
    setLoadedImages(prev => ({ ...prev, [index]: loaded }));
  };

  const getAvailableIndices = () => {
    return images.map((_, i) => i).filter(i => loadedImages[i]);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      const available = getAvailableIndices();
      const currentIndex = available.indexOf(selectedImage);
      if (currentIndex > 0) {
        setSelectedImage(available[currentIndex - 1]);
      } else {
        setSelectedImage(available[available.length - 1]);
      }
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      const available = getAvailableIndices();
      const currentIndex = available.indexOf(selectedImage);
      if (currentIndex < available.length - 1) {
        setSelectedImage(available[currentIndex + 1]);
      } else {
        setSelectedImage(available[0]);
      }
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="font-cormorant text-4xl md:text-5xl text-darkText font-bold text-center mb-16">
            Our Beautiful Moments
          </h2>
        </FadeIn>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((src, index) => (
            <FadeIn key={index} direction="up" delay={index * 0.1} className="break-inside-avoid">
              <GalleryItem 
                src={src} 
                index={index} 
                onClick={() => setSelectedImage(index)}
                onLoadStatus={handleLoadStatus}
              />
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {getAvailableIndices().length > 1 && (
              <button
                className="absolute left-4 md:left-12 text-white/50 hover:text-white transition-colors p-4 z-50"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
              </button>
            )}

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`Expanded Image ${selectedImage + 1}`}
                fill
                unoptimized={true}
                className="object-contain"
              />
            </motion.div>

            {getAvailableIndices().length > 1 && (
              <button
                className="absolute right-4 md:right-12 text-white/50 hover:text-white transition-colors p-4 z-50"
                onClick={handleNext}
              >
                <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
