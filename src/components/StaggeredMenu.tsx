'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  isScrolled?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#FF3D00', '#222220'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  menuButtonColor = 'var(--muted)',
  openMenuButtonColor = 'var(--fg)',
  changeMenuColorOnOpen = true,
  accentColor = 'var(--accent)',
  isFixed = true,
  closeOnClickAway = true,
  isScrolled = false,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = useCallback(() => {
    setOpen(prev => {
      const next = !prev;
      if (next) onMenuOpen?.();
      else onMenuClose?.();
      return next;
    });
  }, [onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (open) {
      setOpen(false);
      onMenuClose?.();
    }
  }, [open, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div className={`sm-scope ${isFixed ? 'fixed-wrapper' : 'relative-wrapper'} ${open ? 'open' : ''} ${className}`} data-position={position}>
      <div className="staggered-menu-wrapper" style={{ '--sm-accent': accentColor } as React.CSSProperties}>
        
        {/* Pre-layers */}
        <div className="sm-prelayers" aria-hidden="true">
          {colors.slice(0, 4).map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c, '--layer-index': i } as React.CSSProperties} />
          ))}
        </div>

        {/* Header Toggle */}
        <header className={`staggered-menu-header ${isScrolled ? 'scrolled' : ''}`}>
          <div className="sm-logo">
            <span className="nav-name" style={{ zIndex: 100 }}>CM · Portfolio</span>
          </div>

          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={toggleMenu}
            onMouseEnter={() => {
              if (window.innerWidth >= 1024 && !open) toggleMenu();
            }}
            type="button"
            style={{ color: changeMenuColorOnOpen && open ? openMenuButtonColor : menuButtonColor }}
          >
            <span className="sm-toggle-textWrap" aria-hidden="true">
              <span className="sm-toggle-textInner">
                <span className="sm-toggle-line">Menu</span>
                <span className="sm-toggle-line">Close</span>
              </span>
            </span>
            <span className="sm-icon" aria-hidden="true">
              <span className="sm-icon-line plusH" />
              <span className="sm-icon-line plusV" />
            </span>
          </button>
        </header>

        {/* Panel */}
        <aside 
          ref={panelRef} 
          className="staggered-menu-panel" 
          aria-hidden={!open}
          onMouseLeave={() => {
            if (window.innerWidth >= 1024 && open) toggleMenu();
          }}
        >
          <div className="sm-panel-inner">
            <ul className="sm-panel-list" data-numbering={displayItemNumbering || undefined}>
              {items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a href={it.link} className="sm-panel-item" onClick={closeMenu}>
                    <span className="sm-panel-itemLabel" style={{ '--item-index': idx } as React.CSSProperties}>
                      {it.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div className="sm-socials" aria-label="Social links">
                <h3 className="sm-socials-title">Socials</h3>
                <ul className="sm-socials-list">
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item" style={{ '--social-index': i } as React.CSSProperties}>
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        /* Scoped Variables & Reset */
        .sm-scope {
          --transition-ease: cubic-bezier(0.16, 1, 0.3, 1);
          --menu-width: clamp(260px, 38vw, 420px);
          --offset: 100%;
        }
        .sm-scope[data-position='left'] {
          --offset: -100%;
        }
        
        .sm-scope.fixed-wrapper {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999; pointer-events: none;
        }
        .sm-scope.relative-wrapper {
          position: relative; width: 100%; height: 100%; z-index: 1000; pointer-events: none;
        }
        
        .sm-scope.open.fixed-wrapper {
          pointer-events: auto;
        }

        .staggered-menu-wrapper {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;
        }

        /* Pre-layers */
        .sm-prelayers {
          position: absolute; top: 0; right: 0; bottom: 0; width: var(--menu-width); z-index: 5; pointer-events: none;
        }
        .sm-scope[data-position='left'] .sm-prelayers { right: auto; left: 0; }
        
        .sm-prelayer {
          position: absolute; top: 0; left: 0; height: 100%; width: 100%;
          transform: translateX(var(--offset));
          transition: transform 0.5s var(--transition-ease);
          transition-delay: calc(0.3s - (var(--layer-index) * 0.05s));
        }
        .sm-scope.open .sm-prelayer {
          transform: translateX(0);
          transition-delay: calc(var(--layer-index) * 0.07s);
        }

        /* Header */
        .staggered-menu-header {
          position: absolute; top: 0; left: 0; width: 100vw;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.5rem 3rem; background: transparent; pointer-events: none; z-index: 20;
          mix-blend-mode: normal; transition: background 0.3s, backdrop-filter 0.3s, padding 0.3s;
        }
        .staggered-menu-header.scrolled {
          background: rgba(8,8,8,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 1rem 3rem;
        }
        @media (max-width: 768px) {
          .staggered-menu-header { padding: 1.2rem 1.5rem; }
          .staggered-menu-header.scrolled { padding: 1rem 1.5rem; }
        }
        .staggered-menu-header > * { pointer-events: auto; }
        
        .sm-logo { display: flex; align-items: center; user-select: none; }
        .nav-name {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          transition: color 0.3s;
        }
        .sm-scope.open .nav-name { color: var(--fg); }
        
        /* Toggle Button */
        .sm-toggle {
          position: relative; display: inline-flex; align-items: center; gap: 0.8rem;
          background: transparent; border: none; cursor: pointer;
          font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          transition: color 0.3s ease; outline: none;
        }
        .sm-toggle:hover { color: var(--fg) !important; }
        
        .sm-toggle-textWrap {
          display: inline-block; height: 1em; overflow: hidden;
        }
        .sm-toggle-textInner {
          display: flex; flex-direction: column; transition: transform 0.5s var(--transition-ease);
        }
        .sm-toggle-line { height: 1em; line-height: 1; }
        .sm-scope.open .sm-toggle-textInner { transform: translateY(-1em); }
        
        .sm-icon {
          position: relative; width: 14px; height: 14px; display: inline-flex; align-items: center; justify-content: center;
        }
        .sm-icon-line {
          position: absolute; left: 50%; top: 50%; width: 100%; height: 1.5px; background: currentColor;
          transition: transform 0.5s var(--transition-ease);
        }
        .plusH { transform: translate(-50%, -50%) rotate(0deg); }
        .plusV { transform: translate(-50%, -50%) rotate(90deg); }
        .sm-scope.open .plusH { transform: translate(-50%, -50%) rotate(45deg); }
        .sm-scope.open .plusV { transform: translate(-50%, -50%) rotate(-45deg); }

        /* Panel */
        .staggered-menu-panel {
          position: absolute; top: 0; right: 0; width: var(--menu-width); height: 100vh;
          background: var(--surface); border-left: 1px solid var(--border);
          display: flex; flex-direction: column; padding: 6em 3em 3em 3em;
          z-index: 10; transform: translateX(var(--offset));
          transition: transform 0.4s cubic-bezier(0.8, 0, 0.2, 1);
          pointer-events: auto;
        }
        .sm-scope[data-position='left'] .staggered-menu-panel {
          right: auto; left: 0; border-left: none; border-right: 1px solid var(--border);
        }
        .sm-scope.open .staggered-menu-panel {
          transform: translateX(0);
          transition: transform 0.65s var(--transition-ease);
          transition-delay: 0.25s;
        }

        .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 2rem; }
        
        /* Items */
        .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
        .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1.1; }
        .sm-panel-item {
          display: inline-block; font-family: 'Bebas Neue', sans-serif; font-size: clamp(40px, 6vw, 64px);
          color: var(--fg); text-decoration: none; text-transform: uppercase; transition: color 0.2s;
        }
        .sm-panel-item:hover { color: var(--sm-accent); }
        
        .sm-panel-itemLabel {
          display: inline-block; transform-origin: 0% 100%;
          transform: translateY(120%) rotate(5deg); opacity: 0;
          transition: transform 0.25s var(--transition-ease), opacity 0.2s;
          transition-delay: 0s;
        }
        .sm-scope.open .sm-panel-itemLabel {
          transform: translateY(0) rotate(0); opacity: 1;
          transition: transform 0.8s var(--transition-ease), opacity 0.8s;
          transition-delay: calc(0.35s + (var(--item-index) * 0.08s));
        }

        /* Socials */
        .sm-socials { margin-top: auto; padding-top: 2rem; border-top: 1px solid var(--border); }
        .sm-socials-title {
          margin: 0 0 1rem 0; font-family: 'DM Mono', monospace; font-size: 11px;
          letter-spacing: 0.1em; color: var(--sm-accent); text-transform: uppercase;
          /* exit: fade out fast */
          opacity: 0; transition: opacity 0.15s ease; transition-delay: 0s;
        }
        .sm-scope.open .sm-socials-title {
          opacity: 1; transition: opacity 0.4s ease; transition-delay: 0.45s;
        }
        .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; gap: 1.5rem; flex-wrap: wrap; }
        
        /* Closed state: instantly hidden (no delay, fast fade) */
        .sm-socials-item {
          transform: translateY(20px); opacity: 0;
          transition: transform 0.15s var(--transition-ease), opacity 0.15s;
          transition-delay: 0s;
        }
        /* Open state: staggered slide-up */
        .sm-scope.open .sm-socials-item {
          transform: translateY(0); opacity: 1;
          transition: transform 0.6s var(--transition-ease), opacity 0.6s;
          transition-delay: calc(0.5s + (var(--social-index) * 0.08s));
        }

        .sm-socials-link {
          font-family: 'Instrument Serif', serif; font-size: 20px; font-style: italic;
          color: var(--muted); text-decoration: none; transition: color 0.3s;
        }
        .sm-socials-link:hover { color: var(--fg); }

        @media (max-width: 1024px) { 
          .staggered-menu-panel { width: 100vw; border-left: none; } 
          .sm-prelayers { width: 100vw; } 
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
