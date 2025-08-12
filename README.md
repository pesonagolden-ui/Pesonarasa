# Frozen Food E-commerce Website

A modern React-based e-commerce website for frozen food products built with Vite.

## 🚀 Quick Deployment

### Option 1: Deploy Current Build (Fastest)
Your project is already built and ready to deploy! Just upload these files to any static hosting:

- `index.html`
- `assets/` folder
- `_redirects` file
- `vite.svg`

### Option 2: Deploy to Popular Platforms

#### Netlify (Recommended)

**Method 1: Drag & Drop (Easiest)**
1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag your entire project folder
3. Done! Your site is live instantly

**Method 2: Git Integration**
1. Push to GitHub/GitLab
2. Connect repository in Netlify
3. **IMPORTANT**: In build settings, set:
   - Build command: `echo 'Files already built'` (or leave empty)
   - Publish directory: `.` (root directory)
4. Deploy!

**If you get build errors:**
- Rename `netlify-simple.toml` to `netlify.toml`
- Or in Netlify dashboard: Settings > Build & Deploy > Build Settings
- Set Build command to empty or `echo 'Skip build'`

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Or connect your GitHub repo at [vercel.com](https://vercel.com)

#### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch
4. Your site will be available at `https://username.github.io/repository-name`

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── Catalog.jsx
│   ├── Login.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── OrderConfirmation.jsx
├── data/
│   └── products.js
├── App.jsx
└── index.js
```

## 📦 Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🔧 Configuration Files

- `netlify.toml` - Netlify deployment configuration
- `vercel.json` - Vercel deployment configuration  
- `vite.config.js` - Vite build configuration
- `_redirects` - SPA routing redirects

## 🌐 Environment Variables

Create a `.env` file for environment-specific settings:
```
VITE_API_URL=your_api_url
VITE_STRIPE_KEY=your_stripe_key
```

## 📱 Features

- Responsive design
- Shopping cart functionality
- Product catalog
- User authentication
- Checkout process
- Order confirmation

## 🚨 Troubleshooting

### Netlify Build Errors:
**Error**: "Build failed during the stage of building the site"

**Solutions**:
1. **Use Drag & Drop**: Simplest method - just drag folder to netlify.com/drop
2. **Fix Build Settings**:
   - Go to Site Settings > Build & Deploy
   - Set Build command to: `echo 'Files already built'` (or leave empty)
   - Set Publish directory to: `.` (dot)
3. **Use Simple Config**: Rename `netlify-simple.toml` to `netlify.toml`

### Other Common Issues:
1. **404 errors**: Make sure `_redirects` file is included
2. **Asset loading**: Check file paths are correct
3. **Build fails**: Your files are already built - no build step needed!

### Platform-Specific Tips:
- **Netlify**: Files already built, skip build command
- **Vercel**: May auto-detect and work correctly
- **GitHub Pages**: Works directly with static files

### Support
If you encounter issues, check:
- Browser console for errors
- Network tab for failed requests
- Deployment platform logs
- Make sure all files are uploaded: `index.html`, `assets/`, `_redirects`, `vite.svg`

## 📄 License

This project is licensed under the MIT License.
