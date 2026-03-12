import { useEffect } from "react";
import Hero from "../sections/Hero";
import AboutIntro from "../sections/AboutIntro";
import HorizontalScroll from "../sections/HorizontalScroll";
import FeaturedProjects from "../sections/FeaturedProjects";
import Contact from "../sections/Contact";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <AboutIntro />
      <HorizontalScroll />
      <FeaturedProjects />
      <Contact />
    </div>
  );
}
