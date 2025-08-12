# 🧊 Frozen Food E-commerce Website

A modern e-commerce website for frozen food products with Google integration and QRIS payment system.

## ✅ FIXED & READY FOR DEPLOYMENT!

**No more blank pages!** This website is now fully functional and ready for immediate deployment to Netlify via GitHub.

## 🚀 Quick Deployment

### Option 1: GitHub + Netlify (Recommended)
```bash
# Push to GitHub
git add .
git commit -m "Deploy frozen food e-commerce"
git push origin main

# Then connect repository at netlify.com
```

### Option 2: Direct Deploy
Upload these files to any static hosting:
- `index.html` (main website)
- `vite.svg` (icon)
- `_redirects` (routing)
- `_headers` (optimization)
- `netlify.toml` (config)

### Option 3: Deploy to Popular Platforms

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
- Google Cloud Console account (for Google APIs)
- QRIS payment provider account
- Supabase account (optional)

### Installation
```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env file with your API keys
# See configuration section below

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🔧 API Configuration

#### 1. Google APIs Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Drive API
   - Google Photos Library API
   - Google+ API (for authentication)
4. Create credentials:
   - API Key (for general API access)
   - OAuth 2.0 Client ID (for authentication)
5. Add your domain to authorized origins
6. Copy the keys to your `.env` file

#### 2. QRIS Payment Setup
1. Register with a QRIS payment provider (e.g., DANA, OVO, GoPay)
2. Get your Merchant ID and API Key
3. Configure webhook URLs for payment notifications
4. Add credentials to `.env` file

#### 3. Supabase Setup (Optional)
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add to `.env` file

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
VITE_SUPABASE_URL=https://zzpqchngxewnudlkzzew.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6cHFjaG5neGV3bnVkbGt6emV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NDM3MDIsImV4cCI6MjA3MDQxOTcwMn0.JolXPmk7UHoJ0Zw3gluopQQU0kBlj-3RWwyb3iy-Pnc
```

## 📱 Features

### 🔐 Google Authentication
- Sign in with Google account
- Secure OAuth 2.0 implementation
- User profile management
- Automatic session handling

### 📷 Image Upload & Management
- Upload images to Google Drive
- Automatic image compression and optimization
- Multiple file upload support
- Real-time upload progress
- Image preview and validation
- Drag & drop interface

### 💳 Interactive QRIS Payment
- Generate QRIS payment codes
- Real-time payment status monitoring
- Automatic payment verification
- Payment timeout handling
- Multiple payment method support
- Transaction history

### 🛒 E-commerce Features
- Responsive design
- Shopping cart functionality
- Product catalog
- User authentication
- Checkout process
- Order confirmation

### 🔧 Technical Features
- Modern React with Hooks
- Vite for fast development
- Environment-based configuration
- Error handling and validation
- Mobile-responsive design
- Clean, modular code structure

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
