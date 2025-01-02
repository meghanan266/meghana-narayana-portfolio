export default function About() {
  return (
    <div
      id="about"
      className="relative w-full h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url(src/assets/bg-1.png)", // Replace with your background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Centered card */}
      <div className="relative z-10 flex items-center justify-end h-full px-6">
        <div className="bg-AppleCore p-12 shadow-xl text-center max-w-3xl w-full h-[80vh] flex flex-col items-center justify-between bg-opacity-95">
          <div className="w-28 h-28 mb-6">
            <img
              src="src/assets/MN.png"
              alt="Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-4xl font-bold tracking-wide uppercase text-white">Who Am I?</h2>
          <p className="text-Blueberry text-lg leading-relaxed mb-8 max-w-xl">
            Hi, I'm Meghana Narayana, a passionate software developer with a
            background in biotechnology. I specialize in building scalable,
            efficient, and user-friendly applications. Feel free to explore my
            work and get in touch to learn more about my journey!
          </p>
          <a
            href="#resume"
            className="px-8 py-4 text-white font-semibold bg-Apricot hover:bg-Blueberry hover:text-white transition duration-300"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </div>
    </div>
  );
}
