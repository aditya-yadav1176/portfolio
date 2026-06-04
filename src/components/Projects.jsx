import { motion } from "framer-motion";
import { projects } from "../data/data";
import { useState } from "react";
import { FaFilm, FaStethoscope, FaMapMarkerAlt, FaStickyNote, FaQrcode, FaGamepad } from "react-icons/fa";

const projectIconMap = {
  1: <FaFilm />,
  2: <FaStethoscope />,
  3: <FaMapMarkerAlt />,
  4: <FaStickyNote />,
  5: <FaQrcode />,
  6: <FaGamepad />
};


function BentoCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const shape = {
    gridColumn: project.layout?.width || "span 1",
    gridRow: project.layout?.height || "span 1"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        ...shape,
        background: project.color || "var(--card-bg)",
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.02)",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
        transform: isHovered ? "scale(0.98)" : "scale(1)",
        minHeight: "320px",
        display: "block"
      }}
      className="bento-card"
    >
      {/* Massive Graphic Element covering the empty space */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none"
      }}>
        {/* A huge blurred or solid abstract representation of the project icon */}
        <div style={{
          fontSize: "clamp(7rem, 14vw, 12rem)",
          color: "var(--bg)", opacity: 0.35, mixBlendMode: "overlay",
          lineHeight: 1, filter: "blur(1px)",
          transform: "rotate(-10deg) scale(1.1)"
        }}>
          {projectIconMap[project.id] || <FaGamepad />}
        </div>
      </div>

      {/* Persistent Top Header (slides up and fades out on hover) */}
      <motion.div
        animate={{
          opacity: isHovered ? 0 : 1,
          y: isHovered ? -15 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          zIndex: 30,
          pointerEvents: "none"
        }}
      >
        <div>
          <h3 style={{ 
            fontFamily: "var(--font-head)", fontSize: "clamp(1.8rem, 2.2vw, 2.5rem)", 
            lineHeight: 1, marginBottom: "0.2rem", 
            color: "var(--bg)",
          }}>
            {project.title}
          </h3>
          <p style={{ 
            fontFamily: "var(--font-mono)", fontSize: "0.85rem", 
            color: "var(--bg)", 
            opacity: 0.9,
          }}>
            {project.subtitle}
          </p>
        </div>
      </motion.div>

      {/* Floating Base Tag (fades out on hover) */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 10 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute", bottom: "1.75rem", left: "1.75rem", zIndex: 5
        }}
      >
        <span style={{ 
          fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 500,
          background: "rgba(255,255,255,0.25)", color: "var(--bg)", 
          padding: "0.5rem 1.2rem", borderRadius: "100px", border: `1px solid rgba(255,255,255,0.4)`
        }}>
          {project.tag}
        </span>
      </motion.div>

      {/* Smooth Absolute Hover Overlay Layer (covers full height and aligns content cleanly) */}
      <motion.div
        initial={false}
        animate={{ y: isHovered ? "0%" : "102%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(12px)",
          padding: "1.5rem",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.05)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <h3 style={{ 
            fontFamily: "var(--font-head)", fontSize: "2rem", 
            lineHeight: 1.1, marginBottom: "0.25rem", color: "var(--text)"
          }}>
            {project.title}
          </h3>
          <p style={{ 
            fontFamily: "var(--font-mono)", fontSize: "0.8rem", 
            color: "var(--text-muted)", marginBottom: "0.75rem"
          }}>
            {project.subtitle}
          </p>
          <p style={{ 
            fontFamily: "var(--font-body)", 
            fontSize: project.layout?.width === "span 1" ? "0.8rem" : "0.88rem", 
            color: "var(--text)", opacity: 0.9, lineHeight: 1.5, marginBottom: "1rem"
          }}>
            {project.description}
          </p>
        </div>

        <div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
            {project.tech.map(tech => (
              <span key={tech} style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                background: "var(--bg-2)", color: "var(--text-muted)",
                padding: "0.2rem 0.65rem", borderRadius: "100px", border: "1px solid var(--border)"
              }}>
                {tech}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                style={{
                  width: "125px",
                  display: "inline-flex", justifyContent: "center", alignItems: "center",
                  padding: "0.55rem 0.8rem",
                  background: "var(--text)", color: "var(--bg)",
                  borderRadius: "100px", fontFamily: "var(--font-body)",
                  fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                  boxShadow: `0 4px 12px var(--accent-glow)`,
                  border: `1px solid var(--accent)`,
                  textDecoration: "none",
                  textAlign: "center"
                }}
              >
                Live Demo
              </motion.a>
            )}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              style={{
                width: "125px",
                display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.4rem",
                padding: "0.55rem 0.8rem", background: "transparent",
                color: "var(--text)", borderRadius: "100px",
                fontFamily: "var(--font-body)", fontSize: "0.8rem",
                fontWeight: 600, cursor: "pointer",
                border: `1px solid var(--border)`,
                textDecoration: "none",
                textAlign: "center"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              Github
            </motion.a>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="container">
        
        {/* Section label */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent-dark)", letterSpacing: "0.15em", textTransform: "uppercase" }}>03 — Projects</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </motion.div>

        <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(3.5rem, 8vw, 6.5rem)", lineHeight: 0.9, marginBottom: "4rem" }}>
          Selected <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>Works</span>
        </h2>

        {/* Bento Grid */}
        <div className="bento-grid">
          {projects.map((project, i) => (
            <BentoCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: auto;
          gap: 1.5rem;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-card {
            grid-column: span 2 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 600px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-card {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
