const projects = [
  {
    num: "PROJECT 01",
    name: "ATTENDX",
    desc: "AI-powered facial recognition attendance system. Live face detection removes manual roll-call. Admin dashboard with automated low-attendance flags. React frontend deployed on Vercel.",
    stack: ["Python", "Flask", "OpenCV", "React", "SQLite", "Vercel"],
  },
  {
    num: "PROJECT 02",
    name: "IELTS SPEAKING APP",
    desc: "Full-stack voice practice platform with real-time transcription and automated IELTS scoring. Analyzes fluency, vocabulary, and grammar. Multi-part question sessions with instant analytics.",
    stack: ["Next.js", "TypeScript", "Google Cloud STT", "REST API"],
  },
  {
    num: "PROJECT 03",
    name: "COLLAB LIBRARY",
    desc: "AI-powered academic platform for document sharing, summarization, translation, MCQ generation, and voice-to-text. Role-based access control and real-time search with admin analytics.",
    stack: ["Django", "Python", "REST API", "AI/ML"],
  },
  {
    num: "PROJECT 04",
    name: "EV SALES ANALYSIS",
    desc: "Multi-year analysis of India's electric vehicle adoption trends across states and vehicle classes. Produced industry-ready visualizations and actionable policy insights from raw government datasets.",
    stack: ["Python", "Pandas", "Seaborn", "Matplotlib"],
  },
  {
    num: "PROJECT 05",
    name: "COCA\u2011COLA STOCK PREDICTOR",
    desc: "ML pipeline forecasting stock prices via technical indicators and feature engineering. Comparative analysis of multiple Scikit-learn regressors with evaluation metrics and visualized outcomes.",
    stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
  },
];

export default function Works() {
  return (
    <section id="works">
      <div className="section-label reveal">
        <span className="section-num">02</span>
        <h2 className="section-title">WORKS</h2>
        <span className="section-line"></span>
      </div>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <div className="project-card reveal" key={i}>
            <span className="project-num">{project.num}</span>
            <div className="project-arrow">↗</div>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-desc">{project.desc}</p>
            <div className="project-stack">
              {project.stack.map((tag) => (
                <span className="stack-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}

        {/* "More Coming Soon" card */}
        <div
          className="project-card reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            minHeight: "260px",
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
            MORE COMING
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "48px",
              color: "var(--border)",
              lineHeight: 1,
            }}
          >
            SOON →
          </div>
        </div>
      </div>
    </section>
  );
}
