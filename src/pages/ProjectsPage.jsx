import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import { HiArrowUpRight } from "react-icons/hi2";
import { allProjects } from "../data/projects";

const ease = [0.19, 1, 0.22, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const CARD_SIZES = {
  opsdash: "wide",
  "canvas-sync": "standard",
  documind: "standard",
  flashsale: "tall",
  "healthsense-iot": "standard",
  "e-commerce-application": "standard",
  "career-link": "standard",
  devflow: "wide",
  "image-processing-application": "standard",
  "food-donation": "standard",
  "reddit-ml-sentiment-analysis": "standard",
  "portfolio-website": "standard",
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

function ProjectCard({ project, size }) {
  return (
    <motion.div variants={cardVariants} className={getCardClasses(size)}>
      <Link
        to={`/project/${project.id}`}
        className="group relative block h-full w-full overflow-hidden rounded-sm transition-all duration-500"
      >
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      </header>

      {/* Bento Grid */}
      {allProjects.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <p className="font-sans text-cream/50">
            No projects yet. Check back soon.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl grid auto-rows-[300px] grid-cols-1 gap-2 px-4 pb-24 md:grid-cols-2 lg:grid-cols-3 md:px-8"
          style={{ gridAutoFlow: "dense" }}
        >
          {allProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              size={CARD_SIZES[project.id] || "standard"}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
