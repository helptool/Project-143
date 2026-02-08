import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower, Gift, Heart, Check, Gem, Star } from 'lucide-react';
import { PROMISE_LIST } from '../constants';

interface JourneyProps {
  onComplete: () => void;
}

// Fixed Aesthetic Teddy Bear Icon - Minimal & Clean
const TeddyBearIcon = ({ size = 100, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Head */}
    <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5Z" />
    {/* Ears */}
    <path d="M4.5 7.5C3.5 6.5 3.5 4.5 4.5 3.5C5.5 2.5 7.5 2.5 8.5 3.5" />
    <path d="M19.5 7.5C20.5 6.5 20.5 4.5 19.5 3.5C18.5 2.5 16.5 2.5 15.5 3.5" />
    {/* Eyes */}
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    {/* Snout Area */}
    <ellipse cx="12" cy="15.5" rx="3" ry="2" stroke="currentColor" />
    <path d="M12 15.5V14.5" />
  </svg>
);

const steps = [
  { id: 'rose', title: 'Rose Day 🌹', date: '7 February', color: 'from-rose-50 to-pink-100', text: "Wanna see my real, cute little pretty rose??", action: "Pluck Rose" },
  { id: 'propose', title: 'Propose Day 💍', date: '8 February', color: 'from-blue-50 to-indigo-100', text: "No fancy rings yet baby, but my heart is yours. Will you accept it?", action: "Open Box" },
  { id: 'chocolate', title: 'Chocolate Day 🍫', date: '9 February', color: 'from-amber-50 to-orange-100', text: "You’re sweeter than every chocolate, meri rasmalayi 😭❤️", action: "Unwrap" },
  { id: 'teddy', title: 'Teddy Day 🧸', date: '10 February', color: 'from-pink-50 to-rose-100', text: "Wanna feel my warmth by a soft toy??...", action: "Squeeze" },
  { id: 'promise', title: 'Promise Day 🤍', date: '11 February', color: 'from-slate-50 to-gray-100', text: "Some promises I want to make to you...", action: "Promise" },
  { id: 'hug', title: 'Hug Day 🤗', date: '12 February', color: 'from-orange-50 to-amber-100', text: "Koi baat nahi, is din ke hugs baad me luga mai tumse 😚", action: "Hug" },
  { id: 'kiss', title: 'Kiss Day 😘', date: '13 February', color: 'from-red-50 to-rose-100', text: "Sending you a million forehead kisses, meri jaan 👉🏻👈🏻", action: "Kiss" },
  { id: 'valentine', title: "Valentine's Day ❤️", date: '14 February', color: 'from-rose-100 to-pink-200', text: "", action: "Yes" } // Special case
];

// 3 Defined Positions: Start (0,0) -> Up/Right -> Down/Right -> Loop
const NO_BTN_POSITIONS = [
  { x: 0, y: 0 },         // Position A: Side by Side (Start)
  { x: 60, y: -60 },      // Position B: Move Up & Right
  { x: 40, y: 60 }        // Position C: Move Down & Right (Less X to stay on screen)
];

const NO_TEXTS = [
  "No 💔",
  "Plz baccha 🥺",
  "Oye Buddhu, Yes baaju me hai! 🤦🏻‍♂️",
  "Chhutki, Maar khaogi tum 😑",
  "Sidhe se Yes click krna nahi hota? 😠",
  "Yaallll Yes click karoo!! 😩",
  "Accha.. AB krke dikhao click 😏",
  "Tum meri ho! sirf meri! 😈"
];

export const ValentineJourney: React.FC<JourneyProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [promises, setPromises] = useState<boolean[]>(new Array(PROMISE_LIST.length).fill(false));
  const [noBtnStep, setNoBtnStep] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [interacted, setInteracted] = useState(false); // Track if user has interacted with current step
  const [showBurst, setShowBurst] = useState(false); // Trigger for micro heart burst

  // Reset interaction state when step changes
  useEffect(() => {
    if (steps[currentStep].id === 'promise') {
      setInteracted(false); 
    } else if (steps[currentStep].id === 'valentine') {
        setInteracted(true); 
    } else {
      setInteracted(false);
    }
  }, [currentStep]);

  useEffect(() => {
    if (steps[currentStep].id === 'promise') {
        setInteracted(promises.every(p => p));
    }
  }, [promises, currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePromiseToggle = (index: number) => {
    const newPromises = [...promises];
    newPromises[index] = !newPromises[index];
    setPromises(newPromises);
  };

  const handleInteraction = () => {
    if (!interacted) {
        setInteracted(true);
    }
  };

  const moveNoButton = () => {
    // Loop strictly through defined positions
    setNoBtnStep((prev) => (prev + 1) % NO_BTN_POSITIONS.length);
    setClickCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowBurst(true);
    // Delay onComplete slightly to let the burst animation play
    setTimeout(() => {
        onComplete();
    }, 800);
  };

  const stepData = steps[currentStep];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 relative w-full max-w-xl mx-auto">
      <AnimatePresence mode='wait'>
        <motion.div
          key={stepData.id}
          initial={{ opacity: 0, x: 50, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`w-full glass-card p-8 md:p-10 rounded-[2rem] shadow-2xl flex flex-col items-center text-center bg-gradient-to-br ${stepData.color}`}
        >
          {/* Header */}
          <div className="mb-8">
            <motion.h3 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-cursive text-5xl text-rose-600 drop-shadow-sm mb-1"
            >
                {stepData.title}
            </motion.h3>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-rose-400 font-nunito font-semibold text-sm uppercase tracking-widest opacity-80"
            >
                {stepData.date}
            </motion.p>
          </div>
          
          {/* Content based on Step */}
          <div className="w-full flex-grow flex flex-col items-center justify-center min-h-[200px]">
            {/* Interactive Visual Area */}
            {stepData.id !== 'promise' && stepData.id !== 'valentine' && (
                 <div className="mb-8 relative group cursor-pointer" onClick={handleInteraction}>
                    {!interacted && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/80 px-3 py-1 rounded-full text-xs text-rose-500 font-bold shadow-sm pointer-events-none"
                        >
                            Tap me...
                        </motion.div>
                    )}
                    
                    {/* 
                       PREMIUM ANIMATION RULES:
                       - No bounce, no shake, no jiggle.
                       - Smooth scale max 1.05.
                       - Gentle transitions.
                    */}
                    
                    {stepData.id === 'rose' && (
                        <motion.div animate={interacted ? { scale: 1.05, opacity: 1 } : { opacity: 0.9 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                            <Flower size={100} strokeWidth={1.5} className={`text-rose-500 drop-shadow-lg transition-colors duration-700 ${interacted ? 'fill-rose-300' : ''}`} />
                        </motion.div>
                    )}
                    {stepData.id === 'propose' && (
                        <motion.div animate={interacted ? { scale: 1.05, y: -5 } : {}} transition={{ duration: 0.8, ease: "easeInOut" }}>
                            <Gem size={100} strokeWidth={1.5} className={`text-blue-500 drop-shadow-lg transition-all duration-700 ${interacted ? 'fill-blue-100' : ''}`} />
                            {interacted && <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute -top-6 -right-6"><Star size={24} className="text-yellow-400 fill-yellow-400" /></motion.div>}
                        </motion.div>
                    )}
                    {stepData.id === 'chocolate' && (
                        <motion.div animate={interacted ? { scale: 1.03 } : {}} transition={{ duration: 0.5, ease: "easeInOut" }}>
                            <Gift size={100} strokeWidth={1.5} className={`text-amber-700 drop-shadow-lg transition-colors duration-700 ${interacted ? 'fill-amber-900/10' : ''}`} />
                        </motion.div>
                    )}
                    {stepData.id === 'teddy' && (
                        <motion.div animate={interacted ? { scale: 1.05 } : {}} transition={{ duration: 0.6, ease: "easeInOut" }}>
                            <TeddyBearIcon size={100} className={`text-pink-500 drop-shadow-lg transition-colors duration-700 ${interacted ? 'fill-pink-100' : ''}`} />
                        </motion.div>
                    )}
                    {stepData.id === 'hug' && (
                         <motion.div animate={interacted ? { scale: 1.05 } : {}} transition={{ duration: 0.6, ease: "easeInOut" }}>
                             <span className="text-8xl block select-none drop-shadow-lg transition-all duration-700" style={{ filter: interacted ? 'grayscale(0%)' : 'grayscale(40%)' }}>🤗</span>
                         </motion.div>
                    )}
                    {stepData.id === 'kiss' && (
                         <motion.div animate={interacted ? { scale: 1.05 } : {}} transition={{ duration: 0.6, ease: "easeInOut" }}>
                             <span className="text-8xl block select-none drop-shadow-lg transition-all duration-700" style={{ filter: interacted ? 'grayscale(0%)' : 'grayscale(40%)' }}>😘</span>
                         </motion.div>
                    )}
                 </div>
            )}

            {stepData.id === 'promise' ? (
              <div className="w-full">
                <p className="text-xl text-gray-700 font-medium mb-6 font-handwriting md:text-2xl">{stepData.text}</p>
                <div className="space-y-4 w-full text-left mb-8">
                  {PROMISE_LIST.map((promise, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                      onClick={() => handlePromiseToggle(idx)}
                      className="flex items-center gap-4 bg-white/40 p-4 rounded-xl cursor-pointer transition-all hover:bg-white/70 border border-white/50"
                    >
                      <div className={`min-w-[24px] h-6 rounded-full border flex items-center justify-center transition-colors duration-300 ${promises[idx] ? 'bg-green-400 border-green-400' : 'border-gray-400'}`}>
                        {promises[idx] && <Check size={14} className="text-white" />}
                      </div>
                      <span className="text-gray-800 font-nunito">{promise}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button 
                  whileHover={interacted ? { scale: 1.02, opacity: 0.95 } : {}}
                  onClick={handleNext} 
                  disabled={!interacted}
                  className={`px-8 py-3 rounded-full shadow-lg transition-all font-bold tracking-wide w-full md:w-auto ${interacted ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {interacted ? "I Promise Sweetheart 🥹🎀" : "Promise me first..."}
                </motion.button>
              </div>
            ) : stepData.id !== 'valentine' ? (
                <>
                    <p className="text-xl text-gray-700 font-medium mb-10 leading-relaxed font-handwriting md:text-2xl">{stepData.text}</p>
                    
                    {interacted ? (
                        <motion.button 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleNext} 
                            className={`bg-gradient-to-r ${stepData.id === 'rose' ? 'from-rose-400 to-rose-600' : 
                                      stepData.id === 'propose' ? 'from-blue-400 to-blue-600' : 
                                      stepData.id === 'chocolate' ? 'from-amber-500 to-amber-700' : 
                                      stepData.id === 'teddy' ? 'from-pink-400 to-pink-600' : 
                                      stepData.id === 'hug' ? 'from-orange-400 to-orange-600' :
                                      'from-red-400 to-red-600'} 
                                      text-white px-8 py-3 rounded-full shadow-lg transition-all font-bold tracking-wide`}
                        >
                            {stepData.id === 'rose' && "See Mirror to See My Rose🪞🌹"}
                            {stepData.id === 'propose' && "Yes, I will sweetheart!!💍"}
                            {stepData.id === 'chocolate' && "Lick Your Sweet Lips, My Chocolate🍫"}
                            {stepData.id === 'teddy' && "Wrap Your Arms Around Yourself, My Baby Bear🧸"}
                            {stepData.id === 'hug' && "Why Are You So Far Baby?! 😭🥺"}
                            {stepData.id === 'kiss' && "Catch My Kisses 😘"}
                        </motion.button>
                    ) : (
                         <div className="h-12 flex items-center text-gray-400 font-nunito text-sm italic opacity-60">
                             Interact with the icon first babydoll...
                         </div>
                    )}
                </>
            ) : (
              // Valentine Day Special Layout - Updated Yes/No Logic with Micro Burst
              <div className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-bold text-rose-800 mb-4 font-nunito">Vaishnavi...</h2>
                <p className="text-2xl md:text-3xl text-rose-700 font-cursive mb-12 leading-relaxed">
                  Will you be my Valentine 🥹,<br/>
                  For today, tomorrow,<br/>
                  and rest of this beautiful life?
                </p>
                
                {/* 
                    BUTTON CONTAINER
                    - Flexbox keeps them side-by-side initially.
                    - Relative positioning allows 'No' button to move relative to its initial spot without affecting layout.
                */}
                <div className="flex gap-6 relative min-h-[160px] items-center justify-center w-full">
                  <div className="relative">
                      {/* Yes Button */}
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYesClick}
                        className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-10 py-4 rounded-full shadow-xl font-bold text-xl z-20 hover:shadow-rose-400/50 transition-shadow relative"
                      >
                        YESSS BABY!!🥹❤️
                      </motion.button>
                      
                      {/* Micro Heart Burst - Minimal, Soft, No Bounce */}
                      <AnimatePresence>
                          {showBurst && (
                              <>
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                                        animate={{ 
                                            opacity: [0, 0.8, 0], 
                                            scale: [0.5, 1, 0.5], 
                                            y: -60 - Math.random() * 40, 
                                            x: (Math.random() - 0.5) * 60 
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute top-1/2 left-1/2 text-rose-500 pointer-events-none"
                                        style={{ marginLeft: '-10px', marginTop: '-10px' }}
                                    >
                                        <Heart size={20} fill="currentColor" />
                                    </motion.div>
                                ))}
                              </>
                          )}
                      </AnimatePresence>
                  </div>

                  <motion.button
                    animate={NO_BTN_POSITIONS[noBtnStep]}
                    transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    className="bg-gray-200 text-gray-500 px-10 py-4 rounded-full shadow-md font-bold text-xl z-10 hover:bg-gray-300 transition-colors min-w-[160px]"
                  >
                    {NO_TEXTS[clickCount % NO_TEXTS.length]}
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Progress Dots */}
      <div className="flex gap-3 mt-8">
        {steps.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-2 rounded-full transition-all duration-700 ${idx === currentStep ? 'bg-rose-500 w-8' : 'bg-rose-200 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
};