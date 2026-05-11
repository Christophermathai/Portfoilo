'use client';

import { useEffect, useRef, useState } from "react";
import StaggeredMenu from "./StaggeredMenu";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: 'About', ariaLabel: 'About Me', link: '/#about' },
    { label: 'Works', ariaLabel: 'My Projects', link: '/#works' },
    { label: 'Experience', ariaLabel: 'My Experience', link: '/#experience' },
    { label: 'Contact', ariaLabel: 'Contact Me', link: '/#contact' }
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/Christophermathai' },
    { label: 'Instagram', link: 'https://www.instagram.com/christophermathai' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/christopher-mathai-248b6925a/' },
    { label: 'Phone', link: 'tel:+919567037933' }
  ];

  return (
    <>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="var(--muted)"
        openMenuButtonColor="var(--fg)"
        changeMenuColorOnOpen={true}
        colors={['#FF3D00', '#222220', '#111110']}
        accentColor="var(--accent)"
        isScrolled={scrolled}
      />
    </>
  );
}
