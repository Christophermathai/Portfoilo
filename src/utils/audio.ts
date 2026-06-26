class AudioSynth {
  context: AudioContext | null = null;
  masterGain: GainNode | null = null;
  private initialized = false;
  private hoverAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.hoverAudio = new Audio('/hover.mp3');
      this.hoverAudio.volume = 0.6;
      // Preload the audio
      this.hoverAudio.load();
    }
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.context) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.context = new AudioContextClass();
        this.masterGain = this.context.createGain();
        this.masterGain.connect(this.context.destination);
        this.masterGain.gain.value = 1; // Master volume
        this.initialized = true;
      } catch (e) {
        console.warn('Web Audio API not supported', e);
      }
    }
    if (this.context && this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  playClick() {
    if (!this.initialized || !this.context || !this.masterGain) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.context.currentTime + 0.05);

    gain.gain.setValueAtTime(1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.05);
  }

  playHover() {
    if (this.hoverAudio) {
      this.hoverAudio.currentTime = 0;
      this.hoverAudio.play().catch(e => {
        // Fallback to synthesized sound if browser blocks autoplay before interaction
        this.playHoverFallback();
      });
    } else {
      this.playHoverFallback();
    }
  }

  private playHoverFallback() {
    if (!this.initialized || !this.context || !this.masterGain) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.context.currentTime);
    
    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.05);
  }

  playScrollTick() {
    if (!this.initialized || !this.context || !this.masterGain) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.context.currentTime);

    gain.gain.setValueAtTime(0.03, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.02);
  }

  playMenuOpen() {
    if (!this.initialized || !this.context || !this.masterGain) return;
    const now = this.context.currentTime;

    // Play a staggered chord / sweep
    const frequencies = [300, 450, 600, 900];
    frequencies.forEach((freq, i) => {
      const osc = this.context!.createOscillator();
      const gain = this.context!.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = now + i * 0.06;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  playLoading() {
    if (!this.initialized || !this.context || !this.masterGain) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.context.currentTime);
    osc.frequency.linearRampToValueAtTime(800, this.context.currentTime + 0.5);

    gain.gain.setValueAtTime(0, this.context.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.context.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.context.currentTime);
    osc.stop(this.context.currentTime + 0.8);
  }
}

export const audioSynth = new AudioSynth();
