'use client';

// Web Audio API synthesizer for zero-asset, tactile sound effects
let audioCtx: AudioContext | null = null;
let lastHoverTime = 0;
let lastKeyTime = 0;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  } catch {
    return null;
  }
  return audioCtx;
}

// Global user interaction listener to wake up AudioContext on modern browsers
if (typeof window !== 'undefined') {
  const wakeAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  };
  window.addEventListener('pointerdown', wakeAudio, { passive: true });
  window.addEventListener('keydown', wakeAudio, { passive: true });
}

export const soundManager = {
  isEnabled: true,
  listeners: new Set<(enabled: boolean) => void>(),

  init() {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('cm_sound_enabled');
    // Default to true if not set, or preserve user choice
    this.isEnabled = stored !== null ? stored === 'true' : true;
    this.notify();
  },

  toggle(): boolean {
    this.isEnabled = !this.isEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cm_sound_enabled', String(this.isEnabled));
    }
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    this.playToggle(this.isEnabled);
    this.notify();
    return this.isEnabled;
  },

  subscribe(listener: (enabled: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isEnabled);
    return () => {
      this.listeners.delete(listener);
    };
  },

  notify() {
    this.listeners.forEach((fn) => fn(this.isEnabled));
  },

  /**
   * Crisp, tactile mechanical click (transient snap + resonant body)
   */
  playClick() {
    if (!this.isEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      // Layer 1: High transient snap (mechanical switch)
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(1250, t);
      snapOsc.frequency.exponentialRampToValueAtTime(260, t + 0.05);

      snapGain.gain.setValueAtTime(0.28, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(t);
      snapOsc.stop(t + 0.05);

      // Layer 2: Low tactile body thump
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();
      bodyOsc.type = 'sine';
      bodyOsc.frequency.setValueAtTime(220, t);
      bodyOsc.frequency.exponentialRampToValueAtTime(65, t + 0.06);

      bodyGain.gain.setValueAtTime(0.22, t);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(ctx.destination);
      bodyOsc.start(t);
      bodyOsc.stop(t + 0.06);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Crisp tactile hover tick with micro-throttle
   */
  playHover() {
    if (!this.isEnabled) return;
    const now = Date.now();
    if (now - lastHoverTime < 35) return; // Prevent jarring flutter on rapid mouse movement
    lastHoverTime = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, t);
      osc.frequency.exponentialRampToValueAtTime(920, t + 0.04);

      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Subtle resonant swell when entering major cards (Projects, Awards)
   */
  playCardHover() {
    if (!this.isEnabled) return;
    const now = Date.now();
    if (now - lastHoverTime < 60) return;
    lastHoverTime = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.07);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Soft typewriter tick when typing inside contact inputs
   */
  playKey() {
    if (!this.isEnabled) return;
    const now = Date.now();
    if (now - lastKeyTime < 28) return;
    lastKeyTime = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + 0.03);

      gain.gain.setValueAtTime(0.13, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.03);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Soft input focus blip
   */
  playFocus() {
    if (!this.isEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(460, t);
      osc.frequency.exponentialRampToValueAtTime(680, t + 0.045);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.045);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Ascending bell chord for transmission confirmation & clipboard copy
   */
  playSuccess() {
    if (!this.isEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const playTone = (freq: number, offset: number, duration: number, gainVol: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + offset);

        gain.gain.setValueAtTime(gainVol, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + offset + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + offset);
        osc.stop(t + offset + duration);
      };

      playTone(523.25, 0.00, 0.24, 0.24); // C5
      playTone(659.25, 0.07, 0.28, 0.24); // E5
      playTone(783.99, 0.14, 0.38, 0.28); // G5
      playTone(1046.5, 0.21, 0.48, 0.22); // C6
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Clean dual-pitch toggle indicator
   */
  playToggle(on: boolean) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const startFreq = on ? 440 : 780;
      const endFreq = on ? 880 : 390;

      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.065);

      gain.gain.setValueAtTime(0.24, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.065);
    } catch {
      // AudioContext unavailable
    }
  },

  /**
   * Modal sweep
   */
  playModal(open: boolean) {
    if (!this.isEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(open ? 260 : 540, t);
      osc.frequency.exponentialRampToValueAtTime(open ? 540 : 260, t + 0.07);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    } catch {
      // AudioContext unavailable
    }
  }
};
