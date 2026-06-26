'use client';

import React, { useEffect, useRef } from 'react';
import { audioSynth } from '../utils/audio';

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  const scrollPos = useRef(0);
  const loaded = useRef(false);

  useEffect(() => {
    // Initialize audio on first user interaction to bypass autoplay restrictions
    const handleFirstInteraction = () => {
      audioSynth.init();
      if (!loaded.current) {
        audioSynth.playLoading();
        loaded.current = true;
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // Scroll sound listener
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      // Make sure it's initialized first
      if (audioSynth.context && audioSynth.context.state !== 'suspended') {
        const currentScrollPos = window.scrollY;
        const scrollDiff = Math.abs(currentScrollPos - scrollPos.current);
        
        // Play a tick every 150px scrolled
        if (scrollDiff > 150) {
          audioSynth.playScrollTick();
          scrollPos.current = currentScrollPos;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
}
