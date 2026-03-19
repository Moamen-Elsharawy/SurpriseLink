import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Star } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const NewBabyTheme = ({ message, senderName }) => {
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
      colors: ['#60a5fa', '#f472b6', '#ffffff', '#fbbf24']
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
            <InteractiveElement occasion="new_baby" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden bg-gradient-to-br from-blue-500/5 to-pink-500/5 border-white/20"
          >
            {/* Baby Nursery Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 animate={{ y: [0, -15, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-1/2 left-4 text-7xl opacity-40"
               >🍼</motion.div>
               <motion.div 
                 initial={{ x: -100 }}
                 animate={{ x: '120vw', rotate: [0, 10, -10, 0] }}
                 transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                 className="absolute bottom-10 text-6xl"
               >👶</motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 5, repeat: Infinity }}
                 className="absolute top-20 right-10 text-6xl opacity-30"
               >🧸</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-blue-400/10 rotate-12"><Baby size={80} /></div>
            <div className="absolute top-4 right-4 text-pink-400/10 -rotate-12"><Baby size={80} /></div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-yellow-400/5"><Star size={200} fill="currentColor" /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
                  A New Surprise from {senderName}
                </p>
                <h2 className="text-3xl md:text-5xl font-black leading-tight mt-2 text-white/90">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-white/10"
                shareClasses="shadow-lg shadow-green-500/10"
                copyClasses="border-white/10"
                createOwnClasses="shadow-inner"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewBabyTheme;
