import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, Sparkles as SparklesIcon } from 'lucide-react';
import { FloatingHearts, FloatingNicknames, Sparkles, FallingPetals } from './components/FloatingElements';
import { ValentineJourney } from './components/ValentineJourney';
import { RelationshipTimer } from './components/RelationshipTimer';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveCompletion } from './components/LoveCompletion';
import { LovelyDates } from './components/LovelyDates';
import { SENDER_NAME, RECIPIENT_NAME, BACKGROUND_MUSIC_URL, LOVE_NOTES, DISTANCE_LETTER, FINAL_MESSAGE } from './constants';

function App() {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [valentineAccepted, setValentineAccepted] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt Autoplay on Mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4; // Soft background volume
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay prevented by browser. Waiting for interaction.");
            // We stay silent until user clicks "Open"
          });
      }
    }
  }, []);

  const handleStart = () => {
    setStarted(true);
    // Fallback: Ensure music plays if autoplay was blocked
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio play failed", e));
    }
    window.scrollTo(0, 0);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(e => console.log("Audio resume failed", e));
        setIsPlaying(true);
      }
    }
  };

  const handleValentineAccept = () => {
    setValentineAccepted(true);
  };

  return (
    <div className="min-h-screen relative font-sans text-gray-900">
      {/* Persistent Audio Element */}
      <audio ref={audioRef} loop src={BACKGROUND_MUSIC_URL} />

      {/* Persistent Music Toggle - Wrapped in a Fixed Div for perfect stability */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[100]">
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={toggleMusic}
          className="bg-white/40 backdrop-blur-md border border-white/60 p-3 rounded-full shadow-lg text-rose-600 transition-all active:scale-95 hover:bg-white/60"
          aria-label="Toggle Music"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      </div>

      {/* Intro Screen */}
      <AnimatePresence>
        {!started && (
          <motion.div 
            key="intro"
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fff0f5] overflow-hidden"
          >
            <FloatingHearts />
            
            {/* Soft atmospheric glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="z-10 text-center px-6 max-w-3xl w-full flex flex-col items-center">
              
              <motion.p
                initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-rose-400 font-nunito text-lg md:text-2xl tracking-[0.2em] uppercase font-medium mb-6"
              >
                For the girl who became my whole life 💞
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                className="font-cursive text-7xl md:text-9xl text-rose-600 mb-8 drop-shadow-sm leading-tight"
              >
                {RECIPIENT_NAME} <span className="text-4xl md:text-6xl align-top text-rose-400">✨</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 1.5 }}
                className="text-gray-500 font-handwriting text-3xl md:text-4xl mb-16 font-light"
              >
                A divine embodiment of grace,
                As though crafted by the heavens themselves...💌✨
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, duration: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(244, 63, 94, 0.9)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="bg-rose-500/80 backdrop-blur-sm text-white px-10 py-4 rounded-full font-nunito text-lg tracking-wide shadow-lg hover:shadow-rose-200/50 transition-all flex items-center gap-3 group cursor-pointer"
              >
                 <Heart className="fill-white/90 w-5 h-5 group-hover:animate-pulse" />
                 <span className="font-semibold">Open</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {started && (
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ duration: 1.5 }}
           className="min-h-screen overflow-x-hidden relative"
        >
          <FloatingHearts />
          <FloatingNicknames />

          {/* Section 1: Photo Gallery */}
          <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
            <FallingPetals />
            <PhotoGallery />
          </section>

          {/* Section 2: Relationship Timer & Lovely Dates */}
          <section className="py-20 px-4 relative flex flex-col items-center">
            <RelationshipTimer />
            {/* New Lovely Dates Section connected to Timer */}
            <LovelyDates />
          </section>

          {/* Section 3: Confession */}
          <section className="min-h-[80vh] flex items-center justify-center px-6 py-20 relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl text-center glass-card p-8 md:p-14 rounded-[2.5rem] relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/80 p-3 rounded-full shadow-md">
                <Heart className="text-rose-500 fill-rose-500 animate-bounce" size={32} />
              </div>
              <h2 className="font-cursive text-6xl text-rose-700 mb-8 mt-4">A Small Try🌹</h2>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-handwriting tracking-wide">
                Heyyy My Princess 👑,
                <br/><br/>
                Listen my goddess 🥹, you are the most lovely, adorable, cutest, charming and gorgeous woman in this whole universe my babydoll 😭❤️. And i really love you a lottt!! i am so obsessed with you and your whole damn personality 🤌🏻✨
                I know baby I don't even have to celebrate this valenine week as I am already celebrating every day just like any festival since I got you..😁😘. But still.. i want to tell you this ki abhi mere paas zyada kucch toh nahi hai jaan tumhe dene ke liye..🥺
                But ek small try hai meri bacchi..💖 Yeh hamari beech ki 750 meter ki duriyan mitane ka 🙄😂... Taaki mai is valentine week, tumhe or zyada khush dekh pau my baby 😚❤️
                <br/><br/>
                I love you so muchhhh meri jaannn! i love you a lott 😭❤️ So be my valentine for this whole damn life, my princess 😘 (as you dont have any other option too...😁)
              </p>
            </motion.div>
          </section>

          {/* Section 4: Valentine Journey */}
          <section className="min-h-screen py-20 px-4 relative flex flex-col items-center justify-center bg-white/30">
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="text-center mb-16"
            >
              <h2 className="font-cursive text-5xl md:text-7xl text-rose-600 mb-4 drop-shadow-sm">Our Valentine Journey 🌹</h2>
              <p className="text-rose-400 font-nunito text-lg">Let's walk through this week together...</p>
            </motion.div>

            {!valentineAccepted ? (
               <ValentineJourney onComplete={handleValentineAccept} />
            ) : (
               <motion.div 
                 initial={{ scale: 0, rotate: -10 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring" }}
                 className="text-center p-14 bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl border-4 border-rose-200 max-w-2xl mx-4"
               >
                 <h1 className="font-cursive text-6xl md:text-8xl text-rose-600 mb-6 drop-shadow-md">I LOVE YOU! ❤️</h1>
                 <p className="text-2xl text-gray-700 font-handwriting">You just made me the happiest person alive.</p>
               </motion.div>
            )}
          </section>

          {/* Section 5: Love Notes */}
          <section className="min-h-screen py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <h2 className="font-cursive text-6xl text-center text-rose-700 mb-16">Things I Love About You 💌</h2>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative min-h-[500px]">
              {LOVE_NOTES.map((note, i) => {
                const isActive = activeNoteId === note.id;

                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeInOut", 
                      delay: i * 0.1 
                    }}
                    onClick={() => setActiveNoteId(isActive ? null : note.id)}
                    className={`bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border transition-all duration-700 flex items-center justify-center w-64 h-64 relative cursor-pointer select-none group ${isActive ? 'border-rose-400 shadow-rose-200/50' : 'border-rose-100'}`}
                    style={{ 
                       transform: isActive ? 'scale(1.1) rotate(0deg)' : `scale(1) rotate(${note.rotation}deg)`,
                       opacity: isActive ? 1 : 0.6,
                       filter: isActive ? 'blur(0px)' : 'blur(4px)',
                       zIndex: isActive ? 50 : 1
                    }}
                  >
                    <div className={`absolute -top-3 -right-3 bg-rose-200 text-rose-600 rounded-full p-2 shadow-sm transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-90'}`}>
                      <Heart size={20} fill="currentColor" />
                    </div>
                    
                    {isActive && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                className="absolute inset-0 bg-rose-50/40 pointer-events-none rounded-2xl ring-2 ring-rose-200/50" 
                            />
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute -top-4 -left-4"
                            >
                                <SparklesIcon className="text-amber-400 fill-amber-100" size={28} />
                            </motion.div>
                        </>
                    )}

                    <p className={`text-center font-handwriting text-3xl transition-colors duration-500 ${isActive ? 'text-rose-600' : 'text-rose-800'} leading-snug`}>
                      {note.text}
                    </p>
                    
                    {!isActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-rose-400/80 font-nunito font-bold text-sm bg-white/60 px-3 py-1 rounded-full backdrop-blur-md">
                               Tap to Reveal
                            </span>
                        </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Section 6: Long Distance Letter */}
          <section className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-visible">
            <AnimatePresence mode="wait">
              {!isLetterOpen ? (
                <motion.div
                   key="envelope"
                   initial={{ opacity: 0, scale: 0.9, y: 30 }}
                   whileInView={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.4 } }}
                   viewport={{ once: true }}
                   onClick={() => setIsLetterOpen(true)}
                   className="cursor-pointer relative group"
                >
                   <div className="w-[300px] md:w-[400px] h-[200px] md:h-[260px] bg-rose-100 rounded-lg shadow-2xl relative overflow-hidden border-2 border-rose-200 flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
                          <div className="absolute top-0 left-0 w-0 h-0 border-t-[140px] border-r-[200px] border-t-rose-200 border-r-transparent md:border-r-[200px] md:border-t-[180px]"></div>
                          <div className="absolute top-0 right-0 w-0 h-0 border-t-[140px] border-l-[200px] border-t-rose-200 border-l-transparent md:border-l-[200px] md:border-t-[180px]"></div>
                          <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[100px] border-r-[200px] border-b-rose-300/30 border-r-transparent w-full"></div>
                      </div>
                      
                      <div className="z-20 flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center shadow-lg border-4 border-rose-200 group-hover:scale-110 transition-transform duration-300">
                              <Heart className="text-white fill-white" size={28} />
                          </div>
                          <span className="text-rose-500 font-nunito font-bold tracking-widest text-sm bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm">
                              OPEN LETTER
                          </span>
                      </div>
                   </div>
                   
                   <div className="absolute -inset-4 bg-rose-400/20 rounded-xl blur-xl -z-10 group-hover:bg-rose-400/30 transition-colors"></div>
                </motion.div>
              ) : (
                <motion.div
                   key="letter"
                   initial={{ opacity: 0, rotateX: 90, y: -50 }}
                   animate={{ opacity: 1, rotateX: 0, y: 0 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="max-w-3xl w-full bg-[#fffcf5] p-8 md:p-20 rounded shadow-2xl relative border-t-8 border-rose-300 origin-top"
                >
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, y: 0 }}
                            animate={{ 
                                opacity: [0, 1, 0], 
                                scale: [0.5, 1, 0.5], 
                                y: -100 - Math.random() * 50,
                                x: (Math.random() - 0.5) * 100
                            }}
                            transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                            className="absolute top-0"
                          >
                             <Heart size={Math.random() * 10 + 10} className="text-rose-400 fill-rose-300" />
                          </motion.div>
                      ))}
                   </div>

                   <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none"></div>
                   
                   <div className="flex justify-center mb-8 text-rose-300">
                     <SparklesIcon size={40} />
                   </div>

                   <h2 className="font-cursive text-5xl md:text-6xl text-rose-800 mb-10 text-center border-b-2 border-rose-100 pb-6">
                     Even From Miles Away... 🌙
                   </h2>
                   <div className="font-handwriting text-2xl md:text-3xl text-gray-800 leading-relaxed whitespace-pre-wrap relative z-25">
                     {DISTANCE_LETTER}
                   </div>
                   <div className="mt-16 text-right font-cursive text-4xl text-rose-600">
                     - Your {SENDER_NAME}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* NEW SECTION: Love Completion */}
          <LoveCompletion />

          {/* Section 7: Final Message */}
          <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden py-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-200/20 blur-[120px] rounded-full -z-10" />
            <Sparkles />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="z-10 max-w-2xl w-full bg-white/30 backdrop-blur-lg p-10 md:p-16 rounded-[4rem] border border-white/60 shadow-[0_10px_40px_-10px_rgba(255,228,230,0.5)] relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/80 p-3 rounded-full shadow-sm">
                 <Heart size={20} className="text-rose-300 fill-rose-100" />
              </div>

              <p className="font-handwriting text-2xl md:text-3xl text-rose-800/90 mb-8 leading-[1.8] md:leading-[2] whitespace-pre-line tracking-wide drop-shadow-sm opacity-90">
                {FINAL_MESSAGE}
              </p>

              <div className="mt-8 flex justify-center opacity-80">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} 
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <Heart size={32} className="text-rose-400 fill-rose-200" />
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="relative w-full pt-20 pb-12 overflow-hidden bg-gradient-to-br from-rose-100 via-purple-100 to-amber-50 backdrop-blur-xl rounded-t-[3rem] border-t border-white/60 shadow-[0_-10px_40px_-15px_rgba(255,255,255,0.9)] mt-20">
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[300px] h-[300px] bg-pink-300/20 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-10%] right-[5%] w-[250px] h-[250px] bg-purple-300/20 rounded-full blur-[60px]"></div>
                
                {[...Array(8)].map((_, i) => (
                   <motion.div
                     key={i}
                     className="absolute text-rose-400/30"
                     initial={{ y: 50, opacity: 0 }}
                     animate={{ y: -60, opacity: [0, 0.5, 0] }}
                     transition={{
                         duration: 5 + Math.random() * 5,
                         repeat: Infinity,
                         delay: Math.random() * 3,
                         ease: "easeInOut"
                     }}
                     style={{
                         left: `${Math.random() * 100}%`,
                         top: `${40 + Math.random() * 50}%`,
                         fontSize: `${12 + Math.random() * 14}px`
                     }}
                   >
                      ❤
                   </motion.div>
                ))}
             </div>

             <div className="relative z-10 max-w-lg mx-auto px-6 text-center flex flex-col items-center">
                 <div className="mb-8 flex items-center gap-4 opacity-50">
                    <div className="h-px w-12 bg-rose-400"></div>
                    <SparklesIcon size={16} className="text-rose-400" />
                    <div className="h-px w-12 bg-rose-400"></div>
                 </div>

                 <motion.p 
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.2, ease: "easeOut" }}
                     className="font-handwriting text-2xl md:text-3xl text-rose-800/90 mb-2 leading-relaxed drop-shadow-sm"
                 >
                   "Made with endless love by {SENDER_NAME}, only for {RECIPIENT_NAME} 🤍"
                 </motion.p>
                 
                 <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-6"
                 >
                     <motion.div
                       animate={{ 
                           scale: [1, 1.2, 1], 
                           filter: ["drop-shadow(0 0 0px rgba(244,63,94,0))", "drop-shadow(0 0 10px rgba(244,63,94,0.5))", "drop-shadow(0 0 0px rgba(244,63,94,0))"]
                       }}
                       transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                     >
                        <Heart size={28} className="text-rose-500 fill-rose-200" />
                     </motion.div>
                 </motion.div>
             </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}

export default App;