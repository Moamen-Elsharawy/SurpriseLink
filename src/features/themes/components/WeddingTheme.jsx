import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const WeddingTheme = ({ message, senderName }) => {
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
      colors: ['#f8bbd0', '#f48fb1', '#ffffff', '#ffd54f']
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
            <InteractiveElement occasion="wedding" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden border-rose-200/20"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-1/2 left-10 text-7xl opacity-40"
               >💍</motion.div>
               <motion.div 
                 initial={{ x: -100 }}
                 animate={{ x: '120vw' }}
                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                 className="absolute bottom-20 text-5xl"
               >👰🤵</motion.div>
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-10 right-10 text-6xl opacity-30"
               >💖</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-rose-500/10 rotate-12"><Heart size={80} fill="currentColor" /></div>
            <div className="absolute bottom-4 right-4 text-rose-500/10 -rotate-12"><Heart size={80} fill="currentColor" /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-rose-400 font-bold tracking-widest uppercase text-sm mb-2">
                  Wedding Wishes from {senderName}
                </p>
                <h2 className="text-3xl md:text-5xl font-black leading-tight mt-2 text-rose-100 font-serif">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-rose-500/10"
                shareClasses="shadow-green-500/10"
                copyClasses="border-rose-500/10 hover:bg-rose-500/5 text-rose-200"
                createOwnClasses="bg-rose-950/20 text-rose-200"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingTheme;
