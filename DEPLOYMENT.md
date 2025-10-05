# FARMPOLY 3D - Netlify Deployment Guide

## Quick Deploy to Netlify

### Option 1: Connect GitHub Repository
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Netlify will automatically detect the settings from `netlify.toml`

### Option 2: Manual Deploy
1. Build the project locally:
   ```bash
   npm run build
   ```
2. Drag and drop the `dist` folder to Netlify dashboard

## Build Configuration

The project includes:
- `netlify.toml` - Netlify configuration
- `.nvmrc` - Node.js version specification
- Optimized Vite config with code splitting

## Build Settings (Auto-detected from netlify.toml)
- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

## Troubleshooting

If build fails:
1. Check Node.js version (should be 18)
2. Ensure all dependencies are in package.json
3. Check for any ESLint errors
4. Verify Three.js dependencies are compatible

## Performance Notes
- Code is split into chunks for better loading
- Assets are cached with proper headers
- SPA routing is handled with redirects
