import Lanyard from './Lanyard';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg-number" aria-hidden="true">CM</div>

      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-tag">Full-Stack Developer &amp; AI Engineer · Ernakulam, Kerala</div>
          <h1 className="hero-name">
            <span className="hero-name-line">CHRISTOPHER</span>
            <span className="hero-name-line">MATHAI</span>
          </h1>
          <div className="hero-meta">
            <p className="hero-role">
              Building <span>AI-integrated systems</span> &amp;<br />
              scalable web applications<br />
              <span>from Kerala to the cloud.</span>
            </p>
            <span className="hero-scroll">
              <span className="hero-scroll-line"></span>
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <Lanyard position={[0, 0, 11]} fov={30} gravity={[0, -40, 0]} />
      </div>
    </section>
  );
}
