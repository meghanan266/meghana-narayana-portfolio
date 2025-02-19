export default function About() {
  return (
    <div
      id="about"
      className="relative w-full h-screen bg-cover bg-center bg-fixed"
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
        <div className="bg-AppleCore p-6 sm:p-12 shadow-xl text-center max-w-3xl w-full h-auto sm:h-[80vh] flex flex-col items-center justify-between bg-opacity-95">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mb-6">
            <img
              src="/assets/MN.png"
              alt="Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide uppercase text-white">
            Who Am I?
          </h2>
          <p className="text-Blueberry text-base sm:text-lg leading-relaxed mb-8 max-w-xl text-justify">
            A software developer with a twist—my journey started in biotechnology and has evolved into a passion for solving real-world problems with code.
            Over the years, I’ve gained experience building full-stack applications, automating workflows, and
            optimizing system performance using technologies like .NET, Angular, and SQL.
            <br /> <br />
            I’m currently pursuing a Master’s in Computer Science at Northeastern University and seeking opportunities to bring my skills to a team that values collaboration and continuous growth, where I can contribute meaningfully and keep learning along the way.
          </p>
          <a
            href="https://drive.google.com/uc?export=download&id=1WLWWBkJ4e7nmR_VgW20BaNqY2FtiG2ON"
            className="px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold bg-Apricot hover:bg-Blueberry hover:text-white transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </div>
    </div>
  );
}
