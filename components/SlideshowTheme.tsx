import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA STRUCTURE ---
// Matches the "Playlist" tab structure
interface PlaylistItem {
  MediaURL: string;  // The Image or Video Link
  Type: string;      // 'Image' or 'Video'
  Duration: number;  // How many seconds to show it
  Fit: string;       // 'Cover' (Fill screen) or 'Contain' (Show whole image)
  Transition: string; // 'Fade', 'Slide', 'Zoom', 'Flip'
  Rotation?: number; // 0, 90, -90 (Fix sideways videos)
}

// --- ANIMATION LIBRARY ---
const animations = {
  Fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1 }
  },
  Slide: {
    initial: { x: '100%', opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 1 },
    transition: { type: "spring", stiffness: 30, damping: 15 }
  },
  Zoom: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0 },
    transition: { duration: 0.8 }
  },
  Flip: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: { duration: 0.8 }
  }
};

// --- MAIN COMPONENT ---
const SlideshowTheme: React.FC<{ playlist: PlaylistItem[] }> = ({ playlist = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ⏱️ THE TIMER LOGIC
  useEffect(() => {
    if (playlist.length === 0) return;

    // 1. Get duration for current slide (Default to 10 seconds if missing)
    // The sheet usually sends strings, so we convert to Number just in case
    const rawDuration = playlist[currentIndex].Duration;
    const durationSec = rawDuration ? Number(rawDuration) : 10;

    // 2. Set the timer
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    }, durationSec * 1000); // Convert to milliseconds

    return () => clearTimeout(timer);
  }, [currentIndex, playlist]);

  // If empty, show black screen
  if (playlist.length === 0) return <div className="bg-black h-screen w-screen flex items-center justify-center text-white font-mono">Waiting for Content...</div>;

  const currentSlide = playlist[currentIndex];
  
  // Select Animation (Default to Fade if typo)
  const animMode = currentSlide.Transition && animations[currentSlide.Transition as keyof typeof animations] 
    ? animations[currentSlide.Transition as keyof typeof animations] 
    : animations.Fade;

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative flex items-center justify-center perspective-1000">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial={animMode.initial}
          animate={animMode.animate}
          exit={animMode.exit}
          transition={animMode.transition}
        >
          {/* ROTATION & FIT WRAPPER */}
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ transform: `rotate(${currentSlide.Rotation || 0}deg)` }} 
          >
            {currentSlide.Type === 'Video' ? (
              <video
                src={currentSlide.MediaURL}
                autoPlay
                muted
                // Important: Loop is false so it stops when the slide timer ends
                loop={false} 
                className={`w-full h-full ${currentSlide.Fit === 'Contain' ? 'object-contain' : 'object-cover'}`}
              />
            ) : (
              <img
                src={currentSlide.MediaURL}
                alt="Slide"
                className={`w-full h-full ${currentSlide.Fit === 'Contain' ? 'object-contain' : 'object-cover'}`}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SlideshowTheme;
