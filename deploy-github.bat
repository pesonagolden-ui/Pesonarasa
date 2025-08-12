@echo off
echo.
echo ========================================
echo   GitHub + Netlify Deployment Script
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

REM Check if files exist
echo ✅ Checking files...
if exist "index.html" (
    echo ✅ index.html found
) else (
    echo ❌ index.html missing!
    pause
    exit /b 1
)

if exist "vite.svg" (
    echo ✅ vite.svg found
) else (
    echo ❌ vite.svg missing!
)

if exist "_redirects" (
    echo ✅ _redirects found
) else (
    echo ❌ _redirects missing!
)

if exist "netlify.toml" (
    echo ✅ netlify.toml found
) else (
    echo ❌ netlify.toml missing!
)

echo.
echo 📋 Files ready for deployment:
dir /b *.html *.svg *.toml _* 2>nul

echo.
echo 🚀 DEPLOYMENT OPTIONS:
echo.
echo 1. Push to GitHub (recommended)
echo 2. Show deployment guide
echo 3. Test Google API locally
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto push_github
if "%choice%"=="2" goto show_guide
if "%choice%"=="3" goto test_google
if "%choice%"=="4" goto end

:push_github
echo.
echo 📤 Pushing to GitHub...
echo.

REM Add all files
git add .

REM Commit with timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%-%MM%-%DD% %HH%:%Min%:%Sec%"

git commit -m "Fixed frozen food e-commerce website - ready for deployment [%timestamp%]"

echo.
echo 🔗 Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Successfully pushed to GitHub!
    echo.
    echo 🌐 NEXT STEPS:
    echo 1. Go to https://netlify.com
    echo 2. Click "New site from Git"
    echo 3. Select your GitHub repository
    echo 4. Set publish directory to "." (dot)
    echo 5. Deploy!
    echo.
    echo Your website will be live in 2-3 minutes!
) else (
    echo.
    echo ❌ Push failed. Please check:
    echo 1. Git remote is configured
    echo 2. You have push permissions
    echo 3. Internet connection is stable
    echo.
    echo To set up remote:
    echo git remote add origin https://github.com/username/repository.git
)

goto end

:show_guide
echo.
echo 📖 DEPLOYMENT GUIDE:
echo.
echo 🚀 GitHub + Netlify Method:
echo 1. Push code to GitHub repository
echo 2. Connect repository to Netlify
echo 3. Set build settings:
echo    - Build command: (leave empty)
echo    - Publish directory: . (dot)
echo 4. Deploy!
echo.
echo 📁 Manual Method:
echo 1. Go to https://app.netlify.com/drop
echo 2. Drag entire project folder
echo 3. Website goes live instantly!
echo.
echo 🔧 Files needed:
echo - index.html (main website)
echo - vite.svg (icon)
echo - _redirects (routing)
echo - netlify.toml (config)
echo.

:test_google
echo.
echo 🧪 TESTING GOOGLE API:
echo.
echo Opening website for Google API testing...
start "" "index.html"
echo.
echo ✅ WHAT TO TEST:
echo 1. Click "Sign in with Google" button
echo 2. Complete Google OAuth login
echo 3. Verify profile name appears in button
echo 4. Try adding items to cart (requires login)
echo 5. Test checkout with Google profile info
echo.
echo 🔧 GOOGLE CONSOLE SETUP:
echo Make sure these domains are added to authorized origins:
echo - http://localhost
echo - http://127.0.0.1
echo - https://your-netlify-domain.netlify.app
echo.
echo 📋 API CREDENTIALS:
echo Client ID: 733822404446-m293n75ai4bo96c1lp1fb26vev3ktd43.apps.googleusercontent.com
echo API Key: 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
echo.
goto end

:end
echo.
echo 🎉 Deployment script completed!
echo.
pause
