# Internal Documentation

This directory contains internal technical documentation for the portfolio migration and maintenance.

## Documentation Files

### Migration Documentation
- **[MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)** - Complete migration summary from Drupal to static data
- **[MIGRATION_README.md](MIGRATION_README.md)** - Detailed migration instructions and procedures
- **[AWS_DECOMMISSION_GUIDE.md](AWS_DECOMMISSION_GUIDE.md)** - Step-by-step AWS Lightsail shutdown guide

### Deployment & Architecture
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide for Vercel, Netlify, GitHub Pages, etc.
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Original technical architecture documentation

### Service Links
- **[SERVICE_LINKS.md](SERVICE_LINKS.md)** - Public service URLs and links
- **[SERVICE_LINKS_PRIVATE.md](SERVICE_LINKS_PRIVATE.md)** - Private credentials and admin links (not in git)

## Quick Links

### For Content Updates
- Edit: `src/data/portfolioData.ts`
- See: [How to Update Content](MIGRATION_SUMMARY.md#how-to-update-content)

### For Deployment
- See: [DEPLOYMENT.md](DEPLOYMENT.md)

### For AWS Cleanup
- See: [AWS_DECOMMISSION_GUIDE.md](AWS_DECOMMISSION_GUIDE.md)

## Migration Status

**Status:** ✅ Complete (Feb 19, 2026)

- [x] Drupal to static data migration
- [x] AWS Lightsail deleted
- [x] Static IP deleted
- [x] Local backups saved
- [ ] CloudFlare DNS cleanup (api.saurabh-tripathi.com)

## Cost Savings

- **Before:** $5.92/month
- **After:** $0.92/month
- **Savings:** $60/year (84% reduction)
