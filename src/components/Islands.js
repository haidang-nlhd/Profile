import React, { useState } from 'react';
import htm from 'htm';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

// Safe Lucide Icon helper
function Icon({ name, size = 20, className = '' }) {
  const LucideIcon = Lucide[name] || Lucide.HelpCircle;
  return html`<${LucideIcon} size=${size} className=${className} />`;
}

// ----------------------------------------------------
// 1. BACKGROUND FLOATING ISLANDS VISUALS (3D Sea coordinates)
// ----------------------------------------------------
export function FloatingIslands({ activeSection, onIslandClick }) {
  // Placement coordinates inside the 3D Sea Floor (rotateX tilted container)
  const islandsConfig = [
    {
      id: 'about',
      name: 'Đảo Giới Thiệu',
      left: '18%',
      top: '45%',
      floatDuration: '5s',
      glow: 'rgba(0, 243, 255, 0.5)',
      svg: html`
        <svg width="100" height="70" viewBox="0 0 100 70" fill="none">
          <path d="M10,45 C10,45 25,38 50,38 C75,38 90,45 90,45 C90,45 80,60 50,60 C20,60 10,45 10,45 Z" fill="var(--island-color)" />
          <path d="M12,44 C25,39 45,37 50,37 C55,37 75,39 88,44 C82,49 50,52 12,44 Z" fill="#00a896" />
          <path d="M50,37 Q46,25 44,18 Q50,22 52,18" stroke="#3d2b1f" strokeWidth="3" />
          <circle cx="42" cy="15" r="8" fill="var(--primary-glow)" opacity="0.8" />
          <circle cx="53" cy="14" r="10" fill="var(--secondary-glow)" opacity="0.75" />
          <circle cx="48" cy="8" r="6" fill="#00f3ff" opacity="0.9" />
        </svg>
      `
    },
    {
      id: 'skills',
      name: 'Lò Rèn Kỹ Năng',
      left: '75%',
      top: '40%',
      floatDuration: '6.5s',
      glow: 'rgba(189, 0, 255, 0.4)',
      svg: html`
        <svg width="110" height="80" viewBox="0 0 110 80" fill="none">
          <path d="M15,50 C15,50 30,42 55,42 C80,42 95,50 95,50 C95,50 85,65 55,65 C25,65 15,50 15,50 Z" fill="var(--island-color)" />
          <path d="M18,49 C30,44 50,42 55,42 C60,42 80,44 92,49 C85,54 55,56 18,49 Z" fill="#1d1e2c" />
          <polygon points="50,15 62,32 50,38 38,32" fill="var(--secondary-glow)" opacity="0.85" />
          <polygon points="50,8 55,20 50,24 45,20" fill="var(--primary-glow)" opacity="0.9" />
          <ellipse cx="50" cy="30" rx="20" ry="6" stroke="var(--primary-glow)" strokeWidth="1" strokeDasharray="3,3" />
        </svg>
      `
    },
    {
      id: 'projects',
      name: 'Đảo Dự Án',
      left: '20%',
      top: '78%',
      floatDuration: '5.8s',
      glow: 'rgba(0, 243, 255, 0.45)',
      svg: html`
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <path d="M10,50 C10,50 30,42 60,42 C90,42 110,50 110,50 C110,50 95,67 60,67 C25,67 10,50 10,50 Z" fill="var(--island-color)" />
          <path d="M13,49 C30,43 55,41 60,41 C65,41 90,43 107,49 C95,55 60,58 13,49 Z" fill="#142c42" />
          <polygon points="40,25 46,40 34,40" fill="var(--primary-glow)" opacity="0.75" />
          <polygon points="60,15 68,38 52,38" fill="var(--primary-glow)" opacity="0.9" />
          <polygon points="80,28 86,41 74,41" fill="var(--secondary-glow)" opacity="0.7" />
        </svg>
      `
    },
    {
      id: 'experience',
      name: 'Đảo Kinh Nghiệm',
      left: '70%',
      top: '75%',
      floatDuration: '7s',
      glow: 'rgba(57, 255, 20, 0.35)',
      svg: html`
        <svg width="130" height="90" viewBox="0 0 130 90" fill="none">
          <path d="M10,60 C10,60 30,50 65,50 C100,50 120,60 120,60 C120,60 105,78 65,78 C25,78 10,60 10,60 Z" fill="var(--island-color)" />
          <path d="M30,48 C30,48 45,40 65,40 C85,40 100,48 100,48 L90,56 L40,56 Z" fill="#2d4234" />
          <rect x="45" y="32" width="4" height="18" fill="#555" />
          <polygon points="49,32 58,36 49,40" fill="var(--accent-glow)" />
          <rect x="75" y="22" width="4" height="28" fill="#555" />
          <polygon points="79,22 90,27 79,32" fill="var(--primary-glow)" />
        </svg>
      `
    },
    {
      id: 'contact',
      name: 'Hải Đăng Liên Hệ',
      left: '84%',
      top: '48%',
      floatDuration: '8s',
      glow: 'rgba(0, 243, 255, 0.6)',
      svg: html`
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <path d="M20,80 L80,80 C80,80 90,83 90,95 C75,108 25,108 10,95 C10,83 20,80 20,80 Z" fill="#1b2430" />
          <rect x="44" y="45" width="12" height="35" fill="#f0f7ff" stroke="#333" strokeWidth="1" />
          <rect x="44" y="55" width="12" height="8" fill="#ff5252" />
          <rect x="42" y="38" width="16" height="7" fill="#333" />
          <rect x="46" y="32" width="8" height="6" fill="#fff" opacity="0.8" style=${{ filter: 'drop-shadow(0 0 5px #fff)' }} />
          <path d="M44,32 C44,32 44,26 50,26 C56,26 56,32 56,32 Z" fill="#333" />
        </svg>
      `
    }
  ];

  return html`
    <div className="islands-stage">
      ${islandsConfig.map(island => {
        const isActive = activeSection === island.id;
        return html`
          <!-- Floating container in 3D Sea coordinates -->
          <div 
            key=${island.id} 
            className=${`island-container-3d ${isActive ? 'active' : ''}`}
            onClick=${() => onIslandClick(island.id)}
            style=${{
              left: island.left,
              top: island.top,
              opacity: activeSection === 'hero' ? 0.8 : isActive ? 1 : 0.45,
              transform: `scale(${isActive ? 1.2 : 0.95})`,
              '--island-glow': isActive ? island.glow : 'rgba(0, 243, 255, 0.1)'
            }}
          >
            <!-- standing Billboard counter-rotation (rotateX -62deg) -->
            <div className="island-billboard" style=${{ transform: 'rotateX(var(--ocean-tilt-inverse, -62deg)) translateY(-50%)' }}>
              <div className="island-body" style=${{ '--float-duration': island.floatDuration }}>
                ${island.svg}
              </div>
              <div className="island-glow-pad" />
              <div className="island-label" style=${{ fontWeight: 'bold', fontSize: '0.82rem', borderWidth: '1.5px', background: 'rgba(7, 22, 38, 0.9)' }}>
                ${island.name}
              </div>
            </div>
          </div>
        `;
      })}
    </div>
  `;
}

// Helper: Contact links and CV preview section for About/Contact panels
function ContactLinks({ showCV, onToggleCV }) {
  return html`
    <div style=${{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
      <div style=${{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.8rem' }}>
        <a
          href="https://www.facebook.com/nguyen.dang2608?locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style=${{
            padding: '0.7rem 0.9rem',
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            textDecoration: 'none',
            borderColor: '#1877f2',
            justifyContent: 'center'
          }}
        >
          <${Icon} name="Facebook" size=${14} /> Facebook
        </a>

        <a
          href="https://github.com/haidang-nlhd"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style=${{
            padding: '0.7rem 0.9rem',
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            textDecoration: 'none',
            borderColor: '#fff',
            justifyContent: 'center'
          }}
        >
          <${Icon} name="Github" size=${14} /> GitHub
        </a>

        <a
          href="mailto:nguyenlehaidang2685@gmail.com"
          className="btn-primary"
          style=${{
            padding: '0.7rem 0.9rem',
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            textDecoration: 'none',
            borderColor: 'var(--accent-glow)',
            justifyContent: 'center'
          }}
        >
          <${Icon} name="Mail" size=${14} /> Email
        </a>

        <button
          type="button"
          className="btn-primary"
          onClick=${onToggleCV}
          style=${{
            padding: '0.7rem 0.9rem',
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            justifyContent: 'center',
            borderColor: 'var(--secondary-glow)'
          }}
        >
          <${Icon} name="FileText" size=${14} /> ${showCV ? 'Ẩn CV' : 'Xem CV'}
        </button>
      </div>

      ${showCV && html`
        <div style=${{
          padding: '1rem',
          borderRadius: '18px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'var(--text-primary)',
          lineHeight: '1.6'
        }}>
          <p style=${{ fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary-glow)' }}>CV Ngắn gọn</p>
          <p style=${{ marginBottom: '0.45rem' }}><strong>Nguyễn Lê Hải Đăng</strong> - Full Stack Developer.</p>
          <p style=${{ marginBottom: '0.45rem' }}>Chuyên xây dựng ứng dụng web React, Node.js, Express và hệ thống backend hiệu năng cao.</p>
          <p style=${{ marginBottom: '0.45rem' }}>Kinh nghiệm: Thiết kế giao diện người dùng, tối ưu hiệu năng, phát triển API và triển khai dự án thực tế.</p>
          <p style=${{ marginTop: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Xem chi tiết CV trên GitHub hoặc liên hệ trực tiếp qua email để nhận bản CV đầy đủ.
          </p>
        </div>
      `}
    </div>
  `;
}

// ----------------------------------------------------
// 2. DETAILED PANELS FOR ACTIVE SECTIONS (VIETNAMESE)
// ----------------------------------------------------

// HERO SECTION PANEL
export function HeroPanel({ onStart }) {
  return html`
    <div className="hero-content">
      <h1 className="hero-title">Nguyễn Lê Hải Đăng</h1>
      <p className="hero-subtitle">Lập trình viên</p>
      <button className="btn-primary" onClick=${onStart}>
        Bắt đầu Hành trình
      </button>
    </div>
  `;
}

// ABOUT ME PANEL
export function AboutPanel({ onClose }) {
  const [showCV, setShowCV] = useState(false);

  return html`
    <div className="glass-panel">
      <!-- Close Cross Button -->
      <button className="btn-close-panel" onClick=${onClose} title="Trở lại tàu">
        <${Icon} name="X" size=${16} />
      </button>

      <h2 className="panel-title">
        <${Icon} name="User" className="text-cyan" /> <span>Giới Thiệu</span>
      </h2>
      
      <div style=${{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-primary)', marginBottom: '1.2rem' }}>
        <div style=${{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src="/assets/intro-portrait.jpg"
            alt="Ảnh Thuyền Trưởng"
            style=${{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid rgba(255,255,255,0.08)',
              boxShadow: '0 6px 18px rgba(2,6,23,0.5)'
            }}
          />

          <div style=${{ minWidth: 0 }}>
            <p style=${{ marginBottom: '0.8rem' }}>
              Xin chào! Tôi là một lập trình viên Web đam mê kiến tạo các không gian kỹ thuật số cao cấp. 
              Với tôi, lập trình không chỉ là những dòng code khô khan, mà là một <strong>hành trình phiêu lưu tương tác</strong> 
              nơi vẻ đẹp thị giác hòa quyện cùng kỹ thuật vững chắc.
            </p>
            <p>
              Mục tiêu của tôi là tạo ra các giao diện front-end đắm chìm kết hợp với kiến trúc server hiệu năng cao. 
              Cho dù đang xây dựng các hệ quản trị trạng thái phức tạp hay thiết kế cơ sở dữ liệu, tôi luôn giương buồm với tinh thần tỉ mỉ của một người thợ thủ công.
            </p>
          </div>
        </div>
      </div>

      <h3 style=${{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
        Kết Nối Thuyền Trưởng
      </h3>
      <${ContactLinks} showCV=${showCV} onToggleCV=${() => setShowCV(prev => !prev)} />

      <h3 style=${{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginTop: '1.4rem', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
        Lịch Sử Giương Buồm
      </h3>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-node" />
          <div className="timeline-date">2023 - 2024</div>
          <div className="timeline-role">Hành trình tìm hiểu về Code</div>
          <div className="timeline-company">Dự án tự do / Digital Studio</div>
          <div className="timeline-desc">Học những ngôn ngữ về máy tính và kỹ thuật lập trình.</div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-node" />
          <div className="timeline-date">2024 - 2025</div>
          <div className="timeline-role">Hành trình tìm hiểu về Code</div>
          <div className="timeline-company">Dự án tự do / Digital Studio</div>
          <div className="timeline-desc">Tiếp tục học sâu và tìm hiểu về 1 trang web thực thụ.</div>
        </div>
        
        <div className="timeline-item">
          <div className="timeline-node" />
          <div className="timeline-date">2025 - 2026</div>
          <div className="timeline-role">Lập trình viên Web</div>
          <div className="timeline-company"></div>
          <div className="timeline-desc">Phát triển các ứng dụng phong phú sử dụng Html, css, js, Laravel và React,API.</div>
        </div>
      </div>

      <!-- Close Button Bottom -->
      <button className="btn-back-boat" onClick=${onClose}>
        <${Icon} name="ArrowLeft" size=${14} /> Giương buồm tiếp tục
      </button>
    </div>
  `;
}

// SKILLS PANEL
export function SkillsPanel({ onClose }) {
  const skillsList = [
    { name: 'React JS', icon: 'Codepen', desc: 'Giao diện' },
    { name: 'Node JS', icon: 'Server', desc: 'Máy chủ' },
    { name: 'Laravel', icon: 'Feather', desc: 'Khung mã' },
    { name: 'MongoDB', icon: 'Database', desc: 'Không quan hệ' },
    { name: 'MySQL', icon: 'Layers', desc: 'Quan hệ' },
    { name: 'Docker', icon: 'Box', desc: 'Đóng gói' },
    { name: 'GitHub', icon: 'GitBranch', desc: 'Kiểm soát' },
    { name: 'Vanilla CSS', icon: 'Palette', desc: 'Mỹ thuật' }
  ];

  return html`
    <div className="glass-panel">
      <!-- Close Cross Button -->
      <button className="btn-close-panel" onClick=${onClose} title="Trở lại tàu">
        <${Icon} name="X" size=${16} />
      </button>

      <h2 className="panel-title">
        <${Icon} name="Cpu" /> <span>Lò Rèn Kỹ Năng</span>
      </h2>
      
      <p style=${{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Di chuột qua các cổ tự phát sáng để xem kho vũ khí của tôi:
      </p>

      <div className="skills-grid">
        ${skillsList.map(skill => html`
          <div key=${skill.name} className="skill-icon-card">
            <div className="skill-svg">
              <${Icon} name=${skill.icon} size=${32} className="text-cyan" style=${{ color: 'var(--primary-glow)' }} />
            </div>
            <div className="skill-name">${skill.name}</div>
            <div style=${{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>${skill.desc}</div>
          </div>
        `)}
      </div>

      <!-- Close Button Bottom -->
      <button className="btn-back-boat" onClick=${onClose}>
        <${Icon} name="ArrowLeft" size=${14} /> Giương buồm tiếp tục
      </button>
    </div>
  `;
}

// PROJECTS PANEL
export function ProjectsPanel({ onClose }) {
  const projects = [
    {
      title: 'Hành Trình Neon (Neon Odyssey)',
      desc: 'Một công cụ quản lý tác vụ gamified tuyệt đẹp sử dụng React và CSS Modules cùng hiệu ứng phát sáng neon mềm mại.',
      tags: ['React', 'CSS Modules', 'Web Audio'],
      link: '#'
    },
    {
      title: 'Cổng Poseidon (Poseidon API Gateway)',
      desc: 'Cầu nối cơ sở dữ liệu băng thông rộng được xây dựng với Laravel và Redis nhằm xử lý giao dịch dung lượng cao.',
      tags: ['Laravel', 'Redis', 'Docker'],
      link: '#'
    }
  ];

  return html`
    <div className="glass-panel">
      <!-- Close Cross Button -->
      <button className="btn-close-panel" onClick=${onClose} title="Trở lại tàu">
        <${Icon} name="X" size=${16} />
      </button>

      <h2 className="panel-title">
        <${Icon} name="Compass" /> <span>Kho Dự Án</span>
      </h2>

      <div className="projects-slider">
        ${projects.map((proj, i) => html`
          <div key=${proj.title} className="project-card">
            <div className="project-image-wrapper">
              <${Icon} name=${i === 0 ? 'Sparkles' : 'Flame'} size=${28} className="project-img-placeholder" style=${{ color: 'var(--primary-glow)', opacity: 0.5 }} />
            </div>
            
            <div className="project-details">
              <div>
                <div className="project-title" style=${{ fontSize: '1rem' }}>${proj.title}</div>
                <div className="project-desc">${proj.desc}</div>
              </div>
              
              <div className="project-tags">
                ${proj.tags.map(tag => html`
                  <span key=${tag} className="project-tag">${tag}</span>
                `)}
              </div>
              
              <div className="project-actions">
                <a href=${proj.link} className="project-link">
                  <${Icon} name="ExternalLink" size=${12} /> Trực tiếp
                </a>
                <a href=${proj.link} className="project-link">
                  <${Icon} name="Github" size=${12} /> Mã nguồn
                </a>
              </div>
            </div>
          </div>
        `)}
      </div>

      <h3 style=${{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginTop: '1.4rem', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
        Hợp tác Phát triển
      </h3>

      <!-- Close Button Bottom -->
      <button className="btn-back-boat" onClick=${onClose}>
        <${Icon} name="ArrowLeft" size=${14} /> Giương buồm tiếp tục
      </button>
    </div>
  `;
}

// EXPERIENCE PANEL
export function ExperiencePanel({ onClose }) {
  const milestones = [
    {
      title: 'Khởi Hành Ra Khơi',
      role: 'Bắt đầu khám phá hệ thống máy tính & giao thức mạng.',
      desc: 'Hoàn thành chương trình kỹ thuật máy tính, xây dựng kiến thức cốt lõi về thuật toán và cấu trúc dữ liệu.'
    },
    {
      title: 'Giương Buồm Đại Dương',
      role: 'Lập trình & Làm chủ kiến trúc mã nguồn.',
      desc: 'Triển khai thành công web đơn giản sử dụng PHP, Javascript và các cơ sở dữ liệu liên quan.'
    },
    {
      title: 'Chân Trời Mới',
      role: 'Lập trình & Thiết kế giao diện',
      desc: 'Thiết kế trang web hoàn chỉnh, đưa lên hosting, sử dụng laravel, thêm các tính năng cần có của trang web, sử dụng API, Docker.'
    },
    {
      title: 'Khám Phá Vô Tận',
      role: 'Tìm hiểu sâu về phát triển web full stack.',
      desc: 'Tìm những bậc thầy để học hỏi và tiếp tục phát triển kỹ năng, hướng tới việc xây dựng các ứng dụng web phức tạp và hiệu quả hơn nữa.'
    },
    {
      title: 'Phỏng vấn và thực tập',
      role: 'Chuẩn bị cho cơ hội nghề nghiệp thực tế.',
      desc: 'Tham gia phỏng vấn thực tập, xây dựng hồ sơ cá nhân và tiếp tục học hỏi từ các chuyên gia trong ngành.'
    }

  ];

  return html`
    <div className="glass-panel">
      <!-- Close Cross Button -->
      <button className="btn-close-panel" onClick=${onClose} title="Trở lại tàu">
        <${Icon} name="X" size=${16} />
      </button>

      <h2 className="panel-title">
        <${Icon} name="Map" /> <span>Lộ Trình Hành Trình</span>
      </h2>
      
      <p style=${{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
        Theo dõi hải trình phát triển chuyên môn của tôi qua các cột mốc:
      </p>

      <div className="timeline">
        ${milestones.map((ms, index) => html`
          <div key=${ms.title} className="timeline-item">
            <div className="timeline-node" style=${{ borderColor: index === 2 ? 'var(--primary-glow)' : 'var(--secondary-glow)' }} />
            <div className="timeline-date">Cột mốc 0${index + 1}</div>
            <div className="timeline-role">${ms.title}</div>
            <div className="timeline-company">${ms.role}</div>
            <p className="timeline-desc" style=${{ marginTop: '0.2rem' }}>${ms.desc}</p>
          </div>
        `)}
      </div>

      

      <!-- Close Button Bottom -->
      <button className="btn-back-boat" onClick=${onClose}>
        <${Icon} name="ArrowLeft" size=${14} /> Giương buồm tiếp tục
      </button>
    </div>
  `;
}

// CONTACT PANEL
export function ContactPanel({ onClose }) {
  const [showCV, setShowCV] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');

    try {
      // Initialize EmailJS with your public key (you'll need to set this up)
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }

      emailjs.init('Eh4IplB-ZXGFdpNBK'); // Replace with your EmailJS Public Key

      const templateParams = {
        to_email: 'nguyenlehaidang2685@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      };

      const response = await emailjs.send(
        'service_yr6cybp', // Replace with your EmailJS Service ID
        'template_sy6oorb', // Replace with your EmailJS Template ID
        templateParams
      );

      if (response.status === 200) {
        setSubmitMessage('✓ Tín hiệu đã được truyền đi thành công! Hải Đăng sẽ phản hồi sớm.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitMessage(''), 5000);
      }
    } catch (error) {
      console.error('Email Error:', error);
      setSubmitMessage('✗ Lỗi gửi tín hiệu. Vui lòng thử lại hoặc gửi email trực tiếp.');
      setTimeout(() => setSubmitMessage(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return html`
    <div className="glass-panel">
      <!-- Close Cross Button -->
      <button className="btn-close-panel" onClick=${onClose} title="Trở lại tàu">
        <${Icon} name="X" size=${16} />
      </button>

      <div className="contact-grid">
        <!-- Form Details -->
        <div>
          <h2 className="panel-title">
            <${Icon} name="Mail" /> <span>Hãy gửi cho Hải Đăng những suy nghĩ của bạn.</span>
          </h2>
          <p style=${{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Gửi một tín hiệu qua màn sương! Tôi sẽ phản hồi ngay khi con tàu của tôi cập cảng gần nhất.
          </p>

          <form className="contact-form" onSubmit=${handleSubmit}>
            <div className="form-group">
              <label className="form-label">Tên Thuyền Trưởng</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="Ví dụ: HaiDang" 
                value=${formData.name}
                onChange=${handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Tần Số Phản Hồi (Email)</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="nemo@nautilus.com" 
                value=${formData.email}
                onChange=${handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Thông Điệp Của Bạn</label>
              <textarea 
                name="message"
                className="form-textarea" 
                placeholder="Chào bạn! Hãy cùng xây dựng..." 
                value=${formData.message}
                onChange=${handleInputChange}
                required
              ></textarea>
            </div>

            ${submitMessage && html`
              <div style=${{
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                marginBottom: '0.8rem',
                background: submitMessage.includes('✓') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: submitMessage.includes('✓') ? '1px solid #22c55e' : '1px solid #ef4444',
                color: submitMessage.includes('✓') ? '#22c55e' : '#ef4444'
              }}>
                ${submitMessage}
              </div>
            `}

            <button 
              type="submit" 
              className="btn-primary" 
              style=${{ padding: '0.7rem', fontSize: '0.8rem', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              disabled=${loading}
            >
              ${loading ? 'Đang gửi...' : 'Truyền Tín Hiệu'}
            </button>
          </form>

          <h3 style=${{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginTop: '1.2rem', marginBottom: '0.6rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Kết Nối Nhanh
          </h3>
          <${ContactLinks} showCV=${showCV} onToggleCV=${() => setShowCV(prev => !prev)} />
        </div>

        <!-- Animated Lighthouse Visual -->
        <div className="lighthouse-illustration">
          <div className="lighthouse-beam" />
          <svg className="lighthouse-svg" viewBox="0 0 100 150" fill="none">
            <path d="M10,130 C30,120 70,120 90,130 L90,150 L10,150 Z" fill="#2d3748" />
            <path d="M38,60 L62,60 L68,130 L32,130 Z" fill="#edf2f7" stroke="#2d3748" strokeWidth="2" />
            <rect x="42" y="80" width="16" height="15" fill="#e53e3e" />
            <rect x="40" y="110" width="20" height="15" fill="#e53e3e" />
            <rect x="44" y="45" width="12" height="15" fill="#1a202c" />
            <circle cx="50" cy="50" r="4" fill="#fff" style=${{ filter: 'drop-shadow(0 0 8px #ffeb3b)' }} />
            <path d="M40,45 L60,45 L50,30 Z" fill="#1a202c" />
          </svg>
        </div>
      </div>

      <!-- Close Button Bottom -->
      <button className="btn-back-boat" onClick=${onClose} style=${{ display: 'inline-flex', marginTop: '1.2rem' }}>
        <${Icon} name="ArrowLeft" size=${14} /> Giương buồm tiếp tục
      </button>
    </div>
  `;
}
