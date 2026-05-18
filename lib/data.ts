// ============================================================================
//  Portfolio content. Edit values here to update the site.
//  PLACEHOLDER URLs are marked TODO — replace before final deploy.
// ============================================================================

export const personal = {
  name: "Suyash Pradeep Patil",
  monogram: "S.P.",
  title: "Software Engineer — Data & AI Systems",
  location: "Bhopal, India",
  status: "Open to SDE, ML, Data & AI Engineering roles",
  email: "rishi.suyash01@gmail.com",
  phone: "+91 78209 60032",
  // TODO: replace placeholder GitHub & LinkedIn URLs with real ones
  github: "https://github.com/SuyashPatil98",
  linkedin: "https://linkedin.com/in/suyashpatil",
  leetcode: "https://leetcode.com/u/babawick66/",
  codechef: "https://www.codechef.com/users/suyash_66",
  resumeUrl:
    "https://drive.google.com/file/d/1SAbQsCPA5EgrHAKWzaBiZs-CIgituyRY/view?usp=sharing",
};

export const hero = {
  subtitle:
    "I build data-intensive backend systems, ML platforms, MLOps workflows, and GenAI applications that move beyond notebooks into production-grade engineering.",
  badges: [
    "3.5+ Years Experience",
    "LeetCode 1875",
    "M.Tech Data Science",
    "Ex-Capgemini",
  ],
};

export const about = {
  intro:
    "I work where software engineering meets data systems and applied ML. Three-and-a-half years at Capgemini's financial services practice shaped how I think: pipelines that don't drop records, models that ship behind evaluation gates, GenAI that runs on a budget.",
  intersection: [
    {
      title: "Software Engineering",
      detail:
        "REST APIs, microservices, async processing, event-driven workflows.",
    },
    {
      title: "Data Engineering",
      detail:
        "Distributed Spark ingestion, Airflow DAGs, schema validation, batch & stream.",
    },
    {
      title: "ML Systems",
      detail:
        "Feature pipelines, training, threshold tuning, batch inference, evaluation gates.",
    },
    {
      title: "GenAI / RAG",
      detail:
        "Multi-agent retrieval, hybrid search, prompt + cost optimization on GPT-4/3.5.",
    },
  ],
};

export const metrics = [
  {
    value: "~200 GB",
    label: "Financial Data Processed",
    context: "Compressed, distributed Spark ingestion on AWS EMR",
  },
  {
    value: "~60%",
    label: "Deployment Cycle Reduced",
    context: "Airflow DAGs for retraining, evaluation gating, versioned CI/CD",
  },
  {
    value: "30–40%",
    label: "Manual Effort Cut",
    context: "GPT-4/3.5 backend for financial document extraction",
  },
  {
    value: "35–50%",
    label: "Inference Cost Reduced",
    context: "Hybrid retrieval, caching, parallel agents in RAG pipeline",
  },
  {
    value: "30–40%",
    label: "Factual Accuracy Gain",
    context: "Agent validation loops + dense/sparse retrieval",
  },
  {
    value: "90%",
    label: "Classification Accuracy",
    context: "Federated learning with differential privacy on medical data",
  },
  {
    value: "1875",
    label: "LeetCode Rating",
    context: "Active problem-solving across DSA topics",
  },
  {
    value: "2 × 2",
    label: "Promotions / Top Quarters",
    context:
      "Two promotions in two years; top performer two consecutive quarters",
  },
];

export const experience = [
  {
    role: "Associate Consultant — Data Science & Machine Learning",
    company: "Capgemini",
    location: "Mumbai, India",
    period: "May 2021 — Sep 2024",
    mode: "Hybrid",
    tag: "Financial Services",
    points: [
      {
        title: "Distributed ingestion service",
        body: "Built a fault-tolerant ingestion service in Python and Apache Spark on AWS EMR processing ~200 GB of compressed financial data, with schema validation, dead-letter queues, and partitioned writes to S3.",
      },
      {
        title: "Risk & fraud ML pipeline",
        body: "Built modular components spanning feature engineering, training, threshold optimization, batch inference, and evaluation — improving AUC/F1 and cutting production false negatives.",
      },
      {
        title: "MLOps orchestration",
        body: "Orchestrated Airflow workflows on AWS (S3, EC2, EMR) automating DAGs for data validation, retraining, evaluation gating, and versioned CI/CD — reducing deployment cycle by ~60%.",
      },
      {
        title: "GenAI document processing",
        body: "Engineered a GPT-4/GPT-3.5 backend for extraction and summarization of financial documents with prompt engineering, caching, and batching — cutting manual effort by 30–40%.",
      },
      {
        title: "Recognition",
        body: "Top performer for 2 consecutive quarters; promoted twice within 2 years for delivering production-grade data and ML systems.",
      },
    ],
    stack: [
      "Python",
      "Spark",
      "Airflow",
      "AWS EMR",
      "S3",
      "GPT-4",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    role: "Data Science Intern",
    company: "Capgemini",
    location: "Pune, India",
    period: "Jul 2019 — Sep 2019",
    mode: "On-site",
    tag: "Early Career",
    points: [
      {
        title: "Automated ETL pipeline",
        body: "Built an automated ETL pipeline for extraction and transformation, improving workflow efficiency by ~40% and reducing manual intervention.",
      },
      {
        title: "Analytics dashboards",
        body: "Developed interactive analytics dashboards over processed datasets, surfacing operational metrics that supported leadership decisions and contributed to a ~35% reduction in operational expenditure.",
      },
    ],
    stack: ["Python", "ETL", "Dashboards"],
  },
];

export type Project = {
  title: string;
  tagline: string;
  kind: "Open Project" | "Research" | "Professional Case Study";
  description: string;
  architecture: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  link?: string;
  paperLink?: string;
};

export const projects: Project[] = [
  {
    title: "FiFantasy — End-to-end fantasy football platform for the FIFA World Cup 2026",
    tagline:
      "End-to-end deployed: data engineering, ML rating model, realtime backend, system-design invariants, multi-project ops — solo, every layer.",
    kind: "Open Project",
    description:
      "Solo build, end-to-end deployed. Owned every layer — ingestion connectors, entity matching, layered rating model, simulator, realtime scoring engine, Next.js app, and ops. The interesting decisions live as much in the migrations folder and region pinning as in the model layers. Mirrors patterns I work with professionally (idempotent pipelines, schema-as-invariant, regional deploy tuning) on a stack owned from schema to UI to production.",
    architecture: [
      "[Data Engineering] Idempotent ETL across 4 source connectors (REST · CSV · Kaggle · JSON) into Postgres via 22 numbered migrations, with an ingestion_runs audit table and rate-limit-aware backoff so reruns are safe by construction",
      "[ML] 4-layer position-bucketed rating model: baseline + age curve → market-value z-score → Gemini LLM augmentation → international pedigree; blend weights driven by entity-match confidence so the model degrades gracefully on missing data",
      "[System Design] Partial unique indexes (UNIQUE … WHERE status = 'pending') and pure idempotent scoring functions enforce auction, trade, and scoring invariants in the database — not in app code that can drift",
      "[Realtime / Performance] Supabase logical replication → channels; Tokyo → Mumbai DB region migration measured ~100ms p95 improvement (~250ms → ~150ms cross-continent), executed via a two-phase migration script kept in the repo",
      "[DevOps] Two Vercel projects (private league + public guest demo) deployed from one branch via env-driven SITE_MODE flag; pinned bom1 server region to co-locate with Mumbai DB (~5ms server↔DB vs ~120ms pre-pin)",
    ],
    metrics: [
      { value: "~100ms", label: "p95 latency cut via region migration" },
      { value: "47k → 94%", label: "Players matched, high/med confidence" },
    ],
    stack: [
      "Distributed Systems",
      "ETL Pipelines",
      "Statistical Modeling",
      "LLM Integration",
      "Cloud Deployment",
      "PostgreSQL",
      "TypeScript",
    ],
    link: "https://auction-bhai.vercel.app",
  },
  {
    title: "Production RAG system that generates cited, hallucination-checked articles from your own documents",
    tagline:
      "End-to-end deployed RAG: heading-aware ingestion, hybrid retrieval with ML reranker, multi-agent generation, four-layer hallucination defense, Dockerized full stack.",
    kind: "Open Project",
    description:
      "Solo build of a production-grade RAG pipeline that grounds every paragraph in user-uploaded documents. Owned the full stack — FastAPI backend, Next.js frontend, FAISS vector store, local sentence-transformers embeddings, a scikit-learn reranker, a four-agent orchestrator, and Docker Compose deployment with published GHCR images. Designed against the failure modes RAG systems actually hit in production (bad chunking, lost-in-the-middle context, citation drift, hallucination at chunk boundaries) and documented each design decision against alternatives.",
    architecture: [
      "[Data Engineering] Heading-aware semantic chunking (512-word windows, 64-word overlap) with Unicode NFC normalization, ligature expansion, and SHA-256 source IDs for deduplication across PDF / Markdown / TXT inputs",
      "[ML] Local sentence-transformers MiniLM-L6-v2 embeddings (384-dim, ~14.5k tok/s on CPU) indexed in FAISS IndexFlatIP wrapped in IndexIDMap2 — exact cosine search, zero external embedding cost",
      "[ML] 6-feature scikit-learn gradient-boosted reranker (cosine, BM25 keyword overlap, query coverage, heading match, length, position) rescores FAISS top-8 → top-4 before generation, so retrieval failures don't poison the writer",
      "[System Design] Four-agent pipeline (Planner → Retriever → Writer → Critic) with a shared PipelineContext object; Writer is prompt-constrained to source-only generation and inserts [CITE:chunk_id] markers that Critic verifies",
      "[ML / Evaluation] 4-layer QA defense — citation-based grounding, embedding-based consistency, Flesch readability, retrieved-chunk coverage — combined into a passable/failable confidence score that gates output",
      "[DevOps] Dockerized full stack with a single docker-compose up; production profile adds nginx reverse proxy + bearer-auth gating; GHCR-published images and a pytest suite covering ingestion, vector store, and orchestrator",
    ],
    metrics: [
      { value: "top-8 → 4", label: "FAISS + ML rerank pipeline" },
      { value: "4-layer", label: "Hallucination defense" },
    ],
    stack: [
      "RAG Systems",
      "Multi-Agent Orchestration",
      "Vector Search",
      "ML Reranking",
      "FastAPI",
      "Docker",
      "Python",
    ],
    link: "https://github.com/SuyashPatil98/KG-MAG",
  },
  {
    title: "Federated Transfer Learning for Monkeypox Diagnosis",
    tagline:
      "Privacy-preserving federated ML framework for medical image classification.",
    kind: "Research",
    description:
      "A federated learning system across distributed nodes with differential-privacy guarantees (ε-DP), enabling collaborative model training on sensitive medical data without raw data sharing.",
    architecture: [
      "Distributed nodes train locally; only updates exchanged",
      "Differential privacy noise added to gradients (ε-DP)",
      "Transfer learning from pretrained vision backbones",
      "Evaluated on constrained real-world medical data",
    ],
    metrics: [
      { value: "90%", label: "Classification accuracy" },
      { value: "ε-DP", label: "Privacy guarantee" },
    ],
    stack: [
      "PyTorch",
      "Federated Learning",
      "Differential Privacy",
      "Medical Imaging",
    ],
    paperLink: "https://ieeexplore.ieee.org/document/10940827",
  },
  {
    title: "Financial Risk & Fraud ML Platform",
    tagline:
      "Production data + ML platform powering risk decisions in financial services.",
    kind: "Professional Case Study",
    description:
      "End-to-end platform delivered at Capgemini: distributed ingestion, modular ML pipeline, Airflow-orchestrated retraining and evaluation gating. Closed-source — described here from professional experience.",
    architecture: [
      "Spark on EMR for distributed ingestion of compressed financial data",
      "Schema validation + dead-letter queues + partitioned S3 writes",
      "Modular ML pipeline: features → training → thresholds → batch inference",
      "Airflow DAGs gate deployment behind evaluation metrics",
      "Versioned CI/CD for model artifacts",
    ],
    metrics: [
      { value: "~200 GB", label: "Data processed" },
      { value: "~60%", label: "Deploy cycle cut" },
    ],
    stack: [
      "Spark",
      "Airflow",
      "AWS EMR / S3 / EC2",
      "Python",
      "Docker",
      "CI/CD",
    ],
  },
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  status: "Published" | "Under Review" | "Submitted";
  link?: string;
};

export const publications: Publication[] = [
  {
    title:
      "A Federated Transfer Learning Framework with Differential Privacy for Secure Monkeypox Diagnosis",
    venue: "IEEE SCEECS",
    year: "2025",
    status: "Published",
    link: "https://ieeexplore.ieee.org/document/10940827",
  },
  {
    title:
      "G²HAN: Geometry-Guided Hierarchical Attention Network for Insect Sound Classification",
    venue: "Scientific Reports (Nature)",
    year: "2026",
    status: "Published",
    link: "https://doi.org/10.21203/rs.3.rs-9617709/v1",
  },
  {
    title:
      "Hybrid Representation Learning for Correlation-Guided Insect Acoustic Phenotyping",
    venue: "Scientific Reports",
    year: "2026",
    status: "Under Review",
  },
  {
    title:
      "TriSpectralNet: A Deep Learning-Based Acoustic Monitoring of Insects in Agricultural Environments",
    venue: "Computers and Electronics in Agriculture",
    year: "2026",
    status: "Under Review",
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Programming",
    items: ["Python", "SQL", "TypeScript (light)"],
  },
  {
    title: "Backend & Systems",
    items: [
      "REST APIs",
      "Microservices",
      "Async Processing",
      "Event-Driven Architecture",
      "Distributed Systems",
      "Fault Tolerance",
    ],
  },
  {
    title: "Data Engineering",
    items: [
      "Apache Spark",
      "Apache Airflow",
      "Kafka",
      "ETL / ELT",
      "Schema Validation",
      "Batch & Stream Processing",
    ],
  },
  {
    title: "ML / AI",
    items: [
      "Scikit-learn",
      "PyTorch",
      "Pandas / NumPy",
      "Feature Engineering",
      "Model Evaluation",
      "Threshold Optimization",
    ],
  },
  {
    title: "Generative AI",
    items: [
      "RAG",
      "Multi-Agent Systems",
      "GPT-4 / GPT-3.5",
      "Prompt Engineering",
      "Vector Stores",
      "Hybrid Retrieval",
    ],
  },
  {
    title: "Cloud & MLOps",
    items: [
      "AWS S3 / EC2 / EMR / Lambda",
      "Docker",
      "CI/CD",
      "Snowflake",
      "Model Versioning",
    ],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "DynamoDB", "MongoDB"],
  },
  {
    title: "Visualization",
    items: ["Tableau", "Power BI"],
  },
];

export const certifications = [
  {
    title: "Oracle Certified Data Science Professional",
    issuer: "Oracle",
    code: "OCI-DS",
  },
  {
    title: "Oracle Certified Generative AI Professional",
    issuer: "Oracle",
    code: "OCI-GENAI",
  },
  {
    title: "Azure Fundamentals",
    issuer: "Microsoft",
    code: "AZ-900",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    code: "COURSERA",
  },
  {
    title: "Databases & SQL for Data Science with Python",
    issuer: "IBM",
    code: "IBM-SQL",
  },
];

export const achievements = [
  {
    title: "Smart India Hackathon 2024",
    subtitle: "National Runner-Up",
    detail:
      "Led a team of six to build a publication data analytics solution — improved data processing efficiency by 25%.",
  },
  {
    title: "Capgemini Top Performer",
    subtitle: "Two consecutive quarters",
    detail:
      "Recognized for delivering production-grade data and ML systems across financial services use cases.",
  },
  {
    title: "Promoted twice in 2 years",
    subtitle: "Capgemini",
    detail:
      "Recognition for engineering depth and consistent on-call delivery in financial services.",
  },
  {
    title: "CodeChef Rank < 50 (×2)",
    subtitle: "Competitive Programming",
    detail: "Achieved a sub-50 global rank in two contests.",
  },
  {
    title: "LeetCode Rating 1875",
    subtitle: "Active practice",
    detail: "Consistent DSA practice across topics; profile public.",
  },
];

export const education = [
  {
    degree: "M.Tech in Data Science",
    school: "Indian Institute of Information Technology, Bhopal",
    period: "Aug 2024 — Apr 2026",
    detail: "GPA 9.12 / 10 · Ongoing",
  },
  {
    degree: "B.E. in Computer Science",
    school: "Savitribai Phule Pune University",
    period: "Jul 2016 — May 2020",
    detail: "Engineering fundamentals + first SWE internship.",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
