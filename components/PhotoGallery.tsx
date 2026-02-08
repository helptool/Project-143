import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { X, Heart, ZoomIn, Sparkles } from 'lucide-react';
import { MEMORIES } from '../constants';

// --- DATA PREPARATION: EXACTLY 8 ITEMS ---
const getScrapbookItems = () => {
  const items = [];
  const targetCount = 8;
  for (let i = 0; i < targetCount; i++) {
    const original = MEMORIES[i % MEMORIES.length];
    items.push({
      ...original,
      uniqueId: `${original.id}-${i}`,
      index: i
    });
  }
  return items;
};

const SCRAPBOOK_ITEMS = getScrapbookItems();

export const PhotoGallery = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedMemory = SCRAPBOOK_ITEMS.find(m => m.uniqueId === selectedId);

  // --- REFS FOR PATH CALCULATION ---
  const mainSectionRef = useRef<HTMLDivElement>(null);
  const headerTargetRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [svgPath, setSvgPath] = useState("");

  // --- SCROLL LOGIC ---
  // Start drawing when the section top enters the bottom 80% of viewport
  // Finish drawing when the section bottom leaves the bottom 50% of viewport
  const { scrollYProgress } = useScroll({
    target: mainSectionRef,
    offset: ["start 80%", "end 50%"] 
  });

  // Irreversible Drawing Progress to prevent line from disappearing on scroll up
  const drawingProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > drawingProgress.get()) {
      drawingProgress.set(latest);
    }
  });

  // --- DYNAMIC PATH CALCULATION ---
  const calculatePath = () => {
    if (!mainSectionRef.current || !headerTargetRef.current) return;
    
    // Check if we have photos refs
    const validPhotoRefs = photoRefs.current.slice(0, SCRAPBOOK_ITEMS.length);
    if (validPhotoRefs.some(r => !r)) return;

    const parentRect = mainSectionRef.current.getBoundingClientRect();
    const startRect = headerTargetRef.current.getBoundingClientRect();

    // Helper for relative coordinates (Center of element relative to parent)
    const getRel = (rect: DOMRect) => ({
      x: rect.left + rect.width / 2 - parentRect.left,
      y: rect.top + rect.height / 2 - parentRect.top
    });

    const start = getRel(startRect);
    
    // Start drawing from Header Dot
    let d = `M ${start.x} ${start.y}`;
    let prev = start;

    validPhotoRefs.forEach((photoRef) => {
        if (!photoRef) return;
        const current = getRel(photoRef.getBoundingClientRect());
        
        // Curve Logic: Smooth S-bends connecting centers
        const verticalDist = current.y - prev.y;
        
        // Control Points for natural "Draped String" look
        const cp1 = { x: prev.x, y: prev.y + verticalDist * 0.5 };
        const cp2 = { x: current.x, y: current.y - verticalDist * 0.5 };

        d += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${current.x} ${current.y}`;
        
        prev = current;
    });

    setSvgPath(d);
  };

  useEffect(() => {
    // Initial calculation immediately
    calculatePath();
    
    // Recalculate after a short delay to ensure layout is settled (images loaded, fonts applied)
    const timer = setTimeout(calculatePath, 500);
    const timer2 = setTimeout(calculatePath, 1500); // Safety check

    const handleResize = () => calculatePath();
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
        clearTimeout(timer2);
    };
  }, []);

  // --- LAYOUT STYLES ---
  const getItemStyles = (index: number) => {
    // Increased z-indices to strictly sit above the timeline SVG (which is z-0)
    const baseStyle = "relative md:absolute transition-all duration-500 ease-out hover:z-[60]";
    
    // Configurations optimized for zig-zag flow on desktop and scroll flow on mobile
    const configs = [
      // 0: Hero Left
      {
        desktop: "md:top-0 md:left-[2%] md:w-[42%] z-30",
        mobile: "w-[90%] self-start rotate-[-1deg]",
        aspect: "aspect-[4/5]"
      },
      // 1: Top Right
      {
        desktop: "md:top-[6vh] md:right-[2%] md:w-[26%] z-20",
        mobile: "w-[70%] self-end -mt-12 rotate-[1deg]",
        aspect: "aspect-square"
      },
      // 2: Mid Left
      {
        desktop: "md:top-[45vh] md:left-[5%] md:w-[28%] z-20",
        mobile: "w-[85%] self-center mt-8 rotate-[0.5deg]",
        aspect: "aspect-[4/3]"
      },
      // 3: Mid Right
      {
        desktop: "md:top-[50vh] md:right-[5%] md:w-[22%] z-10",
        mobile: "w-[65%] self-start mt-8 rotate-[-1.5deg]",
        aspect: "aspect-[3/4]"
      },
      // 4: Center Right (shifted)
      {
        desktop: "md:top-[70vh] md:right-[35%] md:w-[20%] z-10",
        mobile: "w-[60%] self-end -mt-8 rotate-[-1deg]",
        aspect: "aspect-square"
      },
      // 5: Bottom Left
      {
        desktop: "md:bottom-[15vh] md:left-[8%] md:w-[24%] z-10",
        mobile: "w-[75%] self-start mt-12 rotate-[1deg]",
        aspect: "aspect-[3/4]"
      },
      // 6: Bottom Center
      {
        desktop: "md:bottom-[8vh] md:left-[40%] md:w-[18%] z-20",
        mobile: "w-[50%] self-end -mt-8 rotate-[-2deg]",
        aspect: "aspect-square"
      },
      // 7: Bottom Right
      {
        desktop: "md:bottom-[2vh] md:right-[2%] md:w-[30%] z-30",
        mobile: "w-[85%] self-center mt-12 rotate-[1.5deg]",
        aspect: "aspect-[4/5]"
      }
    ];

    const config = configs[index];
    return {
      className: `${baseStyle} ${config.desktop} ${config.mobile}`,
      aspect: config.aspect
    };
  };

  return (
    <div ref={mainSectionRef} className="w-full max-w-7xl mx-auto px-4 relative min-h-screen py-24 z-10">
      
      {/* --- SCROLL-DRIVEN DOTTED PATH --- */}
      {/* Ensure this is absolutely positioned behind content but inside the relative container */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <defs>
            <mask id="timeline-mask">
               {/* 
                  The MASK PATH:
                  - Determines what part of the dotted line is visible.
                  - Must have a very thick strokeWidth to fully cover the dotted line's curves.
                  - Matches 'pathLength' of drawingProgress to create the growth effect.
               */}
               <motion.path 
                  d={svgPath} 
                  stroke="white" 
                  strokeWidth="40" // Thick enough to cover the dotted line underneath
                  fill="none"
                  strokeLinecap="round" 
                  style={{ pathLength: drawingProgress }} 
               />
            </mask>
          </defs>
          
          {/* 
             THE VISIBLE DOTTED PATH:
             - strokeWidth="8": Thicker and more premium.
             - strokeDasharray="0 20": Creates perfect circular dots (length 0) with 20px gaps.
             - strokeLinecap="round": Essential for the "0" length to render as a circle.
          */}
          <path 
             d={svgPath} 
             stroke="#fb7185" // Rose-400
             strokeWidth="8" 
             fill="none" 
             strokeDasharray="0 24" 
             strokeLinecap="round" 
             strokeOpacity="0.8"
             mask="url(#timeline-mask)"
             className="drop-shadow-sm transition-all duration-500"
          />
      </svg>

      {/* --- CEREMONIAL HEADER SECTION --- */}
      <div className="flex flex-col items-center mb-32 relative z-40">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-white/60 backdrop-blur-md px-10 md:px-16 py-8 md:py-10 rounded-[3rem] border border-white/80 shadow-[0_15px_35px_-10px_rgba(244,63,94,0.15)] text-center max-w-2xl mx-auto"
        >
            {/* Decorative Top Element */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-rose-50 p-2 rounded-full border border-rose-100 shadow-sm">
                <Heart size={20} className="text-rose-400 fill-rose-300 animate-pulse" />
            </div>

            {/* Main Title */}
            <h2 className="font-cursive text-6xl md:text-8xl text-rose-600 mb-2 drop-shadow-sm leading-tight pt-2">
               Our Sweet Memories 📸
            </h2>
            
            {/* Decorative Underline */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-300/50 to-transparent mx-auto rounded-full mb-4"></div>

            <p className="text-rose-500/80 font-nunito tracking-[0.25em] text-xs md:text-sm uppercase font-bold">
               Every picture tells a story
            </p>

            {/* Sparkles */}
            <Sparkles className="absolute top-8 left-6 text-rose-300 w-5 h-5 opacity-70" />
            <Sparkles className="absolute bottom-6 right-6 text-rose-300 w-4 h-4 opacity-70" />

            {/* Line Start Node (Anchor for the SVG path) */}
            <div 
                ref={headerTargetRef} 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-rose-400 rounded-full ring-4 ring-white shadow-md z-50"
            />
        </motion.div>
      </div>

      {/* 
         COLLAGE CONTAINER 
      */}
      <div className="relative w-full flex flex-col md:block md:h-[180vh] space-y-24 md:pb-0">
        
        {SCRAPBOOK_ITEMS.map((memory, index) => {
          const { className, aspect } = getItemStyles(index);
          
          return (
            <motion.div
              key={memory.uniqueId}
              ref={(el) => { photoRefs.current[index] = el; }}
              layoutId={`card-container-${memory.uniqueId}`}
              className={className}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, zIndex: 100 }}
              onClick={() => setSelectedId(memory.uniqueId)}
            >
              {/* Photo Frame */}
              <div className="bg-white p-3 md:p-4 pb-8 md:pb-12 shadow-md hover:shadow-2xl transition-shadow duration-300 rounded-sm border border-gray-100">
                 <div className={`relative overflow-hidden bg-gray-100 ${aspect}`}>
                    <motion.img
                      layoutId={`card-image-${memory.uniqueId}`}
                      src={memory.url}
                      alt="Memory"
                      className="w-full h-full object-cover"
                    />
                    {/* Hover Hint */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 duration-300">
                        <ZoomIn className="text-white drop-shadow-md" size={32} />
                    </div>
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MODAL VIEW */}
      <AnimatePresence>
        {selectedId && selectedMemory && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="bg-neutral-900 w-full max-w-6xl max-h-[95vh] rounded-lg overflow-hidden shadow-2xl relative flex flex-col md:flex-row z-[101]"
              onClick={(e) => e.stopPropagation()}
            >
               <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-[102] bg-black/50 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
               >
                  <X size={24} />
               </button>

               <div className="w-full md:w-3/4 flex items-center justify-center bg-black relative p-2 md:p-4">
                  <motion.img
                    layoutId={`card-image-${selectedId}`}
                    src={selectedMemory.url}
                    alt="Full Memory"
                    className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]"
                  />
               </div>

               <div className="w-full md:w-1/4 bg-white p-6 md:p-10 flex flex-col justify-center border-l border-neutral-100 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                     <div className="flex items-center gap-2 mb-6">
                        <Heart className="text-rose-500 fill-rose-500" size={18} />
                        <span className="text-xs font-bold tracking-widest text-rose-400 uppercase">
                           Memory
                        </span>
                     </div>
                     
                     <p className="font-handwriting text-2xl md:text-3xl text-gray-800 leading-relaxed">
                        "{selectedMemory.caption}"
                     </p>
                     
                     <div className="mt-10 w-12 h-1 bg-rose-200" />
                  </motion.div>
                  
                  <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Heart size={120} />
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};