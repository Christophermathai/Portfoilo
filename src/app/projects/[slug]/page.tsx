import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects, currentProject, Project } from '@/data/projects';
import CustomCursor from '@/components/CustomCursor';

// We need to support standard static generation
export function generateStaticParams() {
  const allProjects = [currentProject, ...projects];
  return allProjects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const allProjects = [currentProject, ...projects];
  const projectIndex = allProjects.findIndex((p) => p.slug === slug);
  const project = allProjects[projectIndex];

  if (!project) {
    notFound();
  }

  // Determine next project for the footer
  const nextProject = projectIndex < allProjects.length - 1 
    ? allProjects[projectIndex + 1] 
    : allProjects[0]; // loop back to start

  return (
    <>
      <CustomCursor />
      <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '4rem' }}>
        
        {/* Navigation Bar */}
        <div style={{ padding: '0 3rem', marginBottom: '4rem' }}>
          <Link
            href="/projects"
            className="hover-accent-link"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '14px',
              letterSpacing: '0.15em',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.2s',
              borderBottom: '1px solid transparent',
              paddingBottom: '2px'
            }}
          >
            ← ALL PROJECTS
          </Link>
        </div>

        {/* Hero Section */}
        <section style={{ padding: '0 3rem 6rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ 
                fontFamily: "'Bebas Neue', sans-serif", 
                fontSize: '16px', 
                color: 'var(--accent)', 
                letterSpacing: '0.1em' 
              }}>
                {project.num}
              </span>
              {project.marker && (
                <span style={{
                  fontSize: '10px',
                  fontFamily: "'DM Mono', monospace",
                  background: 'rgba(255, 61, 0, 0.1)',
                  color: 'var(--accent)',
                  padding: '4px 12px',
                  border: '1px solid var(--accent)',
                  borderRadius: '16px',
                  letterSpacing: '0.1em'
                }}>
                  {project.marker}
                </span>
              )}
            </div>
            
            <h1 style={{ 
              fontFamily: "'Bebas Neue', sans-serif", 
              fontSize: 'clamp(64px, 10vw, 140px)', 
              lineHeight: 0.9, 
              letterSpacing: '-0.02em',
              color: 'var(--fg)',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              {project.title}
              {project.marker === 'IN PRODUCTION' && (
                <img 
                  src="/deployed_sticker.png" 
                  alt="Deployed" 
                  style={{ 
                    height: 'clamp(70px, 9vw, 120px)', 
                    objectFit: 'contain' 
                  }} 
                />
              )}
              {project.marker === 'IN DEVELOPMENT' && (
                <img 
                  src="/development_sticker.png" 
                  alt="In Development" 
                  style={{ 
                    height: 'clamp(70px, 9vw, 120px)', 
                    objectFit: 'contain' 
                  }} 
                />
              )}
            </h1>
            
            <div style={{ 
              fontFamily: "'Instrument Serif', serif", 
              fontSize: 'clamp(20px, 3vw, 32px)', 
              fontStyle: 'italic', 
              color: 'var(--muted)',
              maxWidth: '800px',
              marginTop: '1rem'
            }}>
              {project.basicDescription}
            </div>
          </div>
        </section>

        {/* Details Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)'
        }}>
          <div style={{ padding: '2rem 3rem', borderRight: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>Technologies</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.technologies.map(tech => (
                <span key={tech} style={{ 
                  fontSize: '11px', 
                  fontFamily: "'DM Mono', monospace",
                  border: '1px solid var(--border)', 
                  padding: '4px 10px',
                  color: 'var(--fg)'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div style={{ padding: '2rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>Links</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {project.github ? (
                <a href={project.github} target="_blank" rel="noreferrer" className="hover-opacity-btn" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '18px',
                  color: 'var(--bg)',
                  background: 'var(--accent)',
                  padding: '8px 24px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  letterSpacing: '0.05em'
                }}>
                  GITHUB ↗
                </a>
              ) : (
                <span style={{ color: 'var(--muted)', fontSize: '12px' }}>Proprietary Source</span>
              )}
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section style={{ padding: '8rem 3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
            
            {project.problemStatement && (
              <div>
                <div style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                  01 — The Problem
                </div>
                <div style={{ 
                  fontFamily: "'Instrument Serif', serif", 
                  fontSize: 'clamp(24px, 4vw, 42px)', 
                  lineHeight: 1.4,
                  color: 'var(--fg)',
                  fontStyle: 'italic'
                }}>
                  "{project.problemStatement}"
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                02 — Overview
              </div>
              <div style={{ 
                fontFamily: "'DM Mono', monospace", 
                fontSize: '16px', 
                lineHeight: 1.8,
                color: 'var(--muted)' 
              }}>
                {project.mainDescription}
              </div>
            </div>
            
            {project.futureScopes && (
              <div style={{ marginTop: '2rem' }}>
                <div style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>
                  03 — Drawbacks & Future Scope
                </div>
                <div style={{ 
                  fontSize: '16px', 
                  lineHeight: 1.8, 
                  color: 'var(--muted)',
                  fontFamily: "'DM Mono', monospace"
                }}>
                  {project.futureScopes}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Media / Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section style={{ padding: '0', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
             <div style={{ padding: '4rem 3rem' }}>
               <div style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '3rem' }}>
                 Core Features
               </div>
               <div style={{ 
                 display: 'grid', 
                 gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                 gap: '1px',
                 background: 'var(--border)',
                 border: '1px solid var(--border)'
               }}>
                 {project.keyFeatures.map((feature, i) => (
                   <div key={i} style={{ padding: '3rem', background: 'var(--surface)' }}>
                     <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: 'var(--fg)', marginBottom: '1rem' }}>
                       FEATURE {String(i + 1).padStart(2, '0')}
                     </div>
                     <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
                       {feature}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </section>
        )}

        {/* Next Project Footer */}
        <section style={{ padding: '10rem 3rem', borderTop: '1px solid var(--border)', textAlign: 'center', background: 'var(--bg)' }}>
          <div style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '2rem' }}>
            Next Project
          </div>
          <Link href={`/projects/${nextProject.slug}`} style={{ textDecoration: 'none', display: 'inline-block' }}>
            <div className="hover-accent-text" style={{ 
              fontFamily: "'Bebas Neue', sans-serif", 
              fontSize: 'clamp(48px, 8vw, 120px)', 
              color: 'var(--fg)',
              lineHeight: 1,
              transition: 'color 0.3s'
            }}>
              {nextProject.title} →
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}
