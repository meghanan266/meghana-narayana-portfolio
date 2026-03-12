import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { featuredProjects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

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

function SectionHeader() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:px-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-apricot" />
        <span className="font-sans text-sm uppercase tracking-widest text-apricot">
          Featured Projects
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, cardRef, isActive }) {
  return (
    <div
      ref={cardRef}
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: index }}
    >
      <Link
        to={`/project/${project.id}`}
        className={`group relative block h-[70vh] w-full max-w-6xl overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-shadow duration-300 ${
          isActive ? "cursor-pointer hover:shadow-[0_15px_60px_rgba(0,0,0,0.5)]" : ""
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative flex h-full flex-col justify-end p-8 md:p-12">
          <span className="glass mb-4 inline-block w-fit rounded-full px-4 py-1.5 text-xs uppercase tracking-wider text-cream">
            {project.category}
          </span>
          <h3 className="font-display text-3xl font-bold text-cream md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 max-w-xl font-sans text-base leading-relaxed text-cream/70 line-clamp-2">
            {project.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 font-sans text-apricot transition-all duration-300 group-hover:gap-3">
            View Project
            <span
              aria-hidden="true"
              className="relative inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}

function DesktopStackedCards() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length < 2) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { y: "0%", scale: 1, opacity: 1 });
        } else {
          gsap.set(card, { y: "100%", scale: 1, opacity: 1 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.33) setActiveIndex(0);
            else if (progress < 0.66) setActiveIndex(1);
            else setActiveIndex(2);
          },
        },
      });

      // Card 2 slides up over card 1
      tl.to(cards[1], { y: "0%", ease: "power2.inOut", duration: 0.33 }, 0);
      tl.to(
        cards[0],
        { scale: 0.95, opacity: 0.7, ease: "power2.inOut", duration: 0.33 },
        0
      );

      // Card 3 slides up over card 2
      tl.to(cards[2], { y: "0%", ease: "power2.inOut", duration: 0.33 }, 0.33);
      tl.to(
        cards[1],
        { scale: 0.95, opacity: 0.7, ease: "power2.inOut", duration: 0.33 },
        0.33
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative bg-dark-950">
      <div
        ref={cardsContainerRef}
        className="relative mx-auto h-[80vh] w-full max-w-7xl px-6 md:px-10"
      >
        {featuredProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i + 1}
            isActive={activeIndex === i}
            cardRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MobileCards() {
  return (
    <div className="flex flex-col gap-8 px-4">
      {featuredProjects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <Link
            to={`/project/${project.id}`}
            className="group relative block h-[50vh] w-full overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6">
              <span className="glass mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs uppercase tracking-wider text-cream">
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-bold text-cream">
                {project.name}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-cream/70 line-clamp-2">
                {project.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-apricot">
                View Project <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

function SeeAllLink() {
  return (
    <div className="bg-dark-950 pb-2 pt-2 text-center">
      <Link
        to="/projects"
        className="group mb-10 inline-flex items-center gap-3 rounded-full bg-apricot px-8 py-4 font-sans text-lg font-semibold text-dark-950 transition-all duration-300 hover:scale-105 hover:bg-apricot-light hover:shadow-lg hover:shadow-apricot/25"
      >
        See all projects
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 group-hover:translate-x-2"
        >
          &rarr;
        </span>
      </Link>
    </div>
  );
}

export default function FeaturedProjects() {
  const isMobile = useIsMobile();

  return (
    <section className="relative z-20 -mt-10 rounded-t-3xl bg-dark-950 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <SectionHeader />
      {isMobile ? <MobileCards /> : <DesktopStackedCards />}
      <SeeAllLink />
    </section>
  );
}
