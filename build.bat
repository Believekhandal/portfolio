@echo off
REM Build script for portfolio project (Windows)
echo Building Portfolio Project...

REM Build frontend
echo Building frontend...
cd frontend
call npm install
call npm run build
cd ..

REM Build backend
echo Building backend...
call mvn clean package -DskipTests

echo Build complete! Run with: java -jar target\portfolio-0.0.1-SNAPSHOT.jar

