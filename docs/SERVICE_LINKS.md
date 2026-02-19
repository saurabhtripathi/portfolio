# Portfolio Project - Architecture & Services

## 🌐 Production Website
- **Live Site:** https://www.saurabh-tripathi.com/

---

## 📦 GitHub Repository
- **Repository:** https://github.com/saurabhtripathi/portfolio
- **README:** https://github.com/saurabhtripathi/portfolio/blob/main/README.md
- **Architecture Doc:** https://github.com/saurabhtripathi/portfolio/blob/main/ARCHITECTURE.md
- **Architecture Diagram:** https://github.com/saurabhtripathi/portfolio/blob/main/architecture-diagram.png

---

## 🏗️ Infrastructure Overview

### Frontend (React + TypeScript)
- **Hosting:** AWS Amplify
- **Region:** ap-southeast-1 (Singapore)
- **Deployment:** Auto-deploy from GitHub main branch
- **CDN:** AWS CloudFront (via Amplify)

### Backend (Drupal 11)
- **Hosting:** AWS Lightsail
- **Region:** ap-southeast-1 (Singapore)
- **API:** JSON:API endpoints
- **SSL:** Let's Encrypt (auto-renewing)

### DNS & SSL
- **Domain Registrar:** AWS Route 53
- **DNS Provider:** Cloudflare
- **SSL Certificates:** AWS ACM + Let's Encrypt

---

## 🛠️ Local Development

```bash
# Frontend
cd vscode-portfolio-frontend
npm install
npm start
# Runs on http://localhost:3001

# Backend (Drupal with DDEV)
ddev start
# Runs on https://vscode-portfolio.ddev.site
```

---

## 📋 Services Used

| Service | Purpose |
|---------|---------|
| AWS Amplify | React Frontend Hosting & CI/CD |
| AWS Lightsail | Drupal Backend Server |
| AWS Route 53 | Domain Registration & DNS |
| AWS ACM | SSL Certificates |
| Cloudflare | DNS Management & CDN |
| GitHub | Source Code & Version Control |
| DDEV | Local Drupal Development |

---

## � API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/jsonapi/node/portfolio_file` | Portfolio files/projects |
| `/jsonapi/node/experience` | Work experience entries |
| `/jsonapi/node/skill` | Skills list |

---

*For internal service links and credentials, see private documentation.*

*Last Updated: February 10, 2026*
