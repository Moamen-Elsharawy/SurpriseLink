import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Sparkles, TreePine } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const ChristmasTheme = ({ message, senderName }) => {
  const { isMuted } = useSoundContext();
  const { play } = useSound('https://assets.mixkit.co/active_storage/sfx/1806/1806-preview.mp3', { mute: isMuted });
  const [isRevealed, setIsRevealed] = useState(false);
  const { t } = useTranslation();

  const handleReveal = () => {
    setIsRevealed(true);
    play();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#22c55e', '#ffffff']
    });
  };

  return (
    <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
      {/* Snowfall effect placeholder */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ 
              y: "100vh", 
              opacity: [0, 1, 1, 0],
              x: (Math.random() * 100 + (Math.sin(i) * 10)) + "%"
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-white/20"
          >
            <Snowflake size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="pre-reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-12"
          >
            <InteractiveElement occasion="christmas" onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative z-10 border-red-500/20 overflow-hidden"
          >
            {/* Christmas Magic Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 initial={{ y: -50 }}
                 animate={{ scale: [1, 1.1, 1], y: [0, 10, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-10 right-10 text-7xl"
               >🎄</motion.div>
               <motion.div 
                 initial={{ x: -100 }}
                 animate={{ x: '120vw', rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute top-1/2 text-6xl"
               >🎅</motion.div>
               <motion.div 
                 animate={{ y: [0, 5, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute bottom-10 left-10 text-6xl"
               >⛄</motion.div>
            </div>

            <div className="absolute -top-6 -left-6 text-red-500/10 rotate-12"><TreePine size={80} /></div>
            <div className="absolute -bottom-6 -right-6 text-green-500/10 -rotate-12"><TreePine size={80} /></div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-center gap-2 mb-4">
                  <Sparkles size={20} className="text-yellow-400" />
                  <p className="text-red-500 font-bold tracking-widest uppercase text-sm">
                    {senderName}
                  </p>
                  <Sparkles size={20} className="text-yellow-400" />
                </div>
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

export default ChristmasTheme;
