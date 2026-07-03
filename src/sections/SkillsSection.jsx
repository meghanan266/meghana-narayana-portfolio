import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../data/skills";
import { useActiveSection } from "../context/ActiveSectionContext";

// Row 1: Frontend, Backend — Row 2: Cloud & Tools, AI Engineering
const LAYOUT = [
  ["Frontend", "Backend"],
  ["Cloud & Tools", "AI Engineering"],
];

// Drawn from the site's actual palette (tailwind.config.js): apricot, citrus, blueberry
const CATEGORY_META = {
  "AI Engineering": { accent: "#F7882F" }, // apricot
  Frontend:         { accent: "#F7C331" }, // citrus
  Backend:          { accent: "#8A97A8" }, // blueberry-light
  "Cloud & Tools": { accent: "#7EA16B" },
};

const MAX_PER_RING = [6, 8, 99];
const RING_RATIOS_X = [0.26, 0.40, 0.44];
const RING_RATIOS_Y = [0.26, 0.36, 0.40];

const HUB_RADIUS = 38; // half of the 76px center circle
// Min gap (px) between circle edge and each successive ring of pills
const MIN_CLEARANCE = [60, 100, 130];

function buildPositions(count, w, h) {
  // Hub point — circle, arrows, and pills all share this exact coordinate.
  // Nudged slightly up-left so the header/label above doesn't make it read as low-right.
  const cx = w / 2 - w * 0.02;
  const cy = h / 2 - h * 0.03;
  const positions = [];
  let remaining = count;

  MAX_PER_RING.forEach((cap, ri) => {
    if (remaining <= 0) return;
    const n = Math.min(cap, remaining);
    // Clamp so pills never push past the quadrant's visible edge, even after the min-clearance floor
    const rx = Math.min(Math.max(w * RING_RATIOS_X[ri], HUB_RADIUS + MIN_CLEARANCE[ri]), w * 0.47);
    const ry = Math.min(Math.max(h * RING_RATIOS_Y[ri], HUB_RADIUS + MIN_CLEARANCE[ri] * 0.8), h * 0.44);
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + (ri % 2 === 0 ? 0 : Math.PI / n);
      positions.push({ x: Math.cos(angle) * rx, y: Math.sin(angle) * ry });
    }
    remaining -= n;
  });

  return { cx, cy, positions };
}

function RadialQuadrant({ category, items, inView, isRight, isBottom }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { accent } = CATEGORY_META[category];
  const capped = items.slice(0, MAX_PER_RING[0] + MAX_PER_RING[1]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() =>
      setSize({ w: el.offsetWidth, h: el.offsetHeight })
    );
    obs.observe(el);
    setSize({ w: el.offsetWidth, h: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  const { cx, cy, positions } =
    size.w > 0 ? buildPositions(capped.length, size.w, size.h) : { cx: 0, cy: 0, positions: [] };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        borderRight: isRight  ? "none" : "1px solid rgba(255,255,255,0.05)",
        borderBottom: isBottom ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${accent}09 0%, transparent 70%)`,
        }}
      />

      {/* SVG connecting lines — hand-drawn squiggle with arrowhead into each node */}
      {size.w > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <marker
              id={`arrow-${category.replace(/\s+/g, "-")}`}
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 L3,5 Z" fill={accent} fillOpacity={0.55} />
            </marker>
          </defs>
          {positions.map((pos, i) => {
            const len = Math.sqrt(pos.x ** 2 + pos.y ** 2) || 1;
            const nx = pos.x / len, ny = pos.y / len;
            // perpendicular unit vector for the wobble
            const px = -ny, py = nx;
            const wobble = 14 + (i % 3) * 6;
            const sign = i % 2 === 0 ? 1 : -1;
            const startX = cx + nx * HUB_RADIUS, startY = cy + ny * HUB_RADIUS;
            const endX = cx + pos.x - nx * 15, endY = cy + pos.y - ny * 15;
            const cp1x = startX + (endX - startX) * 0.3 + px * wobble * sign;
            const cp1y = startY + (endY - startY) * 0.3 + py * wobble * sign;
            const cp2x = startX + (endX - startX) * 0.65 - px * wobble * sign * 0.7;
            const cp2y = startY + (endY - startY) * 0.65 - py * wobble * sign * 0.7;
            const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
            return (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke={accent}
                strokeWidth={1}
                strokeLinecap="round"
                markerEnd={`url(#arrow-${category.replace(/\s+/g, "-")})`}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={inView ? { opacity: 0.4, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
                transition={{ delay: 0.1 + i * 0.04, duration: 0.55, ease: "easeOut" }}
              />
            );
          })}
        </svg>
      )}

      {/* Bigger, saturated center circle with label inside */}
      {size.w > 0 && (
        <motion.div
          className="absolute flex items-center justify-center rounded-full pointer-events-none"
          style={{
            left: cx - 40,
            top: cy - 40,
            width: 76,
            height: 76,
            transform: "translate(-50%, -50%)",
            background: accent,
            boxShadow: `0 0 30px ${accent}80, 0 0 0 6px ${accent}1a`,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ delay: 0.05, type: "spring", stiffness: 220, damping: 20 }}
        >
          <span
            className="font-sans text-[9px] font-black uppercase tracking-[0.14em] text-center leading-tight px-1"
            style={{ color: "#0a0a0a", whiteSpace: "pre-line" }}
          >
            {category.replace(" & ", "\n& ")}
          </span>
        </motion.div>
      )}

      {/* Skill pills */}
      {size.w > 0 &&
        capped.map((skill, i) => {
          const pos = positions[i];
          if (!pos) return null;
          return (
            <motion.span
              key={skill}
              className="absolute rounded-full font-sans font-medium cursor-default select-none whitespace-nowrap"
              style={{
                left: cx,
                top: cy,
                fontSize: "11px",
                padding: "4px 11px",
                border: "none",
                color: "#0a0a0a",
                backgroundColor: accent,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={
                inView
                  ? { x: pos.x, y: pos.y, opacity: 1, scale: 1 }
                  : { x: 0, y: 0, opacity: 0, scale: 0 }
              }
              transition={{
                delay: 0.18 + i * 0.055,
                type: "spring",
                stiffness: 58,
                damping: 11,
                mass: 1.2,
              }}
              whileHover={{
                scale: 1.12,
                filter: "brightness(1.15)",
                transition: { duration: 0.12 },
              }}
            >
              {skill}
            </motion.span>
          );
        })}
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-8%" });
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection("skills"); },
      { threshold: 0, rootMargin: "0px 0px -30% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative h-screen flex flex-col bg-dark-950 overflow-hidden"
    >
      {/* Header */}
      <div className="flex-shrink-0 px-10 md:px-20 pt-10 pb-5 border-b border-cream/[0.06]">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-apricot/30 bg-apricot/5 px-3 py-1"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-apricot opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-apricot" />
          </span>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-apricot">
            Skills
          </span>
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 font-display text-2xl font-bold text-cream md:text-3xl"
        >
          What I{" "}
          <span className="font-accent italic text-apricot">work with</span>
        </motion.h2>
      </div>

      {/* 2×2 radial grid */}
      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 pb-4">
        {LAYOUT.map((row, rowIdx) =>
          row.map((category, colIdx) => (
            <RadialQuadrant
              key={category}
              category={category}
              items={skills[category] || []}
              inView={inView}
              isRight={colIdx === 1}
              isBottom={rowIdx === 1}
            />
          ))
        )}
      </div>
    </section>
  );
}
