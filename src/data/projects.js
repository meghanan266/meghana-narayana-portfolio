export const featuredProjects = [
  {
    id: "rag-document-assistant",
    name: "RAG Document Assistant",
    shortDescription:
      "AI research assistant for SEC filings — hybrid retrieval with pgvector + full-text search fused via RRF, PydanticAI agent loop with citation grounding, and SSE streaming.",
    description:
      "Full-stack AI research assistant for equity analysts to query SEC filings in plain English. Hybrid retrieval combining pgvector semantic search and PostgreSQL FTS fused via Reciprocal Rank Fusion. PydanticAI agent loop (gpt-4.1) with 4 tools executing up to 20 LLM calls per turn. Citation grounding validator prevents hallucinated sources. SSE streaming with typed event payloads.",
    image: null,
    tags: ["Python", "FastAPI", "pgvector", "PydanticAI", "OpenAI", "React 19", "Supabase", "PostgreSQL", "SSE", "Docker"],
    category: "AI",
    featured: true,
  },
  {
    id: "opsdash",
    name: "OpsDash: Real-Time Operational Intelligence Platform",
    shortDescription:
      "Multi-tenant SaaS with Z-score anomaly detection, time-windowed metric correlation, WMA/regression forecasting, weighted health scores, and incident auto-grouping — 85% latency cut via SignalR + Redis.",
    description:
      "Active monitoring platform (not a passive dashboard) that ingests operational metrics per tenant and detects anomalies via rolling Z-score baselines, correlates related metric movements within a time window, forecasts trends with weighted moving average / linear regression, computes a weighted tenant health score, and auto-groups anomalies into incidents with full timelines. EF Core global query filters + JWT claims enforce tenant isolation. Replaced polling with SignalR push and Redis caching — 85% dashboard latency reduction.",
    image: null,
    tags: [".NET 9", "Angular 19", "SignalR", "Redis", "Azure", "SQL Server", "EF Core", "Docker"],
    category: "Full Stack",
    featured: true,
  },
  {
    id: "healthsense-iot",
    name: "HealthSense: Real-Time IoT Health Monitor",
    shortDescription:
      "Real-time IoT health platform on Go microservices + AWS IoT Core. Zero data loss across 19,593 test messages. Sub-200ms anomaly detection latency.",
    description:
      "Built a real-time, event-driven IoT platform using Go microservices, AWS IoT Core with X.509 device certs, Kinesis, Lambda, and DynamoDB. Rule-based anomaly detection for tachycardia, fever, and hypoxia. Zero data loss across 19,593 test messages with MQTT QoS 1 fault tolerance and Redis TTL buffering.",
    image: "/assets/healthsense/healthsense-1.png",
    tags: ["Go", "AWS IoT", "Kinesis", "Lambda", "DynamoDB", "MQTT", "React"],
    category: "Backend",
    featured: true,
  },
];

export const allProjects = [
  {
    id: "rag-document-assistant",
    name: "RAG Document Assistant",
    title: "RAG Document Assistant — AI Research Assistant for SEC Filings",
    shortDescription:
      "AI research assistant for SEC filings — hybrid pgvector + FTS retrieval fused via RRF, PydanticAI agent loop, citation grounding, SSE streaming.",
    description:
      "Full-stack AI research assistant for equity analysts to query a corpus of SEC filings (10-K, 10-Q) in plain English, returning grounded answers with source citations verified against the retrieved text.",
    problem:
      "Equity analysts need to query dense SEC filings in plain English and trust that every answer is actually grounded in the source text, not hallucinated.",
    approach:
      "Built a hybrid retrieval pipeline (pgvector + full-text search fused via RRF) feeding a PydanticAI agent loop that cites its sources and validates every citation against the retrieved text before responding.",
    impact:
      "Streamed responses over SSE as newline-delimited JSON with typed event payloads (status, text-delta, citation), so analysts see sourced claims as they stream. Citation grounding validation prevents the model from citing passages it cannot demonstrate it read.",
    image: null,
    tags: ["Python", "FastAPI", "pgvector", "PydanticAI", "OpenAI", "React 19", "Supabase", "PostgreSQL"],
    technologies: [
      "Python",
      "FastAPI",
      "PydanticAI",
      "OpenAI",
      "pgvector",
      "PostgreSQL",
      "Supabase",
      "React 19",
      "TypeScript",
      "Vercel AI SDK",
      "Docker",
      "Railway",
    ],
    keyFeatures: [
      "Hybrid retrieval fusing pgvector semantic search (OpenAI text-embedding-3-small, 1536 dimensions, cosine distance) and PostgreSQL full-text search (tsvector, plainto_tsquery, ts_rank_cd) via Reciprocal Rank Fusion (RRF, k=60), hydrating top-k chunks with ±1 neighbor context",
      "LLM-assisted keyword extraction (gpt-4.1-mini) generating 3–5 high-precision search terms per query without requiring structured query syntax",
      "PydanticAI agent loop (gpt-4.1, temperature=0) with four tools (search_filings, read_chunk, read_chunks, read_surrounding_chunks) executing up to 20 LLM calls per turn, producing a typed GroundedAnswer struct with inline citation markers",
      "Citation grounding validator checking each citation's verbatim excerpt against retrieved chunk text, pruning invalid citations and retrying up to two times",
      "SSE streaming as newline-delimited JSON with typed events (status, text-delta, citation) decoupled from the citation panel",
      "Normalized PostgreSQL schema across six tables (source_documents, document_chunks, chat_threads, chat_messages, message_citations, profiles) with pgvector embeddings and generated tsvector columns, managed via Alembic migrations",
      "SEC EDGAR ingestion pipeline using Docling to parse HTML filings to structured Markdown, chunked, embedded via OpenAI batch API, and token-counted with tiktoken",
      "Supabase email auth with JWT verification in FastAPI, thread-scoped access control, and service-role key isolation so the browser never accesses privileged write paths",
      "React 19 + TypeScript + Tailwind CSS v4 frontend using Vercel AI SDK's useChat hook with a tee'd SSE consumer rendering real-time pipeline status alongside the answer stream",
      "Containerized backend (Python 3.12-slim + uv) and frontend (Node/pnpm + Caddy 2 Alpine) as independent Railway services with a Caddyfile SPA fallback",
    ],
    screenshots: [],
    link: "https://github.com/meghanan266/rag-document-assistant",
    category: "AI",
    featured: true,
  },
  {
    id: "fraudcopilot",
    name: "FraudCopilot: AI Fraud Investigation Agent",
    title: "FraudCopilot — AI-Powered Fraud Investigation Agent",
    shortDescription:
      "Autonomous fraud investigation agent using Semantic Kernel's ReAct loop — multi-step tool orchestration across 3 plugins with function calling guardrails.",
    description:
      "An autonomous fraud investigation agent in .NET 9 using Semantic Kernel's ReAct-style reasoning loop to orchestrate multi-step tool execution across transaction search, risk scoring, and fraud report generation. Console demo using fictional mock data — not connected to real banking systems.",
    problem:
      "Fraud analysts manually chain together transaction lookups, risk scoring, and report writing for every case — a repetitive multi-step workflow that's a natural fit for tool-orchestrating AI agents, but one that needs guardrails against runaway execution.",
    approach:
      "Built an autonomous agent on Semantic Kernel's ReAct-style reasoning loop that chains transaction search, risk scoring, and report generation via function calling, with logging and guardrail filters keeping tool execution observable and bounded.",
    impact:
      "Produces structured fraud risk reports with zero manual tool orchestration, and makes the agent's reasoning loop fully observable via per-tool-call logging and execution guardrails.",
    image: null,
    tags: [".NET 9", "Semantic Kernel", "Azure OpenAI", "C#"],
    technologies: [".NET 9", "Semantic Kernel", "Azure OpenAI", "C#"],
    keyFeatures: [
      "Autonomous fraud investigation agent using Semantic Kernel's ReAct-style reasoning loop to orchestrate multi-step tool execution via Azure OpenAI function calling",
      "Plugin-based fraud detection layer in C# with KernelFunction attributes on POCO classes, exposing transaction search, velocity-based risk scoring, and structured fraud report generation as discrete tools decoupled from AI orchestration logic",
      "ToolLoggingFilter logging every tool invocation for full observability into the agent's reasoning loop",
      "GuardrailFilter preventing runaway tool execution in a multi-step agentic workflow",
    ],
    screenshots: [],
    link: "https://github.com/meghanan266/FraudCopilot",
    category: "AI",
  },
  {
    id: "healthmcp",
    name: "HealthMCP: Healthcare MCP Server",
    title: "HealthMCP — Healthcare MCP Server",
    shortDescription:
      "Healthcare MCP server exposing 12 FHIR R4 clinical tools — consumable by Claude Desktop, Cursor, and programmatic clients via HTTP/SSE or stdio transport.",
    description:
      "A healthcare-domain Model Context Protocol server in .NET 9, exposing 12 clinical tools over multiple transports so it's consumable by Claude Desktop, Cursor, and programmatic clients without any client-specific integration code.",
    problem:
      "Clinical AI tooling needs to be consumable across multiple client types (chat clients, IDEs, custom agents) without duplicating tool logic per integration, while keeping guardrails around clinical data access.",
    approach:
      "Split the server across three projects sharing one set of 12 clinical tools over HTTP/SSE and stdio transports, with FHIR R4 resource handling and read-only SQL guardrails enforcing safety at the tool layer.",
    impact:
      "Same 12 clinical tools consumable by Claude Desktop, Cursor, and programmatic clients with zero client-specific integration code. Safety enforced at the tool layer rather than relying on the AI model, targeting the same data standards used by Epic, Cerner, and Azure Health Data Services.",
    image: null,
    tags: [".NET 9", "FHIR R4", "MCP", "Semantic Kernel", "ASP.NET Core"],
    technologies: [".NET 9", "Model Context Protocol (MCP)", "ASP.NET Core", "FHIR R4", "Semantic Kernel", "SQLite"],
    keyFeatures: [
      "3-project architecture (Server, Stdio, AgentClient) sharing 12 clinical tools across HTTP/SSE (port 5100) and stdio transports with zero code duplication",
      "FHIR R4 resource handling covering Patient, Condition, MedicationRequest, and Observation resource types",
      "extract_clinical_codes walks arbitrary FHIR JSON to surface ICD-10, SNOMED CT, RxNorm, and LOINC codes without per-resource parsing logic",
      "Read-only SQL guardrails via ClinicalQueryTools (Microsoft.Data.Sqlite, pipe-formatted results, max 50 rows, connection enforced read-only) and ClinicalAlertTools, enforcing safety at the tool layer rather than relying on the AI model",
      "Semantic Kernel AgentClient that discovers and registers tools at startup and runs an interactive natural-language loop",
    ],
    screenshots: [],
    link: "https://github.com/meghanan266/HealthMCP",
    category: "AI",
  },
  {
    id: "opsdash",
    name: "OpsDash: Real-Time Operational Intelligence Platform",
    title: "OpsDash: Real-Time Operational Intelligence Platform",
    shortDescription:
      "Multi-tenant SaaS with Z-score anomaly detection, metric correlation, forecasting, health scores, incident auto-grouping, SignalR push, and 85% latency reduction via Redis.",
    description:
      "A multi-tenant SaaS platform where organizations ingest operational metrics, monitor them in real-time, and get intelligent alerts when something goes wrong or is predicted to go wrong. Instead of a passive dashboard, OpsDash actively detects anomalies with statistical analysis, correlates related metric movements, forecasts trends, computes a weighted organizational health score, and auto-groups anomalies into incidents with full timelines — the same generic data model applies across industries (finance, healthcare, retail, ecommerce, travel), from fraud-score spikes to ER wait-time drift to checkout abandonment.",
    problem:
      "Metrics drift silently until it's too late — passive dashboards show data but don't tell you what's wrong, what's trending badly, or what else moved at the same time.",
    approach:
      "Built a rolling per-tenant Z-score baseline that flags anomalies, correlates related metric movements, auto-groups them into incidents, and forecasts trends to power predictive alerting — all pushed to clients in real time over SignalR.",
    impact:
      "Zero cross-tenant data leaks, 85% reduction in dashboard update latency via SignalR + Redis, and anomalies that used to require manual spot-checking now surface pre-correlated and pre-grouped into incidents — turning three unrelated-looking alerts into one actionable timeline.",
    image: null,
    tags: [".NET 9", "Angular 19", "SignalR", "Redis", "Azure", "SQL Server", "EF Core"],
    technologies: [
      "ASP.NET Core 9",
      "Angular 19",
      "SignalR",
      "Redis",
      "Azure",
      "Entity Framework Core 9",
      "JWT / RBAC",
      "SQL Server",
      "Docker",
      "FluentValidation",
      "AutoMapper",
      "xUnit",
    ],
    keyFeatures: [
      "Z-score anomaly detection engine with rolling per-tenant baselines and tiered severity (Warning, Critical, Severe)",
      "Time-windowed metric correlation surfaces related movements the instant an anomaly fires, instead of firing isolated alerts",
      "Forecasting via weighted moving average / linear regression, powering predictive alerts on projected (not just current) threshold breaches",
      "Weighted tenant health score (0–100) composited from metric normalcy, anomaly density, trend direction, and mean time to acknowledge",
      "Incident auto-grouping via time-window clustering with full lifecycle (Open → Acknowledged → Investigating → Resolved) and event timeline",
      "Three-layer tenant isolation: JWT claims, EF Core global query filters, and API-level authorization — zero cross-tenant leaks",
      "Replaced HTTP polling with SignalR WebSocket push over tenant-scoped groups, and IDistributedCache abstraction swapped to Azure Redis in prod via config only, cutting dashboard latency 85%",
      "Clean Architecture (Controllers → Services → Repositories) with FluentValidation, AutoMapper DTOs, and xUnit coverage on the intelligence services",
    ],
    screenshots: [],
    link: "https://github.com/meghanan266/OpsDash",
    category: "Full Stack",
    featured: true,
  },
  {
    id: "healthsense-iot",
    name: "HealthSense: Real-Time IoT Health Monitor",
    title: "HealthSense — Real-Time IoT Health Monitoring Dashboard",
    shortDescription:
      "Go microservices + AWS IoT Core platform. Zero data loss across 19,593 test messages. Sub-200ms anomaly detection latency.",
    description:
      "Built a cloud-native, real-time health telemetry platform that collects and visualizes wearable sensor data (heart rate, temperature, SpO₂, steps) from thousands of simulated IoT devices. The system uses Go for backend services, React for dashboards, and AWS streaming architecture (IoT Core, Kinesis, Lambda) with Redis caching for sub-second latency. Features anomaly detection with automated SNS/Email alerts, WebSocket live updates, and comprehensive observability with CloudWatch dashboards.",
    problem:
      "Monitoring health vitals from thousands of wearable devices in real-time — with sub-second latency and automated anomaly alerts.",
    approach:
      "Designed a cloud-native IoT platform with Go microservices, AWS streaming (IoT Core → Kinesis → Lambda → DynamoDB), Redis caching, and WebSocket dashboards.",
    impact:
      "10,000+ concurrent devices handled at p95 latency under 800ms. Redis caching reduced DynamoDB reads by 65%. Automated alerts catch tachycardia and fever spikes.",
    image: "/assets/healthsense/healthsense-1.png",
    tags: ["Go", "AWS IoT", "Kinesis", "Lambda", "DynamoDB", "MQTT", "React"],
    technologies: ["Go", "React", "AWS IoT Core", "Kinesis", "Lambda", "DynamoDB", "Redis", "Terraform", "Docker"],
    keyFeatures: [
      "Architected and deployed a distributed IoT platform handling 10,000+ concurrent devices with p95 end-to-end latency under 800ms",
      "Implemented MQTT ingestion via AWS IoT Core with Kinesis streaming for durable, scalable data processing at 2-second intervals",
      "Built anomaly detection system using EWMA, z-score algorithms, and debounce logic to identify health events (tachycardia, fever spikes)",
      "Designed Redis caching layer for hot data (last 5-10 minutes) reducing DynamoDB reads by 65% and achieving sub-second dashboard updates",
      "Developed Go REST API and WebSocket server with JWT authentication and tenant-based data isolation for multi-tenant support",
      "Created React dashboard with real-time Chart.js visualizations, live telemetry tiles, alert feeds, and toggle between polling vs WebSocket modes",
      "Configured automated SNS/Email alerts with configurable thresholds and delivery tracking via CloudWatch metrics",
      "Productionized with Terraform IaC (VPC, IoT, Kinesis, Lambda, DynamoDB, ElastiCache, SNS), Docker containerization, and CI/CD via GitHub Actions",
      "Conducted load testing experiments comparing throughput vs latency at 1k/5k/10k device scales, polling vs WebSocket performance, and failure recovery scenarios",
      "Implemented comprehensive observability with CloudWatch dashboards tracking Kinesis iterator age, Lambda duration/errors, DynamoDB throttles, API latency percentiles, and WebSocket connections",
    ],
    screenshots: [
      "/assets/healthsense/healthsense-1.png",
      "/assets/healthsense/healthsense-2.png",
      "/assets/healthsense/healthsense-3.png",
      "/assets/healthsense/healthsense-4.png",
    ],
    link: "https://github.com/meghanan266/Healthsense-IoT-Monitoring",
    category: "Backend",
    featured: true,
  },
  {
    id: "flashsale",
    name: "Flashsale Order Processing System",
    title: "Flashsale Order Processing System",
    shortDescription:
      "Cloud-native event-driven order system on AWS ECS + SNS/SQS. Sub-100ms order acceptance under flash-sale load. Load-tested at 1000+ req/sec with Locust.",
    description:
      "A cloud-native, event-driven order processing system in Go that decouples payment and fulfillment from order acceptance, keeping the checkout path fast even under flash-sale traffic spikes.",
    problem:
      "Flash sales generate extreme traffic spikes — synchronous order processing blocks on payment calls and collapses under load, overselling inventory and corrupting orders.",
    approach:
      "Built on AWS ECS, SNS/SQS, Lambda, ALB, and Terraform: the order endpoint returns 202 Accepted immediately while SQS worker consumers process payment independently, backed by 20 ECS worker containers chosen over Lambda for sustained-throughput persistence.",
    impact:
      "Order acceptance latency held under 100ms at peak load — versus a synchronous baseline that failed ~80% of requests at just 20 concurrent users. Load-tested at 1000+ req/sec with Locust across 6 documented sync-vs-async comparison phases.",
    image: null,
    tags: ["Go", "AWS ECS", "SNS/SQS", "Lambda", "ALB", "Terraform"],
    technologies: ["Go", "AWS ECS", "SNS/SQS", "Lambda", "ALB", "Terraform", "Locust"],
    keyFeatures: [
      "Decoupled payment and fulfillment from order acceptance via SNS/SQS — order endpoint returns 202 Accepted immediately while SQS worker consumers process payment (3s/order) independently",
      "Order acceptance latency under 100ms at peak load, versus a synchronous baseline that failed ~80% of requests under just 20 concurrent users due to payment blocking",
      "Scaled to 20 ECS worker containers sustaining ~20 orders/sec against 60 req/sec inbound load; chose ECS over Lambda for workers since sustained throughput benefits from persistent containers over per-invocation cold starts",
      "Load-tested at 1000+ requests/sec using Locust, validating horizontal worker scaling and queue-based backpressure across 6 documented phases comparing synchronous vs. asynchronous architectures",
    ],
    screenshots: [],
    link: "https://github.com/meghanan266/flashsale-async-system",
    category: "Backend",
  },
  {
    id: "snip",
    name: "Snip: URL Shortener with Analytics",
    title: "Snip — Link Shortener with Analytics Pipeline",
    shortDescription:
      "Production-grade URL shortener with edge-level redirects in Next.js middleware, Redis cache-aside for sub-5ms latency, and async analytics via QStash.",
    description:
      "A production-grade link shortener with real-time analytics, built with Next.js 14 App Router, Prisma/MySQL, Upstash Redis, and Upstash QStash, deployed to Vercel with PlanetScale as the cloud database.",
    problem:
      "Link shorteners need sub-5ms redirect latency at the edge while still capturing rich per-click analytics — but writing analytics synchronously on the redirect path directly trades away that latency.",
    approach:
      "Built the redirect engine directly into Next.js middleware with a Redis cache-aside pattern, and decoupled click analytics onto an async QStash queue so tracking never touches the redirect's critical path.",
    impact:
      "Redirect latency held under 5ms regardless of analytics write time. Built a 30-day analytics dashboard with clicks-over-time, top countries/referrers, and device breakdown via server-side Prisma groupBy aggregation.",
    image: null,
    tags: ["Next.js", "TypeScript", "Redis", "MySQL", "Prisma", "QStash", "Vercel"],
    technologies: ["Next.js 14", "TypeScript", "Prisma", "MySQL", "Upstash Redis", "Upstash QStash", "Vercel", "PlanetScale"],
    keyFeatures: [
      "Redirect engine implemented in Next.js middleware with a Redis cache-aside pattern, keeping redirect latency under 5ms",
      "Async event queue via Upstash QStash decoupling click analytics from the redirect path — ev.waitUntil(recordClick()) posts to a webhook consumer that writes to MySQL",
      "processLink()/createLink() separation mirroring the open source Dub codebase's architecture, keeping route handlers as thin orchestrators",
      "SHA-256 hashed API key authentication via a higher-order withApiKey middleware wrapper",
      "Sliding window rate limiting via Upstash Ratelimit using Redis sorted sets (100 req/min redirects, 60 req/min API)",
      "30-day analytics dashboard with Recharts visualizations — clicks-over-time, top countries/referrers, device breakdown — via server-side Prisma groupBy",
      "Claude Code AI workflow with a committed CLAUDE.md project memory file and a custom code-reviewer agent enforcing cache invalidation correctness and API response format consistency",
    ],
    screenshots: [],
    link: "https://github.com/meghanan266/Snip-URL-Shortener-with-Analytics",
    category: "Full Stack",
  },
  {
    id: "devflow",
    name: "DevFlow: AI Code Review Platform",
    title: "DevFlow: AI Code Review Platform",
    shortDescription:
      "AI-powered code review automation — GitHub/GitLab webhook integration triggers OpenAI-powered PR analysis and security checks on every pull request.",
    description:
      "A full-stack AI code review platform that hooks into GitHub/GitLab webhooks to automatically analyze every pull request for bugs, style issues, and security risks.",
    problem:
      "Manual code review is time-consuming and inconsistent across reviewers — teams need automated, LLM-backed feedback that fires on every pull request without slowing down the merge cycle.",
    approach:
      "Built a Node.js/TypeScript backend that listens on GitHub/GitLab webhooks, runs OpenAI-powered analysis for bug detection and security checks on each PR, and surfaces results in a real-time React dashboard with team metrics.",
    impact:
      "Every pull request gets automated, AI-generated review feedback with zero manual triggering, plus a live dashboard tracking team-wide code quality metrics and configurable review rules.",
    image: null,
    tags: ["Node.js", "TypeScript", "React", "PostgreSQL", "OpenAI", "GitHub API"],
    technologies: ["Node.js", "TypeScript", "React", "PostgreSQL", "GitHub API", "GitLab API", "OpenAI API"],
    keyFeatures: [
      "GitHub/GitLab webhook integration triggering automated pull request analysis and security checks on every PR",
      "OpenAI-powered code insights surfacing bugs, style issues, and security risks inline with the diff",
      "Real-time React dashboard tracking team-wide code quality metrics and review activity",
      "Configurable review rule management letting teams tune what the AI flags per repository",
    ],
    screenshots: [],
    link: "https://github.com/meghanan266/devflow",
    category: "AI",
  },
  {
    id: "career-link",
    name: "CareerLink: AI Job Portal",
    title: "CareerLink Web Application",
    shortDescription:
      "Full-stack job portal with JWT/RBAC auth, AI-driven resume analysis via Google AI Studio, and Cloudinary file storage. Built in a team of 3.",
    description:
      "CareerLink is a full-stack platform designed to streamline job searches and employer outreach. It offers secure, role-based access for employers and job seekers, advanced job filtering, and AI-driven resume feedback using Google's Gemini API. Built for performance, clarity, and scale.",
    problem:
      "Job seekers struggle with irrelevant listings, and employers drown in unqualified applications. Both sides need smarter tools.",
    approach:
      "Built a full-stack platform with React, Node.js, and PostgreSQL — featuring AI-powered resume analysis via Google Gemini, advanced filtering, and role-based access.",
    impact:
      "Delivered a platform with AI resume feedback, secure file uploads via Cloudinary, and dynamic job matching — deployed with CI/CD on Vercel.",
    image: "/assets/career-link/career-1.png",
    tags: ["Node.js", "Express", "PostgreSQL", "Prisma", "React", "Google AI", "Jest"],
    technologies: [
      "React.js",
      "Material UI",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Google AI Studio API",
      "Cloudinary",
      "JavaScript",
      "Vercel",
    ],
    keyFeatures: [
      "Implemented token-based authentication with HTTP-only cookies for secure user sessions",
      "Designed Role-Based Access Control (RBAC) for employers (job posting dashboard) and job seekers (application tracking)",
      "Built advanced job filtering by location, salary range, and skills using dynamic query logic",
      "Integrated Google AI Studio (Gemini 2.0 Flash) for AI-powered resume analysis and feedback generation",
      "Configured secure resume upload and storage via Cloudinary for fast access and retrieval",
      "Developed RESTful APIs using Node.js and Express, and managed relational data with PostgreSQL and Prisma ORM",
      "Deployed the frontend on Vercel with CI/CD from GitHub for a seamless DevOps workflow",
    ],
    screenshots: [
      "/assets/career-link/career-1.png",
      "/assets/career-link/career-2.png",
      "/assets/career-link/career-3.png",
      "/assets/career-link/career-4.png",
    ],
    link: "https://github.com/meghanan266/career-link",
    category: "Full Stack",
  },
  {
    id: "e-commerce-application",
    name: "Verdant Online Store",
    title: "Verdant Online Store",
    shortDescription:
      "Full-stack e-commerce platform with Razorpay payment integration, JWT auth, RBAC, and CI/CD pipeline. Deployed on Azure App Service + Vercel.",
    description:
      "Developed a highly scalable and secure e-commerce platform using Angular and .NET Core (C#). Implemented JWT authentication with guards and interceptors, integrated Razorpay for payments, and designed a responsive UI optimized for both desktop and mobile using Bootstrap. Utilized Entity Framework for efficient ORM to manage database interactions.",
    problem:
      "Building a secure, scalable online store with real-time payment processing and role-based admin controls — without compromising on mobile responsiveness.",
    approach:
      "Architected a full-stack platform with Angular and .NET Core, using JWT guards for security, Razorpay for payments, and Entity Framework for clean data access.",
    impact:
      "Delivered a production-ready e-commerce platform deployed on Azure with secure payments, responsive design across all devices, and a full admin dashboard.",
    image: "/assets/verdant/ecomm-1.png",
    tags: [".NET Core", "Angular", "SQL Server", "JWT", "Razorpay", "Azure"],
    technologies: [
      "Angular",
      ".NET Core (C#)",
      "Azure",
      "JWT Authentication",
      "Razorpay",
      "Bootstrap",
      "SQL Server",
      "GitHub",
      "Vercel",
      "Entity Framework",
    ],
    keyFeatures: [
      "Developed secure JWT authentication with role-based access for a safe user experience",
      "Integrated Razorpay for seamless payment processing and session security",
      "Created a dynamic admin dashboard to simplify product and order management",
      "Designed a responsive, mobile-first UI using Bootstrap, ensuring accessibility across devices",
      "Deployed on Azure with SQL Database for scalability and reliability",
      "Cart functionality for adding, updating, and removing items",
      "Version control using GitHub",
      "Database management using Entity Framework for seamless ORM operations",
    ],
    screenshots: [
      "/assets/verdant/ecomm-1.png",
      "/assets/verdant/ecomm-2.png",
      "/assets/verdant/ecomm-3.png",
      "/assets/verdant/ecomm-4.png",
    ],
    link: "https://github.com/meghanan266/Verdant-online-store",
    category: "Full Stack",
  },
  {
    id: "food-donation",
    name: "Food Bridge Application",
    title: "Food Bridge Application",
    shortDescription:
      "Food donation platform using DB triggers, stored procedures, and event scheduling to automate expiration tracking, donor rewards, and real-time matching.",
    description:
      "Designed and developed a full-stack web application to reduce food waste by connecting donors with surplus food to recipients in need. Built with Angular, Flask, and MySQL, it features a responsive user interface, secure APIs, and database management, with a focus on societal impact and technical excellence.",
    problem:
      "Millions of pounds of food go to waste daily while people go hungry. The challenge: connect surplus food donors with recipients efficiently.",
    approach:
      "Developed a full-stack app with Angular, Flask, and MySQL featuring automated expiration management, donor rewards, and a normalized database with triggers.",
    impact:
      "Created a working platform that streamlines food donation logistics with automated post management and real-time donor-recipient matching.",
    image: "/assets/food-bridge/food-1.png",
    tags: ["Python", "Flask", "MySQL", "Angular"],
    technologies: ["Angular", "Flask", "MySQL", "Python"],
    keyFeatures: [
      "Designed and developed a responsive frontend using Angular and Angular Material.",
      "Built RESTful APIs with Flask for efficient data exchange and integration with MySQL.",
      "Implemented a normalized MySQL database schema with triggers, stored procedures, and event scheduling.",
      "Developed automated tasks to manage food post expirations and donor reward updates.",
    ],
    screenshots: [
      "/assets/food-bridge/food-1.png",
      "/assets/food-bridge/food-2.png",
      "/assets/food-bridge/food-3.png",
      "/assets/food-bridge/food-4.png",
    ],
    link: "https://github.com/meghanan266/Food-donation",
    category: "Full Stack",
  },
  {
    id: "reddit-ml-sentiment-analysis",
    name: "Social Media Sentiment Analysis",
    title: "Social Media Sentiment Analysis",
    shortDescription:
      "Python ETL pipeline processing 300K+ Reddit posts with NLTK, VADER sentiment scoring, and Prophet time-series forecasting across 42 ML topics.",
    description:
      "Analyzed over a decade of discourse evolution in the MachineLearning subreddit, tracking the rise of deep learning, sentiment trends, and community growth from 2009 to 2020. Built a comprehensive data science pipeline with NLP preprocessing, VADER sentiment analysis, SQLite database storage, and Facebook Prophet forecasting. Features an interactive Streamlit dashboard for exploring 42 tracked ML terms and visualizing trends.",
    problem:
      "Understanding how the machine learning community's interests and sentiment evolved over a decade — across 300K+ Reddit posts.",
    approach:
      "Built an end-to-end data science pipeline with VADER sentiment analysis, NLP preprocessing, SQLite storage, and Prophet forecasting — visualized in Streamlit.",
    impact:
      "Tracked 42 ML terms revealing Deep Learning grew 890%, Transformer adoption surged 2000%, and PyTorch overtook TensorFlow by 2019.",
    image: "/assets/sentiment-analysis/reddit-ml-1.png",
    tags: ["Python", "pandas", "NLTK", "SQLite", "Streamlit", "VADER", "Prophet"],
    technologies: ["Python", "pandas", "Prophet", "Streamlit", "SQLite", "Matplotlib", "GitHub"],
    keyFeatures: [
      "Processed 300,000+ Reddit posts and comments from 2009-2020 using advanced NLP techniques (tokenization, lemmatization, stopword removal)",
      "Tracked 42 ML terms across 5 categories (models, architectures, frameworks, techniques, application areas) with automated term extraction",
      "Implemented VADER sentiment analysis achieving 82% accuracy on manually labeled test set, analyzing sentiment trends over 11 years",
      "Built modular pipeline using MVC architecture with separate modules for preprocessing, sentiment analysis, database operations, and forecasting",
      "Designed and implemented SQLite database with normalized schema for efficient querying and data retrieval",
      "Developed Facebook Prophet forecasting models generating 24-month predictions with confidence intervals for ML term adoption and sentiment trends",
      "Created interactive Streamlit dashboard with 7 sections including data exploration, ML terms analysis, sentiment visualization, and forecasting charts",
      "Identified key insights: Deep Learning grew 890%, Transformer adoption increased 2000%, PyTorch overtook TensorFlow by 2019",
    ],
    screenshots: [
      "/assets/sentiment-analysis/reddit-ml-1.png",
      "/assets/sentiment-analysis/reddit-ml-2.png",
      "/assets/sentiment-analysis/reddit-ml-3.png",
      "/assets/sentiment-analysis/reddit-ml-4.png",
    ],
    link: "https://github.com/meghanan266/Social-Media-Sentiment-Analysis",
    category: "Data",
  },
  {
    id: "image-processing-application",
    name: "Image Manipulation Tool",
    title: "Image Processing Application",
    shortDescription:
      "Desktop image processing application built in Java with a custom GUI for applying filters, transformations, and pixel-level manipulations.",
    description:
      "Designed and implemented a robust Java-based application for advanced image processing. The project showcases proficiency in software design patterns, modular architecture, and testing practices. It includes both a user-friendly GUI built with Swing and a flexible command-line interface for advanced scripting.",
    problem:
      "Creating an extensible image processing tool that supports both GUI and command-line workflows while maintaining clean, testable architecture.",
    approach:
      "Built a modular Java application using MVC architecture, SOLID principles, and Swing for the GUI — with comprehensive JUnit test coverage.",
    impact:
      "Produced a robust desktop tool supporting advanced filters, transformations, and histogram generation with both visual and scripted interfaces.",
    image: "/assets/image-process/img-process-1.png",
    tags: ["Java"],
    technologies: [
      "Java",
      "Swing",
      "JUnit Testing",
      "MVC Architecture",
      "Object-Oriented Programming (OOP)",
      "Design Patterns",
      "Command-Line Interface (CLI)",
    ],
    keyFeatures: [
      "Modular design using MVC architecture and SOLID principles for maintainability and scalability",
      "Support for GUI (Swing) and CLI workflows",
      "Advanced image processing capabilities: filtering, transformations, histogram generation, image splitting/combination",
      "Applied TDD (Test-Driven Development) methodologies with JUnit ensuring reliability and robust error handling",
      "Clean and reusable code leveraging OOP principles and design patterns",
    ],
    screenshots: ["/assets/image-process/img-process-1.png", "/assets/image-process/img-process-2.png"],
    category: "Backend",
  },
];
