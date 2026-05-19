import React, { useMemo } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export default function Boat({ activeSection }) {
  // Navigation coordinates on the tilted 3D sea floor plane
  // Note: Perspective automatically scale sizes (deeper elements at top are smaller!)
  const boatPositionStyle = useMemo(() => {
    const coords = {
      hero: { left: '50%', top: '22%', rotate: 0 },
      about: { left: '26%', top: '48%', rotate: -15 },
      skills: { left: '72%', top: '44%', rotate: 15 },
      projects: { left: '30%', top: '82%', rotate: -25 },
      experience: { left: '66%', top: '78%', rotate: 20 },
      contact: { left: '81%', top: '52%', rotate: 30 }
    };
    
    const active = coords[activeSection] || coords.hero;
    
    return {
      left: active.left,
      top: active.top,
      transform: `translateX(-50%) translateY(-50%) rotate(${active.rotate}deg)`,
      transition: 'all 2.2s cubic-bezier(0.25, 1, 0.5, 1)'
    };
  }, [activeSection]);

  return html`
    <div className="boat-container-3d" style=${boatPositionStyle}>
      <!-- Standing Billboard counter-rotation (rotateX -62deg) -->
      <div className="boat-billboard" style=${{ transform: 'rotateX(var(--ocean-tilt-inverse, -62deg)) translateY(-40%)' }}>
        <div className="boat-body">
          <svg 
            className="boat-svg" 
            viewBox="0 0 160 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Mast -->
            <line x1="80" y1="20" x2="80" y2="85" stroke="#4A3B32" strokeWidth="3" strokeLinecap="round" />
            
            <!-- Back Sail -->
            <path 
              d="M80,25 C80,25 35,50 35,75 C55,80 80,75 80,75 Z" 
              fill="rgba(255, 255, 255, 0.75)" 
              style=${{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }} 
            />
            
            <!-- Front Sail -->
            <path 
              d="M83,22 C83,22 120,45 115,72 C98,75 83,72 83,72 Z" 
              fill="rgba(255, 255, 255, 0.85)" 
              style=${{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }}
            />

            <!-- Flag -->
            <path d="M80,20 L95,25 L80,30 Z" fill="#ff5252" />

            <!-- Boat Hull -->
            <path 
              d="M25,75 L135,75 C135,75 145,78 150,88 C140,100 20,100 10,88 C15,78 25,75 25,75 Z" 
              fill="#5C4033" 
            />
            <!-- Inside lining -->
            <path 
              d="M22,78 L138,78 C138,78 142,80 144,84 C134,94 26,94 16,84 C18,80 22,78 22,78 Z" 
              fill="#3D2B1F" 
            />

            <!-- Lantern at Stern -->
            <line x1="25" y1="76" x2="18" y2="70" stroke="#ffd700" strokeWidth="1.5" />
            <g>
              <circle cx="18" cy="70" r="5" fill="#ffa500" style=${{ filter: 'drop-shadow(0 0 8px #ffaa00)' }} />
              <circle cx="18" cy="70" r="2.5" fill="#ffffff" />
            </g>
            
            <!-- Waves splashes -->
            <path 
              d="M8,90 C25,86 45,95 80,90 C115,86 135,93 152,90 C135,97 115,93 80,95 C45,97 25,88 8,90 Z" 
              fill="rgba(255, 255, 255, 0.4)" 
            />
          </svg>
        </div>
        
        <!-- Water reflection shadow -->
        <div className="boat-reflection" />
      </div>
    </div>
  `;
}
