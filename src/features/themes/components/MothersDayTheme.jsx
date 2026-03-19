import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const MothersDayTheme = ({ message, senderName }) => {
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
      colors: ['#f472b6', '#fce7f3', '#ffffff', '#fbbf24']
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
            <InteractiveElement occasion="mothers_day" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden bg-gradient-to-br from-pink-500/5 to-yellow-500/5 border-pink-200/20"
          >
            {/* Realistic Floral Floating Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 initial={{ y: '100vh', x: '10vw' }}
                 animate={{ 
                   y: '-20vh', 
                   x: ['10vw', '15vw', '5vw', '10vw'],
                   rotate: 360 
                 }}
                 transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                 className="absolute text-5xl"
               >🌸</motion.div>
               <motion.div 
                 initial={{ y: '100vh', x: '80vw' }}
                 animate={{ 
                   y: '-20vh', 
                   x: ['80vw', '75vw', '85vw', '80vw'],
                   rotate: -360 
                 }}
                 transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }}
                 className="absolute text-6xl"
               >🌷</motion.div>
               <motion.div 
                 animate={{ 
                   scale: [1, 1.2, 1],
                   opacity: [0.1, 0.3, 0.1]
                 }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-10 left-10 text-9xl text-pink-500/10"
               >🌻</motion.div>
               <motion.div 
                 animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 5, repeat: Infinity }}
                 className="absolute bottom-10 right-10 text-5xl"
               >🌺</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-pink-500/10"><Flower size={80} /></div>
            <div className="absolute top-4 right-4 text-pink-500/10"><Heart size={80} fill="currentColor" /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                 <p className="text-pink-400 font-bold tracking-[0.2em] uppercase text-xs mb-2">
                  Special Love Message from {senderName}
                </p>
                <h2 className="text-4xl md:text-6xl font-black leading-tight mt-2 text-white/90 font-serif">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-pink-500/10"
                shareClasses="transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/10"
                copyClasses="border-pink-500/10"
                createOwnClasses="text-pink-400"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MothersDayTheme;
