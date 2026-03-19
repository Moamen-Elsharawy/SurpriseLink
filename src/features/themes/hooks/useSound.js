import { useEffect, useRef } from 'react';
import { Howl } from 'howler';

export const useSound = (src, options = {}) => {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      ...options,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [src]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.mute(options.mute);
    }
  }, [options.mute]);

  const play = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const stop = () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  return { play, stop, sound: soundRef.current };
};
