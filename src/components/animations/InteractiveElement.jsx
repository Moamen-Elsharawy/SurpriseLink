import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Gift, Moon, TreePine, Cake, Sparkles, 
  GraduationCap, Heart, Baby, Star, 
  Search, PartyPopper, Waves, HeartHandshake,
  Dumbbell, Shield
} from 'lucide-react';

export function InteractiveElement({ occasion, onReveal }) {
  const { t } = useTranslation();
  const occasionConfig = {
    // Religious / Islamic
    ramadan: { icon: Moon, color: '#ffd700', shadowColor: 'rgba(255, 215, 0, 0.4)' },
    eid_fitr: { icon: Gift, color: '#10b981', shadowColor: 'rgba(16, 185, 129, 0.4)' },
    eid_adha: { icon: Star, color: '#ffd700', shadowColor: 'rgba(255, 215, 0, 0.4)' },
    mawlid: { icon: Moon, color: '#ffd700', shadowColor: 'rgba(255, 215, 0, 0.4)' },
    islamic_new_year: { icon: Moon, color: '#ffd700', shadowColor: 'rgba(255, 215, 0, 0.4)' },

    // Holidays
    christmas: { icon: TreePine, color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
    easter: { icon: Gift, color: '#8b5cf6', shadowColor: 'rgba(139, 92, 246, 0.4)' },
    new_year: { icon: Sparkles, color: '#ffd700', shadowColor: 'rgba(255, 215, 0, 0.4)' },
    jan_25: { icon: Star, color: '#ffffff', shadowColor: 'rgba(255, 255, 255, 0.4)' },
    june_30: { icon: Star, color: '#ffffff', shadowColor: 'rgba(255, 255, 255, 0.4)' },

    // Personal / Joy
    birthday: { icon: Cake, color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
    wedding: { icon: Heart, color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
    engagement: { icon: Heart, color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
    graduation: { icon: GraduationCap, color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
    success: { icon: GraduationCap, color: '#10b981', shadowColor: 'rgba(16, 185, 129, 0.4)' },
    new_baby: { icon: Baby, color: '#60a5fa', shadowColor: 'rgba(96, 165, 250, 0.4)' },

    // Special Days
    mothers_day: { icon: Heart, color: '#fb7185', shadowColor: 'rgba(251, 113, 133, 0.4)' },
    fathers_day: { icon: HeartHandshake, color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },
    valentine: { icon: Heart, color: '#ef4444', shadowColor: 'rgba(239, 68, 68, 0.4)' },
    women_day: { icon: Heart, color: '#ec4899', shadowColor: 'rgba(236, 72, 153, 0.4)' },
    teacher_day: { icon: GraduationCap, color: '#10b981', shadowColor: 'rgba(16, 185, 129, 0.4)' },
    
    // National / Other
    police_day: { icon: Shield, color: '#1d4ed8', shadowColor: 'rgba(29, 78, 216, 0.4)' },
    labor_day: { icon: Dumbbell, color: '#4b5563', shadowColor: 'rgba(75, 85, 99, 0.4)' },
    armed_forces_day: { icon: Shield, color: '#065f46', shadowColor: 'rgba(6, 95, 70, 0.4)' },
    sinai_liberation: { icon: Waves, color: '#3b82f6', shadowColor: 'rgba(59, 130, 246, 0.4)' },

    general: { icon: Sparkles, color: '#8b5cf6', shadowColor: 'rgba(139, 92, 246, 0.4)' }
  };

  const config = occasionConfig[occasion] || occasionConfig.general;
  const Icon = config.icon;

  return (
    <motion.button
      onClick={onReveal}
      className="relative cursor-pointer group p-8"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"
        style={{ backgroundColor: config.color, willChange: 'transform' }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Glass Circle */}
      <motion.div
        className="relative flex items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
        animate={{
          scale: [1, 1.02, 1],
          y: [0, -5, 0],
        }}
        style={{ willChange: 'transform' }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Icon
          className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-md"
          strokeWidth={1.5}
        />

        {/* Ambient Sparkles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
            style={{
              top: '50%',
              left: '50%',
              willChange: 'transform, opacity'
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 2) * 100, 0],
              y: [0, Math.sin((i * Math.PI) / 2) * 100, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Subtle Outer Ring */}
      <motion.div
        className="absolute inset-[24px] rounded-full border border-white/10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Guide Text */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/90 font-medium tracking-wide flex flex-col items-center gap-1 w-full"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="text-base md:text-lg drop-shadow-md">{t('view.reveal')}</span>
        <div className="w-10 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white/60 w-1/2"
            animate={{ x: [-20, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.button>
  );
}
