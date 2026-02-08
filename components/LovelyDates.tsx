import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';
import { IMPORTANT_DATES } from '../constants';

export const LovelyDates = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Triple the data for infinite loop [Set1, Set2, Set3]
  const extendedDates = [...IMPORTANT_DATES, ...IMPORTANT_DATES, ...IMPORTANT_DATES];
  const originalCount = IMPORTANT_DATES.length;

  // Initial Alignment to Center Set
  useEffect(() => {
    if (scrollRef.current) {
        const container = scrollRef.current;
        
        // Wait for layout to stabilize
        const setInitialScroll = () => {
           if (container.children.length > originalCount) {
               const firstItem = container.children[0] as HTMLElement;
               const secondSetFirstItem = container.children[originalCount] as HTMLElement;
               
               if (firstItem && secondSetFirstItem) {
                  // The width of one complete set is the distance between the first item of Set 1 and first item of Set 2
                  const singleSetWidth = secondSetFirstItem.offsetLeft - firstItem.offsetLeft;
                  
                  // Scroll to start of Set 2
                  container.scrollLeft = singleSetWidth;
               }
           }
        };

        // Execute shortly after render
        setTimeout(setInitialScroll, 100);
    }
  }, [originalCount]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    const firstItem = container.children[0] as HTMLElement;
    const secondSetFirstItem = container.children[originalCount] as HTMLElement;
    
    if (!firstItem || !secondSetFirstItem) return;

    const singleSetWidth = secondSetFirstItem.offsetLeft - firstItem.offsetLeft;

    // Logic: Keep user within the middle set (Set 2)
    // Range of Set 2 is roughly [singleSetWidth, 2*singleSetWidth]
    // We add a small buffer to avoid flickering at exact boundaries
    
    // If scrolled too far left (entering Set 1), jump forward to Set 2
    if (container.scrollLeft < singleSetWidth * 0.5) {
        container.scrollLeft += singleSetWidth;
    }
    // If scrolled too far right (entering Set 3), jump backward to Set 2
    else if (container.scrollLeft > singleSetWidth * 1.5) {
        container.scrollLeft -= singleSetWidth;
    }
  };

  // Mouse Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftState(scrollRef.current?.scrollLeft || 0);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };
  
  const onMouseLeave = () => {
    setIsDragging(false);
  };
  
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Multiplier for faster/natural scroll speed
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="w-full relative py-12 md:py-16 overflow-hidden">
      
      {/* Visual Connection Line from Timer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-amber-200/60 to-transparent"></div>

      {/* Header */}
      <div className="text-center px-4 mb-10 md:mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-cursive text-4xl md:text-5xl text-[#bfa07a] drop-shadow-sm mb-2"
        >
          Our Little Forever Moments ✨
        </motion.h2>
        <motion.div 
           initial={{ width: 0 }}
           whileInView={{ width: 80 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5, duration: 0.8 }}
           className="h-[2px] bg-rose-200 mx-auto rounded-full opacity-60"
        />
      </div>

      {/* 
        Infinite Horizontal Scroll Container 
        - Added snap-x snap-mandatory for center snapping
        - Mouse drag enabled
        - Infinite loop logic via onScroll
      */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto pb-8 pt-4 px-6 flex gap-5 md:gap-8 scrollbar-hide cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        style={{ scrollBehavior: 'auto' }} // Disable native smooth scroll for instant jumps
      >
        {extendedDates.map((item, index) => {
          // SPLIT YEAR LOGIC
          const dateParts = item.date.split(' ');
          const year = dateParts.pop(); 
          const dayAndMonth = dateParts.join(' ');
          
          // Unique key based on index to allow duplicates
          const uniqueKey = `${index}-${item.title}`;

          return (
            <motion.div
              key={uniqueKey}
              // Removed initial animation to prevent re-triggering during loop
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-shrink-0 snap-center"
            >
              {/* 
                 CARD DESIGN (Unchanged)
              */}
              <div className="w-[85vw] md:w-[380px] min-h-[420px] bg-white/40 backdrop-blur-xl border border-[#e6d5b8] rounded-[2rem] p-8 flex flex-col justify-between shadow-[0_10px_30px_-10px_rgba(217,119,6,0.1)] relative overflow-hidden group hover:bg-white/50 transition-colors duration-500 select-none">
                
                {/* Inner Glow/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-rose-50/20 pointer-events-none" />
                
                {/* Top Decor */}
                <div className="absolute top-0 right-0 p-6 opacity-20">
                   <Heart size={80} className="text-rose-300 fill-rose-100" />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col h-full pointer-events-none">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                     <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full border border-[#e6d5b8]/50 shadow-sm backdrop-blur-sm">
                        <Calendar size={14} className="text-[#b08968]" />
                        <span className="font-nunito text-xs font-bold tracking-widest text-[#8c6b4f] uppercase">
                          {dayAndMonth} <span className="text-[#b08968]/60 text-[10px] ml-1 font-semibold">{year}</span>
                        </span>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center shadow-sm">
                        <Sparkles size={14} className="text-amber-400" />
                     </div>
                  </div>

                  {/* Main */}
                  <div className="flex-grow flex flex-col justify-center mb-6">
                     <h3 className="font-cursive text-4xl text-[#8c6b4f] mb-4 leading-tight drop-shadow-sm">
                       {item.title}
                     </h3>
                     <div className="w-12 h-[1px] bg-[#d4a373]/30 mb-4"></div>
                     <p className="font-handwriting text-2xl text-gray-600/90 leading-relaxed italic">
                       "{item.caption}"
                     </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-[#e6d5b8]/30 flex items-center gap-2 text-[#a68a6d]">
                     <Clock size={14} />
                     <span className="text-xs font-nunito font-semibold tracking-wide uppercase opacity-90">
                       {item.time}
                     </span>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </section>
  );
};