"use client";

import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Works from "@/components/Works";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  useScrollReveal();
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      <Loader onComplete={() => setIsReady(true)} />
      <CustomCursor />
      <Navbar />
      <Hero isReady={isReady} />
      <Marquee />
      <About />
      <Works />
      <Experience />
      <Achievements />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
