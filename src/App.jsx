import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./styles/globals.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Process from "./components/Process";
import StatsSection from "./components/Stats";
import Contact from "./components/Contact";

// Cursor glow that follows mouse
function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      className="cursor-glow"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* Subtle cursor glow — hidden on mobile */}
      <div className="desktop-only-cursor">
        <CursorGlow />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Process />
        <StatsSection />
        <Contact />
      </main>

      <style>{`
        .desktop-only-cursor {
          display: block;
        }
        @media (max-width: 768px) {
          .desktop-only-cursor { display: none; }
        }
      `}</style>
    </>
  );
}
