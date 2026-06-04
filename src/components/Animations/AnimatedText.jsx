import { motion } from "framer-motion";

// Splits text into chars and animates each one
export function AnimatedChars({ text, className, style, delay = 0, stagger = 0.04 }) {
  const chars = text.split("");
  return (
    <span className={className} style={{ display: "inline-block", overflow: "hidden", ...style }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0, rotateX: -40 }}
          whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Word-by-word reveal
export function AnimatedWords({ text, className, style, delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          <motion.span
            initial={{ y: "120%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

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
