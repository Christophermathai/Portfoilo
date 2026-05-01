"use client";

import { useEffect, useRef } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="nav" ref={navRef}>
      <span className="nav-name">CM · Portfolio</span>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#works">Works</a>
        <a href="#experience">Exp</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
