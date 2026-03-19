import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';


// Lazy load theme components
const RamadanTheme = lazy(() => import('./components/RamadanTheme'));
const BirthdayTheme = lazy(() => import('./components/BirthdayTheme'));
const EidFitrTheme = lazy(() => import('./components/EidFitrTheme'));
const ChristmasTheme = lazy(() => import('./components/ChristmasTheme'));
const GeneralTheme = lazy(() => import('./components/GeneralTheme'));
const EidAdhaTheme = lazy(() => import('./components/EidAdhaTheme'));
const WeddingTheme = lazy(() => import('./components/WeddingTheme'));
const GraduationTheme = lazy(() => import('./components/GraduationTheme'));
const ValentineTheme = lazy(() => import('./components/ValentineTheme'));
const MothersDayTheme = lazy(() => import('./components/MothersDayTheme'));
const NewYearTheme = lazy(() => import('./components/NewYearTheme'));
const EasterTheme = lazy(() => import('./components/EasterTheme'));
const NationalTheme = lazy(() => import('./components/NationalTheme'));
const NewBabyTheme = lazy(() => import('./components/NewBabyTheme'));

const themeMap = {
  ramadan: RamadanTheme,
  birthday: BirthdayTheme,
  eid_fitr: EidFitrTheme,
  christmas: ChristmasTheme,
  eid_adha: EidAdhaTheme,
  wedding: WeddingTheme,
  engagement: WeddingTheme,
  graduation: GraduationTheme,
  success: GraduationTheme,
  new_baby: NewBabyTheme,
  valentine: ValentineTheme,
  mothers_day: MothersDayTheme,
  fathers_day: MothersDayTheme,
  women_day: MothersDayTheme,
  teacher_day: GraduationTheme, // Graduation theme fits teachers well
  labor_day: GeneralTheme,
  new_year: NewYearTheme,
  islamic_new_year: RamadanTheme,
  mawlid: RamadanTheme,
  easter: EasterTheme,
  police_day: NationalTheme,
  armed_forces_day: NationalTheme,
  sinai_liberation: NationalTheme,
  jan_25: NationalTheme,
  june_30: NationalTheme,
};

const ThemeLoader = ({ occasion, message, senderName }) => {
  const SelectedTheme = themeMap[occasion] || GeneralTheme;

  const getLoaderIcon = () => {
    switch (occasion) {
      case 'ramadan': return '🏮';
      case 'eid_fitr': return '🍬';
      case 'eid_adha': return '🐑';
      case 'birthday': return '🎂';
      case 'christmas': return '🎄';
      case 'wedding': return '💍';
      case 'graduation': return '🎓';
      case 'new_baby': return '👶';
      default: return '✨';
    }
  };

  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          {getLoaderIcon()}
        </motion.div>
        <div className="animate-pulse text-white/40 font-medium tracking-wide">Preparing your surprise...</div>
      </div>
    }>
      <SelectedTheme message={message} senderName={senderName} />
    </Suspense>
  );
};

export default ThemeLoader;
