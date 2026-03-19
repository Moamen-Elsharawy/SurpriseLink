import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Send, Sparkles, AlertCircle, MessageCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../../lib/supabase';
import messages from '../../lib/messages.json';
import { invitationSchema } from '../../types/schemas';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/Switch';
import Footer from '../../components/layout/Footer';
import { WhatsAppIcon } from '../../components/ui/WhatsAppIcon';
import SurpriseActionButtons from '../../components/layout/SurpriseActionButtons';

const occasions = [
  'ramadan', 'eid_fitr', 'eid_adha', 'mawlid', 'islamic_new_year',
  'christmas', 'easter', 'new_year',
  'birthday', 'wedding', 'engagement', 'graduation', 'new_baby',
  'police_day', 'labor_day', 'armed_forces_day', 'sinai_liberation', 'jan_25', 'june_30',
  'mothers_day', 'fathers_day', 'valentine', 'women_day', 'teacher_day'
];

const CreateInvitationPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inviteId, setInviteId] = useState(null);
  const [copied, setCopied] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(invitationSchema),
    defaultValues: { senderName: '', senderPhone: '', occasion: '', isCustom: false, useSuggested: true, messageAr: '', messageEn: '' }
  });

  const isCustom = watch('isCustom');
  const useSuggested = watch('useSuggested');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const id = uuidv4();
      
      let finalMsg = { ar: data.messageAr, en: data.messageEn };

      if (!data.isCustom) {
        if (data.useSuggested) {
          // Pick random local message
          const categoryMessages = messages[data.occasion] || messages.general || messages.birthday || [];
          const randomIndex = Math.floor(Math.random() * categoryMessages.length);
          finalMsg = categoryMessages[randomIndex] || { ar: '', en: '' };
        } else {
          // No message at all
          finalMsg = { ar: '', en: '' };
        }
      }

      const { error } = await supabase.from('invitations').insert([
        {
          id,
          sender_name: data.senderName,
          sender_phone: data.senderPhone,
          occasion: data.occasion,
          message_ar: finalMsg.ar,
          message_en: finalMsg.en
        }
      ]);

      if (!error) {
        setInviteId(id);
        setSuccess(true);
      } else {
        throw error;
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Error creating invitation.');
    } finally {
      setLoading(false);
    }
  };

  const inviteUrl = `${window.location.origin}/invite/${inviteId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-full flex-1 flex flex-col ${success ? 'max-w-5xl' : 'max-w-3xl'} md:mx-auto py-4 md:py-8 px-0 md:px-4 transition-all duration-500`}>
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card space-y-6 md:space-y-8"
          >
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-black text-foreground drop-shadow-sm">
                  {t('create.title')}
                </h1>
                <p className="text-foreground/60">{t('create.subtitle')}</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="senderName">{t('common.senderName')}</Label>
                  <Input
                    id="senderName"
                    placeholder="John Doe"
                    {...register('senderName')}
                    className={errors.senderName ? 'border-red-500/50' : ''}
                  />
                  {errors.senderName && (
                    <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle size={12} /> {errors.senderName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senderPhone">{t('common.phoneNumber')}</Label>
                  <Input
                    id="senderPhone"
                    placeholder="+201234567890"
                    type="tel"
                    {...register('senderPhone')}
                    className={errors.senderPhone ? 'border-red-500/50' : ''}
                  />
                  {errors.senderPhone && (
                    <p className="text-xs text-red-500 flex items-center gap-1 font-medium">
                      <AlertCircle size={12} /> {errors.senderPhone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occasion">{t('common.occasion')}</Label>
                  <select
                    id="occasion"
                    className={`w-full h-12 px-4 rounded-2xl bg-background/50 border border-foreground/10 ring-offset-background focus-visible:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 text-foreground appearance-none cursor-pointer ${errors.occasion ? 'border-red-500/50' : ''}`}
                    {...register('occasion')}
                  >
                    <option value="" disabled className="bg-background text-foreground">{t('common.occasion')}</option>
                    {occasions.map((occ) => (
                      <option key={occ} value={occ} className="bg-background text-foreground">
                        {t(`occasions.${occ}`)}
                      </option>
                    ))}
                  </select>
                {errors.occasion && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.occasion.message}
                  </p>
                )}
              </div>

              {/* Message Choice Selection */}
              <div className="flex flex-col gap-3 p-5 rounded-3xl bg-background/30 border border-foreground/10 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-foreground/80 font-bold">
                  <MessageCircle size={18} />
                  <span>{t('create.messageStyle')}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* use suggested message toggle */}
                  <div 
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${!isCustom && useSuggested ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-foreground/10 bg-background/20 hover:border-primary/30'}`}
                    onClick={() => {
                        setValue('isCustom', false);
                        setValue('useSuggested', true);
                    }}
                  >
                    <div className="font-bold flex items-center justify-between gap-4">
                        <span className="text-sm md:text-base">{t('create.suggestedMessage')}</span>
                        <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isCustom && useSuggested ? 'border-primary' : 'border-foreground/20'}`}>
                            {!isCustom && useSuggested && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                    </div>
                    <p className="text-xs text-foreground/50 leading-relaxed">{t('create.suggestedDesc')}</p>
                  </div>

                  <div 
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 ${isCustom ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-foreground/10 bg-background/20 hover:border-primary/30'}`}
                    onClick={() => {
                        setValue('isCustom', true);
                    }}
                  >
                    <div className="font-bold flex items-center justify-between gap-4">
                        <span className="text-sm md:text-base">{t('common.customMessage')}</span>
                        <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCustom ? 'border-primary' : 'border-foreground/20'}`}>
                            {isCustom && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                    </div>
                    <p className="text-xs text-foreground/50 leading-relaxed">{t('create.customDesc')}</p>
                  </div>

                  <div 
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 md:col-span-2 ${!isCustom && !useSuggested ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-foreground/10 bg-background/20 hover:border-primary/30'}`}
                    onClick={() => {
                        setValue('isCustom', false);
                        setValue('useSuggested', false);
                    }}
                  >
                    <div className="font-bold flex items-center justify-between gap-4">
                        <span className="text-sm md:text-base">{t('create.noMessage')}</span>
                        <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${!isCustom && !useSuggested ? 'border-primary' : 'border-foreground/20'}`}>
                            {!isCustom && !useSuggested && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                    </div>
                    <p className="text-xs text-foreground/50 leading-relaxed">{t('create.noMessageDesc')}</p>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isCustom && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="messageAr" className="font-semibold text-foreground/80">{t('common.messageAr')}</Label>
                      <textarea
                        id="messageAr"
                        dir="rtl"
                        className="w-full h-32 p-4 rounded-2xl bg-background/50 border border-foreground/10 text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                        {...register('messageAr')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="messageEn" className="font-semibold text-foreground/80">{t('common.messageEn')}</Label>
                      <textarea
                        id="messageEn"
                        dir="ltr"
                        className="w-full h-32 p-4 rounded-2xl bg-background/50 border border-foreground/10 text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all resize-none"
                        {...register('messageEn')}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button type="submit" variant="gradient" size="xl" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    {t('common.submit')}
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card text-center space-y-4 md:space-y-5 md:p-6"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-md shadow-green-500/10">
              <Check size={40} />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl md:text-4xl font-black text-foreground drop-shadow-sm">{t('create.success')}</h2>
              <p className="text-foreground/60 text-base">{t('create.linkReady')}</p>
            </div>

            <div className="p-4 bg-white rounded-[1.5rem] inline-block mx-auto shadow-md ring-4 ring-white/5">
              <QRCodeSVG value={inviteUrl} size={180} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 p-2 bg-background/50 rounded-2xl border border-foreground/10">
                <input
                  readOnly
                  value={inviteUrl}
                  className="bg-transparent border-none outline-none flex-1 px-3 text-sm text-foreground/70 truncate"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 p-3 hover:bg-foreground/5 rounded-xl transition-all duration-300 text-foreground/70"
                >
                  {copied ? (
                    <>
                      <Check size={18} className="text-green-500" />
                      <span className="text-xs font-bold text-green-500">{t('common.copied')}</span>
                    </>
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>

              <SurpriseActionButtons 
                url={inviteUrl}
                showCopy={false}
                shareClasses="text-lg font-bold"
                extraAction={
                  <Button variant="outline" size="lg" className="flex gap-2 justify-center items-center border-foreground/10" onClick={() => window.open(inviteUrl, '_blank')}>
                    <Send size={18} />
                    {t('common.tryItNow')}
                  </Button>
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-auto">
        <Footer isDark={true} />
      </div>
    </div>
  );
};

export default CreateInvitationPage;
