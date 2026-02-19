# Migration from Drupal Backend to Static Data

## Overview

This document describes the migration from a headless Drupal CMS architecture to a fully static React application with embedded data.

## What Changed

### Before Migration
```
┌─────────────────────┐
│   React Frontend    │
│  (TypeScript + CRA) │
└──────────┬──────────┘
           │
           │ JSON:API calls
           │
┌──────────▼──────────┐
│   Drupal Backend    │
│    (Headless CMS)   │
└──────────┬──────────┘
           │
┌──────────▼──────────┐
│   AWS Lightsail     │
│   ($5/month)        │
└─────────────────────┘
```

### After Migration
```
┌─────────────────────┐
│   React Frontend    │
│  (TypeScript + CRA) │
│                     │
│  ┌───────────────┐  │
│  │ Static Data   │  │
│  │ (TS files)    │  │
│  └───────────────┘  │
└─────────────────────┘
          │
┌─────────▼───────────┐
│  Static Hosting     │
│  (Vercel/Netlify)   │
│  ($0/month)         │
└─────────────────────┘
```

## Files Modified

1. **src/data/portfolioData.ts** (NEW)
   - Contains all portfolio data as TypeScript constants
   - Replaces Drupal JSON:API calls

2. **src/App.tsx**
   - Removed axios import
   - Removed Drupal API URL configuration
   - Updated fetchFiles() to return static data
   - Imported portfolioFiles from portfolioData.ts

3. **package.json**
   - Removed `"proxy"` configuration (was pointing to DDEV)
   - Removed `axios` dependency

## Benefits

### Cost Savings
- **Before:** $5/month (AWS Lightsail) + $0.50/month (DNS) = ~$66/year
- **After:** $0/month (free tier hosting) + $0.50/month (DNS) = ~$6/year
- **Savings:** $60/year (91% reduction)

### Performance Improvements
- No API calls = faster initial load
- No network latency
- Better caching (static assets)
- Global CDN distribution

### Maintenance Reduction
- No database to maintain
- No server to patch/update
- No Drupal security updates
- No SSL certificate renewals (handled by hosting)

### Reliability
- No backend = no backend failures
- No database connection issues
- 100% uptime (static hosting)
- No server restarts needed

## How to Update Content

### Step 1: Edit Data File
```bash
# Open the data file
code src/data/portfolioData.ts
```

### Step 2: Modify Portfolio Files
```typescript
export const portfolioFiles: FileItem[] = [
  {
    id: '1',
    title: 'README.md',
    content: `# Your updated content here`,
    language: 'markdown',
    icon: 'md',
    isActive: true,
  },
  // ... more files
];
```

### Step 3: Test Locally
```bash
npm start
# Open http://localhost:3000
# Verify your changes
```

### Step 4: Deploy
```bash
git add src/data/portfolioData.ts
git commit -m "Update portfolio content"
git push
# Auto-deployment will handle the rest
```

## Data Structure

Each portfolio file follows this interface:

```typescript
interface FileItem {
  id: string;           // Unique identifier
  title: string;        // File name displayed in sidebar
  content: string;      // File content (markdown, JSON, etc.)
  language: string;     // 'markdown', 'json', 'text'
  icon: string;         // File icon type ('md', 'json', etc.)
  isActive: boolean;    // Whether to open by default
}
```

## Rollback Plan

If you need to go back to Drupal:

### 1. Restore Dependencies
```bash
npm install axios@^1.13.2
```

### 2. Restore package.json proxy
```json
{
  "proxy": "https://vscode-portfolio.ddev.site"
}
```

### 3. Restore App.tsx
```bash
git log --all --full-history -- src/App.tsx
git show <commit-hash>:src/App.tsx > src/App.tsx
```

### 4. Start Drupal Backend
```bash
cd /path/to/drupal
ddev start
```

### 5. Restart Frontend
```bash
npm start
```

## Testing Checklist

- [ ] Portfolio sidebar shows all files
- [ ] Clicking files opens content correctly
- [ ] Markdown rendering works
- [ ] JSON files display properly
- [ ] Experience timeline microsite works
- [ ] Skills dashboard microsite works
- [ ] Terminal commands work
- [ ] Mobile responsive design intact
- [ ] Drupal News page still works (separate feature)

## Next Steps

### Optional Enhancements
1. Add a headless CMS (Contentful, Sanity.io) if you need a visual editor
2. Create a simple admin interface to edit portfolioData.ts
3. Move to environment-specific data files
4. Add version control for content changes

### Deployment Options
See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Vercel deployment
- Netlify deployment
- GitHub Pages deployment
- AWS S3 + CloudFront deployment

## AWS Resources to Decommission

Once you've verified everything works:

### 1. Lightsail Instance
```
1. Go to AWS Lightsail Console
2. Select your Drupal instance
3. Click "Delete"
4. Confirm deletion
5. Delete associated snapshots
```

**Savings:** $5/month

### 2. Static IP (if any)
```
1. Lightsail Console → Networking
2. Delete static IP if not in use
```

### 3. DNS Records (Optional)
```
Route 53 → Hosted Zones → saurabh-tripathi.com
Delete A record for api.saurabh-tripathi.com
(Keep domain if using for frontend)
```

## Migration Completed

- [x] Export data from Drupal
- [x] Create static data files
- [x] Update App.tsx
- [x] Remove axios dependency
- [x] Remove proxy configuration
- [x] Test build
- [x] Document changes
- [ ] Deploy to production
- [ ] Test production deployment
- [ ] Decommission AWS Lightsail

## Questions or Issues?

Contact: saurabh.tripathi.cs@gmail.com
