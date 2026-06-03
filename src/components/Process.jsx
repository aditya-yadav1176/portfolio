import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "../data/data";

function TimelineStep({ step, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        flexDirection: isEven ? "row" : "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "4rem",
        position: "relative"
      }}
      className="timeline-row"
    >
      {/* Spacer for the opposite side */}
      <div style={{ width: "45%" }} className="timeline-spacer" />

      {/* Center Node */}
      <div style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        width: 56, height: 56, borderRadius: "50%",
        background: "var(--bg)", border: "2px solid var(--accent)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2, boxShadow: "0 0 0 6px var(--bg)"
      }} className="timeline-node">
        <span style={{ fontSize: "1.4rem" }}>{step.icon}</span>
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        style={{
          width: "45%", background: "var(--card-bg)",
          borderRadius: 24, padding: "2.5rem",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.02)",
          position: "relative"
        }}
        className="timeline-card"
      >
        {/* Step indicator */}
        <div style={{
          position: "absolute", top: -16, [isEven ? "left" : "right"]: 32,
          background: "var(--text)", color: "var(--bg)",
          fontFamily: "var(--font-head)", fontSize: "1.6rem",
          padding: "0.3rem 1.2rem", borderRadius: "100px", lineHeight: 1
        }} className="step-indicator">
          {step.step}
        </div>

        <h3 style={{ fontFamily: "var(--font-head)", fontSize: "2.6rem", lineHeight: 0.95, marginBottom: "0.8rem", marginTop: "0.5rem" }}>
          {step.title}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {step.description}
        </p>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {step.details.map((detail) => (
            <span key={detail} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.75rem", background: "var(--bg-2)", color: "var(--text-muted)",
              padding: "0.4rem 0.8rem", borderRadius: "100px", border: "1px solid var(--border)"
            }}>
              {detail}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="section-pad" style={{ background: "var(--bg-2)", overflow: "hidden" }}>
      <div className="container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "4rem" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent-dark)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            04 — Process
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </motion.div>

        <div style={{ textAlign: "center", marginBottom: "7rem" }}>
          <h2 style={{ fontFamily: "var(--font-head)", fontSize: "clamp(3.5rem, 8vw, 6.5rem)", lineHeight: 0.92, marginBottom: "1rem" }}>
            How I <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>Think</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            My approach to turning a blank canvas into a product that works, performs, and delights.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
          
          {/* Background Line */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: "50%",
            transform: "translateX(-50%)", width: 2, background: "var(--border)", zIndex: 0
          }} className="timeline-line" />
          
          {/* Animated Fill Line */}
          <motion.div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)", width: 2, background: "var(--accent-dark)", zIndex: 1,
            height: lineHeight
          }} className="timeline-line" />

          {/* Steps */}
          <div style={{ position: "relative", zIndex: 2, padding: "2rem 0" }}>
            {process.map((step, i) => (
              <TimelineStep key={step.step} step={step} index={i} />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-row { flex-direction: column !important; align-items: flex-start !important; margin-bottom: 3.5rem !important; padding-left: 3rem; }
          .timeline-spacer { display: none; }
          .timeline-card { width: 100% !important; padding: 2rem !important; }
          .timeline-node { left: 0 !important; transform: translateX(-50%) !important; width: 44px !important; height: 44px !important; }
          .timeline-node span { font-size: 1.1rem !important; }
          .timeline-line { left: 0 !important; }
          .step-indicator { right: auto !important; left: 32px !important; }
        }
      `}</style>
    </section>
  );
}
