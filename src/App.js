import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';

// Components imports
import Ocean from './components/Ocean.js';
import Boat from './components/Boat.js';
import { FloatingIslands, HeroPanel, AboutPanel, SkillsPanel, ProjectsPanel, ExperiencePanel, ContactPanel } from './components/Islands.js';
import { Navbar, Controls, LoadingScreen, SettingsModal } from './components/UI.js';

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

// Boat / Interact Bubble coordinates on the tilted 3D sea floor plane
const BOAT_COORDINATES = {
  hero: { left: '50%', top: '22%' },
  about: { left: '26%', top: '48%' },
  skills: { left: '72%', top: '44%' },
  projects: { left: '30%', top: '82%' },
  experience: { left: '66%', top: '78%' },
  contact: { left: '81%', top: '52%' }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  
  // Game-state: Only show the detailed panels when explicitly exploring/docking!
  const [showPanel, setShowPanel] = useState(false);

  // Settings Configuration State (Tuning parameters for the game/effects!)
  const [settings, setSettings] = useState({
    waveIntensity: 1.0,  // Wave panning velocity (0.3 to 2.5)
    boatBobbing: 1.0,    // Boat bobbing wave frequency multiplier (0.3 to 2.5)
    oceanTilt: 62,       // Tilted 3D plane rotateX angle (45 to 76 deg)
    planktonCount: 30    // Bioluminescent plankton quantity (5 to 60)
  });
  const [showSettings, setShowSettings] = useState(false);
  
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

  // Keyboard navigation & game controls event listeners
  useEffect(() => {
    if (loading) return;

    const handleKeyDown = (e) => {
      // 1. Enter/Space to explore/dock at an island (exactly like an RPG game!)
      if ((e.key === ' ' || e.key === 'Enter') && activeSection !== 'hero' && !showPanel && !showSettings) {
        e.preventDefault();
        setShowPanel(true);
        return;
      }

      // 2. Escape to close panels and settings modal
      if (e.key === 'Escape') {
        if (showSettings) {
          setShowSettings(false);
          return;
        }
        if (showPanel) {
          setShowPanel(false);
          return;
        }
      }

      // 3. Arrow key steering (only arrow keys allowed)
      let direction = '';
      if (e.key === 'ArrowUp') {
        direction = 'Up';
      } else if (e.key === 'ArrowDown') {
        direction = 'Down';
      } else if (e.key === 'ArrowLeft') {
        direction = 'Left';
      } else if (e.key === 'ArrowRight') {
        direction = 'Right';
      }

      if (direction) {
        e.preventDefault();
        
        // Light up keycap in legend visual
        setPressedKeys(prev => ({ ...prev, [direction]: true }));

        // Sail away -> Close any open panel automatically!
        setShowPanel(false);
        setShowSettings(false);

        // Route boat sailing direction
        const nextSection = NAVIGATION_MAP[activeSection]?.[direction];
        if (nextSection) {
          setActiveSection(nextSection);
        }
      }
    };

    const handleKeyUp = (e) => {
      let direction = '';
      if (e.key === 'ArrowUp') {
        direction = 'Up';
      } else if (e.key === 'ArrowDown') {
        direction = 'Down';
      } else if (e.key === 'ArrowLeft') {
        direction = 'Left';
      } else if (e.key === 'ArrowRight') {
        direction = 'Right';
      }

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
  }, [loading, activeSection, showPanel, showSettings]);

  // Handle clicking on an Island (direct sailing or exploring)
  const handleIslandClick = (id) => {
    if (activeSection === id) {
      // Boat is already there -> Toggle explore information panel!
      setShowPanel(prev => !prev);
    } else {
      // Boat sails to that island -> Keep panel closed until clicked again/Space is pressed
      setActiveSection(id);
      setShowPanel(false);
      setShowSettings(false);
    }
  };

  // Handle Navbar navigation links
  const handleNavbarNavigate = (id) => {
    setActiveSection(id);
    setShowSettings(false);
    if (id === 'hero') {
      setShowPanel(true); // Hero intro is shown immediately
    } else {
      setShowPanel(false); // Sails there first, closes other panels
    }
  };

  const renderActivePanel = () => {
    const closeHandler = () => setShowPanel(false);

    switch (activeSection) {
      case 'about':
        return html`<${AboutPanel} onClose=${closeHandler} />`;
      case 'skills':
        return html`<${SkillsPanel} onClose=${closeHandler} />`;
      case 'projects':
        return html`<${ProjectsPanel} onClose=${closeHandler} />`;
      case 'experience':
        return html`<${ExperiencePanel} onClose=${closeHandler} />`;
      case 'contact':
        return html`<${ContactPanel} onClose=${closeHandler} />`;
      default:
        return null;
    }
  };

  // Get active coordinates of the boat for positioning the floating interact bubble
  const activeBubbleCoords = useMemo(() => {
    return BOAT_COORDINATES[activeSection] || BOAT_COORDINATES.hero;
  }, [activeSection]);

  if (loading) {
    return html`<${LoadingScreen} onComplete=${() => setLoading(false)} />`;
  }

  return html`
    <div 
      className="app-container"
      style=${{
        '--wave-intensity': settings.waveIntensity,
        '--boat-bobbing': settings.boatBobbing,
        '--ocean-tilt': `${settings.oceanTilt}deg`,
        '--ocean-tilt-inverse': `${-settings.oceanTilt}deg`
      }}
    >
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
        onOpenSettings=${() => setShowSettings(true)}
      />

      <!-- 3D Parallax Sky and Sea Floor -->
      <${Ocean} theme=${theme} activeSection=${activeSection} settings=${settings} />

      <!-- Floating 3D Islands visual objects -->
      <${FloatingIslands} activeSection=${activeSection} onIslandClick=${handleIslandClick} />

      <!-- The 3D Lonely Boat -->
      <${Boat} activeSection=${activeSection} />

      <!-- Fixed Navigation Bar -->
      <${Navbar} activeSection=${activeSection} onNavigate=${handleNavbarNavigate} />

      <!-- Keyboard steering guide (Bottom Right) -->
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

      <!-- Overlays Stage (Detailed information card display - centered) -->
      <div className="overlays-stage" style=${{ justifyContent: 'center', alignItems: 'center' }}>
        ${activeSection === 'hero' 
          ? html`<${HeroPanel} onStart=${() => handleNavbarNavigate('about')} />`
          : showPanel && renderActivePanel()
        }
      </div>

      <!-- Settings Configurations Modal -->
      <${SettingsModal} 
        show=${showSettings} 
        onClose=${() => setShowSettings(false)} 
        settings=${settings} 
        onChange=${(key, val) => setSettings(prev => ({ ...prev, [key]: val }))} 
      />

      <!-- RPG Gamified quest-interact floating bubble above the boat -->
      ${activeSection !== 'hero' && !showPanel && !showSettings && html`
        <div 
          className="interact-bubble" 
          onClick=${() => setShowPanel(true)}
          style=${{
            left: activeBubbleCoords.left,
            top: activeBubbleCoords.top,
            transition: 'all 2.2s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          ⚓ Click hoặc Space để Cập cảng
        </div>
      `}
    </div>
  `;
}

// Bootstrap React Root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(html`<${App} />`);
}
