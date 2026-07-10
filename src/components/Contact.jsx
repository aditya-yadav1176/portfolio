import { useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../data/data";

function SocialLink({ href, label, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.4 }}
    >
      <motion.a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        whileHover={{ scale: 1.06, y: -3 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "0.8rem 1.6rem", borderRadius: "100px",
          border: "1px solid var(--border)",
          fontFamily: "var(--font-mono)", fontSize: "0.85rem",
          color: "var(--text-muted)", textDecoration: "none",
          transition: "all 0.2s ease",
          background: "var(--card-bg)",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = "var(--text)";
          e.currentTarget.style.color = "var(--text)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--text-muted)";
        }}
      >
        <motion.span animate={{ x: hovered ? 3 : 0 }}>
          {label}
        </motion.span>
        <motion.span
          animate={{ x: hovered ? 3 : 0, rotate: hovered ? 45 : 0 }}
          style={{ display: "inline-block" }}
        >
          ↗
        </motion.span>
      </motion.a>
    </motion.div>
  );
}

// Magnetic Button Effect
function MagneticEmailCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
      className="email-cta-wrapper"
    >
      <motion.a
        href={`mailto:${personal.email}`}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.05 }}
        className="email-cta-link"
      >
        <motion.span
          animate={{ x: hovered ? 10 : 0 }}
          className="email-cta-text"
        >
          {personal.email}
        </motion.span>
        
        <motion.div
          animate={{ x: hovered ? 5 : 0, rotate: hovered ? 45 : 0, scale: hovered ? 1.2 : 1 }}
          className="email-cta-arrow"
        >
          ↗
        </motion.div>
      </motion.a>
    </motion.div>
  );
}

export default function Contact() {
  const text = "LET'S BUILD SOMETHING AWESOME.";
  const words = text.split(" ");

  return (
    <section id="contact" className="section-pad" style={{ background: "var(--bg)", overflow: "hidden", position: "relative" }}>
      {/* Decorative Accent */}
      <div style={{
        position: "absolute", bottom: "-10%", left: "50%",
        transform: "translateX(-50%)",
        width: "80%", height: 400,
        background: "radial-gradient(ellipse at bottom, rgba(134,239,172,0.15) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: "4rem" }}>
        
        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3rem" }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.85rem",
            color: "var(--accent-dark)", letterSpacing: "0.2em", textTransform: "uppercase",
            border: "1px solid var(--accent-dark)", padding: "0.5rem 1.5rem", borderRadius: "100px"
          }}>
            What's Next?
          </span>
        </motion.div>

        {/* Big Impactful Typography */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ marginBottom: "5rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1vw" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 100, rotateZ: 5 },
                visible: { opacity: 1, y: 0, rotateZ: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(4rem, 11vw, 10rem)",
                lineHeight: 0.85, letterSpacing: "-0.02em",
                color: i === words.length - 1 ? "transparent" : "var(--text)",
                WebkitTextStroke: i === words.length - 1 ? "2px var(--text)" : "none",
                display: "inline-block"
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <MagneticEmailCTA />

        {/* Social links */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "5rem" }}>
          {[
            { href: personal.github, label: "GitHub" },
            { href: personal.linkedin, label: "LinkedIn" },
            { href: personal.instagram, label: "Instagram" },
          ].map((link, i) => (
            <SocialLink key={link.href} {...link} index={i} />
          ))}
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: 1, background: "var(--border)", transformOrigin: "center", marginBottom: "2.5rem" }}
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="footer-wrapper"
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: "1rem",
            fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)",
            paddingBottom: "2rem",
          }}
        >
          <span>© {new Date().getFullYear()} {personal.name}. All rights reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Designed & Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ color: "var(--accent-dark)", fontWeight: 600, display: "inline-block" }}
            >
              ♥
            </motion.span>
            by {personal.firstName}
          </span>
        </motion.div>
      </div>

      <style>{`
        .email-cta-wrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 4rem;
        }
        .email-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
          background: var(--text);
          color: var(--bg);
          padding: 1.25rem 3rem;
          border-radius: 100px;
          font-family: var(--font-body);
          font-size: 1.2rem;
          font-weight: 500;
          text-decoration: none;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .email-cta-text {
          position: relative;
          z-index: 1;
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .email-cta-arrow {
          position: relative;
          z-index: 1;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--accent);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        .footer-wrapper {
          width: 100%;
        }

        @media (max-width: 768px) {
          .email-cta-link {
            padding: 1rem 2rem;
            gap: 1.2rem;
            font-size: 1.05rem;
          }
          .email-cta-arrow {
            width: 36px;
            height: 36px;
            font-size: 1.1rem;
          }
          .email-cta-wrapper {
            margin-bottom: 3.5rem;
          }
          .footer-wrapper {
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            gap: 0.75rem !important;
          }
        }

        @media (max-width: 480px) {
          .email-cta-link {
            padding: 0.85rem 1.35rem;
            gap: 0.8rem;
            font-size: 0.85rem;
          }
          .email-cta-arrow {
            width: 30px;
            height: 30px;
            font-size: 0.9rem;
          }
          .email-cta-wrapper {
            margin-bottom: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
