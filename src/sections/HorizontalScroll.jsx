import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveSection } from "../context/ActiveSectionContext";
import {
  SiReact, SiAngular, SiTypescript, SiNodedotjs, SiDocker,
  SiAmazonwebservices, SiDotnet, SiTailwindcss,
  SiMysql, SiJavascript, SiPython, SiTerraform, SiGit,
  SiPostman, SiJest,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { skills } from "../data/skills";
import { experiences } from "../data/experience";

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT_SRC = "/assets/bg-pic.png";
const timelineRoles = [...experiences].reverse();
const frontendSkills = skills.Frontend;
const backendSkills = skills.Backend;
const cloudToolsSkills = skills["Cloud & Tools"];

const BG_STOPS = [
  { p: 0, c: "#0a0a0a" },
  { p: 0.15, c: "#1a0825" },
  { p: 0.35, c: "#0d2137" },
  { p: 0.55, c: "#0a2818" },
  { p: 0.75, c: "#2a1508" },
  { p: 1, c: "#0a0a0a" },
];

const TOTAL_PANELS = 5;

const SNIPPETS_FE = [
  { text: "const App = () => {}", x: "4%", y: "6%", dur: 18, size: "text-sm" },
  { text: "useState(false)", x: "82%", y: "10%", dur: 24, size: "text-xs" },
  { text: 'className="flex"', x: "72%", y: "78%", dur: 20, size: "text-xs" },
  { text: "npm run build", x: "10%", y: "82%", dur: 22, size: "text-sm" },
  { text: "<Component />", x: "88%", y: "48%", dur: 16, size: "text-sm" },
  { text: "onClick={handler}", x: "52%", y: "5%", dur: 26, size: "text-xs" },
  { text: "useEffect(() => {})", x: "6%", y: "42%", dur: 19, size: "text-sm" },
  { text: "tailwind.config", x: "38%", y: "90%", dur: 23, size: "text-xs" },
  { text: "export default", x: "62%", y: "32%", dur: 21, size: "text-xs" },
  { text: "import React", x: "28%", y: "12%", dur: 17, size: "text-sm" },
];

const SNIPPETS_BE = [
  { text: "SELECT * FROM users", x: "32%", y: "6%", dur: 20, size: "text-sm" },
  { text: "app.listen(3000)", x: "80%", y: "14%", dur: 18, size: "text-xs" },
  { text: "async await fetch", x: "8%", y: "32%", dur: 16, size: "text-xs" },
  { text: "jwt.verify(token)", x: "32%", y: "92%", dur: 21, size: "text-sm" },
  { text: "res.status(200)", x: "22%", y: "68%", dur: 17, size: "text-sm" },
  { text: "app.use(express.json())", x: "84%", y: "72%", dur: 22, size: "text-xs" },
  { text: "DbContext.SaveChanges()", x: "4%", y: "56%", dur: 26, size: "text-sm" },
  { text: "router.get('/api')", x: "48%", y: "22%", dur: 23, size: "text-xs" },
  { text: "services.AddScoped<>()", x: "72%", y: "42%", dur: 19, size: "text-xs" },
  { text: "yield return result", x: "12%", y: "84%", dur: 24, size: "text-sm" },
];

const SNIPPETS_CT = [
  { text: "docker compose up", x: "4%", y: "6%", dur: 20, size: "text-sm" },
  { text: "terraform apply", x: "80%", y: "14%", dur: 18, size: "text-xs" },
  { text: "git push origin main", x: "84%", y: "72%", dur: 22, size: "text-sm" },
  { text: "az webapp deploy", x: "12%", y: "84%", dur: 24, size: "text-xs" },
  { text: "aws s3 sync ./dist", x: "8%", y: "32%", dur: 16, size: "text-xs" },
  { text: ".env.production", x: "4%", y: "56%", dur: 26, size: "text-sm" },
  { text: "npm test --coverage", x: "72%", y: "42%", dur: 19, size: "text-xs" },
  { text: "vercel --prod", x: "32%", y: "92%", dur: 21, size: "text-sm" },
  { text: "kubectl get pods", x: "48%", y: "22%", dur: 23, size: "text-xs" },
  { text: "git rebase -i HEAD~3", x: "22%", y: "68%", dur: 17, size: "text-sm" },
];

const FE_ICONS = [
  { Icon: SiReact, x: "72%", y: "18%", size: 120, rot: 15 },
  { Icon: SiAngular, x: "5%", y: "72%", size: 100, rot: -10 },
  { Icon: SiTypescript, x: "45%", y: "6%", size: 80, rot: 20 },
  { Icon: SiJavascript, x: "12%", y: "8%", size: 90, rot: -5 },
  { Icon: SiTailwindcss, x: "65%", y: "75%", size: 90, rot: 12 },
];

const BE_ICONS = [
  { Icon: SiNodedotjs, x: "72%", y: "16%", size: 110, rot: -12 },
  { Icon: SiDotnet, x: "8%", y: "72%", size: 100, rot: 15 },
  { Icon: SiPython, x: "64%", y: "82%", size: 80, rot: -8 },
  { Icon: SiMysql, x: "88%", y: "44%", size: 85, rot: 10 },
  { Icon: SiJavascript, x: "42%", y: "8%", size: 75, rot: 20 },
];

const CT_ICONS = [
  { Icon: VscAzure, x: "70%", y: "18%", size: 110, rot: 5 },
  { Icon: SiAmazonwebservices, x: "8%", y: "70%", size: 100, rot: -12 },
  { Icon: SiDocker, x: "48%", y: "8%", size: 90, rot: 8 },
  { Icon: SiTerraform, x: "82%", y: "78%", size: 80, rot: -15 },
  { Icon: SiGit, x: "18%", y: "14%", size: 75, rot: 12 },
  { Icon: SiPostman, x: "62%", y: "84%", size: 70, rot: -5 },
  { Icon: SiJest, x: "88%", y: "40%", size: 65, rot: 18 },
];

const YEAR_MARKS = ["2020", "2021", "2022", "2023", "2024", "2025"];

/* ── Hooks ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ── Helpers ── */
const tagRotations = ["-1deg", "1.5deg", "-0.5deg", "2deg", "-1.5deg", "0.5deg", "-2deg", "1deg"];

function SkillTag({ name, index }) {
  const rot = tagRotations[index % tagRotations.length];
  return (
    <span
      className="skill-tag inline-block rounded-full bg-white/[0.08] px-5 py-3 font-sans text-sm text-cream backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-apricot hover:text-dark-950 hover:shadow-lg hover:shadow-apricot/25 md:text-base"
      style={{ transform: `rotate(${rot})`, opacity: 0 }}
    >
      {name}
    </span>
  );
}

function SectionLabel({ children, center }) {
  return (
    <div className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-apricot" />
      <span className="font-sans text-sm uppercase tracking-widest text-apricot">{children}</span>
    </div>
  );
}

function FloatingCode({ snippets }) {
  return snippets.map((s, i) => (
    <span
      key={i}
      data-float-speed={0.3 + (i % 5) * 0.3}
      className={`pointer-events-none absolute select-none font-mono ${s.size} text-cream/[0.04]`}
      style={{ left: s.x, top: s.y }}
    >
      {s.text}
    </span>
  ));
}

function TechIcons({ icons }) {
  return icons.map(({ Icon, x, y, size, rot }, i) => (
    <Icon
      key={i}
      data-float-speed={0.4 + (i % 4) * 0.35}
      className="pointer-events-none absolute select-none text-cream/[0.06]"
      style={{ left: x, top: y, fontSize: size, transform: `rotate(${rot}deg)` }}
    />
  ));
}

/* ── Panel 1: About with interactive 3D photo ── */
function PanelAbout() {
  const panelRef = useRef(null);
  const tiltRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cx * 24, y: -cy * 24 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="panel-content relative flex h-full w-screen flex-shrink-0 items-center px-10 md:px-20"
    >
      <div className="flex w-full flex-col gap-12 md:flex-row md:items-center">
        {/* Text side */}
        <div className="md:w-[55%]">
          <SectionLabel>About Me</SectionLabel>
          <h2 className="font-display font-bold leading-[0.95] text-cream text-[clamp(2.5rem,6vw,6rem)]">
            Code meets
            <br />
            <span className="text-apricot">curiosity.</span>
          </h2>
          <p className="mt-6 font-accent text-xl text-apricot/60 -rotate-1">
            where systems thinking meets pixel pushing
          </p>
          <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-cream/70">
            Most of my best work started with someone saying "We've never done
            this before." That's how I ended up automating data harvesting at
            IQVIA, building policy visualization tools with UN researchers, and
            somehow convincing 50 kids that for loops are fun. I'm at my best
            when the problem is new and the stakes are real.
          </p>
          <a
            href="/assets/Meghana_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-apricot/30 bg-apricot/10 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-apricot backdrop-blur-md transition-all duration-500 hover:border-apricot/60 hover:bg-apricot/20 hover:shadow-[0_0_30px_rgba(247,136,47,0.15)] hover:tracking-wider"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-apricot/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <svg
              className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
            </svg>
            <span className="relative">Resume</span>
          </a>
        </div>

        {/* 3D Photo */}
        <div className="flex items-center justify-center md:w-[40%]" style={{ perspective: "900px" }}>
          <div className="about-photo-scroll" style={{ transformStyle: "preserve-3d" }}>
            <div
              ref={tiltRef}
              className="relative"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out",
                transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              {/* Shadow layer pushed back in 3D space */}
              <div
                className="absolute inset-0 h-[320px] w-[260px] rounded-[2rem] bg-apricot/10 md:h-[420px] md:w-[320px]"
                style={{ transform: "translateZ(-40px) scale(1.05)", filter: "blur(20px)" }}
              />
              {/* Mid layer - offset card for stacked depth */}
              <div
                className="absolute h-[320px] w-[260px] rounded-[2rem] border border-cream/[0.06] bg-cream/[0.03] md:h-[420px] md:w-[320px]"
                style={{ transform: "translateZ(-20px) translate(8px, 8px)" }}
              />
              {/* Main card */}
              <div
                className="relative h-[320px] w-[260px] overflow-hidden rounded-[2rem] md:h-[420px] md:w-[320px]"
                style={{
                  borderTop: "1px solid rgba(245,240,235,0.15)",
                  borderLeft: "1px solid rgba(245,240,235,0.1)",
                  borderRight: "1px solid rgba(245,240,235,0.1)",
                  transform: "translateZ(20px)",
                }}
              >
                <img
                  src={PORTRAIT_SRC}
                  alt="Meghana Narayana"
                  className="about-photo h-full w-full object-cover object-top pt-4"
                />
                {/* Subtle bottom vignette */}
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              {/* Small accent dot */}
              <div
                className="absolute -bottom-3 -right-3 h-6 w-6 rounded-full bg-apricot"
                style={{ transform: "translateZ(30px)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Panel 2: Frontend Skills ── */
function PanelFrontend() {
  return (
    <div id="skills" className="panel-content relative flex h-full w-screen flex-shrink-0 items-center overflow-hidden px-10 md:px-20">
      <TechIcons icons={FE_ICONS} />
      <FloatingCode snippets={SNIPPETS_FE} />
      <div className="relative z-10 flex w-full flex-col gap-12 md:flex-row md:items-center">
        <div className="md:w-[40%]">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="font-display font-bold leading-[0.95] text-cream text-[clamp(2.5rem,7vw,7rem)]">
            Front
            <br />
            <span className="text-apricot">end.</span>
          </h2>
          <p className="mt-4 font-accent text-xl text-apricot/60 -rotate-2">
            where pixels become experiences
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:w-[60%]">
          {frontendSkills.map((s, i) => (
            <SkillTag key={s} name={s} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Panel 3: Backend ── */
function PanelBackend() {
  return (
    <div className="panel-content relative flex h-full w-screen flex-shrink-0 items-center overflow-hidden px-10 md:px-20">
      <TechIcons icons={BE_ICONS} />
      <FloatingCode snippets={SNIPPETS_BE} />
      <div className="relative z-10 flex w-full flex-col-reverse gap-12 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-3 md:w-[60%]">
          {backendSkills.map((s, i) => (
            <SkillTag key={s} name={s} index={i} />
          ))}
        </div>
        <div className="md:w-[40%]">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="font-display font-bold leading-[0.95] text-cream text-[clamp(2.5rem,7vw,7rem)]">
            Back
            <br />
            <span className="text-apricot">end.</span>
          </h2>
          <p className="mt-4 font-accent text-xl text-apricot/60 -rotate-2">
            built to scale, designed to last
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Panel 4: Cloud & Tools ── */
function PanelCloudTools() {
  return (
    <div className="panel-content relative flex h-full w-screen flex-shrink-0 items-center overflow-hidden px-10 md:px-20">
      <TechIcons icons={CT_ICONS} />
      <FloatingCode snippets={SNIPPETS_CT} />
      <div className="relative z-10 flex w-full flex-col gap-12 md:flex-row md:items-center">
        <div className="md:w-[40%]">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="font-display font-bold leading-[0.95] text-cream text-[clamp(2rem,5vw,5.5rem)]">
            Cloud
            <br />
            <span className="text-apricot">&amp; Tools.</span>
          </h2>
          <p className="mt-4 font-accent text-xl text-apricot/60 -rotate-2">
            ship it, monitor it, repeat
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:w-[60%]">
          {cloudToolsSkills.map((s, i) => (
            <SkillTag key={s} name={s} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Panel 5: Experience Timeline ── */
function PanelExperience({ cursorRef, timelineTrackRef, lineRef }) {
  return (
    <div
      id="experience"
      className="panel-content relative flex h-full w-[250vw] flex-shrink-0 items-center overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(245,240,235,0.03) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="flex h-full w-full items-center">
        {/* Left heading area */}
        <div className="flex h-full w-[16%] flex-shrink-0 flex-col justify-center pl-12 pr-6">
          <SectionLabel>Experience</SectionLabel>
          <h2 className="font-display text-5xl font-bold leading-[0.95]">
            <span className="text-cream">The road</span>
            <br />
            <span className="text-apricot" style={{ textShadow: "0 0 40px rgba(247,136,47,0.2)" }}>so far.</span>
          </h2>
          <p className="mt-4 font-accent text-xl text-apricot/60 -rotate-1">
            building, breaking, rebuilding — repeat
          </p>
          <p className="mt-3 font-sans text-sm text-cream/40">
            5 roles &middot; 2 countries &middot; countless lessons
          </p>
        </div>

        {/* Right timeline area */}
        <div className="relative flex-1 pr-12">
          <div ref={timelineTrackRef} className="relative w-full">
            {/* Background line at vertical center */}
            <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-apricot/15" />
            {/* Filled progress line */}
            <div
              ref={lineRef}
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-apricot"
              style={{ width: "0%" }}
            />

            {/* Year markers */}
            <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between">
              {YEAR_MARKS.map((yr) => (
                <span key={yr} className="relative -top-5 font-mono text-[10px] text-cream/[0.08]">
                  {yr}
                </span>
              ))}
            </div>

            {/* Cursor */}
            <div
              ref={cursorRef}
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ left: "0%" }}
            >
              <span className="block h-7 w-3 rounded-sm bg-apricot shadow-[0_0_14px_rgba(247,136,47,0.6),0_0_28px_rgba(247,136,47,0.25)] animate-pulse" />
            </div>

            {/* Nodes */}
            <div className="relative flex justify-between">
              {timelineRoles.map((role, i) => {
                const above = i % 2 === 0;
                return (
                  <div
                    key={role.company + role.duration}
                    className="timeline-node relative flex flex-col items-center"
                    style={{ width: `${100 / timelineRoles.length}%` }}
                  >
                    {above ? (
                      <>
                        <div
                          className="glass mb-2 w-[290px] rounded-xl p-5 text-left"
                          data-node-detail
                          style={{ opacity: 0, transform: "translateY(10px) scale(0.95)" }}
                        >
                          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-apricot">{role.duration}</p>
                          <p className="mt-2 font-display text-base font-bold text-cream">{role.role}</p>
                          <p className="mt-1 font-sans text-xs text-cream/60">{role.company} &middot; {role.location}</p>
                          {role.highlights.map((h, hi) => (
                            <p key={hi} className="mt-2 font-sans text-[11px] leading-relaxed text-cream/50">&bull; {h}</p>
                          ))}
                        </div>
                        <div className="h-10 w-px bg-apricot/20" />
                        <div className="timeline-dot h-4 w-4 rounded-full bg-apricot/40 shadow-md transition-all duration-300" />
                        <div className="mt-2 h-20" />
                      </>
                    ) : (
                      <>
                        <div className="mb-2 h-20" />
                        <div className="timeline-dot h-4 w-4 rounded-full bg-apricot/40 shadow-md transition-all duration-300" />
                        <div className="h-10 w-px bg-apricot/20" />
                        <div
                          className="glass mt-2 w-[290px] rounded-xl p-5 text-left"
                          data-node-detail
                          style={{ opacity: 0, transform: "translateY(10px) scale(0.95)" }}
                        >
                          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-apricot">{role.duration}</p>
                          <p className="mt-2 font-display text-base font-bold text-cream">{role.role}</p>
                          <p className="mt-1 font-sans text-xs text-cream/60">{role.company} &middot; {role.location}</p>
                          {role.highlights.map((h, hi) => (
                            <p key={hi} className="mt-2 font-sans text-[11px] leading-relaxed text-cream/50">&bull; {h}</p>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Panel Dots Indicator ── */
function PanelDots({ activeIndex }) {
  return (
    <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-40 flex justify-center gap-2">
      {Array.from({ length: TOTAL_PANELS }).map((_, i) => (
        <span
          key={i}
          className={`block h-2 rounded-full transition-all duration-500 ${
            i === activeIndex ? "w-6 bg-apricot" : "w-2 bg-cream/20"
          }`}
        />
      ))}
    </div>
  );
}

/* ── Progress Bar ── */
function ProgressBar({ progressRef }) {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 h-[3px] bg-apricot/10">
      <div ref={progressRef} className="h-full bg-apricot" style={{ width: "0%" }} />
    </div>
  );
}

/* ── Mobile Layout ── */
function MobileLayout() {
  return (
    <div>
      <section className="bg-dark-950 px-6 py-20">
        <SectionLabel>About Me</SectionLabel>
        <h2 className="font-display text-4xl font-bold text-cream">
          Code meets <span className="text-apricot">curiosity.</span>
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-cream/70">
          I&apos;m a software developer who started in biotechnology. That
          background gave me a unique lens&mdash;I see systems everywhere,
          whether biological or digital.
        </p>
        <img src={PORTRAIT_SRC} alt="Meghana Narayana" className="mt-8 w-full max-w-xs rounded-2xl border border-apricot/20 object-cover" />
      </section>

      <section id="skills" className="bg-[#1a0825] px-6 py-20">
        <SectionLabel>Skills</SectionLabel>
        <h2 className="font-display text-4xl font-bold text-cream">Front<span className="text-apricot">end.</span></h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {frontendSkills.map((s) => (
            <span key={s} className="inline-block rounded-full bg-white/[0.08] px-4 py-2 font-sans text-sm text-cream">{s}</span>
          ))}
        </div>
      </section>

      <section className="bg-[#0d2137] px-6 py-20">
        <SectionLabel>Skills</SectionLabel>
        <h2 className="font-display text-4xl font-bold text-cream">Back<span className="text-apricot">end.</span></h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {backendSkills.map((s) => (
            <span key={s} className="inline-block rounded-full bg-white/[0.08] px-4 py-2 font-sans text-sm text-cream">{s}</span>
          ))}
        </div>
      </section>

      <section className="bg-[#0a2818] px-6 py-20">
        <SectionLabel>Skills</SectionLabel>
        <h2 className="font-display text-4xl font-bold text-cream">Cloud <span className="text-apricot">&amp; Tools.</span></h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {cloudToolsSkills.map((s) => (
            <span key={s} className="inline-block rounded-full bg-white/[0.08] px-4 py-2 font-sans text-sm text-cream">{s}</span>
          ))}
        </div>
      </section>

      <section id="experience" className="bg-dark-950 px-6 py-20">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mb-10 font-display text-3xl font-bold text-cream">
          The road <span className="text-apricot">so far.</span>
        </h2>
        <div className="relative border-l-2 border-apricot/30 pl-8">
          {timelineRoles.map((role) => (
            <div key={role.company + role.duration} className="relative mb-12 last:mb-0">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-apricot shadow-md shadow-apricot/30" />
              <p className="font-sans text-sm text-apricot">{role.duration}</p>
              <p className="mt-1 font-display text-lg font-semibold text-cream">{role.role}</p>
              <p className="font-sans text-sm text-cream/70">{role.company}</p>
              {role.highlights.map((h, hi) => (
                <p key={hi} className="mt-2 font-sans text-xs leading-relaxed text-cream/50">{h}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ── Main Component ── */
export default function HorizontalScroll() {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const timelineTrackRef = useRef(null);
  const lineRef = useRef(null);
  const progressRef = useRef(null);
  const [activePanel, setActivePanel] = useState(0);
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    if (isMobile || !trackRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      const totalWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const scrollDist = totalWidth - vw;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollDist}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
            const scrollX = self.progress * scrollDist;
            const panels = track.querySelectorAll(".panel-content");
            let idx = 0;
            for (let i = panels.length - 1; i >= 0; i--) {
              if (scrollX >= panels[i].offsetLeft - vw * 0.4) {
                idx = i;
                break;
              }
            }
            setActivePanel(idx);
            const sectionMap = ["home", "skills", "skills", "skills", "experience"];
            setActiveSection(sectionMap[idx]);
          },
        },
      });

      // Horizontal track movement
      mainTl.to(track, { x: -scrollDist, ease: "none", duration: 1 }, 0);

      // Smooth flowing background color
      BG_STOPS.forEach(({ p, c }, i) => {
        if (i === 0) {
          gsap.set(container, { backgroundColor: c });
          return;
        }
        mainTl.to(container, {
          backgroundColor: c,
          duration: p - BG_STOPS[i - 1].p,
          ease: "none",
        }, BG_STOPS[i - 1].p);
      });

      // 3D photo: entrance + peel-away via scroll on the scroll-layer
      const scrollLayer = track.querySelector(".about-photo-scroll");
      if (scrollLayer) {
        const panelFrac = vw / totalWidth;
        mainTl.fromTo(scrollLayer,
          { rotateY: -15, scale: 0.92 },
          { rotateY: 0, scale: 1, ease: "power1.out", duration: panelFrac * 0.5 },
          0
        );
        mainTl.to(scrollLayer,
          { rotateY: 20, scale: 0.88, opacity: 0.7, ease: "power2.in", duration: panelFrac * 0.5 },
          panelFrac * 0.5
        );
      }

      // Parallax for floating elements
      track.querySelectorAll("[data-float-speed]").forEach((el) => {
        const speed = Number.parseFloat(el.dataset.floatSpeed);
        mainTl.to(el, { x: (1 - speed) * scrollDist * 0.25, ease: "none", duration: 1 }, 0);
      });

      // Staggered skill tags
      gsap.set(track.querySelectorAll(".skill-tag"), { opacity: 0, y: 20 });
      track.querySelectorAll(".skill-tag").forEach((tag) => {
        const panel = tag.closest("[class*='w-screen']");
        if (!panel) return;
        const revealAt = Math.max(0, (panel.offsetLeft - vw * 0.3)) / totalWidth;
        mainTl.to(tag, { opacity: 1, y: 0, duration: 0.02, ease: "power2.out" }, revealAt);
      });

      // Experience timeline
      if (cursorRef.current && timelineTrackRef.current && lineRef.current) {
        const expPanel = track.querySelector("#experience");
        if (!expPanel) return;
        const pStart = expPanel.offsetLeft / totalWidth;
        const pEnd = (expPanel.offsetLeft + expPanel.offsetWidth) / totalWidth;
        const range = pEnd - pStart;

        mainTl.fromTo(cursorRef.current, { left: "0%" }, { left: "100%", ease: "none", duration: range }, pStart);
        mainTl.fromTo(lineRef.current, { width: "0%" }, { width: "100%", ease: "none", duration: range }, pStart);

        const details = timelineTrackRef.current.querySelectorAll("[data-node-detail]");
        const dots = timelineTrackRef.current.querySelectorAll(".timeline-dot");
        const count = details.length;

        details.forEach((detail, i) => {
          mainTl.to(detail, { opacity: 1, y: 0, scale: 1, duration: 0.04, ease: "back.out(1.4)" }, pStart + (range * (i + 0.25)) / count);
        });

        dots.forEach((dot, i) => {
          mainTl.to(dot, {
            backgroundColor: "#F7882F",
            boxShadow: "0 0 14px rgba(247,136,47,0.5)",
            scale: 1.4,
            duration: 0.04,
            ease: "power2.out",
          }, pStart + (range * (i + 0.2)) / count);
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) return <MobileLayout />;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: BG_STOPS[0].c }}
    >
      <div ref={trackRef} className="flex h-screen will-change-transform">
        <PanelAbout />
        <PanelFrontend />
        <PanelBackend />
        <PanelCloudTools />
        <PanelExperience cursorRef={cursorRef} timelineTrackRef={timelineTrackRef} lineRef={lineRef} />
      </div>
      <PanelDots activeIndex={activePanel} />
      <ProgressBar progressRef={progressRef} />
    </div>
  );
}
