import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Heart, MapPin, Sparkles } from 'lucide-react';

export const InteractiveBridge = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [width, setWidth] = useState(0);

  // Calculate drag constraints on mount
  useEffect(() => {
    if (constraintsRef.current) {
      setWidth(constraintsRef.current.offsetWidth - 60); // 60 is handle width + padding
    }
  }, []);

  const handleDragEnd = () => {
    const currentX = x.get();
    // If dragged past 85%, complete the action
    if (currentX > width * 0.85) {
      setIsCompleted(true);
      animate(x, width, { type: "spring", stiffness: 300, damping: 25 });
    } else {
      // Otherwise snap back
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  const backgroundOpacity = useTransform(x, [0, width], [0, 1]);
  const textOpacity = useTransform(x, [0, width / 2], [1, 0]);

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-6 relative overflow-visible">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-100/30 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-xl w-full glass-card p-8 md:p-12 rounded-[2.5rem] text-center border-white/60 relative z-10 shadow-xl overflow-hidden">
        
        {/* Confetti / Sparkles on Complete */}
        {isCompleted && (
          <div className="absolute inset-0 pointer-events-none">
             {[...Array(12)].map((_, i) => (
                <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                   animate={{ 
                       opacity: [0, 1, 0], 
                       scale: [0, 1, 0.5], 
                       x: (Math.random() - 0.5) * 400,
                       y: (Math.random() - 0.5) * 400
                   }}
                   transition={{ duration: 1.5, delay: 0.2 }}
                   className="absolute top-1/2 left-1/2"
                >
                   <Heart size={Math.random() * 20 + 10} className="text-rose-400 fill-rose-200" />
                </motion.div>
             ))}
          </div>
        )}

        <div className="mb-10 relative z-20">
            <h3 className="font-cursive text-5xl text-rose-600 mb-4 drop-shadow-sm">Bridge The Distance 🌉</h3>
            <motion.p 
              key={isCompleted ? "completed" : "active"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-500 font-nunito tracking-wide text-sm md:text-base"
            >
                {isCompleted 
                    ? "Love knows no distance. My heart is right there with you. 💕" 
                    : "Drag the heart to close the gap between us..."}
            </motion.p>
        </div>

        {/* Animation Visual Area */}
        <div className="relative h-40 mb-10 flex items-center justify-between px-4 md:px-10">
            {/* Avatar Left (Me) */}
            <motion.div 
                animate={isCompleted ? { opacity: 0, scale: 0.8, x: 50 } : {}}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-2 text-rose-400 relative z-10"
            >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-rose-50 flex items-center justify-center border-2 border-rose-200 shadow-md">
                    <MapPin size={24} className="text-rose-500" />
                </div>
                <span className="font-handwriting text-xl font-bold">Me</span>
            </motion.div>

            {/* Connection Line */}
            <div className="flex-1 mx-6 h-0.5 relative flex items-center">
                {/* Dashed Line (Base) */}
                <div className="absolute inset-0 border-t-2 border-dashed border-rose-300/60"></div>
                
                {/* Progress Line (Pink) */}
                <motion.div 
                    style={{ width: x, maxWidth: '100%' }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]"
                />

                {/* Central Burst Icon */}
                {isCompleted && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/50 animate-pulse">
                            <Heart size={48} className="text-white fill-white drop-shadow-lg" />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Avatar Right (You) */}
            <motion.div 
                 animate={isCompleted ? { opacity: 0, scale: 0.8, x: -50 } : {}}
                 transition={{ duration: 0.5 }}
                 className="flex flex-col items-center gap-2 text-rose-400 relative z-10"
            >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white to-rose-50 flex items-center justify-center border-2 border-rose-200 shadow-md">
                    <MapPin size={24} className="text-rose-500" />
                </div>
                <span className="font-handwriting text-xl font-bold">You</span>
            </motion.div>
        </div>

        {/* Interactive Slider */}
        <div 
            ref={constraintsRef} 
            className={`relative h-16 w-full bg-white/50 rounded-full p-1.5 shadow-inner border border-rose-100 overflow-hidden transition-all duration-700 ${isCompleted ? 'opacity-0 pointer-events-none scale-95 blur-sm' : 'opacity-100 scale-100'}`}
        >
            {/* Background Fill Gradient */}
            <motion.div 
                style={{ width: x, opacity: backgroundOpacity }}
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-rose-200/50 to-rose-400/50"
            />
            
            {/* Instruction Text */}
            <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute inset-0 flex items-center justify-center text-rose-400/80 font-bold text-xs uppercase tracking-[0.2em]"
            >
                Slide to Send Love <span className="ml-2 text-lg">👉</span>
            </motion.div>

            {/* Draggable Handle */}
            <motion.div
                drag={!isCompleted ? "x" : false}
                dragConstraints={constraintsRef}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                style={{ x }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ cursor: "grabbing", scale: 0.95 }}
                className="w-14 h-full bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab relative z-20 border border-rose-50 group"
            >
                <Heart size={22} className="text-rose-500 group-hover:fill-rose-100 transition-colors" />
            </motion.div>
        </div>

        {/* Success Message */}
        {isCompleted && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-2 font-handwriting text-3xl text-rose-600 drop-shadow-sm"
            >
                Connected! 💌
            </motion.div>
        )}
      </div>
    </section>
  );
};