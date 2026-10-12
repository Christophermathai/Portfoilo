'use client';

import React from 'react';
import { soundManager } from '@/utils/sound';

interface ExperienceItem {
  num: string;
  date: string;
  role: string;
  company: string;
  tag: string;
  desc: string;
}

const experiences: ExperienceItem[] = [
  {
    num: "01",
    date: "Mar 2026 – May 2026",
    role: "Data Science & Analytics",
    company: "Wheeltrix",
    tag: "DATA SCIENCE",
    desc: "Successfully completed the Data Science & Analytics Course, developing core competencies in data processing, analytics, and modeling methodologies.",
  },
  {
    num: "02",
    date: "May 2025 – Jul 2025",
    role: "Data Analyst Intern",
    company: "Unified Mentor Pvt. Ltd.",
    tag: "ANALYTICS & ML",
    desc: "End-to-end analysis on 4 projects — COVID-19 clinical trials, Coca-Cola stock prediction, web threat detection, and EV sales across India. Applied Python data stack for EDA, statistical modeling, and predictive analytics.",
  },
  {
    num: "03",
    date: "Nov 2024",
    role: "AI Intern",
    company: "AccelerateX",
    tag: "APPLIED AI",
    desc: "Foundational AI project covering data preprocessing, model building, and deployment under industry mentorship.",
  },
  {
    num: "04",
    date: "Apr 2024 – May 2024",
    role: "Web Development Intern",
    company: "Megatrend Knowledge Management Systems",
    tag: "WEB SYSTEMS",
    desc: "Developed and tested web modules using PHP and JavaScript. Contributed to production-level code review and agile team workflows.",
  },
];

export default function Experience() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--spotlight-x', '-1000px');
    e.currentTarget.style.setProperty('--spotlight-y', '-1000px');
  };

  return (
    <section id="experience">
      <div className="section-label reveal">
        <span className="section-num">03</span>
        <h2 className="section-title">EXPERIENCE</h2>
        <span className="section-line"></span>
      </div>
      <div className="exp-grid">
        {experiences.map((exp, i) => (
          <div 
            className="exp-card reveal" 
            key={i}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => soundManager.playCardHover()}
          >
            <div className="exp-card-spotlight" aria-hidden="true" />
            <div className="exp-card-header">
              <div className="exp-card-meta-left">
                <span className="exp-card-num">// {exp.num}</span>
                <span className="exp-card-tag">{exp.tag}</span>
              </div>
              <span className="exp-card-arrow" aria-hidden="true">↗</span>
            </div>
            
            <div className="exp-card-body">
              <div className="exp-date-pill">{exp.date}</div>
              <h3 className="exp-role">{exp.role}</h3>
              <div className="exp-company">{exp.company}</div>
              <p className="exp-desc">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
