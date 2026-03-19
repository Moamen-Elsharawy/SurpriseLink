import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, GraduationCap } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const GraduationTheme = ({ message, senderName }) => {
  const { isMuted } = useSoundContext();
  const { play } = useSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', { mute: isMuted });
  const [isRevealed, setIsRevealed] = useState(false);
  const { t } = useTranslation();

  const handleReveal = () => {
    setIsRevealed(true);
    play();
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#1e40af', '#ffffff', '#ffd700']
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
            <InteractiveElement occasion="graduation" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden"
          >
            {/* Success Background Icons */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 initial={{ y: 100, x: -100 }}
                 animate={{ y: -200, x: 200, rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 left-1/2 text-7xl"
               >🎓</motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-10 left-10 text-8xl opacity-30"
               >🏆</motion.div>
               <motion.div 
                 animate={{ x: [-10, 10, -10] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute bottom-20 right-10 text-6xl opacity-30"
               >📜</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-blue-500/10"><GraduationCap size={120} /></div>
            <div className="absolute -bottom-10 -right-10 text-yellow-500/10 rotate-12"><Trophy size={200} /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">
                  CONGRATULATIONS FROM {senderName}
                </p>
                <h2 className="text-4xl md:text-6xl font-black leading-tight mt-2 text-white">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-blue-500/10"
                shareClasses="shadow-xl"
                copyClasses="border-blue-500/20"
                createOwnClasses="bg-blue-950/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GraduationTheme;
