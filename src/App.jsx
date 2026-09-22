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
import CustomCursor from "./components/CustomCursor";

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

      {/* Interactive custom cursor — automatically disabled on touch devices */}
      <CustomCursor />

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
    </>
  );
}
