import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Star } from 'lucide-react';
import { InteractiveElement } from '../../../components/animations/InteractiveElement';
import confetti from 'canvas-confetti';
import { useTranslation } from 'react-i18next';
import SurpriseActionButtons from '../../../components/layout/SurpriseActionButtons';
import { useSound } from '../hooks/useSound';
import { useSoundContext } from '../../../hooks/useSoundContext';

const NationalTheme = ({ message, senderName, occasion }) => {
  const { isMuted } = useSoundContext();
  const { play } = useSound('https://assets.mixkit.co/active_storage/sfx/2567/2567-preview.mp3', { mute: isMuted });
  const [isRevealed, setIsRevealed] = useState(false);
  const { t } = useTranslation();

  const handleReveal = () => {
    setIsRevealed(true);
    play();
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#ffffff', '#000000', '#fbbf24']
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
            <InteractiveElement occasion={occasion} onReveal={handleReveal} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl text-center space-y-8 relative overflow-hidden bg-gradient-to-br from-red-500/5 via-white/5 to-black/5 border-white/10"
          >
            {/* Proud Patriotic Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
               <motion.div 
                 initial={{ x: -100, y: '20%' }}
                 animate={{ x: '120vw', rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute text-7xl"
               >🇪🇬</motion.div>
               <motion.div 
                 initial={{ x: -250, y: '60%' }}
                 animate={{ x: '120vw', rotate: [0, -5, 5, 0] }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
                 className="absolute text-5xl"
               >🦅</motion.div>
               <motion.div 
                 animate={{ 
                   scale: [1, 1.1, 1],
                   opacity: [0.1, 0.3, 0.1]
                 }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute top-1/2 left-4 text-9xl text-white/5"
               >🎖️</motion.div>
            </div>

            <div className="absolute top-4 left-4 text-red-500/10"><Shield size={80} /></div>
            <div className="absolute top-4 right-4 text-yellow-500/5"><Star size={100} fill="currentColor" /></div>
            
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                 <p className="text-red-500 font-black tracking-widest uppercase text-xs mb-2">
                  National Honors from {senderName}
                </p>
                <h2 className="text-3xl md:text-5xl font-black leading-tight mt-2 text-white/90">
                  {message}
                </h2>
              </motion.div>
              
              <SurpriseActionButtons 
                containerClasses="border-t border-white/10"
                shareClasses="shadow-xl"
                copyClasses="border-white/20"
                createOwnClasses="bg-red-950/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NationalTheme;
