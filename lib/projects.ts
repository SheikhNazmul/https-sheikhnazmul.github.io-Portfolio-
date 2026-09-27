import { Project, Technology, Service, ArchitectureNode, ApiEndpoint } from './types';

export const PERSONAL_INFO = {
  name: "Sheikh Nazmul Islam",
  title: "AI Engineer | GenAI Developer | LLM & RAG Engineer | AI Automation Developer",
  bio: "I build production-grade AI applications, LLM architectures, retrieval-augmented generation (RAG) pipelines, autonomous AI agents, and high-performance Python/FastAPI backends.",
  github: "https://github.com/SheikhNazmul",
  linkedin: "https://linkedin.com/in/sheikh-nazmul-islam", // Replaceable placeholder
  email: "nazmul.ai.dev@gmail.com", // Replaceable placeholder
  location: "Remote / Available Worldwide",
  existingPortfolio: "https://sheikhnazmul.github.io/portfolio/",
};

export const PROJECTS: Project[] = [
  {
    id: "ml-prediction-fastapi",
    title: "ML Prediction FastAPI System",
    slug: "ml-prediction-fastapi",
    category: ["Machine Learning", "Backend"],
    description: "Production-ready machine learning inference system built with FastAPI, Scikit-learn, and PostgreSQL. Features real-time prediction endpoints, schema validation with Pydantic, and automated log recording.",
    problem: "ML models developed in Jupyter notebooks often fail to transition into reliable production microservices with proper input validation, async scaling, and persistent prediction history.",
    solution: "Engineered a containerized FastAPI microservice with Pydantic payload sanitization, asynchronous Scikit-learn model inference pipeline, and PostgreSQL database integration for structured prediction logging and monitoring.",
    technologies: ["Python", "FastAPI", "Scikit-learn", "PostgreSQL", "Pydantic", "Docker", "REST API"],
    features: [
      "High-throughput async prediction REST endpoints",
      "Pydantic schema validation for feature vectors",
      "Asynchronous PostgreSQL connection pool for inference logging",
      "Automated Swagger / OpenAPI interactive documentation",
      "Comprehensive error handling and structured JSON logging"
    ],
    githubUrl: "https://github.com/SheikhNazmul", // Real GitHub profile, expandable
    apiUrl: "https://github.com/SheikhNazmul", // Placeholder indicator
    status: "Functional Demo",
    featured: true,
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
    ],
    architectureSteps: [
      { step: "01", title: "Client Request", description: "HTTP POST request with sanitized JSON payload sent to FastAPI endpoint." },
      { step: "02", title: "Schema Validation", description: "Pydantic verifies feature data types and checks input parameter bounds." },
      { step: "03", title: "ML Inference", description: "Pre-loaded Scikit-learn model calculates prediction probability scores asynchronously." },
      { step: "04", title: "Persistence & Log", description: "Prediction record and metadata saved to PostgreSQL table." },
      { step: "05", title: "Response Payload", description: "Clean structured JSON response returned to caller with prediction metric." }
    ],
    challenges: [
      "Ensuring sub-50ms latency while maintaining synchronous model evaluation alongside asynchronous database logging.",
      "Preventing model drift and handling out-of-distribution input feature values cleanly."
    ],
    futureImprovements: [
      "Implement model retraining pipeline triggers via webhooks.",
      "Add Prometheus metrics exporter for inference latency monitoring."
    ]
  },
  {
    id: "llm-genai-chatbot",
    title: "LLM / RAG Knowledge Assistant",
    slug: "llm-genai-chatbot",
    category: ["AI / GenAI", "LLM", "RAG", "Backend"],
    description: "Enterprise Retrieval-Augmented Generation (RAG) system using LangChain, vector embeddings, and FastAPI. Enables intelligent querying across custom technical documentation with strict hallucination control.",
    problem: "Standard LLMs lack context regarding proprietary organization data and frequently fabricate answers (hallucinate) when asked about internal technical specifications.",
    solution: "Designed a RAG architecture that ingests unstructured markdown/PDF data, generates dense vector embeddings, performs semantic vector search, and feeds verified context chunks to the LLM for grounded answers.",
    technologies: ["Python", "LangChain", "LLMs", "RAG", "FastAPI", "Vector Databases", "REST APIs"],
    features: [
      "Multi-document ingestion with intelligent chunking strategies",
      "Dense vector similarity search with cosine distance reranking",
      "Strict context-grounded prompt templates preventing hallucinations",
      "Conversational memory buffer with sliding window context management",
      "Streaming SSE (Server-Sent Events) tokens to frontend UI"
    ],
    githubUrl: "https://github.com/SheikhNazmul",
    status: "Functional Demo",
    featured: true,
    screenshots: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ],
    architectureSteps: [
      { step: "01", title: "User Query", description: "User enters natural language question in web frontend." },
      { step: "02", title: "Embedding & Vector Search", description: "Query is converted to vector embedding and matched against Vector DB." },
      { step: "03", title: "Context Retrieval", description: "Top relevant document chunks retrieved based on semantic similarity scores." },
      { step: "04", title: "Augmented LLM Prompt", description: "Context chunks merged into prompt payload sent to LLM API." },
      { step: "05", title: "Grounded Response", description: "LLM returns accurate answer citing source document references." }
    ],
    challenges: [
      "Optimizing chunk sizing to maintain semantic coherence without exceeding context limits.",
      "Ensuring rapid vector retrieval across multi-gigabyte document collections."
    ],
    futureImprovements: [
      "Add Hybrid Search combining Sparse BM25 with Dense Vector embeddings.",
      "Implement automatic citation highlighting in the frontend."
    ]
  },
  {
    id: "ai-sales-lead-agent",
    title: "AI Sales & Lead Qualification Agent",
    slug: "ai-sales-lead-agent",
    category: ["AI Agents", "AI / GenAI", "LLM", "Automation"],
    description: "Autonomous multi-step AI agent pipeline that ingests raw business leads, analyzes target company pain points, generates hyper-personalized outreach sequences, and updates CRM systems.",
    problem: "Manual lead qualification and customized outreach research consumes dozens of sales hours weekly, leading to slow response times and generic cold messages.",
    solution: "Constructed an AI Agent pipeline using Python, LLMs, and API integrations that automates deep business research, lead scoring, and customized communication drafting in seconds.",
    technologies: ["Python", "LLMs", "AI Agents", "RAG", "FastAPI", "Webhooks", "n8n"],
    features: [
      "Autonomous website scraper & company data extractor",
      "AI-driven B2B lead scoring based on target ICP criteria",
      "Customized pain-point research & messaging generator",
      "Automated webhook sync with CRM databases (PostgreSQL/HubSpot)",
      "Instant Slack / Email notification alerts for high-value leads"
    ],
    githubUrl: "https://github.com/SheikhNazmul",
    status: "Functional Demo",
    featured: true,
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
    ],
    architectureSteps: [
      { step: "01", title: "Lead Ingestion", description: "Raw lead submitted via Webhook or form entry." },
      { step: "02", title: "Company Web Scraping", description: "Agent extracts public details, services, and team background." },
      { step: "03", title: "Pain Point Analysis", description: "LLM Agent cross-references company offerings against ICP parameters." },
      { step: "04", title: "Personalized Outreach", description: "Agent drafts targeted introduction message addressing specific needs." },
      { step: "05", title: "CRM & Alert Routing", description: "Qualified lead updated in database with score and personalized copy." }
    ],
    challenges: [
      "Handling dynamic web layouts during automated scraping without triggering rate limits.",
      "Maintaining agent reasoning consistency across edge cases."
    ],
    futureImprovements: [
      "Integrate automated LinkedIn outreach API workflow.",
      "Add human-in-the-loop review interface before email dispatch."
    ]
  },
  {
    id: "whatsapp-ai-automation",
    title: "WhatsApp AI Inventory & Order Assistant",
    slug: "whatsapp-ai-automation",
    category: ["Automation", "AI Agents", "Backend"],
    description: "End-to-end automated customer service and inventory agent combining WhatsApp Cloud API, n8n workflow engine, Google Sheets/Database sync, and AI natural language understanding.",
    problem: "E-commerce and service businesses lose sales due to delayed customer inquiries regarding inventory availability, pricing, and order status outside business hours.",
    solution: "Engineered a 24/7 WhatsApp AI automation workflow that intercepts incoming WhatsApp messages via webhooks, parses customer intent with an AI Agent, queries real-time inventory, and completes orders instantly.",
    technologies: ["WhatsApp Cloud API", "n8n", "AI Agent", "Google Sheets", "Webhooks", "Python", "REST APIs"],
    features: [
      "Real-time WhatsApp Webhook listener with instant response dispatch",
      "Natural language understanding for order placement & product stock lookup",
      "Automated stock check and dynamic Google Sheets / DB synchronization",
      "Multi-turn conversation handling for product selection and location verification",
      "Automated invoice summary generation and receipt dispatch"
    ],
    githubUrl: "https://github.com/SheikhNazmul",
    status: "Functional Demo",
    featured: true,
    screenshots: [
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
    ],
    architectureSteps: [
      { step: "01", title: "WhatsApp Message", description: "Customer sends message to official WhatsApp Business line." },
      { step: "02", title: "n8n Webhook Listener", description: "Webhook receives payload and triggers n8n workflow pipeline." },
      { step: "03", title: "AI Agent Intent Parsing", description: "AI Agent classifies message intent (Stock Query, Order Status, Support)." },
      { step: "04", title: "Inventory Lookup", description: "Workflow queries Google Sheets / DB API for real-time stock levels." },
      { step: "05", title: "Automated WhatsApp Reply", description: "WhatsApp Cloud API dispatches friendly, accurate answer back to customer." }
    ],
    challenges: [
      "Handling media attachments and voice notes cleanly in the WhatsApp webhook payload.",
      "Ensuring idempotent order processing to avoid duplicate orders."
    ],
    futureImprovements: [
      "Integrate Stripe Payment Link generation directly into WhatsApp chat.",
      "Add voice-to-text transcription for incoming WhatsApp audio messages."
    ]
  },
  {
    id: "expense-tracker-api",
    title: "Expense Tracker REST API",
    slug: "expense-tracker-api",
    category: ["Backend", "Machine Learning"],
    description: "Robust, production-ready financial tracking API built with FastAPI, PostgreSQL, SQLAlchemy ORM, and JWT Authentication. Includes automated monthly expense breakdown metrics.",
    problem: "Developers and small teams lack clean, modular microservice foundations for multi-tenant financial data management with robust role-based access control.",
    solution: "Developed a secure FastAPI backend featuring user authentication, password hashing, CRUD operations for transaction categories, auto-calculated metrics, and PostgreSQL database migrations.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "Pydantic", "REST APIs"],
    features: [
      "Secure JWT authentication with bcrypt password hashing",
      "Full CRUD operations for transactions, accounts, and categories",
      "PostgreSQL relational schema managed via SQLAlchemy & Alembic",
      "Aggregate monthly spend analytics and category summary endpoints",
      "Automated request validation and custom HTTP exception handlers"
    ],
    githubUrl: "https://github.com/SheikhNazmul",
    status: "Functional Demo",
    featured: false,
    screenshots: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80"
    ],
    architectureSteps: [
      { step: "01", title: "Auth Header", description: "Client sends HTTP request with Bearer JWT token." },
      { step: "02", title: "Token Verification", description: "FastAPI middleware decodes JWT and validates user session." },
      { step: "03", title: "OR Pipeline", description: "SQLAlchemy executes parameterized SQL queries against PostgreSQL DB." },
      { step: "04", title: "Analytics Calculation", description: "Python backend calculates summary totals and category allocations." },
      { step: "05", title: "JSON Response", description: "Structured financial breakdown returned to mobile/web frontend." }
    ],
    challenges: [
      "Optimizing complex SQL aggregation queries for fast monthly summaries.",
      "Ensuring seamless database migrations across production schema changes."
    ],
    futureImprovements: [
      "Add CSV/PDF financial report export generation endpoint.",
      "Add ML-based transaction auto-categorization model."
    ]
  }
];

export const TECHNOLOGIES: Technology[] = [
  {
    id: "python",
    name: "Python",
    category: "Backend",
    description: "Core programming language used for building AI models, FastAPI microservices, and automation pipelines.",
    associatedProjectIds: ["ml-prediction-fastapi", "llm-genai-chatbot", "ai-sales-lead-agent", "whatsapp-ai-automation", "expense-tracker-api"],
    isPrimary: true
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    description: "Modern, high-performance web framework for building async REST APIs with automatic OpenAPI/Swagger docs.",
    associatedProjectIds: ["ml-prediction-fastapi", "llm-genai-chatbot", "ai-sales-lead-agent", "expense-tracker-api"],
    isPrimary: true
  },
  {
    id: "llm",
    name: "Generative AI & LLMs",
    category: "AI / GenAI",
    description: "Integration of state-of-the-art models (OpenAI, Claude, Llama) into production workflows and enterprise applications.",
    associatedProjectIds: ["llm-genai-chatbot", "ai-sales-lead-agent"],
    isPrimary: true
  },
  {
    id: "rag",
    name: "RAG Systems",
    category: "AI / GenAI",
    description: "Retrieval-Augmented Generation connecting LLMs with private databases and vector indices for verified outputs.",
    associatedProjectIds: ["llm-genai-chatbot", "ai-sales-lead-agent"],
    isPrimary: true
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    category: "AI / GenAI",
    description: "Autonomous reasoning agents equipped with multi-step tools, web scraping, and multi-system API execution.",
    associatedProjectIds: ["ai-sales-lead-agent", "whatsapp-ai-automation"],
    isPrimary: true
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI / GenAI",
    description: "Framework for chaining LLMs, document loaders, memory stores, and vector search retrievers.",
    associatedProjectIds: ["llm-genai-chatbot"],
    isPrimary: false
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    description: "Enterprise open-source relational database engine used for robust transaction history and application data.",
    associatedProjectIds: ["ml-prediction-fastapi", "expense-tracker-api"],
    isPrimary: true
  },
  {
    id: "vector-db",
    name: "Vector Databases",
    category: "Database",
    description: "Specialized vector stores (Pinecone, ChromaDB, PGVector) for high-dimensional semantic search indexing.",
    associatedProjectIds: ["llm-genai-chatbot"],
    isPrimary: false
  },
  {
    id: "n8n",
    name: "n8n Automation",
    category: "Automation",
    description: "Workflow automation engine linking webhooks, AI agents, databases, and third-party APIs seamlessy.",
    associatedProjectIds: ["whatsapp-ai-automation", "ai-sales-lead-agent"],
    isPrimary: true
  },
  {
    id: "scikit-learn",
    name: "Scikit-learn",
    category: "Machine Learning",
    description: "Machine learning library for classification, regression, feature engineering, and model evaluation.",
    associatedProjectIds: ["ml-prediction-fastapi"],
    isPrimary: false
  },
  {
    id: "docker",
    name: "Docker",
    category: "Developer Tools",
    description: "Containerization tool for packaging Python applications and dependencies into predictable deployment images.",
    associatedProjectIds: ["ml-prediction-fastapi", "expense-tracker-api"],
    isPrimary: false
  }
];

export const SERVICES: Service[] = [
  {
    id: "ai-apps",
    title: "AI & GenAI Application Development",
    shortDescription: "Transform your concepts into production-ready software powered by LLMs and generative intelligence.",
    problem: "Companies want to incorporate modern AI capabilities into their products but struggle with latency, model reliability, and seamless UX integration.",
    whatIBuild: "Custom full-stack AI web applications, chat interfaces, content generators, and dynamic recommendation engines backed by scalable microservices.",
    technologies: ["Python", "FastAPI", "OpenAI / Claude APIs", "LangChain", "Next.js"],
    typicalDeliverable: "Fully functional, deployed AI web application with secure backend APIs, admin management interface, and monitoring."
  },
  {
    id: "rag-systems",
    title: "RAG & Knowledge Base Search",
    shortDescription: "Connect LLMs directly to your internal documents, PDFs, databases, and enterprise knowledge bases.",
    problem: "Off-the-shelf chatbots cannot answer questions accurately using your company's proprietary data and frequently output hallucinations.",
    whatIBuild: "Custom RAG pipelines that ingest, index, and retrieve precise information from your technical docs, manuals, and databases with verifiable source citations.",
    technologies: ["LangChain", "Vector DBs (Pinecone/PGVector)", "Python", "FastAPI", "OpenAI"],
    typicalDeliverable: "Containerized RAG microservice with automated document indexing workflow and sub-second retrieval accuracy."
  },
  {
    id: "ai-agents",
    title: "Autonomous AI Agent Systems",
    shortDescription: "Deploy intelligent agents that perform complex multi-step tasks, research, web browsing, and tool calls.",
    problem: "Repetitive knowledge work, manual data analysis, and multi-app workflows waste valuable team resources.",
    whatIBuild: "Multi-agent systems capable of conducting market research, lead qualification, automatic data extraction, and cross-system action execution.",
    technologies: ["AI Agents", "LangChain", "Python", "Webhooks", "Browser Automation"],
    typicalDeliverable: "Autonomous agent pipeline integrated with your notification channels (Slack, Email, CRM) and audit logs."
  },
  {
    id: "ai-automation",
    title: "AI Workflow & API Automation",
    shortDescription: "Automate complex business operations by combining n8n, webhooks, WhatsApp API, and AI models.",
    problem: "Disjointed tools (CRMs, Google Sheets, messaging apps, email) require manual human intervention to copy and process data.",
    whatIBuild: "Automated event-driven workflows connecting messaging APIs (WhatsApp, Telegram) and internal tools directly to AI decision engines.",
    technologies: ["n8n", "WhatsApp Cloud API", "Webhooks", "Google APIs", "Python"],
    typicalDeliverable: "24/7 self-healing automated workflow with error alerts, CRM sync, and operational dashboards."
  },
  {
    id: "fastapi-backend",
    title: "Python & FastAPI Backend Development",
    shortDescription: "High-performance, async REST APIs and microservices built with Python, Pydantic, and PostgreSQL.",
    problem: "Existing backend systems are sluggish, lack auto-generated documentation, or cannot scale to handle high concurrent async traffic.",
    whatIBuild: "Clean-architecture FastAPI backends featuring JWT auth, asynchronous database query pools, data validation, and Docker containerization.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker", "Swagger"],
    typicalDeliverable: "Production-ready backend repository complete with OpenAPI specs, database migration scripts, and deployment config."
  }
];

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "user-client",
    stepNumber: "01",
    label: "Client Layer",
    sublabel: "Web / Mobile / Webhook",
    tech: "Next.js / WhatsApp / HTTP",
    description: "User or external service initiates an interactive session or dispatches an event webhook."
  },
  {
    id: "fastapi-gateway",
    stepNumber: "02",
    label: "FastAPI Backend",
    sublabel: "Async Gateway & Auth",
    tech: "Python / Pydantic / JWT",
    description: "Validates incoming JSON payload schema, authenticates user, and routes request asynchronously."
  },
  {
    id: "ai-engine",
    stepNumber: "03",
    label: "AI Agent & Reasoning",
    sublabel: "LLM Orchestrator",
    tech: "LangChain / OpenAI / Claude",
    description: "Executes agent chain logic, decides tool calls, and structures multi-step prompt execution."
  },
  {
    id: "rag-vector",
    stepNumber: "04",
    label: "RAG & Vector Retrieval",
    sublabel: "Semantic Knowledge Index",
    tech: "Pinecone / PGVector / Embeddings",
    description: "Performs dense vector similarity search to fetch exact context snippets for grounded generation."
  },
  {
    id: "database",
    stepNumber: "05",
    label: "Database & History",
    sublabel: "Relational Persistence",
    tech: "PostgreSQL / SQLAlchemy",
    description: "Stores user accounts, conversation logs, prediction metrics, and audit history safely."
  },
  {
    id: "external-automation",
    stepNumber: "06",
    label: "Automation & Webhooks",
    sublabel: "Operational Sync",
    tech: "n8n / WhatsApp / CRM APIs",
    description: "Dispatches automated notifications, syncs third-party tools, and completes client workflows."
  }
];

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "predict-endpoint",
    title: "ML Feature Prediction Endpoint",
    method: "POST",
    path: "/api/v1/predict",
    description: "Submits a feature vector for real-time model inference and records prediction history in PostgreSQL database.",
    requestPayload: JSON.stringify({
      "age": 45,
      "blood_pressure": 130,
      "cholesterol": 210,
      "glucose_level": 95,
      "smoker": false
    }, null, 2),
    responsePayload: JSON.stringify({
      "status": "success",
      "prediction_id": "pred_98412a8f",
      "model_version": "v1.2.4",
      "prediction": "Low Risk",
      "confidence_score": 0.942,
      "processing_time_ms": 18.4,
      "timestamp": "2026-09-27T20:44:00Z"
    }, null, 2),
    githubUrl: "https://github.com/SheikhNazmul"
  },
  {
    id: "rag-query-endpoint",
    title: "RAG Contextual Search Endpoint",
    method: "POST",
    path: "/api/v1/rag/query",
    description: "Searches vector index for document context and generates grounded response with citations.",
    requestPayload: JSON.stringify({
      "query": "How do I configure vector database connection pooling in FastAPI?",
      "top_k": 3,
      "stream_response": false
    }, null, 2),
    responsePayload: JSON.stringify({
      "query": "How do I configure vector database connection pooling in FastAPI?",
      "answer": "To configure connection pooling for PGVector in FastAPI, initialize an async engine using AsyncEngine from SQLAlchemy with pool_size=10 and max_overflow=20 during startup event lifecycle...",
      "sources": [
        { "doc": "fastapi_pgvector_setup.md", "chunk_id": "c_402", "similarity": 0.891 }
      ],
      "tokens_used": 342
    }, null, 2),
    githubUrl: "https://github.com/SheikhNazmul"
  }
];

export const HOW_I_WORK_STEPS = [
  { step: "01", title: "Understand the Problem", description: "Deeply analyze business objectives, technical bottlenecks, data requirements, and success metrics." },
  { step: "02", title: "Design Architecture", description: "Define system blueprints, data schemas, API contracts, AI model selection, and vector strategy." },
  { step: "03", title: "Build Prototype", description: "Develop a working, functional prototype to validate core logic, speed, and feasibility early." },
  { step: "04", title: "Integrate AI & APIs", description: "Wire LLM chains, RAG vector search, custom FastAPI endpoints, and external webhook integrations." },
  { step: "05", title: "Rigorous Testing", description: "Run schema validations, edge-case evaluations, prompt stress tests, and API performance profiling." },
  { step: "06", title: "Production Deployment", description: "Deploy containerized services to production hosting with environment configurations and SSL." },
  { step: "07", title: "Iterate & Scale", description: "Monitor prediction metrics, gather feedback, refine prompt engineering, and expand capabilities." }
];
