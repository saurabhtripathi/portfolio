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
## Senior Solutions Architect

### About Me

I am a Senior Solutions Architect with years of experience in building enterprise-level web applications. My expertise lies in Drupal development, headless CMS architectures, and modern frontend technologies.

### Certifications

- **Acquia Certified Developer - Drupal 10 & 11**
- **Acquia Grand Master - Drupal 9** (Triple Certified)
- **Acquia Grand Master - Drupal 8** (Triple Certified)

### Core Expertise

- Drupal Development (D7, D8, D9, D10, D11)
- Headless CMS Architecture
- React & TypeScript
- PHP & Symfony
- Cloud Deployments (AWS, Acquia Cloud)
- DevOps & Docker

### Career Highlights

- Led development of major media platforms (CNA, Berita, Seithi)
- Architected headless Drupal solutions for enterprise clients
- Mentored development teams across multiple projects
- Contributed to Drupal community and open-source projects

### Location

Singapore 🇸🇬

### Contact

- Email: saurabh.tripathi.cs@gmail.com
- LinkedIn: linkedin.com/in/saurabh-tripathi
- GitHub: github.com/saurabhtripathi`,
    language: 'markdown',
    icon: 'md',
    isActive: true,
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
      "period": "2019 - Present",
      "location": "Singapore",
      "current": true,
      "responsibilities": [
        "Lead architect for CNA, Berita, and Seithi media platforms",
        "Design and implement headless Drupal solutions with React frontends",
        "Mentor development teams and establish best practices",
        "Optimize performance and scalability for high-traffic applications",
        "Collaborate with stakeholders to define technical roadmaps"
      ]
    },
    {
      "title": "Senior Drupal Developer",
      "company": "Acquia Inc.",
      "period": "2016 - 2019",
      "location": "Singapore",
      "current": false,
      "responsibilities": [
        "Developed enterprise Drupal applications for Fortune 500 clients",
        "Implemented complex integrations with third-party systems",
        "Optimized Drupal performance and caching strategies",
        "Provided technical leadership on client projects",
        "Conducted code reviews and knowledge sharing sessions"
      ]
    },
    {
      "title": "Drupal Developer",
      "company": "Accenture",
      "period": "2013 - 2016",
      "location": "India",
      "current": false,
      "responsibilities": [
        "Built custom Drupal modules and themes",
        "Integrated Drupal with enterprise systems",
        "Performed site migrations and upgrades",
        "Collaborated with cross-functional teams",
        "Delivered projects on time and within budget"
      ]
    },
    {
      "title": "Web Developer",
      "company": "Various Agencies",
      "period": "2010 - 2013",
      "location": "India",
      "current": false,
      "responsibilities": [
        "Developed websites using PHP, MySQL, and JavaScript",
        "Created responsive designs and user interfaces",
        "Maintained client websites and provided support",
        "Learned Drupal and modern web development practices"
      ]
    }
  ],
  "education": {
    "degree": "Bachelor of Engineering in Computer Science",
    "university": "University of Technology",
    "year": "2010"
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
      { "name": "Drupal (7-11)", "level": 95 },
      { "name": "PHP 7/8", "level": 90 },
      { "name": "Symfony", "level": 85 },
      { "name": "MySQL/MariaDB", "level": 85 },
      { "name": "RESTful APIs", "level": 90 },
      { "name": "GraphQL", "level": 75 }
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
      { "name": "AWS", "level": 75 },
      { "name": "Acquia Cloud", "level": 90 },
      { "name": "Docker", "level": 80 },
      { "name": "Git/GitHub", "level": 90 },
      { "name": "CI/CD", "level": 75 },
      { "name": "DDEV", "level": 85 }
    ]
  },
  "integrations": {
    "label": "Integrations",
    "skills": [
      "Salesforce",
      "Adobe Analytics",
      "Google Cloud Platform",
      "Elasticsearch",
      "Redis",
      "Varnish",
      "CDN (CloudFront, Fastly)"
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

## CNA (Channel NewsAsia) Platform
**Role:** Lead Solutions Architect
**Duration:** 2019 - Present
**Technologies:** Drupal 9/10, React, TypeScript, AWS

### Overview
Singapore's leading English-language news platform serving millions of users across Southeast Asia.

### Key Responsibilities
- Architected headless Drupal CMS with React frontend
- Implemented real-time news publishing workflow
- Optimized for high traffic (millions of daily visitors)
- Integrated with video streaming and live broadcasting systems
- Led team of 8 developers

### Achievements
- 99.9% uptime
- 40% improvement in page load times
- Seamless migration from Drupal 7 to Drupal 10
- Successfully handled traffic spikes during breaking news

---

## Berita Harian Digital Platform
**Role:** Senior Solutions Architect
**Duration:** 2020 - Present
**Technologies:** Drupal 10, React, Next.js

### Overview
Leading Malay-language news portal in Singapore.

### Key Responsibilities
- Designed multi-lingual content management system
- Implemented progressive web app (PWA) features
- Integrated social media and user engagement features
- Optimized SEO and performance

### Achievements
- 60% increase in mobile engagement
- Improved SEO rankings across all key metrics
- Reduced infrastructure costs by 30%

---

## Seithi Tamil News Platform
**Role:** Technical Lead
**Duration:** 2020 - 2022
**Technologies:** Drupal 9, React, GraphQL

### Overview
First Tamil-language digital news platform in Singapore.

### Key Responsibilities
- Built from scratch using headless Drupal architecture
- Implemented Tamil language support and RTL features
- Created custom video player integration
- Designed scalable content delivery system

### Achievements
- Launched on time and under budget
- Award-winning user experience
- 50K+ active monthly users

---

## Enterprise E-commerce Platform
**Role:** Senior Drupal Developer
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
**Role:** Drupal Developer
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
  {
    id: '5',
    title: 'architecture.md',
    content: `# Portfolio Architecture

## Overview

This portfolio is built as a **headless architecture demonstration**, showcasing modern web development practices.

## Previous Architecture (Before Migration)

\`\`\`
┌─────────────────────┐
│   React Frontend    │
│  (TypeScript + CRA) │
└──────────┬──────────┘
           │
           │ JSON:API
           │
┌──────────▼──────────┐
│   Drupal Backend    │
│    (Headless CMS)   │
└──────────┬──────────┘
           │
           │
┌──────────▼──────────┐
│   AWS Lightsail     │
│   ($5/month)        │
└─────────────────────┘
\`\`\`

## Current Architecture (After Migration)

\`\`\`
┌─────────────────────┐
│   React Frontend    │
│  (TypeScript + CRA) │
│                     │
│  ┌───────────────┐  │
│  │ Static Data   │  │
│  │ (JSON files)  │  │
│  └───────────────┘  │
└─────────────────────┘
          │
          │
┌─────────▼───────────┐
│  Static Hosting     │
│  (Vercel/Netlify)   │
│  (Free tier)        │
└─────────────────────┘
\`\`\`

## Technology Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Create React App** - Build tooling

### Features
- VS Code-like interface
- Interactive terminal
- Markdown rendering
- Dynamic microsites (Experience Timeline, Skills Dashboard)
- Responsive design (mobile + desktop)
- Client-side routing

## Data Management

### Before Migration
- Portfolio content stored in Drupal
- Fetched via JSON:API endpoints
- Required backend server running
- Monthly hosting costs ($5+)

### After Migration
- Portfolio content in TypeScript files
- Compiled into React bundle
- No backend required
- Free static hosting

## Benefits of Migration

1. **Cost Savings**
   - From $5/month to $0/month
   - No database maintenance
   - No server management

2. **Performance**
   - Faster load times (no API calls)
   - Better caching
   - Global CDN distribution

3. **Simplicity**
   - Single codebase
   - Easy to update (edit TypeScript files)
   - No CMS learning curve

4. **Reliability**
   - No backend dependencies
   - No database failures
   - 100% uptime

## Deployment

### Build Process
\`\`\`bash
npm run build
\`\`\`

### Deployment Platforms
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Environment
- No environment variables needed
- No secrets management
- No database connections

## Development Workflow

1. **Update Content**
   - Edit src/data/portfolioData.ts
   - Add/modify FileItem objects

2. **Test Locally**
   - npm start
   - View changes at localhost:3000

3. **Deploy**
   - git push
   - Auto-deploy via CI/CD

## Future Enhancements

- Add CMS headless integration (Contentful, Sanity)
- Implement blog section
- Add contact form
- SEO optimization
- Analytics integration`,
    language: 'markdown',
    icon: 'md',
    isActive: false,
  },
];
