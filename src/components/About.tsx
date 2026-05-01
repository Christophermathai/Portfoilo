const skillTags = [
  "Python", "React", "Django", "Next.js", "TypeScript", "OpenCV",
  "Scikit-learn", "Pandas", "Flask", "MySQL", "REST APIs", "Google Cloud",
  "PHP", "Tableau",
];

export default function About() {
  return (
    <section id="about">
      <div className="section-label reveal">
        <span className="section-num">01</span>
        <h2 className="section-title">ABOUT</h2>
        <span className="section-line"></span>
      </div>
      <div className="about-grid">
        <div className="about-left reveal">
          <div className="about-stat-block">
            <div className="stat-num">5+</div>
            <div className="stat-label">Projects shipped</div>
          </div>
          <div className="about-stat-block">
            <div className="stat-num">3×</div>
            <div className="stat-label">Hackathon podiums</div>
          </div>
          <div className="about-stat-block">
            <div className="stat-num">2×</div>
            <div className="stat-label">Research publications</div>
          </div>
          <div className="about-skills">
            {skillTags.map((tag) => (
              <span className="skill-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="about-right reveal">
          <p className="about-bio">
            Full-Stack developer &amp; <em>AI engineer</em> currently pursuing M.Sc. Computer Science
            with an AI specialization at CUSAT. I build end-to-end systems — from facial recognition
            attendance tools to academic AI platforms and data pipelines.
          </p>
          <p className="about-bio">
            Recognized at CASCADE 2025 and published at <em>ICAET 2025</em>.
            I care equally about clean code and the experience it creates.
          </p>
          <div className="about-detail">
            M.Sc. Computer Science (AI) — CUSAT · 2025–2027<br />
            BCA — Rajagiri College of Management &amp; Applied Science · 2022–2025<br />
            Research: AI in Medical Robotics · Deepfakes &amp; Cyber Threats
          </div>
        </div>
      </div>
    </section>
  );
}
