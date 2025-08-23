# Deployment Guide

## 🚀 Deployment Options

### 1. Lovable Platform (Recommended)

#### Automatic Deployment
Lovable provides seamless deployment with automatic builds and hosting.

**Features:**
- Automatic deployment on code changes
- Built-in preview environments
- Custom domain support (paid plans)
- SSL certificates included
- CDN distribution

**Steps:**
1. Connect project to GitHub (if not already connected)
2. Click "Publish" button in Lovable editor
3. Your app will be available at `your-project.lovable.app`

#### Custom Domain Setup
1. Navigate to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

### 2. Vercel Deployment

#### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

#### Steps
1. **Import Project**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy from command line
   vercel
   ```

2. **Configuration**
   Create `vercel.json`:
   ```json
   {
     "framework": "vite",
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

3. **Environment Variables**
   Set in Vercel dashboard:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 3. Netlify Deployment

#### Steps
1. **Connect Repository**
   - Log in to Netlify
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Redirects Configuration**
   Create `public/_redirects`:
   ```
   /*    /index.html   200
   ```

4. **Environment Variables**
   Set in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 4. GitHub Pages

#### Steps
1. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: GitHub Actions

2. **Create Workflow**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## 🔧 Build Configuration

### Production Build
```bash
# Standard production build
npm run build

# Development build (for debugging)
npm run build:dev
```

### Build Optimization

#### Vite Configuration
The project uses optimized Vite configuration:
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-button', '@radix-ui/react-dialog'],
        },
      },
    },
  },
});
```

#### Asset Optimization
- Images are automatically optimized during build
- CSS is minified and purged of unused classes
- JavaScript is bundled and tree-shaken

## 🌐 Domain Configuration

### DNS Settings
For custom domains, configure these DNS records:

#### For Apex Domain (example.com)
```
Type: A
Name: @
Value: [Platform IP Address]
```

#### For Subdomain (www.example.com)
```
Type: CNAME
Name: www
Value: [Platform CNAME]
```

### SSL Certificate
- Lovable: Automatic SSL provisioning
- Vercel: Automatic SSL with Let's Encrypt
- Netlify: Automatic SSL with Let's Encrypt
- GitHub Pages: Automatic SSL for custom domains

## 📊 Performance Monitoring

### Core Web Vitals
Monitor these metrics post-deployment:
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Tools
- Google PageSpeed Insights
- Lighthouse
- GTmetrix
- Vercel Analytics (if using Vercel)

## 🔐 Security Configuration

### Content Security Policy
Implemented in production via `useSecurityHeaders` hook:
```typescript
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://analytics.google.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://*.supabase.co",
].join('; ');
```

### HTTPS Enforcement
All platforms automatically redirect HTTP to HTTPS.

## 🚨 Troubleshooting

### Common Build Issues

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit

# Skip type checking in build (not recommended)
npm run build -- --skip-type-check
```

#### Import Path Issues
Verify all imports use correct aliases:
```typescript
// ✅ Correct
import { Button } from '@/components/ui/button';

// ❌ Incorrect
import { Button } from '../components/ui/button';
```

### Runtime Issues

#### Supabase Connection
- Verify environment variables are set correctly
- Check Supabase project URL and anon key
- Ensure RLS policies allow public access where needed

#### Routing Issues
- Ensure server redirects are configured for SPA
- Check that all routes are properly defined
- Verify base URL configuration

### Performance Issues

#### Large Bundle Size
```bash
# Analyze bundle
npx vite-bundle-analyzer

# Check for duplicate dependencies
npm ls --depth=0
```

#### Slow Loading
- Enable gzip compression on server
- Implement lazy loading for routes
- Optimize images and assets

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] No console.log statements in production code
- [ ] All TODO comments reviewed

### Functionality
- [ ] All features working as expected
- [ ] Forms submit correctly
- [ ] Navigation works properly
- [ ] Contact form sends emails
- [ ] Mobile responsiveness tested

### Performance
- [ ] Build size is optimized
- [ ] Images are compressed
- [ ] Unused dependencies removed
- [ ] Core Web Vitals meet targets

### Security
- [ ] Security headers implemented
- [ ] CSP configured properly
- [ ] No sensitive data in client code
- [ ] HTTPS enforced

### SEO
- [ ] Meta tags configured
- [ ] Sitemap generated
- [ ] robots.txt present
- [ ] Open Graph tags added

## 🔄 Rollback Strategy

### Lovable Platform
Use built-in version history to rollback to previous versions.

### Other Platforms
```bash
# Git-based rollback
git revert [commit-hash]
git push origin main

# Or reset to previous commit
git reset --hard [commit-hash]
git push --force-with-lease origin main
```

## 📈 Post-Deployment

### Monitoring
- Set up uptime monitoring
- Configure error tracking (Sentry, LogRocket)
- Monitor performance metrics
- Set up analytics tracking

### Maintenance
- Regular dependency updates
- Security vulnerability scans
- Performance optimization reviews
- Backup verification

---

For additional deployment support, refer to the specific platform documentation or contact the development team.