# VSCode Portfolio - Saurabh Tripathi

A modern portfolio website with a VSCode-inspired interface, built using headless Drupal + React architecture.

## Live Demo

- **Portfolio:** https://main.digs9n8jzvy4e.amplifyapp.com/
- **Drupal Media Page:** https://main.digs9n8jzvy4e.amplifyapp.com/drupal-media
- **API Backend:** https://api.saurabh-tripathi.com

## Architecture

### Frontend (React)
- **Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** AWS Amplify (auto-deploys from GitHub)
- **Theme:** VSCode-inspired dark theme with file explorer

### Backend (Drupal)
- **CMS:** Drupal 11
- **API:** JSON:API (RESTful)
- **Hosting:** AWS Lightsail ($5/month)
- **SSL:** Let's Encrypt (free, auto-renewing)

### Domain & DNS
- **Domain:** saurabh-tripathi.com (Route 53)
- **Frontend:** www.saurabh-tripathi.com (pending SSL)
- **API:** api.saurabh-tripathi.com

---

## Features

- VSCode-themed portfolio interface
- File explorer sidebar with portfolio sections
- About Me, Projects, Experience, Skills pages
- Interactive timeline microsite for experience
- Skills dashboard with progress bars
- Drupal media aggregator (Planet Drupal, Lullabot, etc.)
- Terminal emulator with custom commands
- Fully responsive design

---

## Project Summary

### What We Built

1. **React Portfolio Frontend**
   - Created VSCode-inspired UI with file explorer
   - Changed route from `/news` to `/drupal-media`
   - Added prominent "About Developer" gradient button
   - Integrated with Drupal JSON API
   - Deployed to AWS Amplify with auto-deployment from GitHub

2. **Drupal Backend Migration**
   - Exported Drupal from local DDEV environment
   - Created AWS Lightsail instance (Drupal 11 Blueprint)
   - Imported database, files, and configuration
   - Configured HTTPS with Let's Encrypt SSL
   - Enabled CORS for cross-origin API requests

3. **AWS Infrastructure**
   - Purchased domain: saurabh-tripathi.com
   - Configured DNS in Route 53
   - Set up SSL certificates
   - Configured CloudFront distribution

---

## Local Development

### Prerequisites

- Node.js 16+
- DDEV (for Drupal backend)
- Git

### Frontend Setup

```bash
# Clone the repository
git clone git@github.com:saurabhtripathi/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Backend Setup (Local DDEV)

```bash
# Start Drupal
cd /path/to/drupal
ddev start

# Access Drupal
# URL: https://vscode-portfolio.ddev.site
# Admin: https://vscode-portfolio.ddev.site/admin
```

---

## Deployment Guide

### Frontend Deployment (AWS Amplify)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Your commit message"
git push
```

2. **Auto-deployment:**
   - Amplify automatically detects the push
   - Builds and deploys in 2-3 minutes
   - Live at: https://main.digs9n8jzvy4e.amplifyapp.com

### Backend Deployment (AWS Lightsail)

#### Initial Setup

1. **Export from DDEV:**
```bash
cd /path/to/drupal
ddev export-db --gzip=false --file=drupal-database.sql
tar -czf drupal-files.tar.gz -C web/sites/default files/
ddev drush cex -y
tar -czf drupal-config.tar.gz -C web/sites/default/files sync/
```

2. **Create Lightsail Instance:**
   - Go to AWS Lightsail Console
   - Create instance with Drupal 11 Blueprint
   - Choose $5/month plan
   - Create static IP

3. **Upload Files:**
```bash
scp -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem drupal-database.sql bitnami@YOUR-IP:/tmp/
scp -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem drupal-files.tar.gz bitnami@YOUR-IP:/tmp/
scp -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem drupal-config.tar.gz bitnami@YOUR-IP:/tmp/
```

4. **Import on Server:**
```bash
ssh -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem bitnami@YOUR-IP

# Import database
cat /home/bitnami/bitnami_credentials
sudo /opt/bitnami/mariadb/bin/mariadb -u root -p bitnami_drupal < /tmp/drupal-database.sql

# Extract files
cd /opt/bitnami/drupal/sites/default/
sudo rm -rf files
sudo tar -xzf /tmp/drupal-files.tar.gz
sudo chown -R bitnami:daemon files/
sudo chmod -R 775 files/

# Extract configuration
cd /opt/bitnami/drupal/sites/default/files/
sudo tar -xzf /tmp/drupal-config.tar.gz
sudo chown -R bitnami:daemon sync/

# Clear cache via SQL
sudo /opt/bitnami/mariadb/bin/mariadb -u root -p bitnami_drupal -e "TRUNCATE cache_bootstrap; TRUNCATE cache_config; TRUNCATE cache_container; TRUNCATE cache_data; TRUNCATE cache_default; TRUNCATE cache_discovery; TRUNCATE cache_dynamic_page_cache; TRUNCATE cache_entity; TRUNCATE cache_menu; TRUNCATE cache_page; TRUNCATE cache_render;"
```

5. **Enable HTTPS:**
```bash
sudo /opt/bitnami/bncert-tool

# Answer prompts:
# Domain: api.saurabh-tripathi.com
# Enable HTTP to HTTPS: Y
# Enable non-www to www: N
# Enable www to non-www: N
# Email: your-email@example.com
# Agree to terms: Y
```

6. **Configure CORS:**
```bash
sudo nano /opt/bitnami/apache/conf/vhosts/drupal-https-vhost.conf

# Add before </VirtualHost>:
<IfModule mod_headers.c>
    Header always set Access-Control-Allow-Origin "*"
    Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With"
    Header always set Access-Control-Allow-Credentials "true"
</IfModule>

# Restart Apache
sudo /opt/bitnami/ctlscript.sh restart apache
```

7. **Test CORS:**
```bash
curl -I https://api.saurabh-tripathi.com/jsonapi/node/portfolio_file
# Should see: Access-Control-Allow-Origin: *
```

---

## DNS Configuration (Route 53)

### Current DNS Records:

```
Record Name                    Type    Value
--------------------------------------------------------------------------------------------------------
saurabh-tripathi.com          NS      ns-670.awsdns-19.net, ns-1830.awsdns-36.co.uk, etc.
saurabh-tripathi.com          SOA     ns-670.awsdns-19.net. awsdns-hostmaster.amazon.com. ...
api.saurabh-tripathi.com      A       54.254.233.142
www.saurabh-tripathi.com      CNAME   main.d2ro4pzs069gml.amplifyapp.com
```

---

## Environment Variables

### Frontend (.env.production)

```bash
# Production Drupal Backend URL
REACT_APP_DRUPAL_URL=https://api.saurabh-tripathi.com

# News API URL
REACT_APP_NEWS_API_URL=/api/news
```

### Frontend (.env.local)

```bash
# Local development
REACT_APP_DRUPAL_URL=https://vscode-portfolio.ddev.site

# News scraper (optional)
REACT_APP_NEWS_API_URL=http://localhost:3001/api/news
```

---

## Common Commands

### Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub (triggers Amplify deploy)
git push

# Check remote
git remote -v

# View commit history
git log --oneline -5
```

### Drupal Commands (Lightsail SSH)

```bash
# SSH to Lightsail
ssh -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem bitnami@54.254.233.142

# Check Apache status
sudo /opt/bitnami/ctlscript.sh status

# Restart Apache
sudo /opt/bitnami/ctlscript.sh restart apache

# View Apache error log
sudo tail -f /opt/bitnami/apache/logs/error_log

# Database access
sudo /opt/bitnami/mariadb/bin/mariadb -u root -p bitnami_drupal

# Get Bitnami credentials
cat /home/bitnami/bitnami_credentials
cat /home/bitnami/bitnami_application_password

# Test JSON API
curl https://api.saurabh-tripathi.com/jsonapi/node/portfolio_file

# Test CORS headers
curl -I https://api.saurabh-tripathi.com/jsonapi/node/portfolio_file

# Reset Drupal admin password
php -r "echo password_hash('YourNewPassword123', PASSWORD_DEFAULT) . PHP_EOL;"
# Copy the hash, then:
sudo /opt/bitnami/mariadb/bin/mariadb -u root -p bitnami_drupal
UPDATE users_field_data SET pass='PASTE_HASH_HERE' WHERE uid=1;
exit;
```

### DNS Commands

```bash
# Check DNS resolution
nslookup www.saurabh-tripathi.com
nslookup api.saurabh-tripathi.com

# Check DNS propagation globally
# Visit: https://dnschecker.org/

# Test SSL certificate
openssl s_client -connect api.saurabh-tripathi.com:443 -servername api.saurabh-tripathi.com
```

---

## Troubleshooting

### Portfolio Files Not Loading

**Problem:** Sidebar is empty, no files showing

**Solutions:**
1. Check browser console for CORS errors
2. Verify CORS headers:
   ```bash
   curl -I https://api.saurabh-tripathi.com/jsonapi/node/portfolio_file
   ```
3. Verify Drupal API is accessible:
   ```bash
   curl https://api.saurabh-tripathi.com/jsonapi/node/portfolio_file
   ```
4. Check `.env.production` has correct URL

### SSL Certificate Issues

**Problem:** "Your connection is not private" error

**Solutions:**
1. Check if Let's Encrypt certificate is installed:
   ```bash
   openssl s_client -connect api.saurabh-tripathi.com:443
   ```
2. Re-run bncert-tool:
   ```bash
   sudo /opt/bitnami/bncert-tool
   ```
3. Verify DNS is resolving:
   ```bash
   nslookup api.saurabh-tripathi.com
   ```

### CORS Errors

**Problem:** "Access-Control-Allow-Origin header is missing"

**Solutions:**
1. Edit HTTPS vhost config:
   ```bash
   sudo nano /opt/bitnami/apache/conf/vhosts/drupal-https-vhost.conf
   ```
2. Add CORS headers (see Deployment Guide above)
3. Restart Apache:
   ```bash
   sudo /opt/bitnami/ctlscript.sh restart apache
   ```

### Mixed Content Warnings

**Problem:** "This request has been blocked; content must be served over HTTPS"

**Solution:** Ensure both frontend and backend use HTTPS
- Frontend: https://main.digs9n8jzvy4e.amplifyapp.com (Amplify has SSL by default)
- Backend: https://api.saurabh-tripathi.com (configure with bncert-tool)

---

## Domain Setup Issues

### Current Issue: Custom Domain Not Working

**Problem:** Amplify refuses to add custom domain with error:
> "One or more of the CNAMEs you provided are already associated with a different resource"

**Attempted Solutions:**
1. Deleted old CloudFront distributions
2. Removed old SSL validation records from Route 53
3. Created IAM service role for Amplify
4. Tried subdomain-only approach

**Current Workaround:**
- Using Amplify default URL: https://main.digs9n8jzvy4e.amplifyapp.com
- Manual CNAME: www.saurabh-tripathi.com → Amplify (no SSL)

**Recommended Solution:**
Use CloudFlare Free for SSL proxy (bypasses AWS domain conflicts)

---

## API Endpoints

### Drupal JSON:API

Base URL: `https://api.saurabh-tripathi.com`

```bash
# Get all portfolio files
GET /jsonapi/node/portfolio_file?sort=field_order

# Get specific file
GET /jsonapi/node/portfolio_file/{uuid}

# Get projects
GET /jsonapi/node/project

# Filter by language
GET /jsonapi/node/portfolio_file?filter[field_language]=markdown

# Include relationships
GET /jsonapi/node/portfolio_file?include=field_image
```

---

## Tech Stack

### Frontend
- React 19
- TypeScript 4.9
- Tailwind CSS
- Axios
- Framer Motion
- React Icons

### Backend
- Drupal 11
- PHP 8.2
- MariaDB
- Apache 2.4
- JSON:API module

### Infrastructure
- AWS Amplify (Frontend hosting)
- AWS Lightsail (Drupal hosting)
- AWS Route 53 (DNS)
- Let's Encrypt (SSL certificates)
- GitHub (Version control & CI/CD)

---

## Cost Breakdown

- **Domain:** ~$12/year (Route 53)
- **Drupal Hosting:** $5/month (Lightsail)
- **Frontend Hosting:** Free tier (Amplify)
- **SSL Certificates:** Free (Let's Encrypt)
- **DNS:** ~$0.50/month (Route 53)

**Total:** ~$6/month (~$84/year)

---

## Repository

- **GitHub:** https://github.com/saurabhtripathi/portfolio
- **Branch:** main
- **Auto-Deploy:** Enabled (pushes to main trigger Amplify build)

---

## Contact

**Saurabh Tripathi**
- Email: saurabh.tripathi.cs@gmail.com
- LinkedIn: linkedin.com/in/saurabh-tripathi
- GitHub: github.com/saurabh-tripathi

---

## License

This project is a personal portfolio and is not licensed for reuse.

---

## Acknowledgments

Built to demonstrate:
- Headless CMS architecture
- Modern React development
- DevOps and cloud deployment
- Full-stack development capabilities
- 14+ years of Drupal expertise
