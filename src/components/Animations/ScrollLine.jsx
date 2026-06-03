import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollLine({ height = 400, color = "var(--accent)" }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      style={{
        width: 2,
        height,
        background: "var(--border)",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          background: color,
          transformOrigin: "top",
          scaleY,
        }}
      />
    </div>
  );
}
