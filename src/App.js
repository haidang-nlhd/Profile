import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';

// Components imports
import Ocean from './components/Ocean.js';
import Boat from './components/Boat.js';
import { FloatingIslands, HeroPanel, AboutPanel, SkillsPanel, ProjectsPanel, ExperiencePanel, ContactPanel } from './components/Islands.js';
import { Navbar, Controls, LoadingScreen } from './components/UI.js';

const html = htm.bind(React.createElement);

// Keyboard arrow navigation graph connecting the glowing islands
const NAVIGATION_MAP = {
  hero: { Up: 'about', Left: 'about', Right: 'skills', Down: 'about' },
  about: { Right: 'skills', Down: 'projects', Left: 'hero', Up: 'hero' },
  skills: { Left: 'about', Down: 'experience', Right: 'contact', Up: 'hero' },
  projects: { Up: 'about', Right: 'experience', Left: 'about', Down: 'experience' },
  experience: { Up: 'skills', Left: 'projects', Right: 'contact', Down: 'contact' },
  contact: { Left: 'experience', Up: 'skills', Down: 'experience' }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('night');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  
  // Track pressed states of arrow keys for the visual keyboard guide
  const [pressedKeys, setPressedKeys] = useState({ Up: false, Down: false, Left: false, Right: false });

  // Update theme data-attribute on body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track mouse coordinates for dynamic lighting follow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard navigation event listeners
  useEffect(() => {
    if (loading) return;

    const handleKeyDown = (e) => {
      let direction = '';
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        direction = 'Up';
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        direction = 'Down';
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        direction = 'Left';
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        direction = 'Right';
      }

      if (direction) {
        // Prevent default window scrolling when navigating con tàu
        e.preventDefault();
        
        // Light up keycap in legend visual
        setPressedKeys(prev => ({ ...prev, [direction]: true }));

        // Route boat sailing direction
        const nextSection = NAVIGATION_MAP[activeSection]?.[direction];
        if (nextSection) {
          setActiveSection(nextSection);
        }
      }
    };

    const handleKeyUp = (e) => {
      let direction = '';
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') direction = 'Up';
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') direction = 'Down';
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') direction = 'Left';
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') direction = 'Right';

      if (direction) {
        setPressedKeys(prev => ({ ...prev, [direction]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [loading, activeSection]);

  const renderActivePanel = () => {
    switch (activeSection) {
      case 'about':
        return html`<${AboutPanel} />`;
      case 'skills':
        return html`<${SkillsPanel} />`;
      case 'projects':
        return html`<${ProjectsPanel} />`;
      case 'experience':
        return html`<${ExperiencePanel} />`;
      case 'contact':
        return html`<${ContactPanel} />`;
      default:
        return null;
    }
  };

  if (loading) {
    return html`<${LoadingScreen} onComplete=${() => setLoading(false)} />`;
  }

  return html`
    <div className="app-container">
      <!-- Ambient light follow effect -->
      <div 
        className="mouse-glow" 
        style=${{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} 
      />

      <!-- Floating Controls Panel -->
      <${Controls} 
        theme=${theme} 
        toggleTheme=${() => setTheme(t => t === 'night' ? 'day' : 'night')} 
        isAudioPlaying=${isAudioPlaying}
        toggleAudio=${setIsAudioPlaying}
      />

      <!-- 3D Parallax Sky and Sea Floor -->
      <${Ocean} theme=${theme} activeSection=${activeSection} />

      <!-- Floating 3D Islands visual objects -->
      <${FloatingIslands} activeSection=${activeSection} onIslandClick=${setActiveSection} />

      <!-- The 3D Lonely Boat -->
      <${Boat} activeSection=${activeSection} />

      <!-- Fixed Navigation Bar -->
      <${Navbar} activeSection=${activeSection} onNavigate=${setActiveSection} />

      <!-- Keyboard control guide (Bottom Right) -->
      ${activeSection !== 'hero' && html`
        <div className="keyboard-guide">
          <div className="keyboard-title">Di chuyển bằng mũi tên</div>
          <div className="keyboard-keys">
            <div className="keyboard-keys-col" style=${{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
              <div className=${`key-cap ${pressedKeys.Up ? 'active' : ''}`}>▲</div>
              <div style=${{ display: 'flex', gap: '4px' }}>
                <div className=${`key-cap ${pressedKeys.Left ? 'active' : ''}`}>◀</div>
                <div className=${`key-cap ${pressedKeys.Down ? 'active' : ''}`}>▼</div>
                <div className=${`key-cap ${pressedKeys.Right ? 'active' : ''}`}>▶</div>
              </div>
            </div>
          </div>
        </div>
      `}

      <!-- Overlays Stage (Single active panel container) -->
      <div className="overlays-stage" style=${{ justifyContent: activeSection === 'hero' ? 'center' : 'flex-start' }}>
        ${activeSection === 'hero' 
          ? html`<${HeroPanel} onStart=${() => setActiveSection('about')} />`
          : renderActivePanel()
        }
      </div>
    </div>
  `;
}

// Bootstrap React Root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(html`<${App} />`);
}
