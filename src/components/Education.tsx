const educationItems = [
  {
    school: "CUSAT",
    degree: "Master of Computer Science",
    year: "2025 – 2027",
    spec: "Specialization in Artificial Intelligence",
  },
  {
    school: "Rajagiri College of Management & Applied Science",
    degree: "Bachelor of Computer Applications",
    year: "2022 – 2025",
    spec: "BCA · Ernakulam, Kerala",
  },
];

export default function Education() {
  return (
    <section id="education">
      <div className="section-label reveal">
        <span className="section-num">05</span>
        <h2 className="section-title">EDUCATION</h2>
        <span className="section-line"></span>
      </div>
      <div className="edu-list">
        {educationItems.map((edu, i) => (
          <div className="edu-item reveal" key={i}>
            <div className="edu-school">{edu.school}</div>
            <div className="edu-degree">{edu.degree}</div>
            <div className="edu-year">{edu.year}</div>
            <div className="edu-spec">{edu.spec}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
