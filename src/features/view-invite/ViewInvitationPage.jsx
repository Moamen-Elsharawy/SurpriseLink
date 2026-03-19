import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../lib/supabase';
import { viewerSchema } from '../../types/schemas';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/label';
import ThemeLoader from '../themes/ThemeLoader';
import { FloatingParticles } from '../../components/animations/FloatingParticles';
import { OccasionDecoration } from '../../components/animations/OccasionDecoration';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/shared/SEO';

import messages from '../../lib/messages.json';

const ViewInvitationPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [randomMsg, setRandomMsg] = useState(null);

  const occasionThemes = {
    ramadan: {
      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
      primaryColor: '#fbbf24',
      textColor: 'text-white'
    },
    eid_fitr: {
      gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #064e3b 100%)',
      primaryColor: '#10b981',
      textColor: 'text-white'
    },
    eid_adha: {
      gradient: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #78350f 100%)',
      primaryColor: '#fbbf24',
      textColor: 'text-white'
    },
    christmas: {
      gradient: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)',
      primaryColor: '#ef4444',
      textColor: 'text-white'
    },
    birthday: {
      gradient: 'linear-gradient(135deg, #fdf2ff 0%, #f5d0fe 50%, #fdf2ff 100%)',
      primaryColor: '#d946ef',
      textColor: 'text-slate-900'
    },
    general: {
      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
      primaryColor: '#8b5cf6',
      textColor: 'text-white'
    }
  };

  const currentTheme = invitation ? (occasionThemes[invitation.occasion] || occasionThemes.general) : occasionThemes.general;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(viewerSchema),
    defaultValues: { name: '', phone: '' }
  });

  useEffect(() => {
    fetchInvitation();
    fetchVisitorCount();
  }, [id]);

  const fetchVisitorCount = async () => {
    const { count, error } = await supabase
      .from('viewers')
      .select('*', { count: 'exact', head: true })
      .eq('invitation_id', id);
    
    if (!error) setVisitorCount(count);
  };

  const fetchInvitation = async () => {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setInvitation(data);

      // If no message is stored, prepare a random one from the same occasion
      if (!data.message_ar && !data.message_en) {
        const categoryMessages = messages[data.occasion] || messages.general || messages.birthday || [];
        if (categoryMessages.length > 0) {
          const randomIndex = Math.floor(Math.random() * categoryMessages.length);
          setRandomMsg(categoryMessages[randomIndex]);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Invitation not found');
    } finally {
      setLoading(false);
    }
  };

  const onStart = async (data) => {
    // Save viewer data
    await supabase.from('viewers').insert([
      {
        invitation_id: id,
        viewer_name: data.name,
        viewer_phone: data.phone
      }
    ]);

    setIsStarted(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh] text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
    </div>
  );

  if (error || !invitation) return (
    <div className="glass-card text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-400">Error</h2>
      <p className="text-white/60 mt-2">{error || 'Invitation not found'}</p>
      <Button onClick={() => window.location.href = '/'} className="mt-6" variant="outline">
        {t('common.createOwn')}
      </Button>
    </div>
  );

  // Determine final message
  const displayMessage = (i18n.language === 'ar' 
    ? (invitation.message_ar || randomMsg?.ar) 
    : (invitation.message_en || randomMsg?.en)) || '';

  return (
    <div 
      className="fixed inset-0 z-0 transition-colors duration-1000 overflow-y-auto"
      style={{ background: currentTheme.gradient }}
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <SEO 
        title={invitation ? `${invitation.sender_name} - ${t(`occasions.${invitation.occasion}`)}` : t('view.welcome')}
        description={displayMessage}
        occasion={invitation?.occasion}
      />
      <div className="relative z-10 max-w-4xl mx-auto min-h-screen flex flex-col items-center px-4 pt-24 pb-0">
        <OccasionDecoration occasion={invitation?.occasion} />
        <FloatingParticles count={30} color={currentTheme.primaryColor} />
        
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.div
                key="collect"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass-card w-full max-w-md space-y-6 md:space-y-8 text-center relative z-10"
              >
                <div className="space-y-2">
                  <h1 className={`${currentTheme.textColor} text-3xl font-black tracking-tight`}>
                    {t('view.welcome')}
                  </h1>
                  <p className={`${currentTheme.textColor === 'text-white' ? 'text-white/60' : 'text-slate-600'}`}>{t('view.enterDetails')}</p>
                </div>
                
                <form onSubmit={handleSubmit(onStart)} className="space-y-6 text-start">
                  {visitorCount > 0 && (
                    <div className={`text-center text-sm font-medium ${currentTheme.textColor === 'text-white' ? 'text-white/40' : 'text-slate-400'} mb-2`}>
                      {visitorCount}{' '}
                      {i18n.language === 'ar' 
                        ? (visitorCount >= 3 && visitorCount <= 10 ? t('view.alreadySeenPlural') : t('view.alreadySeen'))
                        : (visitorCount === 1 ? t('view.alreadySeen') : t('view.alreadySeenPlural'))}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className={`font-semibold ${currentTheme.textColor === 'text-white' ? 'text-white/80' : 'text-slate-700'}`}>{t('view.viewerName')}</Label>
                    <Input
                      id="name"
                      placeholder={t('view.namePlaceholder')}
                      {...register('name')}
                      className={`bg-white/10 backdrop-blur-md border-white/20 ${currentTheme.textColor === 'text-white' ? 'text-white placeholder:text-white/30' : 'text-slate-900 placeholder:text-slate-400'} ${errors.name ? 'border-red-500/50' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle size={12} /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className={`font-semibold ${currentTheme.textColor === 'text-white' ? 'text-white/80' : 'text-slate-700'}`}>{t('view.viewerPhone')}</Label>
                    <Input
                      id="phone"
                      placeholder={t('view.phonePlaceholder')}
                      type="tel"
                      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                      {...register('phone')}
                      className={`bg-white/10 backdrop-blur-md border-white/20 ${currentTheme.textColor === 'text-white' ? 'text-white placeholder:text-white/30' : 'text-slate-900 placeholder:text-slate-400'} ${errors.phone ? 'border-red-500/50' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle size={12} /> {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" variant="gradient" size="xl" className="w-full">
                    <div className="flex items-center justify-center gap-2">
                      <Play size={20} fill="currentColor" />
                      {t('view.start')}
                    </div>
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="experience"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full relative z-10"
              >
                <ThemeLoader 
                  occasion={invitation.occasion} 
                  message={displayMessage}
                  senderName={invitation.sender_name}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Footer isDark={currentTheme.textColor === 'text-white'} />
      </div>
    </div>
  );
};

export default ViewInvitationPage;
