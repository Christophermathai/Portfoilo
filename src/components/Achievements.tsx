"use client";

import React from "react";
import { soundManager } from "@/utils/sound";

interface Achievement {
  place: string;
  event: string;
  venue: string;
  badge?: string;
  featured?: boolean;
}

const achievements: Achievement[] = [
  { 
    place: "1ST", 
    event: "Code Crafters", 
    venue: "CASCADE 2025 · Cochin Arts & Science College", 
    badge: "WINNER · CAS",
    featured: true 
  },
  { 
    place: "2ND", 
    event: "Build-A-Thon 2.0", 
    venue: "Month-long hackathon · STACC at CUSAT",
    badge: "HACKATHON"
  },
  { 
    place: "2ND", 
    event: "Binary Battle", 
    venue: "TecXell 2024 · MITS Ernakulam",
    badge: "CONTEST"
  },
  { 
    place: "2ND", 
    event: "Binary Brainstorm", 
    venue: "TecXell 2023 · MITS Ernakulam",
    badge: "IDEATHON"
  },
  { 
    place: "3RD", 
    event: "CommitX", 
    venue: "Gateways 2026 · CHRIST (Deemed to be University), Bangalore",
    badge: "HACKATHON"
  },
  { 
    place: "PRESENTED", 
    event: "AI in Medical Robotics", 
    venue: "Research paper · ICAET 2025",
    badge: "RESEARCH"
  },
  { 
    place: "PRESENTED", 
    event: "Deepfakes & Cyber Threats", 
    venue: "Publication · National Conference 2023",
    badge: "PUBLICATION"
  },
];

export default function Achievements() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--spotlight-x", `${x}px`);
    e.currentTarget.style.setProperty("--spotlight-y", `${y}px`);

    // Subtle 3D tilt calculation
    const tiltX = ((x / rect.width) - 0.5) * 5;
    const tiltY = ((y / rect.height) - 0.5) * -5;
    e.currentTarget.style.setProperty("--tilt-x", `${tiltX}deg`);
    e.currentTarget.style.setProperty("--tilt-y", `${tiltY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--spotlight-x", "-1000px");
    e.currentTarget.style.setProperty("--spotlight-y", "-1000px");
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section id="achievements">
      <div className="section-label reveal">
        <span className="section-num">04</span>
        <h2 className="section-title">AWARDS</h2>
        <span className="section-line"></span>
      </div>
      <div className="ach-grid">
        {achievements.map((ach, i) => (
          <div
            className={`ach-item reveal ${ach.featured ? "ach-featured" : ""}`}
            key={i}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => soundManager.playCardHover()}
          >
            <div className="ach-spotlight-layer" aria-hidden="true" />
            <div className="ach-header-row">
              <div className="ach-place">{ach.place}</div>
              {ach.badge && <span className="ach-badge">{ach.badge}</span>}
            </div>
            <div className="ach-info">
              <div className="ach-event">{ach.event}</div>
              <div className="ach-venue">{ach.venue}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
