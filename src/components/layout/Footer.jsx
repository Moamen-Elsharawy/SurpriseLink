import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

const Footer = ({ isDark = true }) => {
  const { t, i18n } = useTranslation();
  
  return (
    <footer className={`w-full py-8 text-center relative z-10 transition-colors duration-500`}>
      <div className={`flex flex-col items-center justify-center gap-2 ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
        <p className="flex items-center gap-2 text-sm font-medium tracking-wide">
          <span>{i18n.language === 'ar' ? 'صمم بكل حب بواسطة' : 'Created with love by'}</span>
          <Heart size={14} className="text-red-500 fill-current animate-pulse" />
          <span className={`font-bold ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
            {i18n.language === 'ar' ? 'مؤمن الشعراوي' : 'Moamen Elsharawy'}
          </span>
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] font-light opacity-60">
          © {new Date().getFullYear()} Occasion Surprise
        </p>
      </div>
    </footer>
  );
};

export default Footer;
