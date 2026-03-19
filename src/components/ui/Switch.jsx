import React from 'react';
import { motion } from 'framer-motion';

export const Switch = ({ checked, onChange, id, label }) => {
  return (
    <div 
      className="flex items-center gap-4 cursor-pointer select-none group"
      onClick={() => onChange(!checked)}
    >
      <div 
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 pointer-events-none ${
          checked ? 'bg-primary shadow-[0_0_15px_-2px_rgba(236,72,153,0.5)]' : 'bg-switch'
        }`}
      >
        <motion.div
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      {label && (
        <label 
          htmlFor={id} 
          className="font-semibold text-foreground/80 cursor-pointer group-hover:text-foreground transition-colors"
        >
          {label}
        </label>
      )}
    </div>
  );
};
