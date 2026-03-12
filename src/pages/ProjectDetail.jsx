import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiArrowLeft,
  HiExternalLink,
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiLightningBolt,
} from "react-icons/hi";
import { allProjects } from "../data/projects";

const ease = [0.19, 1, 0.22, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease },
  }),
};

function getAdjacentProjects(projectId) {
  const idx = allProjects.findIndex((p) => p.id === projectId);
  if (idx === -1) return { prev: null, next: null };
  const prev = allProjects[(idx - 1 + allProjects.length) % allProjects.length];
  const next = allProjects[(idx + 1) % allProjects.length];
  return { prev, next };
}

function NarrativeCard({ number, label, text, accent }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={0.1}
      variants={fadeUp}
      className={`relative overflow-hidden rounded-2xl border p-8 md:p-10 ${
        accent
          ? "border-apricot/20 bg-apricot/[0.04]"
          : "border-cream/[0.06] bg-cream/[0.02]"
      }`}
    >
      <span className="mb-1 block font-mono text-5xl font-bold text-apricot/15">
        {number}
      </span>
      <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-apricot">
        {label}
      </h3>
      <p className="font-sans text-lg leading-relaxed text-cream/70">{text}</p>
    </motion.div>
  );
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={index * 0.08}
      variants={fadeUp}
      className="group rounded-xl border border-cream/[0.06] bg-cream/[0.02] p-6 transition-all duration-300 hover:border-apricot/20 hover:bg-apricot/[0.03]"
    >
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-apricot/10">
        <HiLightningBolt className="h-4 w-4 text-apricot" />
      </div>
      <p className="font-sans text-sm leading-relaxed text-cream/70">{feature}</p>
    </motion.div>
  );
}

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  useEffect(() => {
    setLoading(true);
    fetch("/assets/projectDetails.json")
      .then((res) => res.json())
      .then((data) => {
        setProject(data[projectId] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-apricot border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-dark-950">
        <h2 className="font-display text-3xl font-bold text-cream">
          Project not found
        </h2>
        <Link
          to="/projects"
          className="font-sans text-apricot underline underline-offset-4 transition-colors duration-300 hover:text-apricot-light"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const { prev, next } = getAdjacentProjects(projectId);
  const projectMeta = allProjects.find((p) => p.id === projectId);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* ── Hero ── */}
      <header className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-apricot/[0.03] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl px-6 md:px-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-cream/40 transition-colors duration-300 hover:text-apricot"
          >
            <HiArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
          </Link>

          {projectMeta?.category && (
            <motion.div custom={0.1} variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
              <span className="inline-block rounded-full bg-apricot/10 px-4 py-1.5 font-sans text-xs uppercase tracking-wider text-apricot">
                {projectMeta.category}
              </span>
            </motion.div>
          )}

          <motion.h1
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 font-display text-4xl font-bold leading-tight text-cream md:text-5xl lg:text-6xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-cream/50"
          >
            {project.description}
          </motion.p>

          {/* Tech pills */}
          {project.technologies?.length > 0 && (
            <motion.div custom={0.4} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-cream/[0.06] px-4 py-1.5 font-sans text-xs text-cream/60 transition-colors duration-300 hover:bg-apricot hover:text-dark-950"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          )}

          {project.link && (
            <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible" className="mt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-apricot px-7 py-3.5 font-sans font-semibold text-dark-950 transition-all duration-300 hover:scale-[1.02] hover:bg-apricot-light"
              >
                View on GitHub
                <HiExternalLink className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </div>
      </header>

      {/* ── The Story: Problem → Approach → Impact ── */}
      {(project.problem || project.approach || project.impact) && (
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-10 font-display text-3xl font-bold text-cream md:text-4xl"
          >
            The Story
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {project.problem && (
              <NarrativeCard number="01" label="The Challenge" text={project.problem} />
            )}
            {project.approach && (
              <NarrativeCard number="02" label="The Approach" text={project.approach} />
            )}
            {project.impact && (
              <NarrativeCard number="03" label="The Impact" text={project.impact} accent />
            )}
          </div>
        </section>
      )}

      {/* ── Key Features (glass cards grid) ── */}
      {project.keyFeatures?.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 font-display text-3xl font-bold text-cream md:text-4xl"
          >
            What I Built
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.keyFeatures.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── Screenshots ── */}
      {project.screenshots?.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-12 md:px-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="mb-8 font-display text-3xl font-bold text-cream md:text-4xl"
          >
            In Action
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {project.screenshots.map((src, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="overflow-hidden rounded-xl border border-cream/[0.06]"
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full transition-transform duration-300 hover:scale-[1.03]"
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── Prev / Next ── */}
      {(prev || next) && (
        <div className="mx-auto max-w-5xl border-t border-cream/10 px-6 py-12 md:px-16">
          <div className="flex items-start justify-between">
            {prev && (
              <Link
                to={`/project/${prev.id}`}
                className="group flex flex-col items-start gap-1 text-cream/50 transition-colors duration-300 hover:text-apricot"
              >
                <span className="flex items-center gap-2 font-sans text-sm uppercase tracking-wider">
                  <HiArrowNarrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="font-sans text-sm text-cream/30 transition-colors duration-300 group-hover:text-cream/60">
                  {prev.name}
                </span>
              </Link>
            )}
            {next && (
              <Link
                to={`/project/${next.id}`}
                className="group ml-auto flex flex-col items-end gap-1 text-cream/50 transition-colors duration-300 hover:text-apricot"
              >
                <span className="flex items-center gap-2 font-sans text-sm uppercase tracking-wider">
                  Next
                  <HiArrowNarrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="font-sans text-sm text-cream/30 transition-colors duration-300 group-hover:text-cream/60">
                  {next.name}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
