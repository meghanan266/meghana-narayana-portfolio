import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { allProjects } from "../data/projects";

const ease = [0.19, 1, 0.22, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const FILTERS = ["All", "AI", "Full Stack", "Backend", "Data"];

const CATEGORY_COLORS = {
  AI: { bg: "bg-apricot/10", border: "border-apricot/30", text: "text-apricot", badge: "#F7882F" },
  "Full Stack": { bg: "bg-blueberry/10", border: "border-blueberry/30", text: "text-blueberry-light", badge: "#6B7A8F" },
  Backend: { bg: "bg-citrus/10", border: "border-citrus/30", text: "text-citrus", badge: "#F7C331" },
  Data: { bg: "bg-green-900/20", border: "border-green-700/30", text: "text-green-400", badge: "#7EA16B" },
  Other: { bg: "bg-cream/5", border: "border-cream/10", text: "text-cream/50", badge: "#8A97A8" },
};

const POSTER_GRADIENTS = {
  AI: "from-[#1a0f08] via-[#1f1208] to-[#0a0a0a]",
  "Full Stack": "from-[#0d1117] via-[#111827] to-[#0a0a0a]",
  Backend: "from-[#111008] via-[#181500] to-[#0a0a0a]",
  Data: "from-[#071410] via-[#0a1a14] to-[#0a0a0a]",
  Other: "from-[#111111] via-[#1a1a1a] to-[#0a0a0a]",
};


const CARD_SIZES = {
  opsdash: "wide",
  flashsale: "tall",
  "rag-document-assistant": "wide",
};

function getCardClasses(size) {
  switch (size) {
    case "wide":
      return "lg:col-span-2 h-[300px]";
    case "tall":
      return "lg:row-span-2 h-[300px] lg:h-full";
    default:
      return "h-[300px]";
  }
}

function PosterCard({ project }) {
  const gradient = POSTER_GRADIENTS[project.category] || POSTER_GRADIENTS.Other;
  const color = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.Other;

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} overflow-hidden`}>
      {/* Accent line top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: color.badge, opacity: 0.6 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <span
          className="self-start font-sans text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: `${color.badge}18`,
            color: color.badge,
            border: `1px solid ${color.badge}40`,
          }}
        >
          {project.category}
        </span>

        <div>
          <h3 className="font-display text-2xl font-bold text-cream leading-tight mb-2">
            {project.name}
          </h3>
          {project.shortDescription && (
            <p className="font-sans text-sm text-cream/50 line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, size }) {
  const hasImage = Boolean(project.image);
  const color = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.Other;

  return (
    <motion.div variants={cardVariants} className={getCardClasses(size)}>
      <Link
        to={`/project/${project.id}`}
        className="group relative block h-full w-full overflow-hidden rounded-sm transition-all duration-500"
      >
        {hasImage ? (
          <>
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span
                className="self-start font-sans text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: color.badge,
                  color: "#0a0a0a",
                }}
              >
                {project.category}
              </span>

              <div>
                <h3 className="font-display text-2xl font-bold text-cream leading-tight mb-2">
                  {project.name}
                </h3>
                {project.shortDescription && (
                  <p className="font-sans text-sm text-cream/60 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <PosterCard project={project} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-4 bottom-4 flex translate-y-4 items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="flex w-full items-center justify-center gap-2 rounded-full bg-apricot py-3 font-sans text-sm font-semibold text-dark-950">
            View Project
            <HiArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="mx-auto max-w-7xl px-8 pb-12 pt-24 md:px-16 md:pt-32">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 font-sans text-sm text-cream/40 transition-colors duration-300 hover:text-apricot"
        >
          <HiArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-apricot" />
          <span className="font-sans text-sm uppercase tracking-widest text-apricot">
            All Projects
          </span>
        </div>

        <h1 className="font-display text-5xl font-bold text-cream md:text-7xl">
          Projects
        </h1>
        <p className="mt-4 max-w-xl font-sans text-lg text-cream/50">
          A collection of things I&apos;ve designed, built, and shipped.
        </p>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative font-sans text-sm px-4 py-1.5 rounded-full border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-apricot text-dark-950 border-apricot font-semibold"
                  : "bg-transparent text-cream/50 border-cream/15 hover:text-cream hover:border-cream/30"
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-apricot -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl grid auto-rows-[300px] grid-cols-1 gap-2 px-4 pb-24 md:grid-cols-2 lg:grid-cols-3 md:px-8"
          style={{ gridAutoFlow: "dense" }}
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              size={CARD_SIZES[project.id] || "standard"}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
