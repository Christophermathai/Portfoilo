'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { projects, currentProject, Project } from '@/data/projects';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import CustomCursor from '@/components/CustomCursor';

export default function ProjectsPage() {
  useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProject, setActiveProject] = useState<Project>({
    ...currentProject,
    title: 'ERROR'
  });

  useEffect(() => {
    fetch('/api/github-feed')
      .then(res => res.text())
      .then(xmlString => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlString, 'application/xml');
        const entry = doc.querySelector('entry');
        if (entry) {
          const link = entry.querySelector('link');
          const href = link?.getAttribute('href');
          if (href) {
            const parts = href.split('/');
            if (parts.length >= 5) {
              const repoName = parts[4];
              setActiveProject(prev => ({
                ...prev,
                title: repoName.replace(/-/g, ' ').toUpperCase(),
                github: `https://github.com/Christophermathai/${repoName}`
              }));
            }
          }
        }
      })
      .catch(err => console.error('Failed to fetch latest repo feed:', err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <CustomCursor />
      <section style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '4rem' }}>
        <Link
          href="/#works"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '14px',
            letterSpacing: '0.15em',
            color: 'var(--muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '2rem',
            transition: 'color 0.2s',
            borderBottom: '1px solid transparent',
            paddingBottom: '2px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.borderBottom = '1px solid var(--accent)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--muted)';
            e.currentTarget.style.borderBottom = '1px solid transparent';
          }}
        >
          ← BACK TO PORTFOLIO
        </Link>

        {/* Current Working Project Section */}
        <div style={{ marginBottom: '8rem' }}>
          <div className="section-label reveal">
            <span className="section-num" style={{ color: 'var(--accent)' }}>ACTIVE</span>
            <h2 className="section-title">CURRENTLY COOKING</h2>
            <span className="section-line"></span>
          </div>

          <div
            className="project-card reveal animated-bg"
            style={{
              border: '1px solid var(--accent)',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              transform: 'translateZ(0)', // Hardware acceleration
              width: '100%'
            }}
          >
            {/* Ambient glow behind the card */}
            <div className="animated-glow" style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '100%', height: '100%',
              background: 'radial-gradient(circle at center, rgba(255, 61, 0, 0.15) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 0
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="project-num" style={{ color: 'var(--accent)' }}>{activeProject.num}</span>
              <div className="project-arrow" style={{ color: 'var(--accent)' }}>↗</div>
              <h3 className="project-name" style={{ fontSize: 'clamp(32px, 4vw, 48px)', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{activeProject.title}</h3>
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '16px',
                    letterSpacing: '0.1em',
                    color: 'var(--bg)',
                    background: 'var(--accent)',
                    padding: '8px 20px',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                    marginTop: '1.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  VIEW ON GITHUB ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* All Projects Grid */}
        <div>
          <div className="section-label reveal">
            <span className="section-num">ALL</span>
            <h2 className="section-title">PROJECT ARCHIVE</h2>
            <span className="section-line"></span>
          </div>

          <div className="projects-grid">
            {projects.map((project, i) => (
              <div
                className="project-card reveal"
                key={i}
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="project-num">{project.num}</span>
                    {project.marker && (
                      <span style={{
                        fontSize: '10px',
                        fontFamily: "'DM Mono', monospace",
                        background: 'rgba(255, 61, 0, 0.1)',
                        color: 'var(--accent)',
                        padding: '2px 8px',
                        border: '1px solid var(--accent)',
                        borderRadius: '12px',
                        letterSpacing: '0.05em'
                      }}>{project.marker}</span>
                    )}
                  </div>
                  <div className="project-arrow">↗</div>
                </div>
                <h3 className="project-name" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {project.title}
                  {project.marker === 'IN PRODUCTION' && (
                    <img 
                      src="/deployed_sticker.png" 
                      alt="Deployed" 
                      style={{ height: '24px', objectFit: 'contain' }} 
                    />
                  )}
                  {project.marker === 'IN DEVELOPMENT' && (
                    <img 
                      src="/development_sticker.png" 
                      alt="In Development" 
                      style={{ height: '24px', objectFit: 'contain' }} 
                    />
                  )}
                </h3>
                <p className="project-desc">{project.basicDescription}</p>
                <div className="project-stack">
                  {project.technologies.map((tag) => (
                    <span className="stack-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal Overlay */}
        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
              <span className="project-num">{selectedProject.num}</span>
              <h3 className="project-name" style={{ 
                fontSize: 'clamp(36px, 5vw, 64px)', 
                marginTop: '0.5rem', 
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                {selectedProject.title}
                {selectedProject.marker === 'IN PRODUCTION' && (
                  <img 
                    src="/deployed_sticker.png" 
                    alt="Deployed" 
                    style={{ 
                      height: 'clamp(30px, 4vw, 50px)', 
                      objectFit: 'contain' 
                    }} 
                  />
                )}
                {selectedProject.marker === 'IN DEVELOPMENT' && (
                  <img 
                    src="/development_sticker.png" 
                    alt="In Development" 
                    style={{ 
                      height: 'clamp(30px, 4vw, 50px)', 
                      objectFit: 'contain' 
                    }} 
                  />
                )}
              </h3>
              <p className="project-desc" style={{ fontSize: '15px', marginBottom: '2rem' }}>{selectedProject.mainDescription}</p>
              <div className="project-stack" style={{ marginBottom: selectedProject.github ? '2rem' : '3rem' }}>
                {selectedProject.technologies.map((tag) => (
                  <span className="stack-tag" key={tag} style={{ fontSize: '12px', padding: '6px 14px' }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Link 
                  href={`/projects/${selectedProject.slug}`}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '18px',
                    letterSpacing: '0.1em',
                    color: 'var(--bg)',
                    background: 'var(--fg)',
                    padding: '10px 24px',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  READ FULL CASE STUDY →
                </Link>
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '18px',
                      letterSpacing: '0.1em',
                      color: 'var(--bg)',
                      background: 'var(--accent)',
                      padding: '10px 24px',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    VIEW ON GITHUB ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
