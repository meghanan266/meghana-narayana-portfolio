import React from 'react';

function Experience() {
  const experiences = [
    {
      role: "Software Development Engineer",
      company: "IQVIA, Bengaluru, India",
      duration: "Aug 2022 – Aug 2024",
      description: [
        "Led the migration of project from Aurelia to Angular, improving performance and maintainability, while optimizing backend processes with RESTful APIs, LINQ, SQL, and Aspose—reducing manual data entry by 20+ hours weekly.",
        "Improved CI/CD pipelines by integrating SonarQube into GitLab, resolving 50+ critical issues, reducing build failures by 25%, and enhancing overall code security and quality.",
        "Contributed to Agile sprints using Jira for ticket tracking and backlog management, and mentored 3 new hires through knowledge transfer sessions, improving onboarding speed and enhancing sprint efficiency.",
        "Developed and tested 5+ modules, achieving 85% code coverage through xUnit testing, and participated in end-to-end project planning, including requirements discussions, feasibility analysis, and sprint planning with cross-functional teams.",
        "Received the Ovation Award for quickly mastering new technologies, outstanding performance, and client interaction."
      ]
    },
    {
      role: "Associate Software Engineer",
      company: "IQVIA, Bengaluru, India",
      duration: "Aug 2021 – Jul 2022",
      description: [
        "Automated data harvesting from 200+ company websites, reducing manual data entry by 20% and increasing accuracy using HTML Agility Pack and Selenium, integrating with backend systems through .NET, Angular, and Entity Framework.",
        "Optimized backend performance by refining SQL queries and LINQ expressions, cutting API response times by 20% and reducing SQL execution by 15%, while fixing 30+ high-priority bugs in collaboration with QA and DB teams.",
        "Delivered technical demos to stakeholders, explaining API integrations, UI features, and gathering feedback for iterative development, enhancing client satisfaction."
      ]
    },
    {
      role: "Coding Instructor",
      company: "Camp K12, Remote",
      duration: "Sep 2020 – Jul 2021",
      description: [
        "Conducted tutorial sessions for 50+ students in technical subjects, including artificial intelligence, web development, and Python, achieving an 85% positive feedback rate.",
        "Utilized diverse teaching methods such as visual aids, real-world examples, and analogies to simplify complex coding concepts, improving students' understanding and engagement."
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-24 bg-gradient-to-b from-black via-gray-800 to-black text-white">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-5xl font-bold tracking-wide uppercase text-white">02 Experience</h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-8">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-Apricot"></div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Connector Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-8 h-8 bg-Apricot rounded-full border-4 border-gray-800"></div>

              {/* Content */}
              <div
                className={`w-1/2 mt-4 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`} // Added spacing from the timeline
              >
                <p className="text-sm text-Apricot font-bold mb-4">{exp.duration}</p>
                <h3 className="text-xl mb-2">{exp.role}</h3>
                <p className="text-sm text-gray-400 font-semibold mb-4">{exp.company}</p>
                <ul className="list-disc list-inside space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-gray-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
