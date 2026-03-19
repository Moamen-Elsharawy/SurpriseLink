import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundContext } from '../../hooks/useSoundContext';

const MuteToggle = () => {
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <button
      onClick={toggleMute}
      className="p-3 rounded-full glass hover:bg-white/10 transition-all duration-300"
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
};

export default MuteToggle;
