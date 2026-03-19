import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const NewYearTheme = ({ message, senderName }) => {
  const { isMuted } = useSoundContext();
  const { play } = useSound('https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3', { mute: isMuted });
  const [isRevealed, setIsRevealed] = useState(false);
  const { t } = useTranslation();

  const handleReveal = () => {
    setIsRevealed(true);
    play();
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-12"
          >
            <InteractiveElement occasion="new_year" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden bg-black/40 border-yellow-500/20 shadow-[0_0_50px_rgba(234,179,8,0.1)]"
          >
            {/* Realistic Celebration Background */}
            <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
               <motion.div 
                 initial={{ y: '100vh', opacity: 0 }}
                 animate={{ 
                   y: ['100vh', '10vh', '15vh'],
                   opacity: [0, 1, 0],
                   scale: [1, 2, 0.5]
                 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                 className="absolute left-1/4 text-7xl"
               >🎆</motion.div>
               <motion.div 
                 initial={{ y: '100vh', opacity: 0 }}
                 animate={{ 
                   y: ['100vh', '20vh', '25vh'],
                   opacity: [0, 1, 0],
                   scale: [1, 2.5, 0.5]
                 }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 1 }}
                 className="absolute right-1/4 text-8xl"
               >🎇</motion.div>
               <motion.div 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute bottom-10 left-10 text-6xl"
               >🥂</motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute top-10 right-10 text-5xl"
               >🥳</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-yellow-500/20"><Star size={60} fill="currentColor" /></div>
            <div className="absolute top-4 right-4 text-yellow-500/20"><Star size={60} fill="currentColor" /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                 <p className="text-yellow-500 font-black tracking-[0.3em] uppercase text-xs mb-2">
                  HAPPY NEW YEAR FROM {senderName}
                </p>
                <h2 className="text-4xl md:text-7xl font-black leading-tight mt-2 text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-yellow-500/50">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-yellow-500/10"
                shareClasses="shadow-[0_4px_15px_rgba(37,211,102,0.3)]"
                copyClasses="border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/5"
                createOwnClasses="bg-yellow-950/20 text-yellow-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewYearTheme;
