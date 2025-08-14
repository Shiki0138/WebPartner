#!/bin/bash

# AI Web Partner - GitHub Pages Deployment Script

echo "🚀 Building AI Web Partner for deployment..."

# Build the project
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Switch to gh-pages branch
echo "📦 Switching to gh-pages branch..."
git checkout gh-pages

# Remove old files (except .git and build folder)
find . -maxdepth 1 ! -name '.git' ! -name 'build' ! -name '.' ! -name '..' -exec rm -rf {} \;

# Copy build files to root
echo "📁 Copying build files..."
cp -r build/* .

# Add and commit changes
echo "📝 Committing changes..."
git add .
git commit -m "Deploy AI Web Partner to GitHub Pages $(date)"

# Push to gh-pages branch
echo "🚀 Pushing to GitHub Pages..."
git push origin gh-pages

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Site will be available at: https://shiki0138.github.io/WebPartner/"
else
    echo "❌ Deployment failed!"
fi

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✨ Deployment process completed!"