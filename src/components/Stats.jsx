import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  const [activeCert, setActiveCert] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    if (activeCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCert]);

  return (
    <section style={{ background: "var(--text)", overflow: "hidden", padding: "5rem 0 0" }}>
      {/* Marquee */}
      <div style={{ marginBottom: "4rem", color: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <MarqueeText text="FRONTEND DEVELOPER · UI/UX · REACT.JS · FULLSTACK ENTHUSIAST · AI BUILDER · " speed={40} />
      </div>

      <div className="container">
        {/* Stats grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{ textAlign: "center", minWidth: 0 }}
            >
              <div style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
                lineHeight: 0.95,
                color: "var(--accent)",
                marginBottom: "0.5rem",
              }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: "0.78rem",
                color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em",
                textTransform: "uppercase",
                overflowWrap: "break-word",
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "3rem", paddingBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.78rem",
                color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em",
                textTransform: "uppercase", margin: 0,
              }}
            >
              Certifications
            </motion.p>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.72rem",
              color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em",
            }}>
              Click any card to preview certificate
            </span>
          </div>

          <div className="cert-grid">
            {certifications.map((cert, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setActiveCert(cert)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveCert(cert);
                    }
                  }}
                  className="cert-card"
                  style={{
                    background: isHovered ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isHovered ? "rgba(134, 239, 172, 0.35)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 16,
                    cursor: "pointer",
                    transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: isHovered ? "0 12px 30px rgba(0,0,0,0.25)" : "none",
                  }}
                >
                  {/* Info Column */}
                  <div className="cert-info" style={{ minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                        <div style={{
                          display: "inline-block",
                          background: "var(--accent)",
                          color: "var(--text)",
                          borderRadius: 8,
                          padding: "0.22rem 0.7rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          flexShrink: 0,
                        }}>
                          {cert.tech}
                        </div>
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: isHovered ? "var(--accent)" : "rgba(255,255,255,0.32)",
                          transition: "color 0.25s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                        }}>
                          Preview ↗
                        </span>
                      </div>

                      <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        color: "#fff",
                        fontWeight: 500,
                        lineHeight: 1.45,
                        marginBottom: "0.5rem",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}>
                        {cert.title}
                      </p>
                    </div>

                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.4,
                      overflowWrap: "break-word",
                    }}>
                      {cert.org} · {cert.period}
                    </p>
                  </div>

                  {/* Certificate Preview Thumbnail */}
                  {cert.image && (
                    <div
                      className="cert-thumb-wrap"
                      style={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: `1px solid ${isHovered ? "rgba(134, 239, 172, 0.45)" : "rgba(255,255,255,0.14)"}`,
                        background: "#141210",
                        position: "relative",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                        transition: "border-color 0.3s ease",
                      }}
                    >
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate preview`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transform: isHovered ? "scale(1.05)" : "scale(1)",
                          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease",
                          filter: isHovered ? "brightness(1)" : "brightness(0.92)",
                        }}
                      />
                      {/* Subtle hover overlay badge */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: isHovered
                          ? "linear-gradient(to top, rgba(28,25,23,0.55) 0%, rgba(28,25,23,0) 60%)"
                          : "rgba(28,25,23,0.1)",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        padding: "0.35rem",
                        transition: "background 0.3s ease",
                      }}>
                        <span style={{
                          background: isHovered ? "var(--accent)" : "rgba(28,25,23,0.78)",
                          color: isHovered ? "var(--text)" : "#fff",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          padding: "0.15rem 0.45rem",
                          borderRadius: "6px",
                          backdropFilter: "blur(4px)",
                          transition: "all 0.25s ease",
                        }}>
                          View
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Preview Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActiveCert(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(18, 16, 14, 0.86)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="cert-modal-box"
              style={{
                background: "#1c1917",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "20px",
                padding: "1.5rem",
                maxWidth: "820px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "1.15rem",
                boxShadow: "0 25px 60px rgba(0,0,0,0.55)",
              }}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                    <span style={{
                      background: "var(--accent)",
                      color: "var(--text)",
                      borderRadius: "6px",
                      padding: "0.18rem 0.6rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}>
                      {activeCert.tech}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.45)",
                      overflowWrap: "break-word",
                    }}>
                      {activeCert.org} · {activeCert.period}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    color: "#fff",
                    fontWeight: 600,
                    lineHeight: 1.35,
                    overflowWrap: "break-word",
                  }}>
                    {activeCert.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveCert(null)}
                  aria-label="Close certificate preview"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fff",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Certificate Image Container */}
              <div style={{
                background: "#110f0e",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "0.65rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}>
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  style={{
                    width: "100%",
                    maxHeight: "58vh",
                    objectFit: "contain",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </div>

              {/* Modal Footer / Actions */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.73rem",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  {activeCert.credentialId ? `Credential ID: ${activeCert.credentialId}` : "Verified Certificate of Completion"}
                </div>

                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" }}>
                  {activeCert.verifyUrl && (
                    <a
                      href={activeCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.76rem",
                        fontWeight: 500,
                        color: "#fff",
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "0.5rem 1rem",
                        borderRadius: "100px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                      }}
                    >
                      Verify Credential ↗
                    </a>
                  )}
                  <a
                    href={activeCert.file || activeCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text)",
                      background: "var(--accent)",
                      padding: "0.5rem 1.1rem",
                      borderRadius: "100px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    Open Full Certificate ↗
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 2rem;
          margin-bottom: 5rem;
          width: 100%;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          width: 100%;
          align-items: stretch;
        }
        .cert-card {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 144px;
          align-items: center;
          gap: 1.25rem;
          padding: 1.35rem 1.5rem;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .cert-thumb-wrap {
          width: 144px;
          height: 102px;
        }
        @media (max-width: 1024px) {
          .cert-card {
            grid-template-columns: minmax(0, 1fr);
            gap: 1rem;
            padding: 1.25rem;
          }
          .cert-thumb-wrap {
            width: 100%;
            height: 170px;
            order: -1;
          }
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;
            margin-bottom: 3.5rem;
          }
        }
        @media (max-width: 640px) {
          .cert-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 1.25rem;
          }
          .cert-card {
            padding: 1.15rem;
          }
          .cert-thumb-wrap {
            height: 180px;
          }
          .cert-modal-box {
            padding: 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
}


