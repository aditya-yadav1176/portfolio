import { motion } from "framer-motion";

// Marquee / ticker text
export function MarqueeText({ text, speed = 30 }) {
  const repeated = Array(6).fill(text);
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", display: "flex" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "4rem" }}
      >
        {repeated.map((t, i) => (
          <span key={i} style={{ fontFamily: "var(--font-head)", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "0.05em" }}>
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
