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
    name: "OpsDash: Multi-Tenant Operations Dashboard",
    shortDescription:
      "Multi-tenant SaaS platform with Z-score anomaly detection, metric forecasting, incident auto-grouping, and SignalR real-time push — 85% latency reduction via Redis.",
    description:
      "Prevented cross-tenant data leaks with EF Core global query filters and JWT-based isolation. Z-score anomaly detection engine, weighted moving average forecasting, incident auto-grouping, and real-time tenant health scores. Replaced polling with SignalR WebSocket push and Redis caching — 85% dashboard latency reduction.",
    image: null,
    tags: [".NET Core", "SignalR", "Redis", "Azure", "Angular", "SQL Server", "Docker"],
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
    shortDescription:
      "AI research assistant for SEC filings — hybrid pgvector + FTS retrieval fused via RRF, PydanticAI agent loop, citation grounding, SSE streaming.",
    image: null,
    tags: ["Python", "FastAPI", "pgvector", "PydanticAI", "OpenAI", "React 19", "Supabase", "PostgreSQL"],
    category: "AI",
    featured: true,
  },
  {
    id: "fraudcopilot",
    name: "FraudCopilot: AI Fraud Investigation Agent",
    shortDescription:
      "Autonomous fraud investigation agent using Semantic Kernel's ReAct loop — multi-step tool orchestration across 3 plugins with function calling guardrails.",
    image: null,
    tags: [".NET 9", "Semantic Kernel", "Azure OpenAI", "C#"],
    category: "AI",
  },
  {
    id: "healthmcp",
    name: "HealthMCP: Healthcare MCP Server",
    shortDescription:
      "Healthcare MCP server exposing 12 FHIR R4 clinical tools — consumable by Claude Desktop, Cursor, and programmatic clients via HTTP/SSE or stdio transport.",
    image: null,
    tags: [".NET 9", "FHIR R4", "MCP", "Semantic Kernel", "ASP.NET Core"],
    category: "AI",
  },
  {
    id: "opsdash",
    name: "OpsDash: Multi-Tenant Operations Dashboard",
    shortDescription:
      "Multi-tenant SaaS with Z-score anomaly detection, metric forecasting, incident auto-grouping, SignalR push, and 85% latency reduction via Redis.",
    image: null,
    tags: [".NET Core", "SignalR", "Redis", "Azure", "Angular", "SQL Server"],
    category: "Full Stack",
    featured: true,
  },
  {
    id: "healthsense-iot",
    name: "HealthSense: Real-Time IoT Health Monitor",
    shortDescription:
      "Go microservices + AWS IoT Core platform. Zero data loss across 19,593 test messages. Sub-200ms anomaly detection latency.",
    image: "/assets/healthsense/healthsense-1.png",
    tags: ["Go", "AWS IoT", "Kinesis", "Lambda", "DynamoDB", "MQTT", "React"],
    category: "Backend",
    featured: true,
  },
  {
    id: "flashsale",
    name: "Flashsale Order Processing System",
    shortDescription:
      "Cloud-native event-driven order system on AWS ECS + SNS/SQS. Sub-100ms order acceptance under flash-sale load. Load-tested at 1000+ req/sec with Locust.",
    image: null,
    tags: ["Go", "AWS ECS", "SNS/SQS", "Lambda", "ALB", "Terraform"],
    category: "Backend",
  },
  {
    id: "snip",
    name: "Snip: Link Shortener with Analytics",
    shortDescription:
      "Production-grade link shortener with edge-level redirects in Next.js middleware, Redis cache-aside for sub-5ms latency, and async analytics via QStash.",
    image: null,
    tags: ["Next.js", "TypeScript", "Redis", "MySQL", "Prisma", "QStash", "Vercel"],
    category: "Full Stack",
  },
  {
    id: "devflow",
    name: "DevFlow: AI Code Review Platform",
    shortDescription:
      "AI-powered code review automation — GitHub/GitLab webhook integration triggers OpenAI-powered PR analysis and security checks on every pull request.",
    image: null,
    tags: ["Node.js", "TypeScript", "React", "PostgreSQL", "OpenAI", "GitHub API"],
    category: "AI",
  },
  {
    id: "career-link",
    name: "CareerLink: AI Job Portal",
    shortDescription:
      "Full-stack job portal with JWT/RBAC auth, AI-driven resume analysis via Google AI Studio, and Cloudinary file storage. Built in a team of 3.",
    image: "/assets/career-link/career-1.png",
    tags: ["Node.js", "Express", "PostgreSQL", "Prisma", "React", "Google AI", "Jest"],
    category: "Full Stack",
  },
  {
    id: "e-commerce-application",
    name: "Verdant Online Store",
    shortDescription:
      "Full-stack e-commerce platform with Razorpay payment integration, JWT auth, RBAC, and CI/CD pipeline. Deployed on Azure App Service + Vercel.",
    image: "/assets/verdant/ecomm-1.png",
    tags: [".NET Core", "Angular", "SQL Server", "JWT", "Razorpay", "Azure"],
    category: "Full Stack",
  },
  {
    id: "food-donation",
    name: "Food Bridge Application",
    shortDescription:
      "Food donation platform using DB triggers, stored procedures, and event scheduling to automate expiration tracking, donor rewards, and real-time matching.",
    image: "/assets/food-bridge/food-1.png",
    tags: ["Python", "Flask", "MySQL", "Angular"],
    category: "Full Stack",
  },
  {
    id: "reddit-ml-sentiment-analysis",
    name: "Social Media Sentiment Analysis",
    shortDescription:
      "Python ETL pipeline processing 300K+ Reddit posts with NLTK, VADER sentiment scoring, and Prophet time-series forecasting across 42 ML topics.",
    image: "/assets/sentiment-analysis/reddit-ml-1.png",
    tags: ["Python", "pandas", "NLTK", "SQLite", "Streamlit", "VADER", "Prophet"],
    category: "Data",
  },
  {
    id: "image-processing-application",
    name: "Image Manipulation Tool",
    shortDescription:
      "Desktop image processing application built in Java with a custom GUI for applying filters, transformations, and pixel-level manipulations.",
    image: "/assets/image-process/img-process-1.png",
    tags: ["Java"],
    category: "Other",
  },
];
