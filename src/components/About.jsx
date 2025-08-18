export default function About() {
  return (
    <div
      id="about"
      className="relative w-full min-h-screen bg-cover bg-center bg-fixed py-12"
      style={{
        backgroundImage: "url(/assets/bg-1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Centered card */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-8">
        <div className="bg-AppleCore p-6 sm:p-12 shadow-xl text-center max-w-3xl w-full bg-opacity-95 flex flex-col items-center justify-start">
      <div className="w-24 h-24 sm:w-28 sm:h-28 mb-6">
            <img
              src="/assets/MN.png"
              alt="Meghana Narayana Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide uppercase text-white mb-4">
            Who Am I?
          </h2>
          <p className="text-Blueberry text-base sm:text-lg leading-relaxed max-w-xl text-justify mb-8">
            A software developer with a twist — my journey started in biotechnology, driven by a fascination with systems — whether biological or digital. That curiosity led me to software engineering, where I now build scalable web apps, automate workflows, and turn messy data into clean, interactive platforms.
            <br /><br />
            With 3+ years of experience in .NET, Angular, React, SQL, and cloud platforms like Azure and Vercel, I’ve worked on everything from drug pipeline systems to policy visualization tools. I’ve worn many hats — developer, mentor, problem-solver, and even a coding instructor — and I thrive in environments that blend creativity with real-world impact.
            <br /><br />
            I’m currently pursuing my Master’s in Computer Science at Northeastern University and looking for teams that value thoughtful engineering, open collaboration, and continuous growth. If you’re solving meaningful problems with tech — I’d love to be part of it.
          </p>

          <a
            href="https://drive.google.com/uc?export=download&id=1mSH54_jainalIl8AlzYavV1J4vSeCpgE"
            className="px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold bg-Apricot hover:bg-Blueberry hover:text-white transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}
