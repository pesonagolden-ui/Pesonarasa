#!/bin/bash

echo "🚀 Frozen Food E-commerce Deployment Script"
echo "==========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root directory."
    exit 1
fi

echo "✅ Project files found"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "📝 Please edit .env file with your API keys before deploying."
        echo "   Required: Google API keys, QRIS credentials, Supabase config"
    else
        echo "❌ Error: .env.example not found. Please create .env file manually."
        exit 1
    fi
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check your code and try again."
    exit 1
fi

echo "✅ Build completed successfully"

# Check for deployment platform
echo ""
echo "Choose deployment platform:"
echo "1) Netlify (drag & drop)"
echo "2) Netlify CLI"
echo "3) Vercel CLI"
echo "4) GitHub Pages"
echo "5) Show build files"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📁 For Netlify Drag & Drop deployment:"
        echo "1. Go to https://app.netlify.com/drop"
        echo "2. Drag and drop the 'dist' folder (not the entire project)"
        echo "3. Your site will be live in seconds!"
        echo ""
        echo "Build files location: ./dist/"
        ls -la dist/ 2>/dev/null || echo "❌ dist folder not found. Run 'npm run build' first."
        ;;
    2)
        echo ""
        echo "🔧 Deploying with Netlify CLI..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
        else
            echo "❌ Netlify CLI not found. Install it with:"
            echo "npm i -g netlify-cli"
            echo "Then run: netlify deploy --prod --dir=dist"
        fi
        ;;
    3)
        echo ""
        echo "🔧 Deploying with Vercel CLI..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI not found. Install it with:"
            echo "npm i -g vercel"
            echo "Then run: vercel --prod"
        fi
        ;;
    4)
        echo ""
        echo "📚 For GitHub Pages:"
        echo "1. Push your code to GitHub"
        echo "2. Go to repository Settings > Pages"
        echo "3. Select 'GitHub Actions' as source"
        echo "4. Create .github/workflows/deploy.yml with Vite deployment action"
        echo "5. Your site will be available at https://username.github.io/repository-name"
        ;;
    5)
        echo ""
        echo "📋 Build files ready for deployment:"
        echo "===================================="
        if [ -d "dist" ]; then
            echo "✅ dist/ folder contains:"
            ls -la dist/
            echo ""
            echo "Upload the contents of the 'dist' folder to your hosting provider."
            echo ""
            echo "Required files:"
            echo "- index.html"
            echo "- assets/ folder"
            echo "- vite.svg"
            echo ""
            echo "Optional configuration files (in project root):"
            echo "- netlify.toml (for Netlify)"
            echo "- vercel.json (for Vercel)"
            echo "- _redirects (for SPA routing)"
        else
            echo "❌ dist folder not found. Run 'npm run build' first."
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment setup complete!"
echo "📖 Check README.md for detailed instructions"
