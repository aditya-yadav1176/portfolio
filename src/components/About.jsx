import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personal } from "../data/data";
import { AnimatedWords } from "./Animations/AnimatedText";
import { ScrollLine } from "./Animations/ScrollLine";

function Badge({ children, style }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.04 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        background: "var(--card-bg)", border: "1px solid var(--border)",
        padding: "0.5rem 1rem", borderRadius: "100px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        fontFamily: "var(--font-mono)", fontSize: "0.8rem",
        cursor: "default", ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // 3D Tilt effect
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max rotation 8 degrees for a smooth, realistic tilt
    setTiltX(((y - centerY) / centerY) * -8);
    setTiltY(((x - centerX) / centerX) * 8);
  };
  
  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <section id="about" ref={sectionRef} style={{ position: "relative", overflow: "hidden", paddingTop: "5rem", paddingBottom: "5rem" }}>
      {/* Scroll line - centered appropriately in the gap between columns */}
      <div className="about-scroll-line" style={{ position: "absolute", top: "6rem", left: "50%", transform: "translateX(-50%)", zIndex: 0 }}>
        <ScrollLine height={450} />
      </div>

      <div className="container">
        {/* Section wrapper to pull content inwards for a modern, compact look */}
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
          >
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.78rem",
              color: "var(--accent-dark)", letterSpacing: "0.15em", textTransform: "uppercase",
            }}>
              01 — About
            </span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </motion.div>

          <div className="about-grid" style={{ alignItems: "flex-start" }}>

          {/* 1. Text description component (First in DOM) */}
          <div style={{ textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h2 style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 0.95, letterSpacing: "0.01em",
              marginBottom: "1.5rem", color: "var(--text)",
            }}>
              <AnimatedWords text="Mumbai-based Frontend" delay={0.1} />
              <br />
              <span style={{ color: "var(--accent-dark)" }}>
                <AnimatedWords text="Developer & UI Nerd" delay={0.3} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                fontFamily: "var(--font-body)", fontSize: "1.05rem",
                color: "var(--text-muted)", lineHeight: 1.75, marginBottom: "2rem",
                maxWidth: 480,
              }}
            >
              I’m Aditya Yadav — a frontend developer who loves turning ideas into clean, interactive web experiences. Based in Mumbai and currently pursuing B.E. in IT, I focus on building user-centric interfaces while constantly learning through real-world projects.
            </motion.p>

            {/* Badges row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.75rem", marginBottom: "2.5rem" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <Badge><span>📍</span> {personal.location}</Badge>
                <Badge><span>🎓</span> {personal.degree} — {personal.graduationYear}</Badge>
                <Badge><span>💻</span> Freelance</Badge>
              </div>
              <Badge style={{ background: "var(--accent)", border: "none", fontWeight: 600 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulse-white 2s infinite" }} />
                Open to Work
              </Badge>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
              {[
                { label: "GitHub ↗", href: personal.github },
                { label: "LinkedIn ↗", href: personal.linkedin },
                { label: `✉️ ${personal.email}`, href: `mailto:${personal.email}` },
              ].map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.82rem",
                    color: "var(--text-muted)", textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={e => e.target.style.color = "var(--text)"}
                  onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — visual card */}
          <motion.div style={{ y: imgY, display: "flex", justifyContent: "flex-end", width: "100%" }} className="about-visual">
            <div style={{ position: "relative", width: "100%", maxWidth: "420px" }}>
              {/* Main card */}
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(0,0,0,0.35)", transition: { duration: 0.2, ease: "easeOut" } }}
                animate={{ rotateX: tiltX, rotateY: tiltY }}
                viewport={{ once: true }}
                style={{
                  background: "var(--text)", borderRadius: 24,
                  padding: "2.5rem 2rem",
                  color: "#fff", position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                }}
              >
                {/* Accent blob inside card */}
                <div style={{
                  position: "absolute", top: -60, right: -60,
                  width: 200, height: 200, borderRadius: "50%",
                  background: "var(--accent)", opacity: 0.15, filter: "blur(40px)",
                  transform: "translateZ(-20px)",
                }} />
                
                <div style={{ fontFamily: "var(--font-head)", fontSize: "3.5rem", lineHeight: 1, marginBottom: "1.5rem", color: "var(--accent)", transform: "translateZ(30px)" }}>
                  {`</>`}
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                   <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", animation: "pulse-accent 2s infinite" }} />
                   <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", opacity: 0.7, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                     Currently studying at
                   </p>
                </div>

                <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.3rem", fontWeight: 600, lineHeight: 1.3, marginBottom: "0.5rem" }}>
                  {personal.college}
                </h3>
                
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--accent)", marginBottom: "1.5rem", opacity: 0.9 }}>
                  {personal.degree}
                </p>

                <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", padding: "0.4rem 0.8rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Class of {personal.graduationYear}
                </div>
              </motion.div>

              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.6 } }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: "easeOut" } }}
                // @ts-ignore
                style={{
                  background: "var(--accent)", borderRadius: 16,
                  padding: "1rem 1.25rem", color: "var(--bg)",
                  position: "absolute", bottom: -15, right: -20,
                  boxShadow: "0 12px 30px var(--accent-glow)",
                  display: "flex", flexDirection: "column", gap: "0.1rem",
                  cursor: "default", zIndex: 10,
                }}
              >
                <p style={{ fontFamily: "var(--font-head)", fontSize: "1.5rem", lineHeight: 1 }}>2024</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 600 }}>Building Since</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
        </div>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; }
        .about-visual { display: flex; }
        
        @keyframes pulse-white {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
          70% { box-shadow: 0 0 0 6px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes pulse-accent {
          0% { box-shadow: 0 0 0 0 var(--accent); }
          70% { box-shadow: 0 0 0 6px rgba(0,0,0,0); }
          100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
        }

        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 4rem; }
          .about-visual { 
            justify-content: center !important; 
            margin-top: 2rem; 
            transform: none !important; 
          }
          .about-scroll-line { 
            display: none !important; 
          }
        }
        @media (max-width: 768px) {
          .about-visual { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
