import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook

export default function Projects() {
  const navigate = useNavigate(); // Initialize navigation hook

  const projects = [
    {
      id: 1,
      name: "E-commerce Application",
      image: "https://via.placeholder.com/300x400", // Replace with your actual image path
      path: "/ecommerce-application", // Add route path for each project
    },
    {
      id: 2,
      name: "Image Processing Application",
      image: "https://via.placeholder.com/300x400", // Replace with your actual image path
      path: "/image-processing",
    },
    {
      id: 3,
      name: "Portfolio Website",
      image: "https://via.placeholder.com/300x400", // Replace with your actual image path
      path: "/portfolio-website",
    },
    {
      id: 4,
      name: "Task Management System",
      image: "https://via.placeholder.com/300x400", // Replace with your actual image path
      path: "/task-management",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [projects.length]);

  const getSlideStyles = (index) => {
    const totalSlides = projects.length;
    const offset = (index - currentIndex + totalSlides) % totalSlides;

    if (offset === 0) {
      return {
        transform: "translateX(0%) scale(1.1) translateZ(150px)",
        zIndex: 10,
        opacity: 1,
      };
    } else if (offset === 1) {
      return {
        transform: "translateX(110%) scale(0.9) translateZ(50px)",
        zIndex: 5,
        opacity: 0.8,
      };
    } else if (offset === totalSlides - 1) {
      return {
        transform: "translateX(-110%) scale(0.9) translateZ(50px)",
        zIndex: 5,
        opacity: 0.8,
      };
    } else {
      return {
        transform: "translateX(200%) scale(0.7) translateZ(0px)",
        zIndex: 1,
        opacity: 0,
      };
    }
  };

  const handleNavigation = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? projects.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }
  };

  const handleProjectClick = (path) => {
    navigate(path); // Navigate to the project details page
  };

  return (
    <section className="relative w-full h-[650px] bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="relative flex justify-center items-center h-full">
        {/* Left Arrow */}
        <button
          onClick={() => handleNavigation("prev")}
          className="absolute left-6 z-20 bg-yellow-400 text-black rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-transform"
        >
          &#8592;
        </button>

        {/* Carousel */}
        <div className="relative w-[80%] h-[500px] flex justify-center items-center overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleProjectClick(project.path)} // Navigate on click
              className={`absolute h-[450px] w-[320px] backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-xl overflow-hidden transition-transform duration-500 ease-in-out cursor-pointer ${index === currentIndex ? "hover:scale-110" : ""
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
                <p className="text-sm text-gray-300 mt-2">
                  Click to explore this project.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleNavigation("next")}
          className="absolute right-6 z-20 bg-yellow-400 text-black rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-transform"
        >
          &#8594;
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-lg font-semibold">
        {currentIndex + 1} / {projects.length}
      </div>
    </section>
  );
}
