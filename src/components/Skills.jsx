import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";

import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaFigma, FaGitAlt, FaPython, FaCode } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiTailwindcss, SiVercel } from "react-icons/si";
import { BsTerminal } from "react-icons/bs";

const newTechStack = [
  "HTML", "CSS", "JavaScript", "ReactJS", "Tailwind CSS", "TypeScript",
  "NodeJS", "Python", "C", "C++", "Git", "GitHub", "VS Code", "Vercel", "Figma"
];

const iconMap = {
  "HTML": <FaHtml5 />,
  "CSS": <FaCss3Alt />,
  "JavaScript": <SiJavascript />,
  "ReactJS": <FaReact />,
  "Tailwind CSS": <SiTailwindcss />,
  "TypeScript": <SiTypescript />,
  "NodeJS": <FaNodeJs />,
  "Python": <FaPython />,
  "C": <BsTerminal />,
  "C++": <BsTerminal />,
  "Git": <FaGitAlt />,
  "GitHub": <FaGithub />,
  "VS Code": <FaCode />,
  "Vercel": <SiVercel />,
  "Figma": <FaFigma />
};

// Distribute 15 items into 4 columns (Desktop)
const col1 = newTechStack.slice(0, 4);
const col2 = newTechStack.slice(4, 8);
const col3 = newTechStack.slice(8, 12);
const col4 = newTechStack.slice(12);

// Distribute 15 items into 2 columns (Mobile)
const mobileCol1 = newTechStack.slice(0, 8);
const mobileCol2 = newTechStack.slice(8);


const TechCard = ({ name }) => (
  <div
    className="skills-card"
    style={{
      width: "100%", aspectRatio: "1",
      background: "var(--card-bg)", borderRadius: "24px",
      border: "1px solid var(--border)", position: "relative",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "1.2rem",
      boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
      padding: "1.5rem"
    }}
  >
    <div className="skills-icon-wrap" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--text)", opacity: 0.85 }}>
      {iconMap[name] || <BsTerminal />}
    </div>
    <h3 className="skills-card-title" style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.9rem, 1.3vw, 1.25rem)", fontWeight: 600, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.2 }}>
      {name}
    </h3>
  </div>
);

const Column = ({ items, y, topOffset }) => (
  <motion.div
    className="skills-column"
    style={{
      y, display: "flex", flexDirection: "column", gap: "2rem",
      width: "24%", maxWidth: "240px", minWidth: "140px", position: "relative",
      top: topOffset
    }}
  >
    {/* Massive duplication explicitly guarantees it NEVER shows empty space during rapid scroll tracking */}
    {[...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items].map((item, i) => (
      <TechCard key={i} name={item} />
    ))}
  </motion.div>
);

export default function Skills() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    // Start measuring when the gallery block hits bottom of viewport, 
    // stop when gallery block hits top of viewport.
    offset: ["start end", "end start"], 
  });

  const { height } = dimension;
  
  // Moving smoothly upwards while we scroll naturally downwards
  // Guarantees everything is fully cycled safely.
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -height * 1.0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -height * 1.8]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -height * 1.2]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -height * 1.5]);

  useEffect(() => {
    const lenis = new Lenis();
    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <section id="skills" style={{ background: "var(--bg-2)", color: "var(--text)", overflow: "hidden" }}>
      
      {/* Intro Overlay */}
      <div style={{ display: "flex", height: "40vh", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 0.9 }}>
            TECH <span style={{ color: "transparent", WebkitTextStroke: "2px var(--text)" }}>STACK</span>
          </h2>
          <div style={{ display: "grid", placeItems: "center", gap: "1.5rem", marginTop: "2rem" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)",
              textTransform: "uppercase", letterSpacing: "0.15em", position: "relative",
              paddingBottom: "1.5rem"
            }}>
              Scroll down to explore
              <div style={{
                position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)",
                width: 2, height: 16, background: "var(--border)"
              }} />
            </span>
          </div>
        </div>
      </div>

      {/* Parallax Gallery */}
      <div
        ref={gallery}
        className="skills-gallery"
        style={{
          position: "relative", boxSizing: "border-box", display: "flex",
          height: "120vh", gap: "2.5vw", overflow: "hidden",
          padding: "2vw", background: "var(--bg)",
          justifyContent: "center", alignItems: "flex-start"
        }}
      >
        {/* Desktop Gallery (4 columns) */}
        <div className="skills-desktop-gallery" style={{ display: "contents" }}>
          <Column items={col1} y={y1} topOffset="-5%" />
          <Column items={col2} y={y2} topOffset="-12%" />
          <Column items={col3} y={y3} topOffset="-8%" />
          <Column items={col4} y={y4} topOffset="-15%" />
        </div>

        {/* Mobile Gallery (2 columns) */}
        <div className="skills-mobile-gallery" style={{ display: "contents" }}>
          <Column items={mobileCol1} y={y1} topOffset="-5%" />
          <Column items={mobileCol2} y={y2} topOffset="-12%" />
        </div>
      </div>

      <div style={{ display: "flex", height: "30vh", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, background: "var(--bg)" }}>
        <div style={{ textAlign: "center" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)",
            textTransform: "uppercase", letterSpacing: "0.15em"
          }}>
            Keep scrolling
          </span>
        </div>
      </div>

      <style>{`
        .skills-mobile-gallery {
          display: none !important;
        }

        @media (max-width: 1024px) {
          .skills-gallery {
            gap: 1.5vw !important;
            padding: 1.5vw !important;
            height: 100vh !important;
          }
          .skills-column {
            width: 23% !important;
            min-width: 80px !important;
            gap: 1.25rem !important;
          }
          .skills-card {
            border-radius: 16px !important;
            padding: 0.75rem !important;
            gap: 0.5rem !important;
          }
          .skills-icon-wrap {
            font-size: 1.8rem !important;
          }
          .skills-card-title {
            font-size: 0.75rem !important;
          }
        }

        @media (max-width: 768px) {
          .skills-desktop-gallery {
            display: none !important;
          }
          .skills-mobile-gallery {
            display: contents !important;
          }
          .skills-gallery {
            gap: 1.5rem !important;
            padding: 1.5rem !important;
            height: 90vh !important;
          }
          .skills-column {
            width: 47% !important;
            min-width: 130px !important;
            gap: 1.5rem !important;
          }
          .skills-card {
            border-radius: 20px !important;
            padding: 1.25rem !important;
            gap: 0.8rem !important;
          }
          .skills-icon-wrap {
            font-size: 2.2rem !important;
          }
          .skills-card-title {
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 480px) {
          .skills-gallery {
            gap: 1rem !important;
            padding: 1rem !important;
          }
          .skills-column {
            width: 46% !important;
            min-width: 110px !important;
            gap: 1rem !important;
          }
          .skills-card {
            border-radius: 16px !important;
            padding: 1rem !important;
            gap: 0.6rem !important;
          }
          .skills-icon-wrap {
            font-size: 1.8rem !important;
          }
          .skills-card-title {
            font-size: 0.8rem !important;
          }
        }
      `}</style>

    </section>
  );
}
