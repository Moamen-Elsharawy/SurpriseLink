import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, image, url, occasion }) => {
  const { t, i18n } = useTranslation();
  
  const siteName = "SurpriseLink";
  const creator = "Moamen Elsharawy (مؤمن الشعراوي)";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defDescription = description || "Create beautiful and interactive surprise invitation links for any occasion. Developed with love by Moamen Elsharawy.";
  const ogImage = image || `https://super-surpriselink.netlify.app/og-image.png`;
  const fullUrl = url || `https://super-surpriselink.netlify.app${window.location.pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={defDescription} />
      <meta name="author" content={creator} />
      <html lang={i18n.language} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={defDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={defDescription} />
      <meta property="twitter:image" content={ogImage} />

      {/* Theme Color */}
      <meta name="theme-color" content={occasion === 'ramadan' ? '#1e1b4b' : '#ec4899'} />
    </Helmet>
  );
};

export default SEO;
