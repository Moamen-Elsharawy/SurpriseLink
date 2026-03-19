import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const ValentineTheme = ({ message, senderName }) => {
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
      colors: ['#ff4d4d', '#ff0066', '#ffffff', '#ffccd5']
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
            <InteractiveElement occasion="valentine" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden border-pink-500/20 shadow-2xl shadow-pink-500/10"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 initial={{ y: '100vh', x: '15vw' }}
                 animate={{ 
                   y: '-20vh', 
                   x: ['15vw', '10vw', '20vw', '15vw'],
                   rotate: [0, 15, -15, 0]
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute text-5xl"
               >💖</motion.div>
               <motion.div 
                 initial={{ y: '100vh', x: '75vw' }}
                 animate={{ 
                   y: '-20vh', 
                   x: ['75vw', '80vw', '70vw', '75vw'],
                   rotate: [0, -10, 10, 0]
                 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
                 className="absolute text-6xl"
               >💘</motion.div>
               <motion.div 
                 animate={{ 
                   scale: [1, 1.1, 1],
                   opacity: [0.2, 0.4, 0.2]
                 }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] text-pink-500/5"
               >❤️</motion.div>
               <motion.div 
                 animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 6, repeat: Infinity }}
                 className="absolute bottom-10 left-10 text-6xl"
               >🌹</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-pink-500/20 rotate-12"><Heart size={80} fill="currentColor" /></div>
            <div className="absolute top-4 right-4 text-pink-500/20 -rotate-12"><Heart size={80} fill="currentColor" /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-pink-400 font-bold tracking-widest uppercase text-sm mb-2">
                  To My Special Someone from {senderName}
                </p>
                <h2 className="text-3xl md:text-6xl font-black leading-tight mt-2 text-pink-100 font-serif lowercase italic">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-pink-500/10"
                shareClasses="shadow-xl"
                copyClasses="border-pink-500/10 text-pink-200"
                createOwnClasses="bg-pink-950/20 text-pink-200"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineTheme;
