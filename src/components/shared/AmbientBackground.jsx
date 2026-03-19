import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

export default function AmbientBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      {/* Dynamic Mesh Base */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(at_0%_0%,_var(--primary)_0,_transparent_50%),_radial-gradient(at_100%_0%,_var(--secondary)_0,_transparent_50%)]" />

      {/* Animated Blobs */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"
      />
      <motion.div
        style={{ y: y2 }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[100px]"
      />

      {/* Floating Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Subtle Noise Texture overlay could go here if needed */}
    </div>
  );
}
