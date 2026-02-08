import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { START_DATE } from '../constants';

export const RelationshipTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const startDate = new Date(START_DATE).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - startDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto px-4 mb-0"
    >
      {/* ROYAL FRAME CONTAINER */}
      <div className="relative w-full">
        
        {/* Frame Shell */}
        <div className="relative bg-[#fffcf7] rounded-[3rem] p-6 md:p-12 shadow-[0_20px_60px_-10px_rgba(217,119,6,0.15)] border border-amber-200/60 overflow-hidden">
            
            {/* Inner Glow & Texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(251,191,36,0.05)] rounded-[3rem] pointer-events-none" />

            {/* Decorative Inner Border (The Frame) */}
            <div className="absolute inset-3 md:inset-4 border-2 border-amber-100 rounded-[2.5rem] pointer-events-none opacity-70" />
            <div className="absolute inset-4 md:inset-5 border border-dashed border-amber-200/50 rounded-[2.3rem] pointer-events-none" />

            {/* CONTENT AREA */}
            <div className="relative z-10 flex flex-col items-center text-center py-4">
                
                {/* Royal Heading */}
                <div className="mb-10 flex flex-col items-center">
                    <h2 className="font-cursive text-5xl md:text-6xl text-amber-800/80 mb-3 drop-shadow-sm leading-tight">
                       Our Time Together ✨
                    </h2>
                    {/* Elegant Divider */}
                    <div className="flex items-center gap-3 opacity-60">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-300"></div>
                        <Heart size={12} className="text-amber-400 fill-amber-200" />
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-300"></div>
                    </div>
                </div>

                {/* Subtext */}
                <h3 className="font-nunito text-xs md:text-sm text-rose-500 mb-2 font-bold tracking-[0.2em] uppercase opacity-90">
                  "Hii" se "I Love You" tak ka safar!
                </h3>
                <p className="font-handwriting text-2xl md:text-3xl text-gray-600 mb-12">
                  07 October 2024, 5:35 PM 🥰
                </p>

                {/* Timer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full px-2">
                  {[
                    { label: "Days", value: timeElapsed.days },
                    { label: "Hours", value: timeElapsed.hours },
                    { label: "Minutes", value: timeElapsed.minutes },
                    { label: "Seconds", value: timeElapsed.seconds }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-white/60 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-sm border border-amber-100/60 flex flex-col items-center justify-center relative group"
                    >
                       {/* Floating heart on hover */}
                       <div className="absolute -top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <Heart size={14} className="text-rose-400 fill-rose-400 animate-bounce" />
                       </div>
                       
                       <span className="font-cursive text-4xl md:text-5xl text-rose-600/90 font-medium mb-1 drop-shadow-sm">
                         {item.value}
                       </span>
                       <span className="text-amber-900/40 text-xs font-nunito uppercase tracking-widest font-bold">
                         {item.label}
                       </span>
                    </motion.div>
                  ))}
                </div>

                {/* Footer text */}
                <div className="mt-12 flex justify-center items-center gap-3 text-amber-900/40 font-handwriting text-xl md:text-2xl">
                  <span>Counting every moment</span>
                  <Heart size={14} fill="currentColor" className="text-rose-300 animate-pulse" />
                  <span>with you</span>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};