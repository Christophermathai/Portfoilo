const skills = [
  "Python", "React", "Next.js", "Django", "Node.js", "TypeScript",
  "Machine Learning", "OpenCV", "Google Cloud", "REST APIs",
  "MySQL", "Scikit-learn", "Tailwind CSS", "Flask", "PHP", "Tableau",
];

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track" id="marquee-track">
        {/* First set */}
        {skills.map((skill, i) => (
          <span className="marquee-item" key={`a-${i}`}>
            <span>·</span> {skill}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {skills.map((skill, i) => (
          <span className="marquee-item" key={`b-${i}`}>
            <span>·</span> {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
