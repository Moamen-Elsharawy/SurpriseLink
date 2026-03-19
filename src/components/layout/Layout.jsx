import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import AmbientBackground from '../shared/AmbientBackground';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { i18n } = useTranslation();
  
  return (
    <div 
      className="min-h-screen flex flex-col relative font-sans overflow-x-hidden transition-colors duration-500"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <AmbientBackground />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-6 md:pb-12 px-2 md:px-4 max-w-7xl mx-auto relative z-10 w-full flex flex-col">
        {children}
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-secondary/20 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  );
};

export default Layout;
