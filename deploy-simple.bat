@echo off
echo.
echo ========================================
echo   Frozen Food E-commerce Deployment
echo ========================================
echo.

REM Check if dist folder exists
if not exist "dist" (
    echo Creating dist folder...
    mkdir dist
)

REM Copy necessary files
echo Copying files to dist folder...
copy "vite.svg" "dist\" >nul 2>&1
copy "_redirects" "dist\" >nul 2>&1
copy "_headers" "dist\" >nul 2>&1

echo.
echo ✅ Build files ready in 'dist' folder!
echo.
echo 📁 Files ready for deployment:
dir dist /b

echo.
echo 🚀 DEPLOYMENT OPTIONS:
echo.
echo 1. NETLIFY (Recommended)
echo    - Go to: https://app.netlify.com/drop
echo    - Drag the 'dist' folder to the page
echo    - Your site will be live instantly!
echo.
echo 2. VERCEL
echo    - Install: npm i -g vercel
echo    - Run: vercel --prod
echo.
echo 3. GITHUB PAGES
echo    - Push to GitHub
echo    - Enable Pages in repository settings
echo.
echo 📋 The 'dist' folder contains everything needed for deployment.
echo    Just upload its contents to any web hosting service.
echo.

REM Open dist folder in explorer
echo Opening dist folder...
start "" "dist"

echo.
echo 🎉 Ready to deploy! 
echo    Drag the 'dist' folder to https://app.netlify.com/drop
echo.
pause
