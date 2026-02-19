# AWS Lightsail Decommission Guide

## Overview

Now that the portfolio has been migrated to static data, you can safely decommission the AWS Lightsail Drupal backend to save $5/month.

## Pre-Decommission Checklist

Before shutting down AWS resources, verify:

- [ ] Portfolio site works without backend: https://saurabh-tripathi.com
- [ ] All portfolio files load correctly
- [ ] Experience timeline works
- [ ] Skills dashboard works
- [ ] Terminal commands work
- [ ] New deployment is live (Vercel/Netlify)

## Step-by-Step Decommission

### Step 1: Create Final Backup (Optional)

If you want to keep a backup of your Drupal instance:

```bash
# SSH to Lightsail
ssh -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem bitnami@54.254.233.142

# Create database backup
sudo /opt/bitnami/mariadb/bin/mysqldump -u root -p bitnami_drupal > ~/drupal-final-backup.sql

# Create files backup
cd /opt/bitnami/drupal
sudo tar -czf ~/drupal-files-final.tar.gz sites/default/files/

# Download backups to local machine (run from local terminal)
scp -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem bitnami@54.254.233.142:~/drupal-final-backup.sql ~/Desktop/
scp -i ~/.ssh/LightsailDefaultKey-ap-southeast-1.pem bitnami@54.254.233.142:~/drupal-files-final.tar.gz ~/Desktop/
```

### Step 2: Create Lightsail Snapshot (Recommended)

Before deletion, create a snapshot for future reference:

1. Go to: https://lightsail.aws.amazon.com/
2. Click on your Drupal instance
3. Go to "Snapshots" tab
4. Click "Create snapshot"
5. Name: `drupal-portfolio-final-snapshot-YYYY-MM-DD`
6. Wait for completion (5-10 minutes)

**Note:** Snapshots cost $0.05/GB/month but provide a recovery option.

### Step 3: Stop the Lightsail Instance

Test without deleting first:

1. Go to: https://lightsail.aws.amazon.com/
2. Click on your Drupal instance
3. Click "Stop"
4. Verify portfolio still works without it
5. Wait 24 hours to ensure no issues

### Step 4: Delete the Lightsail Instance

After confirming everything works:

1. Go to: https://lightsail.aws.amazon.com/
2. Click on your Drupal instance
3. Click the "..." menu
4. Click "Delete"
5. Type the instance name to confirm
6. Click "Delete"

**Savings start immediately:** $5/month

### Step 5: Delete Static IP (if assigned)

1. Go to: https://lightsail.aws.amazon.com/
2. Click "Networking" tab
3. Find the static IP for the old instance
4. Click "..." → "Delete"
5. Confirm deletion

**Additional savings:** $0.005/hour when not attached

### Step 6: Update DNS Records

Remove the old API subdomain from Route 53 or CloudFlare:

#### If using CloudFlare:
1. Go to: https://dash.cloudflare.com
2. Select your domain
3. Go to "DNS" tab
4. Find record: `api.saurabh-tripathi.com` → Type A
5. Click "Edit" → "Delete"

#### If using Route 53:
1. Go to: https://console.aws.amazon.com/route53/
2. Click "Hosted zones"
3. Click your domain
4. Select the A record for `api.saurabh-tripathi.com`
5. Click "Delete record set"

### Step 7: Clean Up Other AWS Resources

Check for and remove:

1. **Unused Security Groups**
   - EC2 Console → Security Groups
   - Delete any Lightsail-created groups

2. **Unused SSH Keys**
   - Lightsail Console → Account → SSH keys
   - Keep or delete `LightsailDefaultKey`

3. **Old Snapshots** (Optional)
   - Keep the final snapshot for 1 year
   - Delete older snapshots to save $

### Step 8: Verify Cost Reduction

After 1-2 billing cycles:

1. Go to: https://console.aws.amazon.com/billing/
2. Check "Bills" to confirm Lightsail charges stopped
3. Expected savings: ~$5/month

## What to Keep

### Keep These AWS Resources:
- Route 53 Hosted Zone (if using custom domain)
- Domain registration (Route 53 or external registrar)

### Can Delete:
- Lightsail instance
- Static IP
- Old snapshots (after keeping final one)
- Old database backups on instance

## Post-Decommission

### Update Documentation

Update any internal docs that reference:
- `api.saurabh-tripathi.com`
- AWS Lightsail IP: `54.254.233.142`
- Drupal backend

### Archive Old Code

Consider archiving the Drupal backend code:

```bash
cd /Users/saurabh/Documents/vscode-portfolio
tar -czf drupal-backend-archive-$(date +%Y%m%d).tar.gz web/ vendor/ config/ composer.*
mv drupal-backend-archive-*.tar.gz ~/Archives/
```

## Rollback Plan

If you need to restore the Drupal backend:

### Option 1: Restore from Snapshot
1. Lightsail Console → Snapshots
2. Select your snapshot
3. Click "Create instance from snapshot"
4. Wait 5-10 minutes
5. Assign static IP
6. Update DNS to point to new IP

### Option 2: Fresh Setup
1. Create new Lightsail Drupal instance
2. Restore database from SQL backup
3. Restore files from tar.gz backup
4. Configure SSL with bncert-tool
5. Update DNS

## Cost Summary

### Before Migration
- Lightsail: $5.00/month
- DNS: $0.50/month
- **Total: $5.50/month ($66/year)**

### After Migration
- Lightsail: $0.00/month (deleted)
- DNS: $0.50/month (if keeping domain)
- Vercel/Netlify: $0.00/month (free tier)
- **Total: $0.50/month ($6/year)**

### Annual Savings: $60 (91% reduction)

## Timeline

| Action | When | Duration |
|--------|------|----------|
| Test new static site | Immediately | 1 hour |
| Create final backup | Day 1 | 30 min |
| Create snapshot | Day 1 | 10 min |
| Stop instance | Day 1 | 1 min |
| Monitor for issues | Day 1-7 | 7 days |
| Delete instance | Day 7 | 5 min |
| Delete static IP | Day 7 | 1 min |
| Update DNS | Day 7 | 5 min |
| Verify billing | Next month | - |

## Questions?

Contact: saurabh.tripathi.cs@gmail.com

## Checklist

- [ ] Backup database
- [ ] Backup files
- [ ] Create Lightsail snapshot
- [ ] Test portfolio without backend (24-48 hours)
- [ ] Stop Lightsail instance
- [ ] Monitor for issues (1 week)
- [ ] Delete Lightsail instance
- [ ] Delete static IP
- [ ] Update DNS (remove api subdomain)
- [ ] Verify AWS bill reduction
- [ ] Archive Drupal code locally
- [ ] Update internal documentation
- [ ] Celebrate $60/year savings! 🎉
