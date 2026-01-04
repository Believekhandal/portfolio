# Portfolio Integration Guide

This document explains how the frontend and backend are integrated in this project.

## Architecture

The portfolio project uses a **monolithic deployment** approach where:
- The React frontend is built as static files
- These static files are served by Spring Boot
- Both frontend and backend run from a single JAR file

## Build Process

### Automatic Integration

When you run `mvn clean package`, the following happens:

1. **Frontend Build Phase** (via `frontend-maven-plugin`):
   - Installs Node.js and npm (if not present)
   - Runs `npm install` to install dependencies
   - Runs `npm run build` to build the React app
   - Output: `frontend/dist/` directory

2. **Resource Copy Phase** (via `maven-resources-plugin`):
   - Copies all files from `frontend/dist/` to `target/classes/static/`
   - This makes them available as Spring Boot static resources

3. **JAR Packaging**:
   - Spring Boot packages everything into a single JAR
   - Static files are embedded in the JAR
   - Application can run standalone

### Manual Build

If you want to build manually:

```bash
# Build frontend
cd frontend
npm install
npm run build
cd ..

# Build backend (will copy frontend if dist exists)
mvn clean package
```

## Routing Configuration

### API Routes

All API endpoints are prefixed with `/api`:
- `/api/profile`
- `/api/skills`
- `/api/projects`
- etc.

### Frontend Routes

The `WebConfig` class handles SPA routing:
- All non-API requests are forwarded to `index.html`
- React Router handles client-side routing
- Static assets (JS, CSS, images) are served normally

## Development vs Production

### Development Mode

Run frontend and backend separately:

```bash
# Terminal 1: Backend
mvn spring-boot:run

# Terminal 2: Frontend
cd frontend
npm run dev
```

- Frontend: `http://localhost:3000` (Vite dev server)
- Backend: `http://localhost:8080` (Spring Boot)
- Vite proxy forwards `/api/*` to backend

### Production Mode

Run everything from Spring Boot:

```bash
mvn clean package
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

- Everything: `http://localhost:8080`
- Frontend and API on same port
- No CORS issues
- Single deployment unit

## File Structure

```
portfolio/
├── frontend/
│   ├── dist/              # Built frontend (generated)
│   ├── src/               # React source code
│   └── package.json
├── src/
│   └── main/
│       ├── java/          # Spring Boot code
│       └── resources/
│           └── static/    # Frontend build copied here
└── target/
    └── classes/
        └── static/        # Final location in JAR
```

## Troubleshooting

### Frontend not loading

1. Check if `frontend/dist` exists after build
2. Verify files are copied to `target/classes/static/`
3. Check browser console for 404 errors

### API calls failing

1. Verify backend is running on port 8080
2. Check CORS configuration in `WebConfig`
3. Ensure API endpoints start with `/api`

### Build fails

1. Ensure Node.js is installed (or let Maven install it)
2. Check `frontend/package.json` for correct dependencies
3. Verify `pom.xml` has frontend-maven-plugin configured

## Customization

### Change Frontend Port (Development)

Edit `frontend/vite.config.ts`:
```typescript
server: {
  port: 3000,  // Change this
}
```

### Change Backend Port

Edit `src/main/resources/application.properties`:
```properties
server.port=8080  // Change this
```

### Modify Build Output

Edit `frontend/vite.config.ts`:
```typescript
build: {
  outDir: 'dist',  // Change output directory
}
```

Then update `pom.xml` maven-resources-plugin to match.

