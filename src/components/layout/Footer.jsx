import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Facebook, Instagram, Twitter } from 'lucide-react';

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
          © {new Date().getFullYear()} SurpriseLink
        </p>

        <div className="flex items-center gap-5 mt-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <a href="https://www.facebook.com/Moamen.Elsharawy2004" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/moamen_elsharawy2004/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
            <Instagram size={18} />
          </a>
          <a href="https://x.com/MoamenElsharawy" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
