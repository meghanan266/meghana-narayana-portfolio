import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useActiveSection } from "../context/ActiveSectionContext";

const navLinks = [
  { label: "HOME", to: "/" },
  { label: "SKILLS", to: "/#skills" },
  { label: "EXPERIENCE", to: "/#experience" },
  { label: "PROJECTS", to: "/projects" },
  { label: "CONTACT", to: "/#contact" },
];

const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/meghana-narayana",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/MeghanaNarayana",
    label: "GitHub",
  },
];

const HASH_TO_SECTION = {
  "/#skills": "skills",
  "/#experience": "experience",
  "/#contact": "contact",
};

export default function SidebarNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeSection } = useActiveSection();

  const isActive = (to) => {
    if (to === "/") {
      if (location.pathname !== "/") return false;
      return activeSection === "home";
    }
    if (to === "/projects")
      return location.pathname === "/projects" || location.pathname.startsWith("/project/");
    if (HASH_TO_SECTION[to]) {
      return location.pathname === "/" && activeSection === HASH_TO_SECTION[to];
    }
    return false;
  };

  const isHashLink = (to) => to.startsWith("/#");

  const handleHashClick = (to) => (e) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = to.replace("/#", "");

    if (location.pathname === "/") {
      const isDesktop = window.innerWidth >= 768;

      if (isDesktop && id === "experience") {
        window.dispatchEvent(new CustomEvent("nav:scrollToExperience"));
        return;
      }

      if (isDesktop && id === "skills") {
        window.dispatchEvent(new CustomEvent("nav:scrollToSkills"));
        return;
      }

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate(to);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden md:flex h-screen w-[60px] flex-col items-center justify-between border-r border-white/[0.06] bg-dark-950 py-8">
        {/* Logo */}
        <Link to="/" className="transition-opacity duration-300 hover:opacity-80">
          <img
            src="/assets/MN.png"
            alt="MN Logo"
            className="h-8 w-8 rounded-full object-cover"
            style={{ filter: "invert(1) brightness(0) invert(55%) sepia(95%) saturate(800%) hue-rotate(350deg)" }}
          />
        </Link>

        {/* Nav links — rotated 90 degrees */}
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map(({ label, to }) => {
            const active = isActive(to);
            const cls = `[writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
              active ? "text-apricot" : "text-cream/70 hover:text-apricot"
            }`;

            if (isHashLink(to)) {
              return (
                <a key={label} href={to} onClick={handleHashClick(to)} className={cls}>
                  {label}
                </a>
              );
            }

            return (
              <Link
                key={label}
                to={to}
                className={cls}
                onClick={() => {
                  if (to === "/" && location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Social icons */}
        <div className="flex flex-col items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-cream/40 transition-colors duration-300 hover:text-apricot"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed left-0 top-0 z-50 flex md:hidden w-full items-center justify-between border-b border-white/[0.06] bg-dark-950/95 backdrop-blur-sm px-5 py-4">
        <Link to="/" className="transition-opacity duration-300 hover:opacity-80">
          <img
            src="/assets/MN.png"
            alt="MN Logo"
            className="h-8 w-8 rounded-full object-cover"
            style={{ filter: "invert(1) brightness(0) invert(55%) sepia(95%) saturate(800%) hue-rotate(350deg)" }}
          />
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="text-cream/70 hover:text-apricot transition-colors duration-300"
        >
          <HiMenuAlt3 size={24} />
        </button>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-dark-950/[0.97]"
          >
            {/* Close button */}
            <div className="flex justify-end px-5 py-4">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-cream/70 hover:text-apricot transition-colors duration-300"
              >
                <HiX size={28} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-10">
              {navLinks.map(({ label, to }, i) => {
                const active = isActive(to);
                const cls = `font-display text-display-sm transition-colors duration-300 ${
                  active ? "text-apricot" : "text-cream hover:text-apricot"
                }`;

                if (isHashLink(to)) {
                  return (
                    <motion.a
                      key={label}
                      href={to}
                      onClick={handleHashClick(to)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      className={cls}
                    >
                      {label}
                    </motion.a>
                  );
                }

                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <Link
                      to={to}
                      onClick={() => {
                        setMobileOpen(false);
                        if (to === "/" && location.pathname === "/") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className={cls}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-6 pb-10">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-cream/40 transition-colors duration-300 hover:text-apricot"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
