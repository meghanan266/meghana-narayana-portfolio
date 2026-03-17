import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveSection } from "../context/ActiveSectionContext";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.19, 1, 0.22, 1];

const APRICOT_SHADES = ["#F7882F", "#F9A35C", "#E8944A", "#D4783E"];
const CREAM_SHADES = ["#F5F0EB", "#E8E0D8", "#FAFAF8", "#DDD5CC"];
const BLUEBERRY_SHADES = ["#6B7A8F", "#8A97A8", "#5A6B7E", "#4A5B6E"];
const DARK_SHADES = ["#0a0a0a", "#111111", "#1a1a1a", "#2a2a2a"];
const GOLD_SHADES = ["#F7C331", "#E5B52E", "#D4A625", "#F7882F"];
const LAPTOP_SHADES = ["#B0B0B0", "#C8C8C8", "#9A9A9A", "#D5D5D5", "#E0E0E0"];
const FRAME_SHADES = ["#4A3C2E", "#5C4B3A", "#3D3028", "#6B5A48"];

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickRegionColor(r, g, b) {
  // Hair: very dark
  if (r < 80 && g < 70 && b < 70) {
    return randomFrom(DARK_SHADES);
  }

  // Skin tones: warm, red-dominant
  if (r > 150 && g > 80 && g < 180 && b < 150 && r > g && g >= b) {
    return randomFrom(APRICOT_SHADES);
  }

  // Yellow / gold clothing (top)
  if (r > 190 && g > 150 && b < 130 && r > g) {
    return randomFrom(GOLD_SHADES);
  }

  // Jeans / blue clothing (bottom)
  if (b > 110 && b > g + 10 && b > r + 10 && r < 150) {
    return randomFrom(BLUEBERRY_SHADES);
  }

  // Laptop / neutral gray
  if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && r > 100 && r < 230) {
    return randomFrom(LAPTOP_SHADES);
  }

  // Chair / desk frame - medium dark warm
  if (
    r >= 60 && r <= 150 &&
    g >= 40 && g <= 120 &&
    b >= 30 && b <= 90
  ) {
    return randomFrom(FRAME_SHADES);
  }

  // Fallback: light / cream
  return randomFrom(CREAM_SHADES);
}

function pickRadius() {
  const r = Math.random();
  // Smaller base sizes so scattered dots feel finer
  if (r < 0.6) return 1.6 + Math.random() * 0.8; // small
  if (r < 0.85) return 2.6 + Math.random() * 1;  // medium
  return 3.6 + Math.random() * 1.2;              // large accents
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const wrap = (val, min, max) => {
  const range = max - min;
  return ((val - min) % range + range) % range + min;
};

const ROLES_PHRASES = ["Software Engineer", "Full Stack Developer", "Cloud Enthusiast", "Scalable Distributed Systems"];
const TYPING_MS = 90;
const DELETING_MS = 50;
const PAUSE_AFTER_TYPE_MS = 1800;
const PAUSE_AFTER_DELETE_MS = 400;

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const ctaRef = useRef(null);

  const particlesRef = useRef([]);
  const portraitBoundsRef = useRef(null);
  const scrollProgressRef = useRef(0);
  const rafRef = useRef(null);

  const { setActiveSection } = useActiveSection();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const [typedRole, setTypedRole] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const roleIndexRef = useRef(0);
  const typedRef = useRef("");
  const isDeletingRef = useRef(false);
  const typingTimeoutRef = useRef(null);

  // Looping typing animation: Software Engineer / Full Stack Developer
  useEffect(() => {
    const run = () => {
      const phrase = ROLES_PHRASES[roleIndexRef.current];
      if (isDeletingRef.current) {
        if (typedRef.current.length > 0) {
          typedRef.current = typedRef.current.slice(0, -1);
          setTypedRole(typedRef.current);
          typingTimeoutRef.current = setTimeout(run, DELETING_MS);
        } else {
          isDeletingRef.current = false;
          roleIndexRef.current = (roleIndexRef.current + 1) % ROLES_PHRASES.length;
          typingTimeoutRef.current = setTimeout(run, PAUSE_AFTER_DELETE_MS);
        }
      } else {
        if (typedRef.current.length < phrase.length) {
          typedRef.current = phrase.slice(0, typedRef.current.length + 1);
          setTypedRole(typedRef.current);
          typingTimeoutRef.current = setTimeout(run, TYPING_MS);
        } else {
          isDeletingRef.current = true;
          typingTimeoutRef.current = setTimeout(run, PAUSE_AFTER_TYPE_MS);
        }
      }
    };
    typingTimeoutRef.current = setTimeout(run, TYPING_MS);
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Track viewport size for mobile behaviour
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Active section observer
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection("home");
      },
      { threshold: 0, rootMargin: "0px 0px -50% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setActiveSection]);

  // GSAP ScrollTrigger for scroll progress + text drift
  // Disabled on small screens to avoid pinning / DOM mutations clashing with React on mobile
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          scrollProgressRef.current = p;

          if (!contentRef.current) return;

          let contentY = 0;
          let opacity = 1;

          // Smooth fade-out + drift between 45%–85% of the scroll
          const fadeStart = 0.45;
          const fadeEnd = 0.85;

          if (p >= fadeStart) {
            const raw = clamp((p - fadeStart) / (fadeEnd - fadeStart), 0, 1);
            const eased = easeOutCubic(raw);

            contentY = -40 * eased;
            opacity = 1 - eased;
          }

          gsap.set(contentRef.current, { y: contentY, opacity });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Particle system setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroEl = heroRef.current;
    if (!canvas || !heroEl) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const rect = heroEl.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const img = new Image();
    img.src = "/assets/desk-silhouette.png";
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      const baseWidth = img.width;
      const baseHeight = img.height;

      const rect = heroEl.getBoundingClientRect();
      const heroWidth = rect.width;
      const heroHeight = rect.height;

      const desiredWidthFrac = isMobile ? 0.8 : 0.58;
      const desiredHeightFrac = isMobile ? 0.5 : 0.82;
      const scaleByWidth = (heroWidth * desiredWidthFrac) / baseWidth;
      const scaleByHeight = (heroHeight * desiredHeightFrac) / baseHeight;
      const scale = Math.min(scaleByWidth, scaleByHeight);

      const portraitWidth = baseWidth * scale;
      const portraitHeight = baseHeight * scale;

      const offsetX = isMobile ? (heroWidth - portraitWidth) / 2 : heroWidth * 0.05;
      const offsetY = (heroHeight - portraitHeight) / 2;

      offCanvas.width = baseWidth;
      offCanvas.height = baseHeight;
      offCtx.drawImage(img, 0, 0, baseWidth, baseHeight);
      const imageData = offCtx.getImageData(0, 0, baseWidth, baseHeight).data;

      const particles = [];
      // Fewer dots overall: much coarser sampling
      const sampleGap = isMobile ? 22 : 14;

      const centerX = offsetX + portraitWidth / 2;
      const centerY = offsetY + portraitHeight / 2;

      for (let y = 0; y < baseHeight; y += sampleGap) {
        for (let x = 0; x < baseWidth; x += sampleGap) {
          const idx = (y * baseWidth + x) * 4;
          const r = imageData[idx];
          const g = imageData[idx + 1];
          const b = imageData[idx + 2];
          const a = imageData[idx + 3];

          // Skip transparent/white-ish background
          if (a < 180) continue;
          if (r > 240 && g > 240 && b > 240) continue;

          // Edge detection: if any neighbour at sampling distance is background
          let isEdge = false;
          const neighbours = [
            [sampleGap, 0],
            [-sampleGap, 0],
            [0, sampleGap],
            [0, -sampleGap],
          ];
          for (let n = 0; n < neighbours.length; n += 1) {
            const nx = x + neighbours[n][0];
            const ny = y + neighbours[n][1];
            if (nx < 0 || nx >= baseWidth || ny < 0 || ny >= baseHeight) {
              isEdge = true;
              break;
            }
            const nIdx = (ny * baseWidth + nx) * 4;
            const nr = imageData[nIdx];
            const ng = imageData[nIdx + 1];
            const nb = imageData[nIdx + 2];
            const na = imageData[nIdx + 3];
            if (na < 180 || (nr > 240 && ng > 240 && nb > 240)) {
              isEdge = true;
              break;
            }
          }

          const homeX = offsetX + x * scale;
          const homeY = offsetY + y * scale;

          const dx = homeX - centerX;
          const dy = homeY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const dirX = dx / dist;
          const dirY = dy / dist;

          const baseScatter = isMobile ? 220 : 360;
          const scatterDistance = baseScatter + Math.random() * (isMobile ? 180 : 260);

          const scatteredX = Math.random() * heroWidth;
          const scatteredY = Math.random() * (isMobile ? heroHeight * 0.8 : heroHeight);

          // Base \"river\" flow velocity (px/sec), random direction per particle
          const baseSpeed = isMobile ? 13 : 30;
          const speed = baseSpeed * (0.6 + Math.random() * 0.8);
          const angle = Math.random() * Math.PI * 2;
          const flowVX = Math.cos(angle) * speed;
          const flowVY = Math.sin(angle) * speed;

          let radius = pickRadius();
          let baseOpacity;
          let layer;

          const layerRand = Math.random();
          if (layerRand < 0.3) {
            layer = 0;
            baseOpacity = 0.6;
            radius *= 0.85;
          } else if (layerRand < 0.8) {
            layer = 1;
            baseOpacity = 0.85;
          } else {
            layer = 2;
            baseOpacity = 1;
            radius *= 1.15;
          }

          if (isEdge) {
            radius *= 1.5;
            baseOpacity = Math.min(1, baseOpacity + 0.15);
          }

          const color = pickRegionColor(r, g, b);

          particles.push({
            homeX,
            homeY,
            scatteredX,
            scatteredY,
            scatterOffsetX: dirX * scatterDistance + (Math.random() - 0.5) * 60,
            scatterOffsetY: dirY * scatterDistance + (Math.random() - 0.5) * 60,
            radius,
            color,
            baseOpacity,
            layer,
            floatAmpX: 1 + Math.random() * 2,
            floatAmpY: 1 + Math.random() * 2,
            floatFreq: 0.3 + Math.random() * 0.7,
            floatPhase: Math.random() * Math.PI * 2,
            flowVX,
            flowVY,
          });
        }
      }

      particlesRef.current = particles;
      portraitBoundsRef.current = {
        cx: centerX,
        cy: centerY,
        w: portraitWidth,
        h: portraitHeight,
      };
    };

    let startTime = performance.now();

    const render = (time) => {
      const t = (time - startTime) / 1000;
      const rect = heroEl.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const progress = scrollProgressRef.current;
      const particles = particlesRef.current;

      if (particles && particles.length) {
        const p = clamp(progress, 0, 1);

        // Amoeba blob behind portrait: theme-colored, smaller, and clearly 3D
        const bounds = portraitBoundsRef.current;
        if (bounds && p >= 0.35 && p <= 0.7) {
          // Much smoother visibility curve so the blob eases in/out gently
          const spanStart = 0.35;
          const spanEnd = 0.7;
          const localT = clamp((p - spanStart) / (spanEnd - spanStart), 0, 1);
          // Smoothstep-style easing (ease in + out)
          const eased = localT * localT * (3 - 2 * localT);
          const bgOpacity = 0.85 * Math.sin(eased * Math.PI);
          const cx = bounds.cx;
          const cy = bounds.cy;
          const baseR = Math.max(bounds.w, bounds.h) * 0.4;
          const n = 120;

          const wobble = (angle) =>
            1 +
            0.09 * Math.sin(angle * 2 + t * 0.3) +
            0.07 * Math.sin(angle * 3.1 + 1) +
            0.05 * Math.sin(angle * 5 + 2);

          const drawBlobPath = () => {
            // Build smooth closed curve using quadratic segments instead of straight lines
            const points = [];
            for (let i = 0; i < n; i += 1) {
              const angle = (i / n) * Math.PI * 2;
              const r = baseR * wobble(angle);
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              points.push({ x, y });
            }

            if (points.length < 3) return;

            ctx.beginPath();
            // Start at midpoint between last and first for a seamless join
            const last = points[points.length - 1];
            const first = points[0];
            let prev = last;
            let curr = first;
            let next = points[1];

            ctx.moveTo(
              (prev.x + curr.x) / 2,
              (prev.y + curr.y) / 2
            );

            for (let i = 0; i < points.length; i += 1) {
              prev = points[(i + points.length - 1) % points.length];
              curr = points[i];
              next = points[(i + 1) % points.length];

              const cpX = curr.x;
              const cpY = curr.y;
              const endX = (curr.x + next.x) / 2;
              const endY = (curr.y + next.y) / 2;

              ctx.quadraticCurveTo(cpX, cpY, endX, endY);
            }

            ctx.closePath();
          };

          // 1) Drop shadow to lift blob off background (never darker than hero bg)
          ctx.save();
          ctx.translate(8, 16);
          drawBlobPath();
          ctx.shadowColor = `rgba(0, 0, 0, ${0.4 * bgOpacity})`;
          ctx.shadowBlur = 22;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
          ctx.fill();
          ctx.restore();

          // 2) Main blob fill with soft light-to-dark gradient
          drawBlobPath();
          const lightX = cx - baseR * 0.35;
          const lightY = cy - baseR * 0.5;
          const grad = ctx.createRadialGradient(
            lightX,
            lightY,
            baseR * 0.1,
            cx,
            cy,
            baseR * 1.3
          );
          // Brightest tone: warm grey, slightly softer
          grad.addColorStop(0, `rgba(56, 50, 46, ${0.7 * bgOpacity})`);
          grad.addColorStop(0.4, `rgba(44, 39, 35, ${0.85 * bgOpacity})`);
          // Outer edge: close to hero background, slightly warmer
          grad.addColorStop(1, `rgba(20, 18, 16, ${0.9 * bgOpacity})`);
          ctx.fillStyle = grad;
          ctx.fill();

          // 3) Specular highlight on light side (very subtle)
          ctx.save();
          ctx.beginPath();
          const highlightR = baseR * 0.35;
          ctx.ellipse(
            lightX,
            lightY,
            highlightR * 0.9,
            highlightR * 1.1,
            -0.35,
            0,
            Math.PI * 2
          );
          // Specular highlight stays within the same warm grey family
          ctx.fillStyle = `rgba(80, 72, 66, ${0.23 * bgOpacity})`;
          ctx.fill();
          ctx.restore();

          // 4) Subtle rim light to separate from background
          ctx.save();
          drawBlobPath();
          // Rim light: slightly lighter warm grey, but not brighter than the center tone
          ctx.strokeStyle = `rgba(88, 80, 72, ${0.5 * bgOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        }

        // Float factor only around the fully-assembled phase
        let floatFactor = 0;
        if (p > 0.4 && p < 0.5) {
          floatFactor = (p - 0.4) / 0.1;
        } else if (p >= 0.5 && p <= 0.6) {
          floatFactor = 1;
        } else if (p > 0.6 && p < 0.7) {
          floatFactor = 1 - (p - 0.6) / 0.1;
        }

        for (let i = 0; i < particles.length; i += 1) {
          const part = particles[i];

          const floatOffsetX =
            Math.sin(t * part.floatFreq + part.floatPhase) *
            part.floatAmpX *
            floatFactor;
          const floatOffsetY =
            Math.cos(t * part.floatFreq + part.floatPhase) *
            part.floatAmpY *
            floatFactor;

          let x;
          let y;
          let opacity;
          let scale;

          if (p <= 0.4) {
            // Phase 1: scattered -> home; flow wraps so dots stay on screen
            const local = easeOutCubic(clamp(p / 0.4, 0, 1));
            const flowStrength = 1 - local;
            const flowX = part.flowVX * t * flowStrength;
            const flowY = part.flowVY * t * flowStrength;
            const scatteredNowX = wrap(part.scatteredX + flowX, 0, width);
            const scatteredNowY = wrap(part.scatteredY + flowY, 0, height);
            x = lerp(scatteredNowX, part.homeX, local);
            y = lerp(scatteredNowY, part.homeY, local);
            opacity = lerp(0.4, part.baseOpacity, local);
            scale = 1;
          } else if (p <= 0.6) {
            // Phase 2: hold
            x = part.homeX;
            y = part.homeY;
            opacity = part.baseOpacity;
            scale = 1;
          } else {
            // Phase 3: home -> outward scatter
            const local = clamp((p - 0.6) / 0.4, 0, 1);
            const targetX = part.homeX + part.scatterOffsetX;
            const targetY = part.homeY + part.scatterOffsetY;
            x = lerp(part.homeX, targetX, local);
            y = lerp(part.homeY, targetY, local);
            opacity = lerp(part.baseOpacity, 0, local);
            // Shrink more aggressively so end-state dots are finer
            scale = lerp(1, 0.15, local);
          }

          x += floatOffsetX;
          y += floatOffsetY;

          const radius = part.radius * scale;
          if (opacity <= 0 || radius <= 0.5) continue;

          ctx.globalAlpha = opacity;
          ctx.fillStyle = part.color;
          ctx.beginPath();
          ctx.arc(Math.round(x), Math.round(y), radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeCanvas);
      particlesRef.current = [];
    };
  }, [isMobile]);

  const handleContactClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-dark-950"
    >
      {/* Particle portrait canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 w-full h-full md:w-1/2 md:left-0 md:right-auto"
        aria-hidden="true"
        tabIndex={-1}
        style={{ willChange: "transform" }}
      />

      {/* Text content */}
      <div className="absolute inset-0 z-20 flex h-full w-full items-center justify-center md:justify-end overflow-visible">
        <div
          ref={contentRef}
          className="w-full min-w-0 max-w-full px-6 pr-8 text-center md:flex md:h-full md:w-1/2 md:min-w-0 md:flex-col md:justify-center md:px-10 md:pr-14 md:text-left lg:px-16 lg:pr-20 overflow-visible"
        >
          {/* Tagline */}
          <motion.div
            ref={taglineRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            <h2 className="font-accent text-2xl tracking-wide md:text-3xl lg:text-4xl">
              <span className="text-apricot">&lt;&gt;&nbsp;</span>
              <span className="text-cream">Turning Ideas Into Code</span>
              <span className="text-apricot">&nbsp;&lt;/&gt;</span>
            </h2>
          </motion.div>

          {/* Name */}
          <motion.div
            ref={nameRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-4 overflow-visible"
          >
            <h1 className="select-none font-display font-extrabold uppercase leading-[0.95] tracking-tight text-cream text-[clamp(1.5rem,4vw,3.5rem)]">
              <span className="block">
                I<span className="text-apricot">&apos;</span>M
              </span>
              <span className="inline-block max-w-full whitespace-nowrap pr-[0.35em] text-[clamp(1.35rem,3.8vw,3.5rem)]">
                MEGHANA NARAYANA<span className="text-apricot">.</span>
              </span>
            </h1>
          </motion.div>

          {/* Role — with apricot brush-stroke highlight */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease }}
            className="mt-4 min-h-[1.5em] font-sans text-lg font-medium text-cream md:text-xl"
          >
            <span className="relative inline-block">
              <span
                className="absolute inset-y-0 left-0 right-0 -z-10 rounded-sm bg-apricot/30"
                style={{ transform: "skewX(-4deg)", left: "-2%", right: "-2%" }}
              />
              {typedRole}
              {cursorVisible && <span className="ml-0.5 text-apricot/80">|</span>}
            </span>
          </motion.p>

          {/* Original tech stack code-like line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease }}
            className="mt-3 font-mono text-sm text-cream/80 md:text-xl"
          >
            .NET <span className="text-apricot">|</span> Node.js{" "}
            <span className="text-apricot">|</span> Angular{" "}
            <span className="text-apricot">|</span> React{" "}
            <span className="text-apricot">|</span> SQL{" "}
            <span className="text-apricot">|</span> AWS
          </motion.p>

          {/* CTA */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="mt-8"
          >
            <a
              href="#contact"
              onClick={handleContactClick}
              className="inline-block rounded-full bg-apricot px-8 py-4 font-sans text-lg font-semibold text-dark-950 transition duration-300 ease-out hover:scale-105 hover:bg-apricot-light"
            >
              Start a conversation!
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
