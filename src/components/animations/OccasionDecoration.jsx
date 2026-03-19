import { motion } from 'framer-motion';

export function OccasionDecoration({ occasion }) {
  // Groupings
  const isReligious = ['ramadan', 'mawlid', 'islamic_new_year'].includes(occasion);
  const isFestive = ['new_year', 'eid_fitr', 'eid_adha', 'christmas', 'easter', 'birthday'].includes(occasion);
  const isRomantic = ['wedding', 'engagement', 'valentine', 'mothers_day', 'women_day', 'new_baby'].includes(occasion);
  const isAchievement = ['graduation', 'teacher_day'].includes(occasion);
  const isNational = ['jan_25', 'june_30', 'police_day', 'labor_day', 'armed_forces_day', 'sinai_liberation'].includes(occasion);

  // Ramadan / Religious - Stars and Moon
  if (isReligious) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full bg-yellow-100/20 blur-2xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  }

  // Festive / Holiday - Snow/Confetti-like
  if (isFestive) {
    const emojis = occasion === 'christmas' ? ['❄', '✨'] : ['✨', '🎈', '🎉'];
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-30"
            style={{ left: `${Math.random() * 100}%`, top: -20 }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          >
            {emojis[i % emojis.length]}
          </motion.div>
        ))}
      </div>
    );
  }

  // Romantic / Soft - Hearts/Flowers
  if (isRomantic) {
    const emojis = ['♥', '🌸', '✨'];
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{ left: `${Math.random() * 100}%`, bottom: -50 }}
            animate={{
              y: [0, -1000],
              x: [0, (Math.random() - 0.5) * 150],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'easeOut',
            }}
          >
            {emojis[i % emojis.length]}
          </motion.div>
        ))}
      </div>
    );
  }

  // Achievement - Confetti/Stars
  if (isAchievement) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  }

  // Default Sparkles
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10 text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
