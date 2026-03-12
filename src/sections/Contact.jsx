import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { HiMail, HiPhone } from "react-icons/hi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useActiveSection } from "../context/ActiveSectionContext";

const FORMSPREE_URL = "https://formspree.io/f/myzzbwpl";

const ease = [0.19, 1, 0.22, 1];
const staggerUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

const wavingHand = {
  animate: {
    rotate: [0, 14, -8, 14, -4, 10, 0],
    transition: { duration: 2.5, repeat: Infinity, repeatDelay: 3 },
  },
};

const floatY = {
  animate: (i) => ({
    y: [0, -12, 0],
    rotate: [0, i % 2 === 0 ? 5 : -5, 0],
    transition: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
  }),
};

function validate(data) {
  const errors = {};
  if (!data.name) errors.name = "Please enter your name!";
  if (!data.email) errors.email = "Please provide your email.";
  else if (!/\S+@\S+\.\S+/.test(data.email))
    errors.email = "Email format is incorrect.";
  if (!data.message) errors.message = "Your message can't be empty!";
  return errors;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning!";
  if (hour < 18) return "Good Afternoon!";
  return "Good Evening!";
}

const FLOATERS = [
  { emoji: "💡", x: "8%", y: "15%", size: "text-3xl", i: 0 },
  { emoji: "💬", x: "85%", y: "10%", size: "text-2xl", i: 1 },
  { emoji: "☕", x: "90%", y: "75%", size: "text-3xl", i: 2 },
  { emoji: "⚡", x: "5%", y: "70%", size: "text-2xl", i: 3 },
  { emoji: "✨", x: "75%", y: "45%", size: "text-xl", i: 4 },
];

function FloatingEmojis() {
  return (
    <>
      {FLOATERS.map(({ emoji, x, y, size, i }) => (
        <motion.span
          key={i}
          custom={i}
          variants={floatY}
          animate="animate"
          className={`pointer-events-none absolute select-none ${size} opacity-[0.12]`}
          aria-hidden="true"
          style={{ left: x, top: y }}
        >
          {emoji}
        </motion.span>
      ))}
    </>
  );
}

function InfoColumn() {
  return (
    <div className="md:w-[45%]">
      <motion.div
        custom={0}
        variants={staggerUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-4 flex items-center gap-3"
      >
        <span className="h-px w-8 bg-apricot" />
        <span className="font-sans text-sm uppercase tracking-widest text-apricot">
          Get in Touch
        </span>
      </motion.div>

      <motion.h2
        custom={1}
        variants={staggerUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="leading-tight"
      >
        <span className="font-accent text-3xl text-apricot md:text-4xl">
          {getGreeting()}
        </span>
        <motion.span
          variants={wavingHand}
          animate="animate"
          className="ml-2 inline-block origin-[70%_70%] text-3xl md:text-4xl"
        >
          👋
        </motion.span>
        <br />
        <span className="font-display text-4xl font-bold text-dark-950 md:text-5xl">
          Let&apos;s Chat!
        </span>
      </motion.h2>

      <motion.p
        custom={2}
        variants={staggerUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-6 max-w-md font-sans text-base leading-relaxed text-dark-950/60"
      >
        I&apos;m looking for{" "}
        <strong className="text-dark-950/80">new opportunities</strong> to
        learn, explore, and get my hands dirty in real-world projects. If
        you&apos;ve got something on your mind, don&apos;t hesitate to reach
        out!
      </motion.p>

      <motion.p
        custom={2.5}
        variants={staggerUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-4 max-w-md font-sans text-base leading-relaxed text-dark-950/60"
      >
        I&apos;m all about{" "}
        <strong className="text-dark-950/80">learning through doing</strong>,
        and I&apos;m excited to see where we can go from here.
      </motion.p>

      <motion.div
        custom={3}
        variants={staggerUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-8 space-y-3"
      >
        <a
          href="mailto:meghananarayana55@gmail.com"
          className="group flex items-center gap-3 font-sans text-dark-950/70 transition-colors duration-300 hover:text-apricot"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-apricot/10 transition-colors duration-300 group-hover:bg-apricot/20">
            <HiMail className="h-4 w-4 text-apricot" />
          </span>
          meghananarayana55@gmail.com
        </a>
        <div className="group flex items-center gap-3 font-sans text-dark-950/70">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-apricot/10">
            <HiPhone className="h-4 w-4 text-apricot" />
          </span>
          1-857-381-5964
        </div>
      </motion.div>

      <motion.div
        custom={4}
        variants={staggerUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-6 flex items-center gap-3"
      >
        {[
          {
            href: "https://www.linkedin.com/in/meghananarayana/",
            label: "LinkedIn",
            Icon: FaLinkedinIn,
          },
          {
            href: "https://github.com/meghanan266",
            label: "GitHub",
            Icon: FaGithub,
          },
        ].map(({ href, label, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-dark-950/5 text-dark-950/50 transition-colors duration-300 hover:bg-apricot hover:text-white"
          >
            <Icon size={18} />
          </motion.a>
        ))}
      </motion.div>

      <motion.p
        custom={5}
        variants={staggerUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-8 font-accent text-xl text-dark-950/50 -rotate-2"
      >
        Looking forward to hearing from you and learning something new along the
        way! 🌱
      </motion.p>
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () =>
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", reason: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldBase =
    "w-full border-b bg-transparent px-0 py-4 font-sans text-dark-950 outline-none transition-colors duration-300 placeholder:text-dark-950/30 focus:border-b-apricot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
      className="md:w-[55%]"
    >
      {showSuccess && (
        <Confetti
          width={windowSize.w}
          height={windowSize.h}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-dark-950/5 bg-white/70 p-8 shadow-xl shadow-dark-950/5 backdrop-blur-sm"
      >
        <div className="space-y-6">
          {/* Reason */}
          <div>
            <label
              htmlFor="reason"
              className="mb-2 block font-sans text-sm font-semibold text-dark-950/70"
            >
              What brings you here? *
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`${fieldBase} appearance-none border-dark-950/15`}
            >
              <option value="" className="bg-white">
                Select a Reason
              </option>
              <option value="Job Inquiry" className="bg-white">
                Job Inquiry
              </option>
              <option value="Collaboration" className="bg-white">
                Collaboration
              </option>
              <option value="General Question" className="bg-white">
                General Question
              </option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-sans text-sm font-semibold text-dark-950/70"
            >
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className={`${fieldBase} border-dark-950/15`}
            />
            {errors.name && (
              <p className="mt-1 font-sans text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-sans text-sm font-semibold text-dark-950/70"
            >
              Your Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email Address"
              className={`${fieldBase} border-dark-950/15`}
            />
            {errors.email && (
              <p className="mt-1 font-sans text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-sans text-sm font-semibold text-dark-950/70"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Let me know how I can assist you"
              className={`${fieldBase} resize-none border-dark-950/15`}
            />
            {errors.message && (
              <p className="mt-1 font-sans text-sm text-red-400">
                {errors.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full rounded-xl bg-apricot py-4 font-sans font-semibold text-dark-950 shadow-lg shadow-apricot/25 transition-all duration-300 hover:bg-apricot-light hover:shadow-xl hover:shadow-apricot/30 disabled:opacity-60 disabled:shadow-none"
        >
          {status === "loading" ? "Sending... ✈️" : "Start a conversation!"}
        </motion.button>

        {/* Error status */}
        {status === "error" && (
          <p className="mt-3 text-center font-sans text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        )}

        {/* Success */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mt-6 rounded-xl border-l-4 border-apricot bg-apricot/10 p-6"
          >
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-apricot/20 text-lg"
                role="img"
                aria-label="celebration"
              >
                🎉
              </motion.span>
              <p className="font-sans text-lg text-dark-950">
                Thanks for reaching out! I&apos;ll get back to you as soon as I
                can. 💬
              </p>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection("contact"); },
      { threshold: 0, rootMargin: "0px 0px -30% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-30 -mt-10 overflow-hidden rounded-t-3xl bg-cream shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
    >
      <FloatingEmojis />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-20 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          <InfoColumn />
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-20">
        <div className="border-t border-dark-950/10" />
        <div className="py-8 text-center">
          <p className="font-sans text-sm text-dark-950/30">
            Designed and built with ❤️ by Meghana Narayana &middot;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
