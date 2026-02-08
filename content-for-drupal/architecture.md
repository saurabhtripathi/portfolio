# Site Architecture

## Headless CMS Overview

This portfolio demonstrates a **headless Drupal + React** architecture where content and presentation are completely separated.

---

## What is Headless CMS?

**Traditional Drupal:**
- Drupal handles both content AND rendering
- Tightly coupled frontend and backend

**Headless Drupal:**
- Drupal handles content only (API)
- React handles rendering (UI)
- Completely decoupled

---

## Technology Stack

### Backend (Drupal)

- **CMS:** Drupal 10/11
- **API:** JSON:API (Drupal Core)
- **Hosting:** DDEV (Local) / Acquia Cloud (Production)
- **Content Types:** Portfolio Files, Projects, Experience, Skills

### Frontend (React)

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Build Tool:** Create React App

---

## How It Works

### 1. Content Creation

Content editors use Drupal admin panel to create and manage content at /admin/content

### 2. API Exposure

Drupal automatically exposes content via JSON:API:

- /jsonapi/node/portfolio_file
- /jsonapi/node/project
- /jsonapi/node/experience

### 3. Frontend Fetching

React app calls the API on page load and stores data in state

### 4. UI Rendering

React components render the content with VS Code-inspired styling

---

## Benefits of This Architecture

**For Developers:**
- Use modern frontend frameworks
- Better developer experience
- Separation of concerns
- Independent deployments

**For Content Editors:**
- Familiar Drupal admin interface
- No need to learn React
- Content changes reflect instantly

**For Performance:**
- Fast React single-page app
- Static hosting possible for frontend
- CDN-friendly architecture

---

## API Endpoints

**Base URL:** https://vscode-portfolio.ddev.site

**Get all files:**
/jsonapi/node/portfolio_file?sort=field_order

**Get projects:**
/jsonapi/node/project

**Filter by field:**
/jsonapi/node/portfolio_file?filter[field_language]=markdown

---

## Local Development

**Start Drupal:**
ddev start

**Start React:**
npm start

**Access Points:**
- Drupal Admin: https://vscode-portfolio.ddev.site/admin
- React App: http://localhost:3000

---

## Why I Built This

As a Senior Solutions Architect with 14+ years of Drupal experience, I wanted to showcase:

1. **Drupal Expertise** - Backend content management
2. **Modern Frontend** - React and TypeScript skills
3. **Architecture Skills** - Headless CMS design
4. **Full Stack Capability** - End-to-end development

This portfolio itself is a demonstration of the technologies I work with daily.
