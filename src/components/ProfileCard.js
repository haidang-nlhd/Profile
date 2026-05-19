import React, { useState, useMemo } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

// Safe Lucide Icon helper
function Icon({ name, size = 18, className = '' }) {
  const LucideIcon = Lucide[name] || Lucide.HelpCircle;
  return html`<${LucideIcon} size=${size} className=${className} />`;
}

/**
 * ProfileCard Component - Glassmorphism Card hiển thị thông tin Brand/Contact
 * Được đặt góc dưới trái hoặc trên trái màn hình
 */
export function ProfileCard({ profileData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { brand, contact, social } = profileData || {};

  if (!brand) return null;

  return html`
    <div 
      className="profile-card-container"
      style=${{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 100,
        maxWidth: '320px',
        animation: 'slideInLeft 0.8s ease-out forwards'
      }}
    >
      <!-- Glass Morphism Card -->
      <div className="profile-card glass-panel">
        <!-- Header: Avatar + Brand Name -->
        <div className="profile-card-header">
          <div className="profile-avatar">
            <img 
              src=${brand.avatar} 
              alt=${brand.name}
              style=${{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '2px solid var(--primary-glow)',
                objectFit: 'cover',
                boxShadow: '0 0 20px rgba(0, 243, 255, 0.4)'
              }}
            />
          </div>
          
          <div className="profile-info">
            <h2 className="profile-name">${brand.name}</h2>
            <p className="profile-slogan">${brand.slogan}</p>
          </div>

          <!-- Expand/Collapse Button -->
          <button
            className="profile-expand-btn"
            onClick=${() => setIsExpanded(!isExpanded)}
            title=${isExpanded ? "Thu gọn" : "Mở rộng"}
            style=${{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--primary-glow)',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            <${Icon} name=${isExpanded ? "ChevronUp" : "ChevronDown"} size=${20} />
          </button>
        </div>

        <!-- Description -->
        <p className="profile-description">${brand.description}</p>

        <!-- Contact Info - Expanded -->
        ${isExpanded && html`
          <div className="profile-contact-list" style=${{ marginTop: '1.2rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            
            <!-- Email -->
            <div className="contact-item" style=${{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <div style=${{ color: 'var(--primary-glow)', flexShrink: 0 }}>
                <${Icon} name="Mail" size=${16} />
              </div>
              <div style=${{ fontSize: '0.85rem' }}>
                <div style=${{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Email</div>
                <a href=${`mailto:${contact.email}`} style=${{ color: 'var(--primary-glow)', textDecoration: 'none' }}>
                  ${contact.email}
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div className="contact-item" style=${{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <div style=${{ color: 'var(--secondary-glow)', flexShrink: 0 }}>
                <${Icon} name="Phone" size=${16} />
              </div>
              <div style=${{ fontSize: '0.85rem' }}>
                <div style=${{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Số điện thoại</div>
                <a href=${`tel:${contact.phone}`} style=${{ color: 'var(--secondary-glow)', textDecoration: 'none' }}>
                  ${contact.phone}
                </a>
              </div>
            </div>

            <!-- Website -->
            <div className="contact-item" style=${{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
              <div style=${{ color: 'var(--accent-glow)', flexShrink: 0 }}>
                <${Icon} name="Globe" size=${16} />
              </div>
              <div style=${{ fontSize: '0.85rem' }}>
                <div style=${{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Website</div>
                <a 
                  href=${contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style=${{ color: 'var(--accent-glow)', textDecoration: 'none' }}
                >
                  Truy cập trang web
                </a>
              </div>
            </div>

            <!-- Facebook -->
            <div className="contact-item" style=${{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style=${{ color: '#1877F2', flexShrink: 0 }}>
                <${Icon} name="Facebook" size=${16} />
              </div>
              <div style=${{ fontSize: '0.85rem' }}>
                <div style=${{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Facebook</div>
                <a 
                  href=${contact.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style=${{ color: '#1877F2', textDecoration: 'none' }}
                >
                  Theo dõi
                </a>
              </div>
            </div>

            <!-- Social Links Buttons -->
            <div style=${{ display: 'flex', gap: '0.6rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <a 
                href=${contact.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-btn"
                title="Facebook"
              >
                <${Icon} name="Facebook" size=${16} />
              </a>
              <a 
                href=${`mailto:${contact.email}`}
                className="social-link-btn"
                title="Email"
              >
                <${Icon} name="Mail" size=${16} />
              </a>
              <a 
                href=${`tel:${contact.phone}`}
                className="social-link-btn"
                title="Gọi điện"
              >
                <${Icon} name="Phone" size=${16} />
              </a>
              <a 
                href=${contact.website} 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-btn"
                title="Website"
              >
                <${Icon} name="Globe" size=${16} />
              </a>
            </div>
          </div>
        `}
      </div>
    </div>
  `;
}

export default ProfileCard;
