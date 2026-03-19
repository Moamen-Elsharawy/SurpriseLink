import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../shared/LanguageToggle';
import MuteToggle from '../shared/MuteToggle';
import ThemeToggle from '../shared/ThemeToggle';
import i18n from '../../i18n/config';

const Navbar = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Sync initial direction on mount
    document.documentElement.dir = i18n.language.startsWith('ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language.split('-')[0];
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl px-6 py-3 flex justify-between items-center glass rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-white/20 transition-all duration-300">
      <div 
        className="text-xl font-bold tracking-tight text-foreground/90 cursor-pointer hover:text-primary transition-colors"
        onClick={() => window.location.href = '/'}
      >
        SurpriseLink
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <MuteToggle />
        {/* <div className="w-px h-6 bg-white/10 mx-1" />
        <ThemeToggle /> */}
        <div className="w-px h-6 bg-white/10 mx-1" />
        <LanguageToggle />
      </div>
    </nav>
  );
};

export default Navbar;
