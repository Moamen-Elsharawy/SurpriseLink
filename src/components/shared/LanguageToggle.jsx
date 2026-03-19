import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all duration-300"
    >
      <Globe size={18} />
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
};

export default LanguageToggle;
