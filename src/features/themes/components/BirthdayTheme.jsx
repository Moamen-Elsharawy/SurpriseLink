import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, Gift } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';
import { copyToClipboard } from '../../../lib/utils';

const BirthdayTheme = ({ message, senderName }) => {
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
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
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
            <InteractiveElement occasion="birthday" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden"
          >
             {/* Realistic Festive Floating Background */}
             <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <motion.div 
                  initial={{ y: '100vh', x: '10vw' }}
                  animate={{ 
                    y: '-20vh', 
                    x: ['10vw', '15vw', '5vw', '10vw'],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 18, 
                    repeat: Infinity, 
                    ease: "linear",
                  }}
                  className="absolute text-6xl"
                >🎈</motion.div>
                <motion.div 
                  initial={{ y: '100vh', x: '70vw' }}
                  animate={{ 
                    y: '-20vh', 
                    x: ['70vw', '65vw', '75vw', '70vw'],
                    rotate: [0, -15, 15, 0]
                  }}
                  transition={{ 
                    duration: 22, 
                    repeat: Infinity, 
                    ease: "linear", 
                    delay: 4 
                  }}
                  className="absolute text-5xl"
                >🎈</motion.div>
                <motion.div 
                   animate={{ 
                     y: [0, -20, 0],
                     rotate: [0, 2, -2, 0],
                     scale: [1, 1.05, 1]
                   }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/2 left-4 text-7xl opacity-30"
                >🎂</motion.div>
                <motion.div 
                   animate={{ rotate: [0, 15, -15, 0], y: [0, 10, 0] }}
                   transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute bottom-10 right-10 text-6xl opacity-30"
                >🎁</motion.div>
             </div>

             <div className="absolute -top-12 -left-12 text-pink-500/10 rotate-12"><PartyPopper size={120} /></div>
             <div className="absolute -bottom-12 -right-12 text-blue-500/10 -rotate-12"><Gift size={120} /></div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-center gap-2 mb-4">
                  <Sparkles className="text-yellow-400" />
                  <p className="text-primary font-bold tracking-widest uppercase text-sm">
                    {senderName}
                  </p>
                  <Sparkles className="text-yellow-400" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black leading-tight bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent">
                  {message}
                </h2>
              </motion.div>
                           <div className="pt-10 grid grid-cols-2 gap-4">
                <SurpriseActionButtons />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayTheme;
