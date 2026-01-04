#!/bin/bash

# Build script for portfolio project
echo "Building Portfolio Project..."

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build backend
echo "Building backend..."
mvn clean package -DskipTests

echo "Build complete! Run with: java -jar target/portfolio-0.0.1-SNAPSHOT.jar"

