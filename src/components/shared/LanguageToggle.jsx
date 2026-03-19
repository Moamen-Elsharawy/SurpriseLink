import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.resolvedLanguage?.startsWith('ar');

  const toggleLanguage = () => {
    const nextLang = isAr ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl glass hover:bg-white/10 transition-all duration-300 text-foreground/80 hover:text-foreground"
      title={isAr ? 'Switch to English' : 'التغيير للعربية'}
    >
      <Globe size={18} />
      <span className="text-sm font-bold min-w-[3rem]">
        {isAr ? 'English' : 'العربية'}
      </span>
    </button>
  );
};

export default LanguageToggle;
