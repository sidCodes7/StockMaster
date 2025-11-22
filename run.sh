#!/bin/bash

# StockMaster - Run Script
# This script helps you start the StockMaster application

echo "🚀 Starting StockMaster Inventory Management System..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Dependencies ready!"
echo ""
echo "🌐 Starting development server..."
echo ""
echo "📍 The application will be available at: http://localhost:5173"
echo ""
echo "🔐 Login credentials:"
echo "   Email: admin@stockmaster.com"
echo "   Password: admin123"
echo ""
echo "📖 Press Ctrl+C to stop the server"
echo ""
echo "════════════════════════════════════════════════════════"
echo ""

# Start the dev server
npm run dev
