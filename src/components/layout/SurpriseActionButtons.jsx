import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { copyToClipboard } from '../../lib/utils';
import { cn } from '../../lib/utils';

const SurpriseActionButtons = ({ 
  shareClasses = "", 
  copyClasses = "", 
  createOwnClasses = "",
  containerClasses = "",
  url = window.location.href,
  extraAction = null,
  showCopy = true
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const text = `${t('create.success')} ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCreateOwn = () => {
    window.location.href = '/';
  };

  return (
    <div className={cn("pt-6 md:pt-10 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr", containerClasses)}>
      <Button 
        className={cn(
          "col-span-1 md:col-span-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white border-none h-14 shadow-lg shadow-green-500/20",
          shareClasses
        )} 
        onClick={handleShare}
      >
        <WhatsAppIcon size={22} />
        {t('common.share')}
      </Button>

      {showCopy && (
        <Button 
          variant="outline" 
          className={cn("flex items-center justify-center gap-2 h-14 transition-all duration-300", copyClasses, copied && "border-green-500 text-green-500 bg-green-500/5")} 
          onClick={handleCopy}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? t('common.copied') || 'Copied!' : t('common.copy')}
        </Button>
      )}

      <Button 
        variant="secondary" 
        className={cn("flex items-center justify-center gap-2 h-14", createOwnClasses)} 
        onClick={handleCreateOwn}
      >
        <Sparkles size={18} />
        {t('common.createOwn')}
      </Button>

      {extraAction && React.cloneElement(extraAction, { 
        className: cn(extraAction.props.className, "h-14") 
      })}
    </div>
  );
};

export default SurpriseActionButtons;
