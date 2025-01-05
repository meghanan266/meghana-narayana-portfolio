import About from './About.jsx';
import Projects from './Projects.jsx';
import Skills from './Skills.jsx';
import ContactForm from './ContactForm.jsx';
import Experience from './Experience.jsx';
import bgImage from '../assets/bg-pic.png'; // Import background image if needed

export default function Home() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-right text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex items-start flex-col justify-center h-full px-10 md:px-20">
        <div className="relative text-center">
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-Apricot">
            <span className="text-Apricot">&lt;&gt;&nbsp;</span>
            <span className="relative">
              Turning Ideas Into Code
              {/* <span className="absolute inset-x-0 bottom-0 border-b-4 border-Apricot"></span> */}
            </span>
            <span className="text-Apricot">&nbsp;&lt;/&gt;</span>
          </h2>
        </div>

        <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-white">
          I<span className="text-Apricot">'</span>M
        </h1>
        <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-white">
          MEGHANA NARAYANA<span className="text-Apricot">.</span>
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-AppleCore max-w-2xl">
          Full Stack Developer | .NET | Angular | React
        </p>
        <a
          href="#contact"
          className="mt-8 inline-block bg-Apricot text-white font-semibold px-8 py-4 rounded-full hover:bg-Apricot hover:text-Blueberry transition duration-300 ease-in-out transform hover:scale-105"
        >
          Start a conversation!
        </a>
      </div>

      {/* Sections with IDs */}
      <About id="about" />
      <Skills id="skills" />
      <Experience id="experience" />
      <Projects id="projects" />
      <ContactForm id="contact" />
    </div>
  );
}
