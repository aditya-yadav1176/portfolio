import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "../data/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: "1rem",
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "92%",
          maxWidth: "1100px",
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: scrolled ? "0.6rem 0" : "1rem 0",
          background: scrolled ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)",
          backdropFilter: scrolled ? "blur(12px) saturate(160%)" : "blur(8px) saturate(120%)",
          WebkitBackdropFilter: scrolled ? "blur(12px) saturate(160%)" : "blur(8px) saturate(120%)",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.4)" : "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "100px",
          boxShadow: scrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.08)" : "none",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            whileHover={{ scale: 1.04 }}
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "1.6rem",
              letterSpacing: "0.04em",
              color: "var(--text)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            AY
            <span style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              marginBottom: 2,
            }} />
          </motion.a>

          {/* Desktop links */}
          <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }} className="desktop-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                  whileHover={{ y: -2 }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href={`mailto:${personal.email}`}
            whileHover={{ scale: 1.05, backgroundColor: "var(--accent-dark)" }}
            whileTap={{ scale: 0.97 }}
            className="desktop-nav"
            style={{
              background: "var(--text)",
              color: "#fff",
              padding: "0.55rem 1.4rem",
              borderRadius: "100px",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
          >
            Hire Me
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y: menuOpen && i === 0 ? 9 : menuOpen && i === 2 ? -9 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "var(--text)",
                  borderRadius: 2,
                  transformOrigin: "center",
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: scrolled ? "4.5rem" : "5.2rem",
              left: "4%",
              right: "4%",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              zIndex: 999,
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "2rem",
                  color: "var(--text)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
