import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiBeaker, HiLightningBolt, HiCode, HiGlobe, HiUserGroup, HiArrowRight } from "react-icons/hi";

const ICON_MAP = {
  beaker: HiBeaker,
  bolt: HiLightningBolt,
  code: HiCode,
  globe: HiGlobe,
  team: HiUserGroup,
  arrow: HiArrowRight,
};

const statementParts = [
  { text: "I traded" },
  { icon: "beaker" },
  { text: "lab coats for laptops, but the method stayed the same:" },
  { text: "stay curious," },
  { icon: "bolt" },
  { text: "adapt fast, and never stop asking why." },
  { text: "I thrive in" },
  { icon: "code" },
  { text: "new territory, whether that is a new stack," },
  { text: "a new" },
  { icon: "team" },
  { text: "team, or a problem nobody has cracked yet." },
  { text: "From IQVIA to the" },
  { icon: "globe" },
  { text: "United Nations, 3+ years in," },
  { text: "every project still teaches me something." },
  { icon: "arrow" },
];

function buildTokens() {
  const tokens = [];
  statementParts.forEach((part) => {
    if (part.icon) {
      tokens.push({ type: "icon", icon: part.icon });
    } else {
      part.text.split(" ").forEach((word) => {
        if (word) tokens.push({ type: "word", value: word });
      });
    }
  });
  return tokens;
}

const tokens = buildTokens();

export default function AboutIntro() {
  const sectionRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wordsRef.current) return;

      const spans = wordsRef.current.querySelectorAll(".reveal-token");

      gsap.set(spans, { opacity: 0.15, filter: "blur(4px)" });

      gsap.to(spans, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative rounded-t-3xl bg-cream px-6 py-24 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] md:px-20 md:py-32"
    >
      <div ref={wordsRef} className="mx-auto max-w-4xl">
        <p className="font-display text-2xl font-medium leading-relaxed text-dark-950 md:text-4xl lg:text-5xl lg:leading-snug">
          {tokens.map((token, i) => {
            if (token.type === "icon") {
              const Icon = ICON_MAP[token.icon];
              return (
                <span
                  key={i}
                  className="reveal-token mx-1 inline-block align-middle text-apricot"
                >
                  <Icon className="inline h-6 w-6 md:h-8 md:w-8" />
                </span>
              );
            }
            return (
              <span key={i} className="reveal-token mr-[0.3em] inline-block">
                {token.value}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
