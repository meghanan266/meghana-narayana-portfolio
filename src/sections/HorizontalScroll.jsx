import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActiveSection } from "../context/ActiveSectionContext";
import {
  SiReact, SiAngular, SiTypescript, SiNodedotjs,
  SiDotnet, SiTailwindcss, SiMysql, SiJavascript,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { experiences } from "../data/experience";

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT_SRC = "/assets/bg-pic.png";

// Panels: About + 5 experience panels — newest first (reverse chronological)
const expPanels = [...experiences];

const BG_STOPS = [
  { p: 0,    c: "#0a0a0a" },
  { p: 0.2,  c: "#0d1a2e" },
  { p: 0.4,  c: "#1a0d00" },
  { p: 0.6,  c: "#1a0d00" },
  { p: 0.8,  c: "#0a1a10" },
  { p: 1,    c: "#0a0a0a" },
];

const TOTAL_PANELS = 6; // About + 5 exp

// Floating info chips per panel (ordered: Camp K12, IQVIA Assoc, IQVIA SDE, UN, TA)
// 3 rows × 2 columns fills the full panel height
const CHIPS = [
  // UN Internship (newest role)
  [
    { scale: "lg", headline: "RAG pipeline",               label: "Governance case studies → policy reports", tech: "pgvector · OpenAI Embeddings · GPT-4o · FastAPI · conversation history", x: "2%",  y: "2%",  rot: -1 },
    { scale: "md", headline: "sub-300ms",                  label: "query response time",                  tech: "Node.js/Express · indexed PostgreSQL · AWS RDS · multi-filter queries",  x: "50%", y: "2%",  rot: 1  },
    { scale: "md", headline: "Data visualisation platform", label: "multi-government datasets",           tech: "React 18 · TypeScript · D3.js · hierarchical charts · cross-filtering",  x: "2%",  y: "36%", rot: -1 },
    { scale: "md", headline: "Zero manual exports",        label: "analysts work entirely in the UI",     tech: "interactive filters · instant chart updates · shareable views",           x: "50%", y: "36%", rot: 2  },
    { scale: "sm", headline: "AWS RDS + S3",               label: "cloud storage backbone",               tech: "PostgreSQL on RDS · document storage on S3 · Express API layer",         x: "2%",  y: "73%", rot: -2 },
    { scale: "sm", headline: "Multi-turn Q&A",             label: "follow-up refinement supported",       tech: "conversation history injected per request across turns",                  x: "50%", y: "73%", rot: 1  },
  ],
  // IQVIA SDE
  [
    { scale: "lg", headline: "10,000+",                    label: "drug trial records processed daily",   tech: "event-driven · Azure Functions + Service Bus · dead-letter queues · zero record loss", x: "2%",  y: "2%",  rot: -1 },
    { scale: "md", headline: "8s → under 3s",              label: "Redis cache cut DB load by 65%",       tech: "distributed caching · drug reference data · eliminated redundant DB hits",              x: "50%", y: "2%",  rot: 1  },
    { scale: "md", headline: "10K+ enterprise users",      label: "concurrent platform",                  tech: "ASP.NET Core API · Angular · Azure App Services · OAuth/JWT RBAC",                     x: "2%",  y: "36%", rot: -1 },
    { scale: "md", headline: "MVC → Web API",              label: "full platform migration",              tech: "modular lazy-loaded Angular · ASP.NET Core · 20h/week saved",                          x: "50%", y: "36%", rot: 2  },
    { scale: "sm", headline: "SonarQube CI/CD",            label: "25% fewer build failures",             tech: "GitLab pipelines · 50+ critical issues resolved",                                     x: "2%",  y: "73%", rot: -2 },
    { scale: "sm", headline: "Race condition fixed",       label: "5K+ records protected",                tech: "pessimistic locking · concurrent drug data writes",                                   x: "50%", y: "73%", rot: 1  },
  ],
  // IQVIA Associate
  [
    { scale: "lg", headline: "70% faster",                 label: "dashboard render time",                tech: "SQL Server stored procs + server-side pagination on 100K+ rows",          x: "2%",  y: "2%",  rot: -1 },
    { scale: "md", headline: "35% fewer defects",          label: "in production",                        tech: "50+ xUnit / Moq tests · market intelligence pipeline",                    x: "50%", y: "2%",  rot: 1  },
    { scale: "md", headline: "Clinical trials tracker",    label: "built end-to-end",                     tech: "Angular · ASP.NET Core (C#) · EF Core state model · workflow automation", x: "2%",  y: "36%", rot: -1 },
    { scale: "md", headline: "20% faster API",             label: "response time",                        tech: "LINQ optimization · query tuning · pagination",                           x: "50%", y: "36%", rot: 2  },
    { scale: "sm", headline: "Selenium harvesting",        label: "200+ pharma websites",                 tech: "ClinicalTrials.gov · HTML Agility Pack · .NET",                           x: "2%",  y: "72%", rot: -2 },
    { scale: "sm", headline: "30+ bugs resolved",          label: "high-priority production issues",      tech: "QA collaboration · DB team · root cause analysis",                        x: "50%", y: "72%", rot: 1  },
  ],
  // TA
  [
    { scale: "lg", headline: "50+ students",               label: "guided to prod-grade apps",            tech: "TypeScript · React · Node.js · Jest · Git · Postman · CI/CD",             x: "2%",  y: "2%",  rot: -1 },
    { scale: "md", headline: "5 teams",                    label: "Agile sprint planning",                tech: "system design · data modeling · distributed architecture reviews",          x: "50%", y: "2%",  rot: 1  },
    { scale: "md", headline: "Code reviews",               label: "+ debugging sessions",                 tech: "CI/CD enforcement · quality standards · real-world best practices",         x: "2%",  y: "36%", rot: -1 },
    { scale: "md", headline: "Requirements → Deploy",      label: "full cycle per sprint",                tech: "requirements analysis · design · build · test · deploy",                   x: "50%", y: "36%", rot: 2  },
    { scale: "sm", headline: "Full-stack curriculum",      label: "end-to-end coverage",                  tech: "frontend + backend + databases + infra + testing",                         x: "2%",  y: "73%", rot: -2 },
    { scale: "sm", headline: "Distributed systems",        label: "architecture taught",                  tech: "CAP theorem · microservices · API design · async patterns",                x: "50%", y: "73%", rot: 1  },
  ],
  // Camp K12 (oldest)
  [
    { scale: "lg", headline: "85%",                        label: "positive feedback rate",               tech: "50+ students across live sessions",                                        x: "2%",  y: "2%",  rot: -1 },
    { scale: "md", headline: "AI · Python · Web Dev",      label: "curriculum taught",                    tech: "live coding, hands-on projects every session",                             x: "50%", y: "2%",  rot: 1  },
    { scale: "md", headline: "Abstract → Intuitive",       label: "teaching philosophy",                  tech: "visual aids · real-world analogies · demos",                               x: "2%",  y: "36%", rot: -1 },
    { scale: "md", headline: "Recursion explained",        label: "to 12-year-olds",                      tech: "if they get it, the explanation works",                                    x: "50%", y: "36%", rot: 2  },
    { scale: "sm", headline: "Consistent engagement",      label: "across all sessions",                  tech: "high-energy, project-driven format",                                       x: "2%",  y: "72%", rot: -2 },
    { scale: "sm", headline: "Remote delivery",            label: "live interactive sessions",            tech: "Zoom · screen sharing · collaborative tools",                              x: "50%", y: "72%", rot: 1  },
  ],
];

// Floating snippets per experience panel
const SNIPPETS = [
  // UN Internship
  [
    { text: "pgvector <=> embedding",  x: "4%",  y: "6%",  dur: 21, size: "text-sm" },
    { text: "openai.chat(messages)",   x: "78%", y: "12%", dur: 19, size: "text-xs" },
    { text: "d3.hierarchy(data)",      x: "8%",  y: "80%", dur: 22, size: "text-xs" },
    { text: "SELECT embedding <=>",    x: "62%", y: "84%", dur: 18, size: "text-sm" },
    { text: "history.push(message)",   x: "86%", y: "46%", dur: 24, size: "text-xs" },
  ],
  // IQVIA SDE
  [
    { text: "ServiceBus.SendAsync()",  x: "4%",  y: "8%",  dur: 19, size: "text-sm" },
    { text: "AzureFunction.Run()",     x: "78%", y: "10%", dur: 21, size: "text-xs" },
    { text: "Redis.GetAsync(key)",     x: "8%",  y: "82%", dur: 17, size: "text-xs" },
    { text: "SonarQube.Analyze()",     x: "64%", y: "80%", dur: 23, size: "text-sm" },
    { text: "angular migrate --v15",   x: "88%", y: "50%", dur: 20, size: "text-xs" },
  ],
  // IQVIA Associate
  [
    { text: "Selenium.FindElement()",  x: "4%",  y: "6%",  dur: 20, size: "text-sm" },
    { text: "SELECT TOP 1000 * FROM", x: "80%", y: "14%", dur: 18, size: "text-xs" },
    { text: "response.time < 200ms",  x: "8%",  y: "78%", dur: 22, size: "text-xs" },
    { text: "crawler.navigate(url)",  x: "62%", y: "84%", dur: 19, size: "text-sm" },
    { text: "LINQ.Where(x => x.Id)",  x: "86%", y: "44%", dur: 23, size: "text-xs" },
  ],
  // TA
  [
    { text: "function teach(concept)", x: "4%",  y: "8%",  dur: 18, size: "text-sm" },
    { text: "for (student of class)", x: "78%", y: "12%", dur: 22, size: "text-xs" },
    { text: "feedback.push(positive)", x: "8%",  y: "80%", dur: 20, size: "text-xs" },
    { text: "recursion(recursion)",    x: "60%", y: "82%", dur: 24, size: "text-sm" },
    { text: "console.log('aha!')",     x: "88%", y: "52%", dur: 16, size: "text-xs" },
  ],
];

const EXP_ICONS = [
  // UN
  [
    { Icon: SiReact,      x: "70%", y: "16%", size: 110, rot: -8  },
    { Icon: SiTypescript, x: "6%",  y: "72%", size: 90,  rot: 12  },
    { Icon: SiTailwindcss,x: "46%", y: "6%",  size: 80,  rot: -5  },
  ],
  // IQVIA SDE
  [
    { Icon: VscAzure,     x: "70%", y: "18%", size: 110, rot: 5   },
    { Icon: SiAngular,    x: "6%",  y: "70%", size: 100, rot: -12 },
    { Icon: SiDotnet,     x: "46%", y: "8%",  size: 80,  rot: 8   },
  ],
  // IQVIA Associate
  [
    { Icon: SiDotnet,     x: "70%", y: "16%", size: 110, rot: -10 },
    { Icon: SiMysql,      x: "8%",  y: "72%", size: 90,  rot: 8   },
    { Icon: SiAngular,    x: "46%", y: "6%",  size: 80,  rot: -12 },
  ],
  // TA
  [
    { Icon: SiReact,      x: "72%", y: "18%", size: 110, rot: 15  },
    { Icon: SiJavascript, x: "6%",  y: "70%", size: 90,  rot: -8  },
    { Icon: SiNodedotjs,  x: "50%", y: "8%",  size: 80,  rot: 12  },
  ],
];

/* ── Hooks ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ── Helpers ── */
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
      className="pointer-events-none absolute select-none text-cream/[0.05]"
      style={{ left: x, top: y, fontSize: size, transform: `rotate(${rot}deg)` }}
    />
  ));
}

/* ── Panel 1: About ── */
function PanelAbout({ panelWidth }) {
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

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="panel-content relative flex h-full flex-shrink-0 items-center px-10 md:px-20"
      style={{ width: panelWidth }}
    >
      <div className="flex w-full flex-col gap-12 md:flex-row md:items-center">
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
            <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
            </svg>
            <span className="relative">Resume</span>
          </a>
        </div>

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
              <div className="absolute inset-0 h-[320px] w-[260px] rounded-[2rem] bg-apricot/10 md:h-[420px] md:w-[320px]"
                style={{ transform: "translateZ(-40px) scale(1.05)", filter: "blur(20px)" }} />
              <div className="absolute h-[320px] w-[260px] rounded-[2rem] border border-cream/[0.06] bg-cream/[0.03] md:h-[420px] md:w-[320px]"
                style={{ transform: "translateZ(-20px) translate(8px, 8px)" }} />
              <div className="relative h-[320px] w-[260px] overflow-hidden rounded-[2rem] md:h-[420px] md:w-[320px]"
                style={{
                  borderTop: "1px solid rgba(245,240,235,0.15)",
                  borderLeft: "1px solid rgba(245,240,235,0.1)",
                  borderRight: "1px solid rgba(245,240,235,0.1)",
                  transform: "translateZ(20px)",
                }}
              >
                <img src={PORTRAIT_SRC} alt="Meghana Narayana" className="about-photo h-full w-full object-cover object-top pt-4" />
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-3 -right-3 h-6 w-6 rounded-full bg-apricot" style={{ transform: "translateZ(30px)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Experience Panel ── */
function PanelExp({ role, snippets, icons, panelId, words, tagline, panelWidth }) {
  return (
    <div
      id={panelId}
      className="panel-content relative flex h-full flex-shrink-0 items-center overflow-hidden px-10 md:px-20"
      style={{ width: panelWidth }}
    >
      <TechIcons icons={icons} />
      <FloatingCode snippets={snippets} />

      <div className="relative z-10 flex w-full h-full items-center gap-16">

        {/* Left: identity */}
        <div className="flex-shrink-0 w-[32%]">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-apricot/20 bg-apricot/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-apricot" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-apricot">Experience</span>
          </div>
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-cream/30 mb-2">
            {role.duration}
          </p>
          <h2 className="font-display font-bold leading-[0.95] text-cream text-[clamp(1.5rem,3vw,3rem)]">
            {role.role}
          </h2>
          <p className="mt-2 font-sans text-sm text-cream/40">
            {role.company} &middot; {role.location}
          </p>
          <p className="mt-6 font-accent text-xl text-apricot/65 -rotate-1 leading-snug">
            {tagline}
          </p>
          {/* Vertical accent line */}
          <div className="mt-8 h-px w-12 bg-apricot/30" />
        </div>

        {/* Right: floating info chips */}
        <div className="relative flex-1 h-[80%]">
          {(words || []).map((chip, i) => {
            const isLg = chip.scale === "lg";
            const isMd = chip.scale === "md";
            return (
              <div
                key={i}
                className="exp-highlight absolute"
                style={{
                  left: chip.x,
                  top: chip.y,
                  transform: `rotate(${chip.rot}deg)`,
                  opacity: 0,
                  maxWidth: isLg ? "42%" : isMd ? "38%" : "32%",
                }}
              >
                {/* Headline */}
                <p
                  className="font-display font-bold leading-none text-apricot"
                  style={{
                    fontSize: isLg ? "clamp(2rem,4vw,3.5rem)" : isMd ? "clamp(1.2rem,2.2vw,1.8rem)" : "clamp(0.9rem,1.5vw,1.2rem)",
                    textShadow: "0 0 30px rgba(247,136,47,0.2)",
                  }}
                >
                  {chip.headline}
                </p>
                {/* Label */}
                <p
                  className="mt-1 font-sans font-medium text-cream/80 leading-snug"
                  style={{ fontSize: isLg ? "0.85rem" : isMd ? "0.78rem" : "0.7rem" }}
                >
                  {chip.label}
                </p>
                {/* Tech */}
                {chip.tech && (
                  <p
                    className="mt-0.5 font-sans text-cream/55 leading-snug"
                    style={{ fontSize: isLg ? "0.72rem" : "0.65rem" }}
                  >
                    {chip.tech}
                  </p>
                )}
                {/* Bottom accent line */}
                <div className="mt-2 h-px bg-apricot/20" style={{ width: isLg ? "2.5rem" : "1.5rem" }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Panel Dots ── */
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
          I&apos;m a software engineer who started in biotechnology. That background
          gave me a unique lens — I see systems everywhere, whether biological or digital.
        </p>
        <img src={PORTRAIT_SRC} alt="Meghana Narayana" className="mt-8 w-full max-w-xs rounded-2xl border border-apricot/20 object-cover" />
      </section>

      <section id="experience" className="bg-dark-950 px-6 py-20">
        <SectionLabel>Experience</SectionLabel>
        <h2 className="mb-10 font-display text-3xl font-bold text-cream">
          The road <span className="text-apricot">so far.</span>
        </h2>
        <div className="relative border-l-2 border-apricot/30 pl-8">
          {expPanels.map((role) => (
            <div key={role.company + role.duration} className="relative mb-12 last:mb-0">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-apricot shadow-md shadow-apricot/30" />
              <p className="font-sans text-sm text-apricot">{role.duration}</p>
              <p className="mt-1 font-display text-lg font-semibold text-cream">{role.role}</p>
              <p className="font-sans text-sm text-cream/70">{role.company}</p>
              {(role.bullets || []).map((bullet, bi) => (
                <p key={bi} className="mt-2 font-sans text-xs leading-relaxed text-cream/50">
                  &bull;{" "}
                  {bullet.map((chunk, ci) =>
                    chunk.highlight
                      ? <span key={ci} className="font-semibold text-apricot/80">{chunk.text}</span>
                      : <span key={ci}>{chunk.text}</span>
                  )}
                </p>
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
  const progressRef = useRef(null);
  const [activePanel, setActivePanel] = useState(0);
  const [panelWidth, setPanelWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );
  const { setActiveSection } = useActiveSection();

  // Panels are sized off window.innerWidth (not CSS 100vw) so their rendered
  // width always matches the scroll-distance math below — 100vw overshoots by
  // the scrollbar's width, which otherwise leaves a dead scroll gap at the end.
  useEffect(() => {
    const update = () => setPanelWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (isMobile || !trackRef.current || !containerRef.current) return;

    const handleScrollToExp = () => {
      const track = trackRef.current;
      if (!track) return;
      const st = ScrollTrigger.getById("horizontalScroll");
      if (!st) return;
      const totalWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const scrollDist = totalWidth - vw;
      const panel = track.querySelector("#experience");
      if (!panel) return;
      const progress = scrollDist > 0 ? panel.offsetLeft / scrollDist : 0;
      const targetScrollY = st.start + progress * (st.end - st.start);
      st.scroll(targetScrollY);
    };

    window.addEventListener("nav:scrollToExperience", handleScrollToExp);
    window.addEventListener("nav:scrollToSkills", handleScrollToExp);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      const totalWidth = track.scrollWidth;
      const vw = window.innerWidth;
      const scrollDist = totalWidth - vw;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          id: "horizontalScroll",
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
              if (scrollX >= panels[i].offsetLeft - vw * 0.4) { idx = i; break; }
            }
            setActivePanel(idx);
            setActiveSection(idx === 0 ? "home" : "experience");
          },
        },
      });

      mainTl.to(track, { x: -scrollDist, ease: "none", duration: 1 }, 0);

      BG_STOPS.forEach(({ p, c }, i) => {
        if (i === 0) { gsap.set(container, { backgroundColor: c }); return; }
        mainTl.to(container, {
          backgroundColor: c,
          duration: p - BG_STOPS[i - 1].p,
          ease: "none",
        }, BG_STOPS[i - 1].p);
      });

      // 3D photo entrance + peel-away
      const scrollLayer = track.querySelector(".about-photo-scroll");
      if (scrollLayer) {
        const panelFrac = vw / totalWidth;
        mainTl.fromTo(scrollLayer,
          { rotateY: -15, scale: 0.92 },
          { rotateY: 0, scale: 1, ease: "power1.out", duration: panelFrac * 0.5 }, 0);
        mainTl.to(scrollLayer,
          { rotateY: 20, scale: 0.88, opacity: 0.7, ease: "power2.in", duration: panelFrac * 0.5 },
          panelFrac * 0.5);
      }

      // Parallax floating elements
      track.querySelectorAll("[data-float-speed]").forEach((el) => {
        const speed = Number.parseFloat(el.dataset.floatSpeed);
        mainTl.to(el, { x: (1 - speed) * scrollDist * 0.25, ease: "none", duration: 1 }, 0);
      });

      // Staggered highlight bullets per panel
      const panels = track.querySelectorAll(".panel-content");
      panels.forEach((panel) => {
        const highlights = panel.querySelectorAll(".exp-highlight");
        if (!highlights.length) return;
        const revealAt = Math.max(0, (panel.offsetLeft - vw * 0.3)) / totalWidth;
        highlights.forEach((el, i) => {
          mainTl.to(el, { opacity: 1, y: 0, duration: 0.025, ease: "power2.out" }, revealAt + i * 0.015);
        });
      });

    }, containerRef);

    return () => {
      const st = ScrollTrigger.getById("horizontalScroll");
      if (st) st.kill();
      ctx.revert();
      window.removeEventListener("nav:scrollToExperience", handleScrollToExp);
      window.removeEventListener("nav:scrollToSkills", handleScrollToExp);
    };
  }, [isMobile]);

  if (isMobile) return <MobileLayout />;

  const TAGLINES = [
    "building AI that grounds policy in evidence",
    "scaled platform to 10K+ users · earned the Ovation Award",
    "automating the tedious, optimizing the rest",
    "guiding the next wave of engineers",
    "making code click for the next generation",
  ];
  const panelData = expPanels.map((role, i) => ({
    ...role,
    tagline: TAGLINES[i] || "",
  }));

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: BG_STOPS[0].c }}
    >
      <div ref={trackRef} className="flex h-screen will-change-transform">
        <PanelAbout panelWidth={panelWidth} />
        {panelData.map((role, i) => (
          <PanelExp
            key={role.company + role.duration}
            panelWidth={panelWidth}
            role={role}
            snippets={SNIPPETS[i] || []}
            icons={EXP_ICONS[i] || []}
            words={CHIPS[i] || []}
            tagline={role.tagline}
            panelId={i === 0 ? "experience" : `exp-panel-${i}`}
          />
        ))}
      </div>
      <PanelDots activeIndex={activePanel} />
      <ProgressBar progressRef={progressRef} />
    </div>
  );
}
