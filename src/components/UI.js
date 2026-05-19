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
export function Controls({ theme, toggleTheme, isAudioPlaying, toggleAudio, onOpenSettings }) {
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
      <!-- Settings Panel Toggler -->
      <button 
        className="control-btn" 
        onClick=${onOpenSettings} 
        title="Cấu hình game & hiệu ứng"
      >
        <${Icon} name="Settings" />
      </button>

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

// ----------------------------------------------------
// 4. GAME SETTINGS SLIDERS MODAL (NEW)
// ----------------------------------------------------
export function SettingsModal({ show, onClose, settings, onChange }) {
  if (!show) return null;

  return html`
    <div 
      className="glass-panel settings-panel-modal" 
      style=${{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        maxWidth: '430px',
        width: '90%',
        boxShadow: '0 0 50px rgba(0, 243, 255, 0.25)',
        border: '2px solid var(--primary-glow)'
      }}
    >
      <button className="btn-close-panel" onClick=${onClose} title="Đóng cài đặt">
        <${Icon} name="X" size={16} />
      </button>

      <h2 className="panel-title" style=${{ marginBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' }}>
        <${Icon} name="Sliders" /> <span>Cấu Hình Game</span>
      </h2>

      <div style=${{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        
        <!-- Slider 1: Wave pan speed -->
        <div className="form-group">
          <div style=${{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label className="form-label">Tốc độ sóng biển</label>
            <span style=${{ fontSize: '0.85rem', color: 'var(--primary-glow)', fontWeight: 'bold' }}>${settings.waveIntensity}x</span>
          </div>
          <input 
            type="range" 
            min="0.3" 
            max="2.5" 
            step="0.1" 
            value=${settings.waveIntensity} 
            onChange=${(e) => onChange('waveIntensity', parseFloat(e.target.value))} 
            style=${{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary-glow)' }}
          />
        </div>

        <!-- Slider 2: Boat bobbing rate -->
        <div className="form-group">
          <div style=${{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label className="form-label">Thuyền nhấp nhô (Tần số)</label>
            <span style=${{ fontSize: '0.85rem', color: 'var(--primary-glow)', fontWeight: 'bold' }}>${settings.boatBobbing}x</span>
          </div>
          <input 
            type="range" 
            min="0.3" 
            max="2.5" 
            step="0.1" 
            value=${settings.boatBobbing} 
            onChange=${(e) => onChange('boatBobbing', parseFloat(e.target.value))} 
            style=${{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary-glow)' }}
          />
        </div>

        <!-- Slider 3: 3D perspective angle -->
        <div className="form-group">
          <div style=${{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label className="form-label">Góc nghiêng 3D đại dương</label>
            <span style=${{ fontSize: '0.85rem', color: 'var(--primary-glow)', fontWeight: 'bold' }}>${settings.oceanTilt}°</span>
          </div>
          <input 
            type="range" 
            min="45" 
            max="76" 
            step="1" 
            value=${settings.oceanTilt} 
            onChange=${(e) => onChange('oceanTilt', parseInt(e.target.value))} 
            style=${{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary-glow)' }}
          />
        </div>

        <!-- Slider 4: Plankton density -->
        <div className="form-group">
          <div style=${{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label className="form-label">Mật độ đom đóm biển</label>
            <span style=${{ fontSize: '0.85rem', color: 'var(--primary-glow)', fontWeight: 'bold' }}>${settings.planktonCount} hạt</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="60" 
            step="5" 
            value=${settings.planktonCount} 
            onChange=${(e) => onChange('planktonCount', parseInt(e.target.value))} 
            style=${{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary-glow)' }}
          />
        </div>

      </div>

      <button className="btn-back-boat" onClick=${onClose} style=${{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
        <${Icon} name="Check" size={14} /> Áp dụng & Quay lại hành trình
      </button>
    </div>
  `;
}
