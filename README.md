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
1. **Drag & Drop**: Simply drag your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. **Git Integration**: 
   - Push to GitHub/GitLab
   - Connect repository in Netlify
   - Auto-deploy on every push

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

### Common Issues:
1. **404 errors**: Make sure `_redirects` file is included
2. **Asset loading**: Check file paths are correct
3. **Build fails**: Ensure Node.js version is 16+

### Support
If you encounter issues, check:
- Browser console for errors
- Network tab for failed requests
- Deployment platform logs

## 📄 License

This project is licensed under the MIT License.
