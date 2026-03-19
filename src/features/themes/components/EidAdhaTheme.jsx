import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Star } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const EidAdhaTheme = ({ message, senderName }) => {
  const { isMuted } = useSoundContext();
  const { play } = useSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', { mute: isMuted });
  const [isRevealed, setIsRevealed] = useState(false);
  const { t } = useTranslation();

  const handleReveal = () => {
    setIsRevealed(true);
    play();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#ffffff']
    });
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
            <InteractiveElement occasion="eid_adha" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden text-emerald-100"
          >
            {/* Realistic Floating Sheep & Kaaba */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 initial={{ x: '120vw', y: 50, rotate: 0 }}
                 animate={{ 
                   x: -200, 
                   y: [50, 30, 60, 40, 50],
                   rotate: [0, -5, 5, 0]
                 }}
                 transition={{ 
                   duration: 20, 
                   repeat: Infinity, 
                   ease: "easeInOut",
                   times: [0, 0.25, 0.5, 0.75, 1] 
                 }}
                 className="absolute text-6xl"
               >🐑</motion.div>
               <motion.div 
                 initial={{ x: '120vw', y: 150, rotate: 0 }}
                 animate={{ 
                   x: -250, 
                   y: [150, 170, 140, 160, 150],
                   rotate: [0, 5, -5, 0]
                 }}
                 transition={{ 
                   duration: 25, 
                   repeat: Infinity, 
                   ease: "linear", 
                   delay: 7 
                 }}
                 className="absolute text-4xl"
               >🐑</motion.div>
               <motion.div 
                 animate={{ 
                   y: [0, -10, 0],
                   scale: [1, 1.05, 1],
                   rotate: [0, 1, -1, 0]
                 }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-10 left-10 text-8xl opacity-40 filter drop-shadow-2xl"
               >🕋</motion.div>
            </div>

            <div className="absolute top-4 right-4 text-emerald-500/30"><Moon size={24} /></div>
            <div className="absolute top-10 left-10 text-emerald-500/10"><Star size={48} /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">
                  {senderName} says...
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mt-2 italic font-serif">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-emerald-500/10"
                copyClasses="border-emerald-500/20"
                createOwnClasses="bg-emerald-950/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EidAdhaTheme;
