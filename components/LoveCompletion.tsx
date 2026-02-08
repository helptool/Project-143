import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const LoveCompletion = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  // Standard Heart Path (Starts at bottom tip: M12 21.35)
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  // Wave Path for Liquid Effect (A box with a curved top)
  // Wide enough to slide horizontally for the ripple effect
  const wavePath = "M-100 25 Q-50 0 0 25 T100 25 T200 25 T300 25 V150 H-100 Z";

  return (
    <section className="min-h-[65vh] flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden transition-colors duration-[2000ms] ease-in-out"
      style={{ backgroundColor: isCompleted ? '#fff1f2' : '#f3f4f6' }} // Rose-50 vs Gray-100
    >
      
      {/* 1. ATMOSPHERE OVERLAY: Dull -> Warm */}
      {/* Initial Dullness: Desaturates the area to look 'dry' */}
      <motion.div 
         className="absolute inset-0 z-0 bg-slate-200 pointer-events-none mix-blend-multiply"
         animate={{ opacity: isCompleted ? 0 : 0.6 }}
         transition={{ duration: 2 }}
      />
      
      {/* Final Warmth: Soft Orb */}
      <motion.div 
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-300/20 blur-[100px] rounded-full z-0 pointer-events-none"
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: isCompleted ? 1 : 0, scale: isCompleted ? 1 : 0.8 }}
         transition={{ duration: 2.5 }}
      />

      <div className="relative z-10 flex flex-col items-center">
         
         {/* TEXT: Sad -> Happy */}
         <div className="h-16 mb-12 flex items-center justify-center">
            <motion.h3 
               key={isCompleted ? "completed" : "incomplete"}
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.5 }}
               className={`font-cursive text-4xl md:text-5xl tracking-wide transition-colors duration-[2000ms] ${isCompleted ? "text-rose-600 drop-shadow-sm" : "text-slate-400"}`}
            >
               {isCompleted ? "You completed me. ❤️" : "Something is missing..."}
            </motion.h3>
         </div>

         {/* INTERACTIVE HEART COMPONENT */}
         <div 
           className="relative w-80 h-80 cursor-pointer tap-highlight-transparent select-none group"
           onClick={() => !isCompleted && setIsCompleted(true)}
           style={{ WebkitTapHighlightColor: 'transparent' }}
         >
            <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
               <defs>
                 <clipPath id="heartClip"><path d={heartPath} /></clipPath>
                 
                 {/* Liquid Gradient: Deep Red to Soft Rose */}
                 <linearGradient id="liquidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" /> {/* Rose-400 (Top foam) */}
                    <stop offset="40%" stopColor="#e11d48" /> {/* Rose-600 (Body) */}
                    <stop offset="100%" stopColor="#9f1239" /> {/* Rose-800 (Deep) */}
                 </linearGradient>
               </defs>

               {/* --- LAYER 1: LIQUID FILL (Hidden Initially) --- */}
               <g clipPath="url(#heartClip)">
                  {/* The Wave Shape: Moves Up (Y) and Drifts (X) */}
                  <motion.path
                     d={wavePath}
                     fill="url(#liquidGradient)"
                     // Start: Below the view (Y=30), shifted left slightly
                     // End: Covering the view (Y=-5 to cover top), shifted right
                     initial={{ y: 30, x: -50 }} 
                     animate={{ 
                        y: isCompleted ? -5 : 30, 
                        x: isCompleted ? [-50, -20, -50] : -50 // Subtle horizontal ripple when full
                     }}
                     transition={{ 
                        y: { duration: 2.5, ease: "easeInOut" }, // Smooth liquid rise
                        x: { duration: 6, repeat: Infinity, ease: "easeInOut" } // Constant gentle flow
                     }}
                  />
                  
                  {/* Inner Highlight (Reflection) */}
                  <motion.ellipse 
                     cx="7" cy="7" rx="4" ry="2" 
                     fill="white" fillOpacity="0.2"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: isCompleted ? 1 : 0 }}
                     transition={{ delay: 1.5, duration: 1 }}
                     transform="rotate(-20 7 7)"
                  />
               </g>

               {/* --- LAYER 2: THE OUTLINE (Incomplete -> Complete) --- */}
               {/* 
                  pathLength logic:
                  0.45 = Draws ~45% of path. Since path starts at bottom tip (M12 21.35), 
                  this draws one side up to the top curve, leaving the other side open.
                  This ensures strict "Incomplete" look.
               */}
               <motion.path
                 d={heartPath}
                 fill="none"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 
                 // Color: Dull Slate Gray -> Vibrant Rose
                 stroke={isCompleted ? "#e11d48" : "#94a3b8"} 
                 
                 // Width: Thin/Weak -> Bold/Strong
                 strokeWidth={isCompleted ? 0.8 : 0.6} 
                 
                 initial={{ pathLength: 0.45, opacity: 0.7 }}
                 animate={{ 
                    pathLength: isCompleted ? 1 : 0.45,
                    opacity: isCompleted ? 1 : 0.7,
                    stroke: isCompleted ? "#e11d48" : "#94a3b8"
                 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
            </svg>
            
            {/* Visual Cue: Pulse (Only when incomplete) */}
            {!isCompleted && (
                <motion.div 
                    className="absolute inset-0 bg-slate-300/20 rounded-full blur-3xl -z-10"
                    animate={{ scale: [0.8, 1, 0.8], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {/* Sparkles (Only on Complete) */}
            {isCompleted && (
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                        <Sparkles className="absolute top-2 right-10 text-white w-5 h-5 animate-pulse" />
                        <Sparkles className="absolute bottom-10 left-6 text-rose-200 w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </motion.div>
                </div>
            )}
         </div>

         {/* Subtitle Transition */}
         <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isCompleted ? 1 : 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-12 font-handwriting text-2xl md:text-3xl text-rose-500/90 tracking-wide"
         >
            Forever & Always.
         </motion.p>
      </div>
    </section>
  );
};