@echo off
echo.
echo ========================================
echo   Testing Frozen Food E-commerce
echo ========================================
echo.

REM Check if dist folder exists
if not exist "dist" (
    echo ❌ Error: dist folder not found!
    echo Please make sure you're in the correct directory.
    pause
    exit /b 1
)

echo ✅ dist folder found
echo.

REM List files in dist
echo 📁 Files in dist folder:
dir dist /b
echo.

REM Check if main files exist
if exist "dist\index.html" (
    echo ✅ index.html found
) else (
    echo ❌ index.html missing!
)

if exist "dist\test.html" (
    echo ✅ test.html found
) else (
    echo ❌ test.html missing!
)

if exist "dist\vite.svg" (
    echo ✅ vite.svg found
) else (
    echo ❌ vite.svg missing!
)

if exist "dist\_redirects" (
    echo ✅ _redirects found
) else (
    echo ❌ _redirects missing!
)

echo.
echo 🧪 TESTING WEBSITE:
echo.

REM Open test page first
echo Opening test page...
start "" "dist\test.html"

timeout /t 3 /nobreak >nul

REM Open main website
echo Opening main website...
start "" "dist\index.html"

echo.
echo 📋 WHAT TO CHECK:
echo.
echo 1. Test page should show all green checkmarks ✅
echo 2. Main website should show:
echo    - Blue header with "Frozen Food E-commerce"
echo    - Image upload section
echo    - QRIS payment section  
echo    - Product catalog with shrimp, fish, chicken
echo    - Footer at bottom
echo.
echo 3. Try clicking buttons to test functionality
echo.

echo 🚀 IF TESTS PASS:
echo    Your website is ready for deployment!
echo    Drag the 'dist' folder to https://app.netlify.com/drop
echo.

echo 🚨 IF TESTS FAIL:
echo    Check browser console (F12) for errors
echo    Make sure you're using a modern browser
echo.

pause
