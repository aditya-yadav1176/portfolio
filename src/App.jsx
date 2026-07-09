import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import "./styles/globals.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Process from "./components/Process";
import StatsSection from "./components/Stats";
import Contact from "./components/Contact";

function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, { damping: 20, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);

      // Check if hovering over a clickable element for Cuberto effect
      const target = e.target;
      const isClickable = target.closest("a, button, input, textarea, select, [role='button']");
      scale.set(isClickable ? 2.5 : 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY, scale]);

  return (
    <motion.div
      className="cursor-glow"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
      }}
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
