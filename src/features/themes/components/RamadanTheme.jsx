import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Moon } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const RamadanTheme = ({ message, senderName }) => {
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
      colors: ['#f59e0b', '#8b5cf6', '#ffffff']
    });
  };

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      {/* Animated Background Icons */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 text-white/5 pointer-events-none"
      >
        <Star size={300} />
      </motion.div>

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-12"
          >
            <InteractiveElement occasion="ramadan" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden text-amber-50"
          >
            {/* Spiritual Background Icons */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <motion.div 
                 initial={{ y: -100 }}
                 animate={{ y: [0, 20, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-4 left-10 text-6xl"
               >🏮</motion.div>
               <motion.div 
                 initial={{ y: -100 }}
                 animate={{ y: [20, 0, 20] }}
                 transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                 className="absolute top-4 right-10 text-6xl"
               >🏮</motion.div>
               <motion.div 
                 animate={{ rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 10, repeat: Infinity }}
                 className="absolute bottom-10 left-10 text-7xl opacity-30"
               >✨</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-amber-500/20"><Sparkles size={48} /></div>
            <div className="absolute top-20 right-20 text-amber-500/10"><Moon size={120} /></div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-primary font-semibold tracking-wider uppercase text-sm">
                  {senderName} says...
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mt-2">
                  {message}
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <SurpriseActionButtons 
                  containerClasses="pt-8 border-t border-white/10"
                  shareClasses="shadow-lg shadow-green-500/20"
                  copyClasses="text-amber-50 border-white/10"
                  createOwnClasses="text-amber-50"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RamadanTheme;
