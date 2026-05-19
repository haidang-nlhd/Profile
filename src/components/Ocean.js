import React, { useMemo } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export default function Ocean({ theme, activeSection }) {
  // Generate random static stars for the sky
  const stars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 85}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.7 + 0.3,
      duration: `${Math.random() * 4 + 3}s`
    }));
  }, []);

  // Generate random drifting clouds
  const clouds = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      top: `${5 + i * 10}%`,
      left: `${-20 - Math.random() * 40}%`,
      width: `${Math.random() * 140 + 130}px`,
      height: `${Math.random() * 25 + 15}px`,
      speed: `${140 + Math.random() * 100}s`,
      delay: `${-Math.random() * 120}s`
    }));
  }, []);

  // Generate bioluminescent plankton rises in 3D Space
  const planktonList = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 90 + 5}%`,
      opacity: Math.random() * 0.5 + 0.3,
      drift: `${Math.random() * 100 - 50}px`,
      speed: `${Math.random() * 9 + 6}s`,
      delay: `${Math.random() * -10}s`
    }));
  }, []);

  // Horizontal parallax panning based on active section
  const parallaxOffset = useMemo(() => {
    const offsets = {
      hero: 0,
      about: 20,
      skills: -20,
      projects: 30,
      experience: -10,
      contact: -30
    };
    return offsets[activeSection] || 0;
  }, [activeSection]);

  return html`
    <div className="environment-3d">
      <!-- Sky Area (Flat Background) -->
      <div className="sky-3d">
        <!-- Celestial Body (Sun/Moon) -->
        <div className=${`celestial ${theme === 'night' ? 'moon' : 'sun'}`} />
        
        <!-- Twinkling Stars (Night Mode Only) -->
        <div className="stars-container" style=${{ opacity: theme === 'night' ? 1 : 0.05, transition: 'opacity 2s' }}>
          ${stars.map(star => html`
            <div 
              key=${star.id} 
              className="star" 
              style=${{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                '--opacity': star.opacity,
                '--duration': star.duration
              }} 
            />
          `)}
        </div>

        <!-- Drifting Clouds -->
        <div className="clouds-container">
          ${clouds.map(cloud => html`
            <div 
              key=${cloud.id} 
              className="cloud" 
              style=${{
                top: cloud.top,
                left: cloud.left,
                width: cloud.width,
                height: cloud.height,
                '--speed': cloud.speed,
                animationDelay: cloud.delay
              }} 
            />
          `)}
        </div>
      </div>

      <!-- Tilted 3D Sea floor -->
      <div 
        className="sea-3d"
        style=${{
          transform: `rotateX(62deg) translateX(${parallaxOffset * 0.3}px)`,
          transition: 'all 2.2s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <!-- Lunar/Solar Reflection on Sea -->
        <div className="reflection-glow-3d" />

        <!-- 3D Wave Textures -->
        <div className="wave-layer-3d back" />
        <div className="wave-layer-3d front" />

        <!-- Bioluminescent Plankton (Night Mode Only) -->
        <div style=${{ opacity: theme === 'night' ? 0.9 : 0.05, transition: 'opacity 2s' }}>
          ${planktonList.map(plankton => html`
            <div 
              key=${plankton.id} 
              className="plankton" 
              style=${{
                left: plankton.left,
                top: plankton.top,
                '--opacity': plankton.opacity,
                '--drift': plankton.drift,
                '--speed': plankton.speed,
                animationDelay: plankton.delay
              }} 
            />
          `)}
        </div>
      </div>
    </div>
  `;
}
