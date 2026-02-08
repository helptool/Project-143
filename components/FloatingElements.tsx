import React from 'react';
import { motion } from 'framer-motion';
import { NICKNAMES } from '../constants';

export const FloatingHearts = () => {
  // Increased count to ensure ~6-7 hearts are visible simultaneously
  const hearts = Array.from({ length: 20 });
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => {
        // Random depth factors
        const depth = Math.random(); 
        const scale = 0.5 + depth; // 0.5 to 1.5
        const blur = (1 - depth) * 2; // 0px to 2px
        const duration = 20 + Math.random() * 25; // Slower: 20s to 45s

        return (
          <motion.div
            key={i}
            className="absolute text-rose-300/40 cursor-pointer pointer-events-auto hover:text-rose-500/80 transition-colors"
            initial={{ 
              opacity: 0, 
              y: '110vh', 
              x: Math.random() * window.innerWidth 
            }}
            animate={{ 
              opacity: [0, 0.4 + (depth * 0.3), 0], // Vary opacity based on depth
              y: '-10vh',
              x: (Math.random() - 0.5) * 300 // Gentle horizontal drift
            }}
            transition={{ 
              duration: duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 20
            }}
            whileHover={{ scale: scale * 1.2, opacity: 1 }}
            style={{
              fontSize: `${16 + depth * 20}px`, // Size based on depth
              left: `${Math.random() * 100}%`,
              filter: `blur(${blur}px)`,
              zIndex: Math.floor(depth * 10) // Z-index based on depth
            }}
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
};

export const FloatingNicknames = () => {
  const floatingTexts = Array.from({ length: 5 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingTexts.map((_, i) => {
        const name = NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)];
        return (
          <motion.div
            key={`nick-${i}`}
            className="absolute text-rose-400/20 font-handwriting text-2xl md:text-3xl whitespace-nowrap"
            initial={{ 
              opacity: 0, 
              x: Math.random() > 0.5 ? '-10vw' : '110vw',
              y: Math.random() * window.innerHeight
            }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              x: Math.random() > 0.5 ? '110vw' : '-10vw',
            }}
            transition={{ 
              duration: 30 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 20
            }}
          >
            {name}
          </motion.div>
        );
      })}
    </div>
  );
};

export const Sparkles = () => {
  // Increased count for micro-particles, reduced size
  const sparkles = Array.from({ length: 40 });
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 2 + 1 + 'px', // Tiny: 1px to 3px
            height: Math.random() * 2 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(255, 255, 255, 0.6)`
          }}
          animate={{
            opacity: [0, Math.random() * 0.5 + 0.2, 0], // Subtle opacity
            scale: [0, 1, 0],
            y: [0, -20 - Math.random() * 30] // Slight upward float
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export const FallingPetals = () => {
  // Subtle falling petals for specific sections
  const petals = Array.from({ length: 25 });
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {petals.map((_, i) => {
        const size = Math.random() * 10 + 6;
        const isRounded = Math.random() > 0.5;
        
        return (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-br from-rose-200/40 to-pink-300/20"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: -30,
              borderRadius: isRounded ? '50% 0 50% 0' : '0 50% 0 50%',
            }}
            animate={{
              y: '120vh', // Fall through the viewport
              x: (Math.random() - 0.5) * 300, // Horizontal drift
              rotate: 360,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};