import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const element = document.getElementById(hash);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (location.pathname === '/') {
      handleHashChange();
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection = 'home';

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
      setIsScrolled(window.scrollY > 50);
    };

    const updateActiveSectionFromRoute = () => {
      if (location.pathname.startsWith('/project/')) {
        setActiveSection('projects'); 
      } else {
        const hash = location.hash.replace('#', '') || 'home';
        setActiveSection(hash);
      }
    };

    if (!location.pathname.startsWith('/project/')) {
      window.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('hashchange', handleHashChange);

    updateActiveSectionFromRoute();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location]);

  const navItems = [
    { label: 'Home', section: 'home', href: '/' },
    { label: 'About', section: 'about', href: '/#about' },
    { label: 'Skills', section: 'skills', href: '/#skills' },
    { label: 'Experience', section: 'experience', href: '/#experience' },
    { label: 'Projects', section: 'projects', href: '/#projects' },
    { label: 'Contact', section: 'contact', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/40 shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/assets/MN.png"
            alt="Logo"
            className={`h-12 w-auto rounded-full transition-transform hover:rotate-12 hover:scale-110 ${isScrolled ? '' : 'filter invert brightness-200'}`}
          />
        </div>

        {/* Navigation Items for Desktop */}
        <ul className="hidden md:flex justify-center space-x-8 text-md font-medium flex-grow">
          {navItems.map((item) => (
            <li key={item.section}>
              <a
                href={item.href}
                className={`relative tracking-wide uppercase transition duration-300 ${activeSection === item.section
                  ? 'text-Apricot font-bold after:w-full'
                  : 'text-white/100 hover:text-Apricot'
                  } after:block after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:bg-Apricot after:transition-all after:duration-500`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-AppleCore/90 text-white p-6 space-y-4 shadow-lg">
          {navItems.map((item) => (
            <li key={item.section}>
              <a
                href={item.href}
                className={`block text-center py-2 uppercase tracking-wide transition duration-300 ${activeSection === item.section ? 'text-Apricot font-bold' : 'text-white/90 hover:text-Citrus'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
