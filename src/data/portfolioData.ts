export interface FileItem {
  id: string;
  title: string;
  content: string;
  language: string;
  icon: string;
  isActive: boolean;
}

export const portfolioFiles: FileItem[] = [
  {
    id: '1',
    title: 'README.md',
    content: `# Saurabh Tripathi
## Senior Solutions Architect & Full Stack AI Engineer

### About Me

I am a Senior Solutions Architect & Full Stack AI Engineer with years of experience in building AI-powered applications and enterprise-level web solutions. My expertise spans from traditional CMS development to cutting-edge AI/ML implementations, specializing in RAG pipelines, conversational AI, and intelligent automation systems.

### Certifications

- **Acquia Certified Developer - Drupal 10 & 11**
- **Acquia Grand Master - Drupal 9** (Triple Certified)
- **Acquia Grand Master - Drupal 8** (Triple Certified)

### Core Expertise

- **AI/ML:** LangChain, LangGraph, RAG Pipelines, Vector Search (FAISS), Semantic Embeddings
- **LLM Integration:** Google Gemini AI, OpenAI GPT, Azure OpenAI, Prompt Engineering
- **Backend:** Python (FastAPI), PHP, Node.js, WebSocket Streaming, API Development
- **Frontend:** React, TypeScript, Modern JavaScript
- **CMS:** Headless CMS Architecture, Content Management Systems
- **Cloud & DevOps:** AWS, Docker, CI/CD Pipelines

### Career Highlights

- Built AI-powered conversational search (Ask CNA) using RAG, Gemini AI, and FAISS
- Developed intelligent WhatsApp Support Bot with multi-turn conversation memory
- Led development of major media platforms (CNA, Berita, Seithi)
- Architected AI-assisted feature development workflows for engineering teams
- Contributed to open-source projects and CMS community

### Location

Singapore 🇸🇬

### Contact

- Email: saurabh.tripathi.cs@gmail.com
- LinkedIn: linkedin.com/in/saurabh-tripathi
- GitHub: github.com/saurabhtripathi`,
    language: 'markdown',
    icon: 'md',
    isActive: false,
  },
  {
    id: '2',
    title: 'experience.json',
    content: `{
  "totalYears": "14+",
  "positions": [
    {
      "title": "Senior Solutions Architect",
      "company": "Mediacorp Pte Ltd",
      "period": "June 2021 - Present",
      "location": "Singapore",
      "current": true,
      "responsibilities": [
        "Architect and implement AI-powered features including conversational search using RAG, LLMs, and vector databases",
        "Lead development of major media platforms (CNA, Berita, Seithi) serving millions of users",
        "Design headless CMS solutions with React frontends and AI integrations",
        "Build intelligent automation systems using LangChain, LangGraph, and Gemini AI",
        "Mentor development teams on AI/ML best practices and modern architecture patterns"
      ]
    },
    {
      "title": "Software Engineer, Research and Development",
      "company": "Acquia Inc.",
      "period": "April 2019 - June 2021",
      "location": "India",
      "current": false,
      "responsibilities": [
        "Developed enterprise CMS applications for Fortune 500 clients",
        "Implemented complex integrations with third-party systems",
        "Optimized CMS performance and caching strategies",
        "Provided technical leadership on client projects",
        "Conducted code reviews and knowledge sharing sessions"
      ]
    },
    {
      "title": "Application Development Senior Analyst",
      "company": "Accenture",
      "period": "February 2017 - April 2019",
      "location": "India",
      "current": false,
      "responsibilities": [
        "Created chatbot using shell scripts and Python for automating developer workflows and updating configurations",
        "Built custom CMS modules and themes for enterprise clients",
        "Integrated CMS with enterprise systems and third-party APIs",
        "Performed site migrations and upgrades across multiple platforms",
        "Collaborated with cross-functional teams and delivered projects on time"
      ]
    },
    {
      "title": "Software Engineer",
      "company": "Faichi Solutions",
      "period": "October 2014 - February 2017",
      "location": "India",
      "current": false,
      "responsibilities": [
        "Created Drubot chatbot using Artificial Intelligence Markup Language (AIML) for automated developer assistance and workflow optimization",
        "Developed enterprise CMS applications for Fortune 500 clients including Ixia and Haivision",
        "Handled multilingual website support and created command-line automation tools",
        "Implemented feed integration, custom module development, and theme customization",
        "Led configuration management and deployment automation initiatives"
      ]
    },
    {
      "title": "Software Developer",
      "company": "Iksula",
      "period": "January 2013 - September 2014",
      "location": "India",
      "current": false,
      "responsibilities": [
        "Integrated e-commerce solutions into CMS platforms with custom module development",
        "Worked with open-source modules for layout management and contextual content display",
        "Implemented complex discount structure logic for eBay.in project",
        "Developed and deployed projects including bigbazaardirect.com and gitanjaligifts.com"
      ]
    },
    {
      "title": "Software Engineer",
      "company": "Corpus Software",
      "period": "June 2011 - December 2012",
      "location": "India",
      "current": false,
      "responsibilities": [
        "Created shell scripts and PHP scripts for importing data into MySQL databases",
        "Developed responsive websites using PHP, MySQL, JavaScript, and CMS platforms",
        "Built custom themes and maintained client websites with ongoing enhancements",
        "Provided technical support and training for government corporations",
        "Conducted training sessions on ERP workflows and system administration"
      ]
    }
  ],
  "education": {
    "degree": "Bachelor of Engineering in Computer Science",
    "university": "GBTU",
    "year": ""
  }
}`,
    language: 'json',
    icon: 'json',
    isActive: false,
  },
  {
    id: '3',
    title: 'skills.json',
    content: `{
  "backend": {
    "label": "Backend Development",
    "skills": [
      { "name": "Python (FastAPI)", "level": 90 },
      { "name": "PHP", "level": 90 },
      { "name": "Node.js", "level": 85 },
      { "name": "CMS (Drupal 7-11)", "level": 95 },
      { "name": "MySQL/MariaDB", "level": 85 },
      { "name": "RESTful APIs", "level": 90 },
      { "name": "WebSocket", "level": 85 }
    ]
  },
  "frontend": {
    "label": "Frontend Development",
    "skills": [
      { "name": "React", "level": 85 },
      { "name": "TypeScript", "level": 80 },
      { "name": "JavaScript (ES6+)", "level": 90 },
      { "name": "HTML5/CSS3", "level": 90 },
      { "name": "Tailwind CSS", "level": 80 },
      { "name": "jQuery", "level": 85 }
    ]
  },
  "devops": {
    "label": "DevOps & Cloud",
    "skills": [
      { "name": "GCP (Vertex AI, Cloud Run)", "level": 85 },
      { "name": "AWS (EC2, S3, Lambda)", "level": 80 },
      { "name": "Docker", "level": 85 },
      { "name": "Git/GitHub Actions", "level": 90 },
      { "name": "CI/CD Pipelines", "level": 80 },
      { "name": "BigQuery", "level": 75 },
      { "name": "Uvicorn/ASGI", "level": 85 }
    ]
  },
  "ai_ml": {
    "label": "AI & Machine Learning",
    "skills": [
      { "name": "LangChain", "level": 85 },
      { "name": "LangGraph", "level": 85 },
      { "name": "Google Gemini AI", "level": 90 },
      { "name": "OpenAI GPT", "level": 85 },
      { "name": "Azure OpenAI", "level": 80 },
      { "name": "Ollama", "level": 75 },
      { "name": "RAG Pipelines", "level": 85 },
      { "name": "FAISS Vector Search", "level": 80 },
      { "name": "Vertex AI Search", "level": 80 },
      { "name": "Prompt Engineering", "level": 85 },
      { "name": "SentenceTransformers", "level": 80 }
    ]
  },
  "integrations": {
    "label": "Integrations & Tools",
    "skills": [
      "Apigee (API Gateway)",
      "GCP Log Explorer",
      "GCP Secret Manager",
      "Selenium 4 (Web Scraping)",
      "BeautifulSoup4",
      "BigQuery",
      "Cloud SQL (PostgreSQL)",
      "Elasticsearch",
      "Redis",
      "Pydantic",
      "Poetry / uv",
      "deepeval / pytest",
      "Pandas / NumPy",
      "mitmproxy",
      "Playwright",
      "Salesforce",
      "SAML / OAuth",
      "Payment Gateways"
    ]
  },
  "tools": {
    "label": "Tools & Methodologies",
    "skills": [
      "Agile/Scrum",
      "JIRA",
      "Confluence",
      "PHPStorm",
      "VS Code",
      "Postman",
      "New Relic",
      "Datadog"
    ]
  },
  "soft": {
    "label": "Soft Skills",
    "skills": [
      "Technical Leadership",
      "Team Mentoring",
      "Client Communication",
      "Problem Solving",
      "Agile Methodology",
      "Code Review"
    ]
  }
}`,
    language: 'json',
    icon: 'json',
    isActive: false,
  },
  {
    id: '4',
    title: 'projects.md',
    content: `# Major Projects

## Ask CNA - AI-Powered News Search
**Role:** Solutions Architect & AI Engineer
**Duration:** 2025
**Technologies:** FastAPI, Google Gemini 2.0 Flash, FAISS, Selenium, WebSockets, mitmproxy, SentenceTransformers, BeautifulSoup4, Pydantic

### Overview
AI-powered conversational search experience for Channel NewsAsia that transforms traditional search into intelligent Q&A with real-time streaming responses using RAG (Retrieval-Augmented Generation) pipeline.

### Key Responsibilities
- Architected end-to-end RAG pipeline with semantic search and answer generation
- Implemented transparent proxy using mitmproxy to inject custom UI into CNA search without modifying servers
- Built WebSocket-based streaming backend with FastAPI for progressive response delivery
- Developed semantic article ranking using SentenceTransformers embeddings and FAISS vector search
- Created parallel web scraping system with Selenium for real-time article retrieval across multiple pages

### Achievements
- Real-time AI answer generation with live progress updates and streaming tokens
- Semantic search with top 5 article citations as sources using L2 distance ranking
- Sub-2-second response time including scraping, embedding, and AI generation
- Zero infrastructure changes to existing CNA platform via proxy injection

---

## mewatch Conversational Experience Platform (mewatch-cep)
**Role:** AI Engineer & Solutions Architect
**Duration:** 2026
**Technologies:** LangGraph, LangChain, Google Vertex AI (Gemini 2.5/3.0), Cloud SQL (PostgreSQL), Vertex AI Search, FastAPI, GCP Cloud Run, Apigee

### Overview
Multi-agent conversational platform for mewatch content discovery with supervisor-led orchestration, client-side tool relay, long-term memory, and robust error handling. Handles VOD catalogue search, personalized recommendations, FIFA World Cup history, IFAB Football Rules, and FAQ queries.

### Key Responsibilities
- Built multi-agent architecture using LangGraph with orchestrator, FIFA agent, content search, and recommendation agents
- Implemented client-side tool relay via SSE for watch history and personalized features
- Integrated Vertex AI Search and custom RAG engine for football rules and FAQ queries
- Developed Cloud SQL-backed conversation memory and long-term semantic user facts storage
- Created modular FastAPI backend with semantic versioning and automated GCP Cloud Run deployments

### Achievements
- Supervisor-led multi-agent orchestration with safety recovery for Vertex AI recitation blocks
- Semantic search using RAG for football rules with citation support
- Client-side tool execution pattern for secure personalized features
- Production deployment pipeline with staging, feature-branch, and semantic release workflows

---

## WhatsApp Support Bot - AI Agent Framework
**Role:** Technical Lead & AI Engineer
**Duration:** 2025
**Technologies:** LangChain, LangGraph, Google Gemini, FAISS, Azure OpenAI, Python, FastAPI

### Overview
Modular AI agent framework with WhatsApp chat history analysis as primary use case, demonstrating multi-turn conversation memory and RAG-based customer support with multi-LLM provider support.

### Key Responsibilities
- Built reusable agent framework with tools, middleware, and structured responses
- Implemented conversation memory using LangGraph checkpointers for multi-turn context
- Created vector store from WhatsApp export files for semantic search across chat history
- Developed multi-LLM provider support (Gemini, Azure OpenAI, Ollama) with unified interface
- Built token cost tracking middleware across different LLM providers for budget management

### Achievements
- Structured response format for machine-parseable outputs with citations
- Multi-turn conversation context with persistent memory across sessions
- Cost-efficient queries at ~$0.001 per interaction with Gemini Flash
- Fully modular and reusable framework adaptable for other agent applications

---

## CNA (Channel NewsAsia) Platform
**Role:** Lead Solutions Architect
**Duration:** June 2021 - Present
**Technologies:** CMS (Drupal 9/10/11), React, TypeScript, AWS, AI Integrations (OpenAI, Beyond Words TTS)

### Overview
Singapore's leading English-language news platform serving millions of users across Southeast Asia with modern CMS architecture and AI-powered features.

### Key Responsibilities
- Implemented CMS architecture with React frontend and TypeScript
- Integrated AI for editor experience: title improvement, description enhancement, content suggestions
- Deployed AI services including OpenAI modules and Beyond Words text-to-speech for accessibility
- Led real-time news publishing workflow development for breaking news
- Optimized for high traffic (millions of daily visitors) with AWS infrastructure
- Led team of 8 developers (backend, frontend, QA, support)

### Achievements
- 99.9% uptime serving millions of daily visitors
- 40% improvement in page load times through optimization
- Seamless migrations from CMS 7 to 9 to 10 to 11
- Successfully integrated AI-powered search, TTS, and editor assistance features
- Handled traffic spikes during major breaking news events

---

## Berita
**Role:** Senior Solutions Architect
**Duration:** 2020 - Present
**Technologies:** CMS (Drupal 10/11), React, Next.js, AI-assisted development workflows, AI editor tools

### Overview
Leading Malay-language news portal in Singapore with modern architecture, AI-assisted development processes, and AI-enhanced editorial experience.

### Key Responsibilities
- Designed multi-lingual content management system with AI-powered editor assistance
- Integrated AI for editor experience: title optimization, description improvement, content enhancement
- Implemented progressive web app (PWA) features for mobile optimization
- Created AI-assisted feature development workflows using GitHub Copilot and custom prompts
- Integrated social media and user engagement features
- Optimized SEO and performance for international audiences

### Achievements
- 60% increase in mobile engagement through PWA implementation
- Improved SEO rankings across all key metrics with AI-enhanced content
- Reduced infrastructure costs by 30% through optimization
- Streamlined editorial and development workflow with AI-assisted tools

---

## Seithi Tamil News Platform
**Role:** Technical Lead
**Duration:** 2020 - 2022
**Technologies:** CMS (Drupal 9), React, GraphQL, AI editor tools

### Overview
First Tamil-language digital news platform in Singapore built from scratch with AI-enhanced editorial features.

### Key Responsibilities
- Built from scratch using CMS architecture with GraphQL API
- Integrated AI for editor experience: title suggestions, description enhancement, content optimization
- Implemented Tamil language support with RTL (right-to-left) features
- Created custom video player integration for multimedia content
- Designed scalable content delivery system for growing audience

### Achievements
- Launched on time and under budget
- Award-winning user experience design
- 50K+ active monthly users within first year
- Successfully integrated AI tools for Tamil content editorial workflow

---

## Enterprise E-commerce Platform
**Role:** Software Engineer, Research and Development
**Duration:** 2017 - 2018
**Technologies:** Drupal 8, Commerce, Salesforce

### Overview
Multi-brand e-commerce platform for Fortune 500 company.

### Key Responsibilities
- Developed custom Drupal Commerce solution
- Integrated with Salesforce CRM
- Implemented complex product catalog system
- Built custom checkout and payment workflows

### Achievements
- $10M+ in annual transactions
- 99.5% uptime
- PCI DSS compliant

---

## Government Portal Migration
**Role:** Application Development Senior Analyst & Senior Drupal Developer
**Duration:** 2015 - 2016
**Technologies:** Drupal 7, Drupal 8

### Overview
Migrated large government portal from Drupal 7 to Drupal 8.

### Key Responsibilities
- Migrated 50,000+ pages of content
- Built custom migration scripts
- Trained government staff on new CMS
- Ensured accessibility compliance (WCAG 2.0)

### Achievements
- Zero downtime migration
- 100% data integrity
- Improved content editor experience`,
    language: 'markdown',
    icon: 'md',
    isActive: false,
  },
  // Hidden: architecture.md tab
  // {
  //   id: '5',
  //   title: 'architecture.md',
  //   content: `# Portfolio Architecture
  //
  // ## Overview
  //
  // This portfolio is built as a **headless architecture demonstration**, showcasing modern web development practices.
  //
  // ## Architecture
  //
  // \`\`\`
  // ┌─────────────────────┐
  // │   React Frontend    │
  // │  (TypeScript + CRA) │
  // └──────────┬──────────┘
  //            │
  //            │ JSON:API
  //            │
  // ┌──────────▼──────────┐
  // │   Drupal Backend    │
  // │    (Headless CMS)   │
  // └──────────┬──────────┘
  //            │
  //            │
  // ┌──────────▼──────────┐
  // │   AWS Lightsail     │
  // └─────────────────────┘
  // \`\`\`
  //
  // ## Technology Stack
  //
  // ### Frontend
  // - **React 19** - Modern UI library
  // - **TypeScript** - Type-safe development
  // - **Tailwind CSS** - Utility-first styling
  // - **Framer Motion** - Animations
  // - **Create React App** - Build tooling
  //
  // ### Backend
  // - **Drupal 11** - Headless CMS
  // - **JSON:API** - RESTful API
  // - **PHP 8.2** - Server-side language
  // - **MariaDB** - Database
  //
  // ### Features
  // - VS Code-like interface
  // - Interactive terminal
  // - Markdown rendering
  // - Dynamic microsites (Experience Timeline, Skills Dashboard)
  // - Responsive design (mobile + desktop)
  // - Client-side routing
  // - Headless CMS integration
  //
  // ## Data Flow
  //
  // 1. **Content Management**
  //    - Portfolio content stored in Drupal CMS
  //    - Admin interface for easy content updates
  //    - Structured content types
  //
  // 2. **API Layer**
  //    - JSON:API provides RESTful endpoints
  //    - Standardized data format
  //    - CORS-enabled for cross-origin requests
  //
  // 3. **Frontend Consumption**
  //    - React fetches data via API calls
  //    - TypeScript ensures type safety
  //    - Real-time content updates
  //
  // ## Deployment
  //
  // ### Frontend Deployment
  // - **Platform:** AWS Amplify / Vercel
  // - **Build Process:** Automatic on git push
  // - **CDN:** Global content delivery
  // - **SSL:** Automatic HTTPS
  //
  // ### Backend Deployment
  // - **Platform:** AWS Lightsail
  // - **Server:** Apache 2.4
  // - **SSL:** Let's Encrypt
  // - **Database:** MariaDB
  //
  // ## Development Workflow
  //
  // 1. **Content Updates**
  //    - Log into Drupal admin
  //    - Update content via CMS
  //    - Changes reflect immediately via API
  //
  // 2. **Frontend Development**
  //    - npm start (local development)
  //    - npm run build (production build)
  //    - git push (auto-deploy)
  //
  // 3. **Backend Maintenance**
  //    - Drupal security updates
  //    - Database backups
  //    - Module updates
  //
  // ## API Endpoints
  //
  // ### Available Endpoints
  // \`\`\`
  // GET /jsonapi/node/portfolio_file?sort=field_order
  // GET /jsonapi/node/portfolio_file/{uuid}
  // GET /jsonapi/node/project
  // \`\`\`
  //
  // ## Benefits of Headless Architecture
  //
  // 1. **Flexibility**
  //    - Separate frontend and backend
  //    - Easy to change either independently
  //    - Multiple frontends possible
  //
  // 2. **Performance**
  //    - Optimized React frontend
  //    - Cached API responses
  //    - CDN distribution
  //
  // 3. **Developer Experience**
  //    - Modern tooling (React, TypeScript)
  //    - Type-safe development
  //    - Hot module replacement
  //
  // 4. **Content Management**
  //    - User-friendly Drupal interface
  //    - Structured content
  //    - Version control for content
  //
  // ## Future Enhancements
  //
  // - Add CMS preview mode
  // - Implement GraphQL endpoint
  // - Add real-time content updates
  // - Integrate analytics
  // - Add search functionality`,
  //   language: 'markdown',
  //   icon: 'md',
  //   isActive: false,
  // },
];
