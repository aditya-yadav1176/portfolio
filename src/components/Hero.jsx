import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { personal } from "../data/data";

// Animated canvas background — drifting particles
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.4 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(134,239,172,${p.o})`; // updated to new brand color
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.5 }} />
  );
}

// Role switcher
function RoleSwitcher({ roles }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <div style={{ height: "2.4rem", overflow: "hidden", display: "inline-flex", alignItems: "center" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ display: "inline-block", color: "var(--accent-dark)", fontWeight: 600 }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Interactive Right Side Visual
function HeroVisual() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse to center
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div
        style={{
          width: "100%", maxWidth: 450,
          position: "relative",
          rotateX: smoothY,
          rotateY: smoothX,
          transformStyle: "preserve-3d",
          cursor: "grab",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
        transition={{ 
            opacity: { duration: 1, delay: 0.2 },
            scale: { duration: 1, delay: 0.2 },
            y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ cursor: "grabbing" }}
      >


        <img
          src="/upscalemedia-transformed.png"
          onError={(e) => { e.target.src = "/hero-tv.png"; }}
          alt="Developer Illustration"
          style={{
            width: "100%", height: "auto",
            objectFit: "contain",
            transform: "translateZ(40px)",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))"
          }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <ParticleCanvas />
      <div className="noise-overlay" />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "80px 80px", opacity: 0.4
      }} />

      <div className="container hero-container" style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingBottom: "4rem" }}>
        
        {/* LEFT COLUMN: Text content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }} className="hero-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "var(--card-bg)", border: "1px solid var(--border)",
              padding: "0.4rem 1rem", borderRadius: "100px", marginBottom: "1.5rem",  // changes
              boxShadow: "0 2px 12px rgba(0,0,0,0.03)", alignSelf: "flex-start"
            }}
            className="hero-badge"
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-dark)", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              Available for opportunities
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }} style={{ marginBottom: "2rem" }}>
            <h1 style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              lineHeight: 0.92, letterSpacing: "-0.01em",
              color: "var(--text)", marginBottom: "0.1em",
            }}>
              {personal.firstName.split("").map((char, i) => (
                <motion.span key={i} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 + i * 0.05 }} style={{ display: "inline-block" }}>{char}</motion.span>
              ))}
            </h1>
            <h1 style={{
              fontFamily: "var(--font-head)",
              fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
              lineHeight: 0.92, letterSpacing: "-0.01em",
              color: "transparent", WebkitTextStroke: "1.5px var(--text)",
            }}>
              {personal.lastName.split("").map((char, i) => (
                <motion.span key={i} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 + i * 0.05 }} style={{ display: "inline-block" }}>{char}</motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }} // changes
            className="hero-tagline-roles"
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-muted)", maxWidth: 400, lineHeight: 1.6 }}>
              {personal.tagline}
            </p>
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", padding: "0.5rem 1.2rem", borderRadius: "100px", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
              <RoleSwitcher roles={personal.roles} />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}
            className="hero-buttons"
          >
            <motion.a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--text)", color: "var(--bg)",
                padding: "0.9rem 2rem", borderRadius: "100px",
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.95rem",
                textDecoration: "none", transition: "box-shadow 0.2s ease",
              }}
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.a>

            <motion.a
              href="/Aditya_Yadav_Resume.pdf"
              download="Aditya_Yadav_Resume.pdf"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--card-bg)", color: "var(--text)",
                padding: "0.9rem 2rem", borderRadius: "100px",
                border: "1px solid var(--border)",
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              Download Resume
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Visual */}
        <div className="hero-visual">
          <HeroVisual />
        </div>

      </div>

      {/* Scroll indicator - absolute bottom left */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        onClick={scrollToAbout}
        style={{
          position: "absolute", bottom: "3rem", left: "var(--scroll-left, 3rem)",
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "1rem", zIndex: 10
        }}
        className="scroll-btn"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} style={{ width: 24, height: 40, border: "1.5px solid var(--border)", borderRadius: 12, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "4px" }}>
          <div style={{ width: 4, height: 8, background: "var(--text-muted)", borderRadius: 2 }} />
        </motion.div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Scroll
        </span>
      </motion.button>

      <style>{`
        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          width: 100%;
        }
        .hero-visual { display: flex; align-items: center; justify-content: flex-end; }
        
        @media (max-width: 900px) {
          .hero-container { grid-template-columns: 1fr; text-align: center; gap: 2rem; }
          .hero-left { align-items: center; }
          .hero-badge { align-self: center !important; }
          .hero-tagline-roles { align-items: center !important; }
          .hero-buttons { justify-content: center; }
          .hero-visual { display: none; }
          .scroll-btn { left: 50% !important; transform: translateX(-50%); bottom: 1.5rem !important; flex-direction: column; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
