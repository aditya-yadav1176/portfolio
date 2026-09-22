import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isSupported, setIsSupported] = useState(false);
  const [cursorType, setCursorType] = useState("default"); // "default" | "clickable" | "project"
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Precise dot springs (fast & responsive)
  const dotSpringConfig = { damping: 28, stiffness: 600, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  // Fluid outer trailing ring springs (smooth lag)
  const ringSpringConfig = { damping: 26, stiffness: 240, mass: 0.5 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad) and not reduced motion
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateSupport = () => {
      setIsSupported(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    updateSupport();
    finePointerQuery.addEventListener("change", updateSupport);
    reducedMotionQuery.addEventListener("change", updateSupport);

    return () => {
      finePointerQuery.removeEventListener("change", updateSupport);
      reducedMotionQuery.removeEventListener("change", updateSupport);
    };
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check element hierarchy for contextual reactions
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const projectCard = target.closest("[data-cursor='project'], .bento-card");
      const clickable = target.closest("a, button, input, textarea, select, [role='button'], [data-cursor='button'], .email-cta-link");

      if (clickable) {
        setCursorType("clickable");
      } else if (projectCard) {
        setCursorType("project");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isSupported, isVisible, mouseX, mouseY]);

  if (!isSupported) return null;

  // Determine ring dimensions and styles based on state
  let ringWidth = 32;
  let ringHeight = 32;
  let ringBorderColor = "rgba(28, 25, 23, 0.35)";
  let ringBackground = "rgba(28, 25, 23, 0.03)";
  let ringBorderRadius = "50%";
  let showProjectText = false;

  if (cursorType === "clickable") {
    ringWidth = 52;
    ringHeight = 52;
    ringBorderColor = "var(--accent-dark)";
    ringBackground = "rgba(134, 239, 172, 0.22)";
  } else if (cursorType === "project") {
    ringWidth = 78;
    ringHeight = 32;
    ringBorderRadius = "100px";
    ringBorderColor = "var(--text)";
    ringBackground = "var(--text)";
    showProjectText = true;
  }

  const ringScale = isMouseDown ? 0.88 : 1;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Outer Smooth Lagging Ring / Badge */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
        animate={{
          width: ringWidth,
          height: ringHeight,
          borderRadius: ringBorderRadius,
          borderColor: ringBorderColor,
          backgroundColor: ringBackground,
          scale: ringScale,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          borderRadius: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.15, ease: "easeOut" },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
        className="custom-cursor-ring"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1.5px solid ${ringBorderColor}`,
            borderRadius: ringBorderRadius,
            boxSizing: "border-box",
            backdropFilter: cursorType === "clickable" ? "blur(2px)" : "none",
            WebkitBackdropFilter: cursorType === "clickable" ? "blur(2px)" : "none",
          }}
        >
          <AnimatePresence>
            {showProjectText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                VIEW ↗
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Central Sharp Dot (hidden in project pill mode) */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorType === "clickable" ? 6 : 5,
          height: cursorType === "clickable" ? 6 : 5,
          borderRadius: "50%",
          backgroundColor: cursorType === "clickable" ? "var(--accent-dark)" : "var(--text)",
          pointerEvents: "none",
        }}
        animate={{
          opacity: isVisible && !showProjectText ? 1 : 0,
          scale: isMouseDown ? 0.7 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.1 },
        }}
      />
    </div>
  );
}

