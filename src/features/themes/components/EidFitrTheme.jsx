import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const EidFitrTheme = ({ message, senderName }) => {
  const { isMuted } = useSoundContext();
  const { play } = useSound('https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3', { mute: isMuted });
  const [isRevealed, setIsRevealed] = useState(false);
  const { t } = useTranslation();

  const handleReveal = () => {
    setIsRevealed(true);
    play();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#ffffff', '#fbbf24']
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
            <InteractiveElement occasion="eid_fitr" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden"
          >
            {/* Celebration Background Icons */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <motion.div 
                 initial={{ x: '120vw', y: 50, rotate: 0 }}
                 animate={{ x: -200, rotate: -360 }}
                 transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                 className="absolute text-5xl"
               >🍬</motion.div>
               <motion.div 
                 initial={{ x: '120vw', y: 250, rotate: 0 }}
                 animate={{ x: -200, rotate: 360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 3 }}
                 className="absolute text-4xl"
               >🍩</motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-10 right-10 text-6xl opacity-30"
               >🌙</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-purple-500/20"><Sparkles size={48} /></div>
            <div className="absolute bottom-10 right-10 text-pink-500/10"><PartyPopper size={120} /></div>
            
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-1 w-24 bg-emerald-500 mx-auto rounded-full mb-6" />
                <p className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-2">
                  {senderName}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EidFitrTheme;
