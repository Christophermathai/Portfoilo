const experiences = [
  {
    date: "Mar 2026 – May 2026",
    role: "Data Science & Analytics",
    company: "Wheeltrix",
    desc: "Successfully completed the Data Science & Analytics Course, developing core competencies in data processing, analytics, and modeling methodologies.",
  },
  {
    date: "May 2025 – Jul 2025",
    role: "Data Analyst Intern",
    company: "Unified Mentor Pvt. Ltd.",
    desc: "End-to-end analysis on 4 projects — COVID-19 clinical trials, Coca-Cola stock prediction, web threat detection, and EV sales across India. Applied Python data stack for EDA, statistical modeling, and predictive analytics.",
  },
  {
    date: "Nov 2024",
    role: "AI Intern",
    company: "AccelerateX",
    desc: "Foundational AI project covering data preprocessing, model building, and deployment under industry mentorship.",
  },
  {
    date: "Apr 2024 – May 2024",
    role: "Web Development Intern",
    company: "Megatrend Knowledge Management Systems Pvt. Ltd.",
    desc: "Developed and tested web modules using PHP and JavaScript. Contributed to production-level code review and agile team workflows.",
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-label reveal">
        <span className="section-num">03</span>
        <h2 className="section-title">EXPERIENCE</h2>
        <span className="section-line"></span>
      </div>
      <div className="exp-list">
        {experiences.map((exp, i) => (
          <div className="exp-item reveal" key={i}>
            <div className="exp-date">{exp.date}</div>
            <div>
              <div className="exp-role">{exp.role}</div>
              <div className="exp-company">{exp.company}</div>
              <p className="exp-desc">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
