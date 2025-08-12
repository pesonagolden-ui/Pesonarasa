#!/bin/bash

echo "🚀 Frozen Food E-commerce Deployment Script"
echo "==========================================="

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Make sure you're in the project root directory."
    exit 1
fi

echo "✅ Project files found"

# Check for deployment platform
echo ""
echo "Choose deployment platform:"
echo "1) Netlify (drag & drop)"
echo "2) Vercel CLI"
echo "3) GitHub Pages"
echo "4) Just show files to upload"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📁 For Netlify deployment:"
        echo "1. Go to https://app.netlify.com/drop"
        echo "2. Drag and drop your entire project folder"
        echo "3. Your site will be live in seconds!"
        echo ""
        echo "Files to include:"
        ls -la | grep -E "(index\.html|assets|_redirects|vite\.svg|netlify\.toml)"
        ;;
    2)
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
    3)
        echo ""
        echo "📚 For GitHub Pages:"
        echo "1. Push your code to GitHub"
        echo "2. Go to repository Settings > Pages"
        echo "3. Select source branch (usually main/master)"
        echo "4. Your site will be available at https://username.github.io/repository-name"
        ;;
    4)
        echo ""
        echo "📋 Files needed for deployment:"
        echo "================================"
        echo "✅ index.html"
        echo "✅ assets/ folder (with all files inside)"
        echo "✅ _redirects"
        echo "✅ vite.svg"
        echo ""
        echo "Optional configuration files:"
        echo "- netlify.toml (for Netlify)"
        echo "- vercel.json (for Vercel)"
        echo ""
        echo "Upload these files to your hosting provider."
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment setup complete!"
echo "📖 Check README.md for detailed instructions"
