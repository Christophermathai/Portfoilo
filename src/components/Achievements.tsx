const achievements = [
  { place: "1ST", event: "Code Crafters", venue: "CASCADE 2025 · Cochin Arts & Science College" },
  { place: "2ND", event: "Build-A-Thon 2.0", venue: "Month-long hackathon · STACC at CUSAT" },
  { place: "2ND", event: "Binary Battle", venue: "TecXell 2024 · MITS Ernakulam" },
  { place: "2ND", event: "Binary Brainstorm", venue: "TecXell 2023 · MITS Ernakulam" },
  { place: "PUB", event: "AI in Medical Robotics", venue: "Research paper · ICAET 2025" },
  { place: "PUB", event: "Deepfakes & Cyber Threats", venue: "Publication · National Conference 2023" },
];

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="section-label reveal">
        <span className="section-num">04</span>
        <h2 className="section-title">AWARDS</h2>
        <span className="section-line"></span>
      </div>
      <div className="ach-grid">
        {achievements.map((ach, i) => (
          <div className="ach-item reveal" key={i}>
            <div className="ach-place">{ach.place}</div>
            <div className="ach-event">{ach.event}</div>
            <div className="ach-venue">{ach.venue}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
