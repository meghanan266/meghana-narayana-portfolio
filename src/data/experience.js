// Each bullet is an array of chunks: { text, highlight? }
// Highlighted chunks render in apricot with glow

export const experiences = [
  {
    role: "Software Engineer Intern",
    company: "United Nations",
    location: "Boston, MA",
    duration: "May 2025 – Aug 2025",
    bullets: [
      [
        { text: "Built an " },
        { text: "interactive governance analytics dashboard", highlight: true },
        { text: " in " },
        { text: "React, TypeScript, and D3.js", highlight: true },
        { text: " — enabling policy analysts to explore and compare multi-government datasets without manual data exports." },
      ],
      [
        { text: "Engineered a " },
        { text: "RAG pipeline using pgvector, OpenAI Embeddings, and GPT-4o", highlight: true },
        { text: " that lets UN policymakers synthesize governance case studies into consolidated policy reports on demand, with iterative refinement across conversation turns." },
      ],
      [
        { text: "Designed and optimized " },
        { text: "Node.js/Express APIs with indexed multi-filter PostgreSQL queries", highlight: true },
        { text: " on AWS RDS, achieving " },
        { text: "sub-300ms lookups", highlight: true },
        { text: " across global governance datasets." },
      ],
    ],
  },
  {
    role: "Software Engineer",
    company: "IQVIA",
    location: "Bengaluru, India",
    duration: "Aug 2022 – Aug 2024",
    bullets: [
      [
        { text: "Architected a decoupled " },
        { text: "ASP.NET Core API and Angular dashboard", highlight: true },
        { text: " on Azure App Services, scaling system capacity to support " },
        { text: "10K+ enterprise users", highlight: true },
        { text: " in concurrent high-throughput data analysis." },
      ],
      [
        { text: "Engineered an " },
        { text: "event-driven pipeline with Azure Functions and Service Bus", highlight: true },
        { text: " to ingest 10K+ daily clinical records — " },
        { text: "dead-letter queues and retry handling", highlight: true },
        { text: " guaranteed zero record loss in a regulated data workflow." },
      ],
      [
        { text: "Implemented " },
        { text: "Redis distributed caching", highlight: true },
        { text: " for frequently accessed drug reference data — " },
        { text: "65% reduction in database load", highlight: true },
        { text: ", cutting dashboard load times from 8s to under 3s." },
      ],
      [
        { text: "Resolved a " },
        { text: "race condition in concurrent drug data updates", highlight: true },
        { text: " by implementing " },
        { text: "pessimistic locking", highlight: true },
        { text: ", preventing data corruption across 5K+ records." },
      ],
      [
        { text: "Migrated a legacy MVC monolith to " },
        { text: "scalable ASP.NET Core Web APIs and modular Angular", highlight: true },
        { text: " with OAuth/JWT role-based authorization. Won the " },
        { text: "Ovation Award", highlight: true },
        { text: " for technical impact and client delivery." },
      ],
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "IQVIA",
    location: "Bengaluru, India",
    duration: "Aug 2021 – Jul 2022",
    bullets: [
      [
        { text: "Built an " },
        { text: "end-to-end clinical trial tracking application", highlight: true },
        { text: " in " },
        { text: "Angular and ASP.NET Core (C#)", highlight: true },
        { text: " — implemented an EF Core-backed state model to programmatically control workflow transitions and eliminate manual review bottlenecks." },
      ],
      [
        { text: "Optimized API performance via " },
        { text: "server-side pagination and tuned SQL Server stored procedures", highlight: true },
        { text: " on 100K+ row datasets, improving " },
        { text: "dashboard render time by 70%", highlight: true },
        { text: "." },
      ],
      [
        { text: "Cut " },
        { text: "production defects by 35%", highlight: true },
        { text: " by developing 50+ rigorous " },
        { text: "xUnit/Moq tests", highlight: true },
        { text: " validating high-volume market intelligence data pipeline logic." },
      ],
    ],
  },
  {
    role: "Software Engineering Teaching Assistant",
    company: "Northeastern University",
    location: "Boston, MA",
    duration: "Sept 2025 – Dec 2025",
    bullets: [
      [
        { text: "Guided " },
        { text: "50+ students", highlight: true },
        { text: " through building production-grade full-stack apps using " },
        { text: "TypeScript, React, Node.js, and Jest", highlight: true },
        { text: " — code reviews, debugging sessions, and CI/CD enforcement end to end." },
      ],
      [
        { text: "Ran " },
        { text: "Agile sprint planning and system design sessions", highlight: true },
        { text: " for 5 cross-functional teams, walking them through requirements analysis, data modeling, and distributed architecture from scratch." },
      ],
    ],
  },
  {
    role: "Coding Instructor",
    company: "Camp K12",
    location: "Remote",
    duration: "Sep 2020 – Jul 2021",
    bullets: [
      [
        { text: "Taught " },
        { text: "AI, web development, and Python", highlight: true },
        { text: " to 50+ students across live sessions, earning an " },
        { text: "85% positive feedback rate", highlight: true },
        { text: "." },
      ],
      [
        { text: "Made abstract concepts click through visual aids and real-world analogies — if a 12-year-old gets recursion, the explanation works." },
      ],
    ],
  },
];
