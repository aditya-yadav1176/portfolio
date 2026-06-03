import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { stats, certifications } from "../data/data";
import { MarqueeText } from "./Animations/AnimatedText";

function Counter({ value, suffix, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = value / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section style={{ background: "var(--text)", overflow: "hidden", padding: "5rem 0 0" }}>
      {/* Marquee */}
      <div style={{ marginBottom: "4rem", color: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <MarqueeText text="FRONTEND DEVELOPER · UI/UX · REACT.JS · FULLSTACK ENTHUSIAST · AI BUILDER · " speed={40} />
      </div>

      <div className="container">
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", marginBottom: "5rem" }} className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 0.95,
                color: "var(--accent)",
                marginBottom: "0.5rem",
              }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "3rem", paddingBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.78rem",
              color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em",
              textTransform: "uppercase", marginBottom: "2rem",
            }}
          >
            Certifications
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="cert-grid">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "1.5rem",
                  cursor: "default",
                }}
              >
                <div style={{
                  display: "inline-block",
                  background: "var(--accent)", borderRadius: 8,
                  padding: "0.25rem 0.75rem",
                  fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 600,
                  marginBottom: "1rem",
                }}>
                  {cert.tech}
                </div>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "0.95rem",
                  color: "#fff", fontWeight: 500, lineHeight: 1.4, marginBottom: "0.5rem",
                }}>
                  {cert.title}
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                  {cert.org} · {cert.period}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid { grid-template-columns: repeat(4, 1fr); }
        .cert-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
