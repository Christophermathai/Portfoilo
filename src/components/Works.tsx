'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { projects, Project } from '@/data/projects';

export default function Works() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    <section id="works">
      <div className="section-label reveal">
        <span className="section-num">02</span>
        <h2 className="section-title">WORKS</h2>
        <span className="section-line"></span>
      </div>
      <div className="projects-grid">
        {projects.slice(0, 5).map((project, i) => (
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
            <h3 className="project-name">{project.title}</h3>
            <p className="project-desc">{project.basicDescription}</p>
            <div className="project-stack">
              {project.technologies.map((tag) => (
                <span className="stack-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}

        {/* Split card for More Projects and Coming Soon */}
        <div
          className="project-card reveal"
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 0,
            overflow: "hidden",
            minHeight: "260px",
          }}
        >
          <Link
            href="/projects"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRight: "1px solid var(--border)",
              textDecoration: "none",
              transition: "background 0.3s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.2em",
                color: "var(--accent)",
                marginBottom: "1rem",
              }}
            >
              ALL PROJECTS
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(32px, 3vw, 42px)",
                color: "var(--fg)",
                lineHeight: 1,
              }}
            >
              VIEW →
            </div>
          </Link>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.2em",
                color: "var(--muted)",
                marginBottom: "1rem",
              }}
            >
              COMING SOON
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(32px, 3vw, 42px)",
                color: "var(--border)",
                lineHeight: 1,
              }}
            >
              MORE
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            <span className="project-num">{selectedProject.num}</span>
            <h3 className="project-name" style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginTop: '0.5rem', marginBottom: '2rem' }}>{selectedProject.title}</h3>
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
  );
}
