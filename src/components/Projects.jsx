import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const projects = [
    {
      id: "e-commerce-application",
      name: "E-commerce Application",
      image: "/assets/ecomm-1.png",
    },
    {
      id: "image-processing-application",
      name: "Image Processing Application",
      image: "/assets/img-process-1.png",
    },
    {
      id: "portfolio-website",
      name: "Portfolio Website",
      image: "/assets/portfolio.png",
    },
    {
      id: "food-donation",
      name: "Food Bridge Application",
      image: "/assets/food-1.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const getSlideStyles = (index) => {
    const totalSlides = projects.length;
    const offset = (index - currentIndex + totalSlides) % totalSlides;

    if (offset === 0) {
      return {
        transform: "translateX(0%) scale(1.1)",
        zIndex: 10,
        opacity: 1,
      };
    } else if (offset === 1) {
      return {
        transform: "translateX(110%) scale(0.9)",
        zIndex: 5,
        opacity: 0.8,
      };
    } else if (offset === totalSlides - 1) {
      return {
        transform: "translateX(-110%) scale(0.9)",
        zIndex: 5,
        opacity: 0.8,
      };
    } else {
      return {
        transform: "translateX(200%) scale(0.7)",
        zIndex: 1,
        opacity: 0,
      };
    }
  };

  return (
    <section id="projects" className="relative w-full py-10 bg-gradient-to-b from-black via-gray-800 to-black text-white">
      <h1 className="text-5xl font-extrabold text-center tracking-wide uppercase">
        03 Projects
      </h1>
      <div className="relative flex justify-center items-center h-[600px]">
        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrentIndex(
              (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
            )
          }
          className="absolute left-6 z-20 bg-Apricot text-black rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-transform"
        >
          &#8592;
        </button>

        {/* Carousel */}
        <div className="relative w-[90%] h-[450px] flex justify-center items-center overflow-hidden">
          {projects.map((project, index) => (
            <Link
              to={`/project/${project.id}`}
              key={index}
              className={`absolute h-[420px] w-[300px] bg-white/10 border border-white/20 shadow-xl rounded-xl overflow-hidden transition-transform duration-500 ease-in-out ${index === currentIndex ? "hover:scale-105" : ""
                }`}
              style={getSlideStyles(index)}
            >
              <div className="relative w-full h-[75%]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-xl"></div>
              </div>
              <div className="text-center text-white p-4">
                <h3 className="text-2xl font-bold">{project.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
          }
          className="absolute right-6 z-20 bg-Apricot text-black rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-transform"
        >
          &#8594;
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-Apricot text-lg font-semibold">
        {currentIndex + 1} / {projects.length}
      </div>
    </section>
  );
}
