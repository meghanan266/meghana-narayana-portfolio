export default function Skills() {
  const skills = {
    Languages: ["C#", "TypeScript", "JavaScript", "SQL", "Java", "Python", "C", "C++"],
    Frontend: ["Angular", "React", "HTML", "CSS", "Tailwind", "D3", "Bootstrap", "Kendo UI"],
    Backend: [
      ".NET Core",
      "Entity Framework Core",
      "Node.js",
      "Express",
      "RESTful APIs",
      "LINQ",
      "Flask",
      "JWT",
    ],
    Tools: [
      "Git",
      "GitHub",
      "GitLab",
      "SonarQube",
      "SQL Server",
      "MySQL",
      "Postman",
      "Swagger",
      "JIRA",
      "Agile",
      "Serilog",
      "Azure",
      "Vercel",
      "Selenium",
    ]
  };
  

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black via-gray-800 to-black text-white">
      <div className="max-w-6xl mx-auto px-8">
        <h1 className="text-5xl font-extrabold text-center tracking-wide uppercase mb-14">
          01 Skills
        </h1>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-14">
          {Object.entries(skills).map(([category, items], i) => (
            <div key={i} className="space-y-6">
              {/* Category Header */}
              <h3 className="text-3xl font-semibold uppercase text-Apricot">{category}</h3>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                {items.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-opacity-90 bg-AppleCore text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-Blueberry hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                    aria-label={`Skill: ${skill}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
