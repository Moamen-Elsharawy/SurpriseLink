import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rabbit, Gift } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const EasterTheme = ({ message, senderName }) => {
  const { isMuted } = useSoundContext();
  const { play } = useSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', { mute: isMuted });
  const [isRevealed, setIsRevealed] = useState(false);
  const { t } = useTranslation();

  const handleReveal = () => {
    setIsRevealed(true);
    play();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a78bfa', '#fde68a', '#ffffff', '#6ee7b7']
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
            <InteractiveElement occasion="easter" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-200/20 shadow-xl"
          >
            {/* Realistic Easter Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 initial={{ x: -100, y: '70%', rotate: 0 }}
                 animate={{ 
                   x: '120vw', 
                   y: ['70%', '65%', '70%'],
                   rotate: [0, 10, -10, 0] 
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute text-7xl"
               >🐰</motion.div>
               <motion.div 
                 initial={{ y: '100vh', x: '20vw' }}
                 animate={{ y: '-20vh', rotate: 360 }}
                 transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                 className="absolute text-5xl"
               >🥚</motion.div>
               <motion.div 
                 initial={{ y: '100vh', x: '80vw' }}
                 animate={{ y: '-20vh', rotate: -360 }}
                 transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }}
                 className="absolute text-6xl"
               >🐣</motion.div>
               <motion.div 
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-10 right-10 text-6xl opacity-30"
               >🥕</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-indigo-400/20"><Rabbit size={80} /></div>
            <div className="absolute top-4 right-4 text-indigo-400/20"><Gift size={80} /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                 <p className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">
                  Easter Joy from {senderName}
                </p>
                <h2 className="text-4xl md:text-6xl font-black leading-tight mt-2 text-white/90">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-indigo-500/10"
                shareClasses="shadow-lg shadow-green-500/10"
                copyClasses="border-indigo-500/10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EasterTheme;
