import React, { useState, useEffect, useRef } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

// Safe Lucide Icon helper
function Icon({ name, size = 18, className = '' }) {
  const LucideIcon = Lucide[name] || Lucide.HelpCircle;
  return html`<${LucideIcon} size=${size} className=${className} />`;
}

// ----------------------------------------------------
// 1. NAVIGATION BAR (VIETNAMESE)
// ----------------------------------------------------
export function Navbar({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'hero', label: 'Hải Trình' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'skills', label: 'Kỹ Năng' },
    { id: 'projects', label: 'Dự Án' },
    { id: 'experience', label: 'Lộ Trình' },
    { id: 'contact', label: 'Liên Hệ' }
  ];

  return html`
    <nav className="navbar">
      ${navItems.map(item => html`
        <span 
          key=${item.id} 
          className=${`nav-link ${activeSection === item.id ? 'active' : ''}`}
          onClick=${() => onNavigate(item.id)}
        >
          ${item.label}
        </span>
      `)}
    </nav>
  `;
}

// ----------------------------------------------------
// 2. AMBIENT CONTROLS & WEB AUDIO SYNTHESIZER
// ----------------------------------------------------
export function Controls({ theme, toggleTheme, isAudioPlaying, toggleAudio }) {
  const audioContextRef = useRef(null);
  const synthNodesRef = useRef([]);

  const startWavesSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = 'lowpass';
      waveFilter.frequency.value = 350;
      waveFilter.Q.value = 1;

      const mainVolume = ctx.createGain();
      mainVolume.gain.value = 0.15;

      const waveLfo = ctx.createOscillator();
      waveLfo.type = 'sine';
      waveLfo.frequency.value = 0.08;

      const waveLfoGain = ctx.createGain();
      waveLfoGain.gain.value = 250;

      waveLfo.connect(waveLfoGain);
      waveLfoGain.connect(waveFilter.frequency);

      noiseSource.connect(waveFilter);
      waveFilter.connect(mainVolume);
      mainVolume.connect(ctx.destination);

      noiseSource.start(0);
      waveLfo.start(0);

      synthNodesRef.current = [noiseSource, waveFilter, waveLfo, waveLfoGain, mainVolume];
      
    } catch (err) {
      console.warn("Web Audio Synth error: ", err);
    }
  };

  const stopWavesSynth = () => {
    synthNodesRef.current.forEach(node => {
      try { node.stop(); } catch (e) {}
      try { node.disconnect(); } catch (e) {}
    });
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    synthNodesRef.current = [];
    audioContextRef.current = null;
  };

  const handleAudioToggle = () => {
    if (isAudioPlaying) {
      stopWavesSynth();
      toggleAudio(false);
    } else {
      startWavesSynth();
      toggleAudio(true);
    }
  };

  useEffect(() => {
    return () => stopWavesSynth();
  }, []);

  return html`
    <div className="controls-container">
      <!-- Mute/Unmute waves synth -->
      <button 
        className="control-btn" 
        onClick=${handleAudioToggle} 
        title=${isAudioPlaying ? 'Tắt tiếng sóng biển' : 'Bật tiếng sóng biển'}
      >
        <${Icon} name=${isAudioPlaying ? 'Volume2' : 'VolumeX'} />
      </button>

      <!-- Day/Night Toggler -->
      <button 
        className="control-btn" 
        onClick=${toggleTheme} 
        title=${theme === 'night' ? 'Chuyển sang Hoàng hôn' : 'Chuyển sang Trăng lên'}
      >
        <${Icon} name=${theme === 'night' ? 'Sun' : 'Moon'} />
      </button>
    </div>
  `;
}

// ----------------------------------------------------
// 3. CINEMATIC LOADING SCREEN
// ----------------------------------------------------
export function LoadingScreen({ onComplete }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const duration = 3200;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextPercent = Math.min(Math.round((currentStep / steps) * 100), 100);
      setPercent(nextPercent);

      if (nextPercent >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return html`
    <div className="loading-screen">
      <div className="loading-boat">
        <svg 
          className="loading-boat-svg" 
          viewBox="0 0 160 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="80" y1="20" x2="80" y2="85" stroke="#fff" strokeWidth="2.5" />
          <path d="M80,25 C80,25 35,50 35,75 C55,80 80,75 80,75 Z" fill="rgba(255, 255, 255, 0.4)" />
          <path d="M83,22 C83,22 120,45 115,72 C98,75 83,72 83,72 Z" fill="rgba(255, 255, 255, 0.7)" />
          <path d="M25,75 L135,75 C135,75 145,78 150,88 C140,100 20,100 10,88 C15,78 25,75 25,75 Z" fill="#2d3748" />
        </svg>
      </div>

      <div className="loading-bar-bg">
        <div className="loading-bar-fill" style=${{ width: `${percent}%` }} />
      </div>

      <div className="loading-text">Đang Chuẩn Bị Khởi Hành ${percent}%</div>
    </div>
  `;
}
