# 🎯 Professional Portfolio Application

A comprehensive full-stack web application that showcases technical skills, projects, work experience, hobbies, and contact information. Built with modern technologies and designed for developers to present their professional journey.

---

## 📋 Table of Contents

- [🏗️ Architecture Overview](#-architecture-overview)
- [🗄️ Database Schema](#️-database-schema)
- [🔧 Tech Stack & Components](#-tech-stack--components)
- [🌊 Application Workflow](#-application-workflow)
- [🚀 Getting Started for Beginners](#-getting-started-for-beginners)
- [⚙️ Detailed Setup Guide](#️-detailed-setup-guide)
- [🔍 Project Structure Deep Dive](#-project-structure-deep-dive)
- [📡 API Documentation](#-api-documentation)
- [🎨 Frontend Architecture](#-frontend-architecture)
- [🔄 Development Workflow](#-development-workflow)
- [📦 Production Deployment](#-production-deployment)
- [🛠️ Customization Guide](#️-customization-guide)

---

## 🏗️ Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   🌐 BROWSER    │────│   🚀 FRONTEND    │────│   🔧 BACKEND     │
│   (React App)   │    │   (React SPA)   │    │   (Spring Boot)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   💾 DATABASE   │    │   📁 FILE       │    │   🔐 SECURITY    │
│   (H2 In-Memory)│    │   (Static Files)│    │   (CORS Config)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Server Architecture Explanation

This application runs **TWO SERVERS SIMULTANEOUSLY**:

#### 🖥️ **Server 1: Spring Boot Application Server (Backend)**
- **Framework**: Spring Boot 3.3.5 (Embedded Tomcat)
- **Port**: `8080`
- **Purpose**: Provides REST APIs, serves static files, handles business logic
- **Technology**: Java 21 + Spring Framework
- **Database**: H2 In-Memory Database

#### 🌐 **Server 2: Vite Development Server (Frontend)**
- **Framework**: Vite (during development)
- **Port**: `5173` (or `3000`)
- **Purpose**: Hot-reload development server for React application
- **Technology**: Node.js + Vite build tool

#### 🔄 **Production Integration**
- **Single Server**: Spring Boot serves both API and built React files
- **Port**: `8080`
- **Benefits**: Simplified deployment, no CORS issues

### Component Interaction Flow

```
1. User visits http://localhost:8080
2. Spring Boot serves React app (index.html)
3. React app loads in browser
4. React makes API calls to /api/* endpoints
5. Spring Boot handles API requests
6. Data flows: Controller → Service → Repository → Database
7. Responses return: Database → Repository → Service → Controller → React
```

## 🗄️ Database Schema

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐       ┌─────────────────┐
│    PROFILE      │       │      SKILL      │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ full_name       │       │ name            │
│ title           │       │ category        │
│ bio             │       │ proficiency     │
│ profile_image_url│      │ icon_url        │
│ email           │       │ description     │
│ phone           │       └─────────────────┘
│ location        │
│ linkedin_url    │
│ github_url      │
│ website_url     │
└─────────────────┘
         │
         │ 1
         │
         ▼ *
┌─────────────────┐       ┌─────────────────┐
│   EXPERIENCE    │       │     PROJECT     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ title           │       │ name            │
│ company         │       │ description     │
│ location        │       │ image_url       │
│ start_date      │       │ github_url      │
│ end_date        │       │ live_url        │
│ current         │       │ technologies    │
│ description     │       │ featured        │
│ company_logo_url│       │ creation_date   │
└─────────────────┘       └─────────────────┘
         │                        │
         │ 1                      │ 1
         │                        │
         ▼ *                      ▼ *
┌─────────────────┐       ┌─────────────────┐
│     HOBBY       │       │    CONTACT      │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ name            │       │ name            │
│ description     │       │ email           │
│ icon_url        │       │ message         │
│ category        │       │ created_at      │
└─────────────────┘       └─────────────────┘
```

### Database Tables Structure

#### `profile` Table
```sql
CREATE TABLE profile (
    id BIGINT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_image_url VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    website_url VARCHAR(500)
);
```

#### `skill` Table
```sql
CREATE TABLE skill (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
    icon_url VARCHAR(500),
    description TEXT
);
```

#### `experience` Table
```sql
CREATE TABLE experience (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    company_logo_url VARCHAR(500)
);
```

#### `project` Table
```sql
CREATE TABLE project (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    technologies VARCHAR(1000),
    featured BOOLEAN DEFAULT FALSE,
    creation_date DATE
);
```

#### `hobby` Table
```sql
CREATE TABLE hobby (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500),
    category VARCHAR(100)
);
```

#### `contact` Table
```sql
CREATE TABLE contact (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Configuration (H2 In-Memory)

```properties
# application.properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# H2 Console (for development)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Data Initialization
spring.jpa.defer-datasource-initialization=true
spring.sql.init.mode=always
```

## 🔧 Tech Stack & Components

### Backend Components (Spring Boot)

#### **📦 Core Framework**
- **Spring Boot 3.3.5**: Main application framework with embedded Tomcat server
- **Java 21**: Modern Java with latest features and performance improvements

#### **🗄️ Data Layer**
- **Spring Data JPA**: Object-relational mapping and database abstraction
- **H2 Database**: Lightweight, in-memory database for development
- **Hibernate**: JPA implementation for database operations

#### **🔧 Utilities**
- **Lombok**: Reduces boilerplate code (getters, setters, constructors)
- **Maven**: Dependency management and build automation
- **Spring Boot DevTools**: Hot-reload for development

#### **🌐 Web Layer**
- **Spring Web**: REST API creation and HTTP handling
- **Spring MVC**: Model-View-Controller pattern implementation

### Frontend Components (React)

#### **⚛️ Core Framework**
- **React 18**: Modern UI library with concurrent features
- **TypeScript**: Type-safe JavaScript for better development experience

#### **🏗️ Build & Development**
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and quality enforcement

#### **🎨 Styling**
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing and optimization

### Application Features

- **👤 About Section**: Personal profile, bio, and contact information
- **🛠️ Skills Section**: Technical skills categorized by proficiency levels
- **💼 Experience Timeline**: Professional work experience with company details
- **🚀 Projects Gallery**: Showcase of personal and professional projects
- **🎯 Hobbies Section**: Personal interests and non-technical activities
- **📬 Contact Form**: Functional contact form for visitor communication

---

## 🌊 Application Workflow

### Complete Request-Response Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  🌐 USER    │────▶│  🖥️ BROWSER  │────▶│  🚀 REACT   │────▶│  📡 API     │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                             │
                                                             ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  🎯 CONTROLLER│────▶│  🔧 SERVICE │────▶│  📚 REPO   │────▶│  💾 H2 DB   │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                             │
                                                             ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  📊 DATA    │────▶│  🔄 PROCESS │────▶│  📋 FORMAT  │────▶│  📤 JSON    │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                             │
                                                             ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  🔙 RESPONSE│────▶│  🎨 REACT   │────▶│  🖼️ RENDER  │────▶│  👀 DISPLAY │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Data Flow Steps:

1. **User Action**: User clicks button or navigates in React app
2. **API Call**: React component calls REST API endpoint
3. **Controller**: Spring Controller receives HTTP request
4. **Service**: Business logic processes the request
5. **Repository**: Data access layer queries database
6. **Database**: H2 returns requested data
7. **Response**: Data flows back through all layers
8. **UI Update**: React receives JSON and updates UI

---

## 🚀 Getting Started for Beginners

### What You'll Learn

This guide will teach you how to:
- ✅ Set up Java development environment
- ✅ Install and configure Node.js
- ✅ Run two servers simultaneously
- ✅ Understand full-stack development
- ✅ Deploy a production application

### Step 1: Understand the Two-Server Architecture

**Important Concept**: This application runs TWO SEPARATE SERVERS:

#### Server A: Backend (Spring Boot - Java)
- **Purpose**: Provides data and business logic
- **Port**: `8080`
- **Technology**: Java + Spring Framework
- **What it does**: Serves API endpoints, handles database operations

#### Server B: Frontend (Vite - Node.js)
- **Purpose**: Provides user interface and user experience
- **Port**: `5173` (development) or `3000`
- **Technology**: React + TypeScript + Node.js
- **What it does**: Renders web pages, handles user interactions

**Why Two Servers?**
- **Separation of Concerns**: Backend handles data, Frontend handles UI
- **Different Technologies**: Java for backend, JavaScript for frontend
- **Independent Scaling**: Can scale each part separately
- **Team Specialization**: Backend and frontend developers work independently

### Step 2: Prerequisites Installation

#### Install Java 21
```bash
# Windows: Download from https://adoptium.net/
# macOS: Use Homebrew
brew install --cask temurin21

# Linux: Use package manager
sudo apt update
sudo apt install openjdk-21-jdk
```

**Verify Java Installation:**
```bash
java -version
# Should show: Java 21.x.x
```

#### Install Node.js 18+
```bash
# Windows: Download from https://nodejs.org/
# macOS: Use Homebrew
brew install node

# Linux: Use NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Node.js Installation:**
```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 8.x.x or higher
```

#### Install Maven
```bash
# Windows: Download from https://maven.apache.org/download.cgi
# macOS: Use Homebrew
brew install maven

# Linux: Use package manager
sudo apt install maven
```

**Verify Maven Installation:**
```bash
mvn -version
# Should show: Apache Maven 3.6+
```

### Step 3: Project Setup

#### Clone or Download the Project
```bash
# If using Git
git clone <repository-url>
cd portfolio

# Or extract the downloaded ZIP file
cd portfolio
```

#### Verify Project Structure
```bash
ls -la
# Should see:
# - src/ (backend Java code)
# - frontend/ (React frontend code)
# - pom.xml (Maven configuration)
# - README.md (this file)
```

### Step 4: Running the Application

#### Method A: Development Mode (Two Servers)

**Terminal 1 - Start Backend Server:**
```bash
# From project root directory
mvn spring-boot:run
```
- ✅ Backend starts on `http://localhost:8080`
- ✅ API endpoints available at `http://localhost:8080/api/*`
- ✅ H2 Database console at `http://localhost:8080/h2-console`

**Terminal 2 - Start Frontend Server:**
```bash
# Open new terminal, navigate to frontend directory
cd frontend
npm install
npm run dev
```
- ✅ Frontend starts on `http://localhost:5173`
- ✅ Hot-reload enabled for development
- ✅ API calls proxy to backend automatically

**Access the Application:**
- 🌐 Frontend: `http://localhost:5173`
- 🔧 Backend APIs: `http://localhost:8080/api/*`
- 💾 Database Console: `http://localhost:8080/h2-console`

#### Method B: Production Mode (Single Server)

**Integrated Build:**
```bash
# Windows
build.bat

# Linux/Mac
chmod +x build.sh
./build.sh

# Or manually
mvn clean package
```

**Run Production Application:**
```bash
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```
- ✅ Everything served from `http://localhost:8080`
- ✅ React app and APIs integrated
- ✅ Ready for deployment

## ⚙️ Detailed Setup Guide

### Development Environment Setup

#### Backend Development Setup
```bash
# 1. Navigate to project root
cd portfolio

# 2. Build backend (compiles Java code)
mvn clean compile

# 3. Run with hot-reload (for development)
mvn spring-boot:run
```

#### Frontend Development Setup
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install Node.js dependencies
npm install

# 3. Start development server with hot-reload
npm run dev

# 4. Build for production
npm run build
```

### Understanding the Build Process

#### Maven Build Phases (Backend)
```bash
mvn clean        # Clean target directory
mvn compile      # Compile Java source code
mvn test         # Run unit tests
mvn package      # Create JAR file
mvn install      # Install to local repository
```

#### Frontend Build Process
```bash
npm install      # Install dependencies
npm run build    # Production build (TypeScript → JavaScript)
npm run dev      # Development server with hot-reload
npm run preview  # Preview production build
```

### Troubleshooting Common Issues

#### Backend Issues
```bash
# Port 8080 already in use
netstat -ano | findstr :8080  # Windows
lsof -i :8080                  # Linux/Mac
# Kill process and restart

# Java version issues
java -version
# Ensure Java 21 is default

# Maven issues
mvn -version
# Clear Maven cache if needed
mvn clean
```

#### Frontend Issues
```bash
# Node modules corrupted
rm -rf node_modules package-lock.json
npm install

# Port 5173 already in use
npm run dev -- --port 5174

# Build fails
npm run build -- --mode development
```

---

## 🔍 Project Structure Deep Dive

### Complete Directory Tree

```
portfolio/
├── 📁 src/main/java/com/believe/portfolio/
│   ├── 📁 controller/
│   │   ├── PortfolioApiController.java    # Main REST API controller
│   │   └── SpaController.java             # Single Page Application controller
│   ├── 📁 entity/
│   │   ├── Contact.java                   # Contact form entity
│   │   ├── Experience.java                # Work experience entity
│   │   ├── Hobby.java                     # Hobby entity
│   │   ├── Profile.java                   # User profile entity
│   │   ├── Project.java                   # Project entity
│   │   └── Skill.java                     # Skill entity
│   ├── 📁 repository/
│   │   ├── ContactRepository.java         # Contact data access
│   │   ├── ExperienceRepository.java      # Experience data access
│   │   ├── HobbyRepository.java           # Hobby data access
│   │   ├── ProfileRepository.java         # Profile data access
│   │   ├── ProjectRepository.java         # Project data access
│   │   └── SkillRepository.java           # Skill data access
│   ├── 📁 service/
│   │   └── PortfolioService.java          # Business logic layer
│   └── 📁 config/
│       └── WebConfig.java                 # CORS and web configuration
├── 📁 src/main/resources/
│   ├── application.properties             # Spring configuration
│   ├── data.sql                          # Initial database data
│   └── static/                           # Static files (populated by build)
├── 📁 src/test/                          # Unit tests (if any)
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── 📁 layout/
│   │   │   │   ├── Header.tsx             # Navigation header
│   │   │   │   └── Footer.tsx             # Page footer
│   │   │   └── 📁 sections/
│   │   │       ├── About.tsx              # About section
│   │   │       ├── Skills.tsx             # Skills section
│   │   │       ├── Projects.tsx           # Projects section
│   │   │       ├── Hobbies.tsx            # Hobbies section
│   │   │       ├── Experience.tsx         # Experience section
│   │   │       └── Contact.tsx            # Contact section
│   │   ├── 📁 hooks/
│   │   │   └── usePortfolioData.ts       # Custom React hook
│   │   ├── 📁 types/
│   │   │   └── portfolio.ts               # TypeScript interfaces
│   │   ├── 📁 constants/
│   │   │   └── api.ts                     # API configuration
│   │   ├── 📁 utils/
│   │   │   └── helpers.ts                 # Utility functions
│   │   ├── App.tsx                        # Main React component
│   │   ├── main.tsx                       # React application entry point
│   │   └── style.css                      # Global styles
│   ├── 📁 public/                         # Static assets
│   ├── package.json                       # Node.js dependencies
│   ├── vite.config.ts                     # Vite configuration
│   ├── tailwind.config.js                 # Tailwind CSS config
│   └── postcss.config.js                  # PostCSS configuration
├── 📁 target/                             # Maven build output (generated)
├── pom.xml                               # Maven project configuration
├── build.bat                             # Windows build script
├── build.sh                              # Linux/Mac build script
└── README.md                            # This documentation
```

### Component Responsibilities

#### Backend Components

**Controller Layer (`controller/`):**
- `PortfolioApiController`: Handles all REST API requests (`/api/*`)
- `SpaController`: Serves React SPA for client-side routing

**Entity Layer (`entity/`):**
- JPA entities representing database tables
- Lombok annotations for getters/setters/constructors
- Relationships and constraints defined

**Repository Layer (`repository/`):**
- Spring Data JPA repositories
- Custom query methods (e.g., `findByCategory`, `findByFeaturedTrue`)

**Service Layer (`service/`):**
- Business logic implementation
- Data transformation and validation
- Orchestrates repository calls

**Configuration (`config/`):**
- CORS settings for cross-origin requests
- Static resource handling
- Web MVC configuration

#### Frontend Components

**Layout Components (`components/layout/`):**
- `Header`: Navigation and branding
- `Footer`: Contact info and links

**Section Components (`components/sections/`):**
- Individual portfolio sections
- Data fetching and rendering
- Responsive design implementation

**Hooks (`hooks/`):**
- `usePortfolioData`: Centralized data fetching logic
- Custom React hooks for reusable logic

**Utilities:**
- `helpers.ts`: Date formatting, proficiency colors
- `api.ts`: API endpoint constants
- `portfolio.ts`: TypeScript type definitions

### Data Flow Architecture

```
User Request → React Component → API Call → Controller → Service → Repository → Database
                                       ↓
Database Response ← Repository ← Service ← Controller ← JSON Response ← React Update
```

---

## 📡 API Documentation

### REST API Endpoints

All API endpoints return JSON responses and follow REST conventions.

#### Profile Endpoints
```
GET    /api/profile
```
**Response:** Single profile object
```json
{
  "id": 1,
  "fullName": "Vishwash Khandal",
  "title": "Senior Software Engineer",
  "bio": "Software Engineer with 4 years of experience...",
  "profileImageUrl": "https://...",
  "email": "vishwash.khandal@example.com",
  "phone": "+91-9876543210",
  "location": "Mumbai, India",
  "linkedinUrl": "https://linkedin.com/in/...",
  "githubUrl": "https://github.com/...",
  "websiteUrl": "https://..."
}
```

```
POST   /api/profile
```
**Request Body:** Profile object (same as GET response)

#### Skills Endpoints
```
GET    /api/skills
```
**Response:** Array of skill objects
```json
[
  {
    "id": 1,
    "name": "Java",
    "category": "Backend",
    "proficiency": 85,
    "iconUrl": "https://...",
    "description": "Core Java development"
  }
]
```

```
GET    /api/skills/category/{category}
```
**Parameters:** `category` (e.g., "Backend", "Frontend", "Database")

```
POST   /api/skills
```
**Request Body:** Skill object

#### Projects Endpoints
```
GET    /api/projects
```
**Response:** Array of all projects

```
GET    /api/projects/featured
```
**Response:** Array of featured projects only

```
POST   /api/projects
```
**Request Body:** Project object

#### Experience Endpoints
```
GET    /api/experiences
```
**Response:** Array of experiences ordered by start date (newest first)

```
POST   /api/experiences
```
**Request Body:** Experience object

#### Hobbies Endpoints
```
GET    /api/hobbies
```
**Response:** Array of hobby objects

```
POST   /api/hobbies
```
**Request Body:** Hobby object

#### Contact Endpoints
```
GET    /api/contacts
```
**Response:** Array of contact messages ordered by creation date

```
POST   /api/contacts
```
**Request Body:** Contact object
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to connect..."
}
```

### API Response Format

**Success Response:**
```json
{
  "data": { ... },
  "status": "success",
  "timestamp": "2024-01-04T12:00:00Z"
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "status": "error",
  "timestamp": "2024-01-04T12:00:00Z"
}
```

### HTTP Status Codes

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🎨 Frontend Architecture

### React Component Hierarchy

```
App (Main Container)
├── Header (Navigation)
├── Main Content
│   ├── About Section
│   ├── Skills Section
│   ├── Experience Section
│   ├── Projects Section
│   ├── Hobbies Section
│   └── Contact Section
└── Footer
```

### Component Structure Details

#### Main App Component (`App.tsx`)
```tsx
function App() {
  // Custom hook for data fetching
  const { data, loading, error } = usePortfolioData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header profile={data.profile} />
      <main>
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Experience experiences={data.experiences} />
        <Projects projects={data.projects} />
        <Hobbies hobbies={data.hobbies} />
        <Contact onSubmit={handleContactSubmit} />
      </main>
      <Footer />
    </div>
  );
}
```

#### Custom Hook (`usePortfolioData.ts`)
```tsx
export function usePortfolioData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/profile'),
      fetch('/api/skills'),
      fetch('/api/experiences'),
      fetch('/api/projects'),
      fetch('/api/hobbies')
    ])
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(([profile, skills, experiences, projects, hobbies]) => {
      setData({ profile, skills, experiences, projects, hobbies });
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}
```

### Styling Architecture

#### Tailwind CSS Structure
```css
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .section-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent;
  }
}
```

#### Responsive Design Pattern
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### State Management

#### Local Component State
```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

#### Data Fetching Strategy
- **Centralized**: All data fetched in `usePortfolioData` hook
- **Parallel**: Multiple API calls executed simultaneously
- **Error Handling**: Graceful error states and loading indicators
- **Caching**: Browser caching for static assets

---

## 🔄 Development Workflow

### Daily Development Cycle

#### Backend Development
```bash
# 1. Make code changes in Java files
# 2. Hot-reload automatically applies changes (Spring DevTools)
# 3. Test API endpoints in browser or Postman
# 4. Check logs in console for debugging
# 5. Run unit tests: mvn test
```

#### Frontend Development
```bash
# 1. Make changes in React components
# 2. Vite automatically recompiles and refreshes browser
# 3. Test UI interactions and responsiveness
# 4. Check browser console for errors
# 5. Run TypeScript checks: npm run build
```

### Code Quality Workflow

#### Backend Code Quality
```bash
# Run tests
mvn test

# Check code coverage
mvn jacoco:report

# Static analysis
mvn checkstyle:check

# Security scan
mvn org.owasp:dependency-check-maven:check
```

#### Frontend Code Quality
```bash
# Lint code
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build

# Test (if implemented)
npm test
```

### Git Workflow

#### Branching Strategy
```
main (production)
├── develop (integration)
│   ├── feature/profile-update
│   ├── feature/new-section
│   └── bugfix/contact-form
```

#### Commit Message Convention
```
feat: add new project showcase section
fix: resolve mobile responsiveness issue
docs: update API documentation
style: format code with prettier
refactor: simplify data fetching logic
```

### Debugging Workflow

#### Backend Debugging
```java
// Add logging
@Slf4j
public class PortfolioService {
    public Profile getProfile() {
        log.debug("Fetching profile data");
        Profile profile = profileRepository.findById(1L).orElse(null);
        log.debug("Profile found: {}", profile != null);
        return profile;
    }
}
```

#### Frontend Debugging
```tsx
// React DevTools
// Browser console logging
const [debug, setDebug] = useState(false);

useEffect(() => {
  if (debug) {
    console.log('Component data:', data);
    console.log('Loading state:', loading);
  }
}, [data, loading, debug]);
```

---

## 📦 Production Deployment

### Build Process

#### Integrated Build (Recommended)
```bash
# Single command build for production
mvn clean package

# This process:
# 1. Compiles Java code
# 2. Runs frontend build (npm run build)
# 3. Copies React dist files to Spring Boot static resources
# 4. Creates single JAR with everything included
```

#### Manual Build Process
```bash
# Build backend
mvn clean compile

# Build frontend separately
cd frontend
npm install
npm run build
cd ..

# Copy frontend build to backend
cp -r frontend/dist/* src/main/resources/static/

# Package everything
mvn package
```

### Deployment Options

#### Standalone JAR Deployment
```bash
# Run the application
java -jar target/portfolio-0.0.1-SNAPSHOT.jar

# With custom port
java -jar target/portfolio-0.0.1-SNAPSHOT.jar --server.port=9090

# With custom profile
java -jar target/portfolio-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM openjdk:21-jdk-slim
COPY target/portfolio-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
# Build and run
docker build -t portfolio-app .
docker run -p 8080:8080 portfolio-app
```

#### Cloud Deployment

**Heroku:**
```bash
# Create Procfile
echo "web: java -jar target/portfolio-0.0.1-SNAPSHOT.jar --server.port=\$PORT" > Procfile

# Deploy
git push heroku main
```

**AWS/DigitalOcean:**
```bash
# Upload JAR to server
scp target/portfolio-0.0.1-SNAPSHOT.jar user@server:/opt/portfolio/

# Run with process manager (systemd/pm2)
sudo systemctl start portfolio-service
```

### Environment Configuration

#### Production `application.properties`
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/

# Database (Production)
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Security
spring.security.enabled=false

# Logging
logging.level.com.believe.portfolio=INFO
logging.file.name=logs/portfolio.log

# Static Resources
spring.web.resources.static-locations=classpath:/static/
```

### Performance Optimization

#### Frontend Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'tailwindcss']
        }
      }
    }
  }
})
```

#### Database Optimization
```properties
# Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5

# JPA Optimization
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true

# Query Caching
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.ehcache.EhCacheRegionFactory
```

---

## 🛠️ Customization Guide

### Personalizing Your Portfolio

#### Step 1: Update Profile Data
Edit `src/main/resources/data.sql`:

```sql
-- Update your personal information
INSERT INTO profile (id, full_name, title, bio, profile_image_url, email, phone, location, linkedin_url, github_url, website_url)
VALUES (1, 'Your Full Name', 'Your Job Title',
        'Your professional bio here...',
        'https://your-image-url.com/photo.jpg',
        'your.email@example.com',
        '+1-234-567-8900',
        'Your City, Country',
        'https://linkedin.com/in/yourprofile',
        'https://github.com/yourusername',
        'https://yourwebsite.com');
```

#### Step 2: Customize Skills
```sql
-- Add your technical skills
INSERT INTO skill (id, name, category, proficiency, icon_url, description) VALUES
(1, 'Java', 'Backend', 90, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 'Enterprise Java development'),
(2, 'React', 'Frontend', 85, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'Modern web development'),
(3, 'Spring Boot', 'Backend', 88, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', 'Java web framework');
```

#### Step 3: Add Work Experience
```sql
INSERT INTO experience (id, title, company, location, start_date, end_date, current, description, company_logo_url) VALUES
(1, 'Senior Software Engineer', 'Your Company', 'Your City, Country',
 DATE '2023-01-01', NULL, true,
 'Led development of scalable web applications serving 100k+ users...',
 'https://your-company-logo-url.com/logo.png');
```

#### Step 4: Showcase Projects
```sql
INSERT INTO project (id, name, description, image_url, github_url, live_url, technologies, featured, creation_date) VALUES
(1, 'E-Commerce Platform', 'Full-stack e-commerce solution with React and Spring Boot',
 'https://your-project-image.com/screenshot.jpg',
 'https://github.com/yourusername/ecommerce-project',
 'https://your-live-demo.com',
 'React, Spring Boot, PostgreSQL, Docker', true, DATE '2023-06-01');
```

#### Step 5: Add Personal Hobbies
```sql
INSERT INTO hobby (id, name, description, icon_url, category) VALUES
(1, 'Photography', 'Capturing moments and storytelling through images',
 'https://example.com/camera-icon.svg', 'Creative'),
(2, 'Hiking', 'Exploring nature trails and outdoor adventures',
 'https://example.com/mountain-icon.svg', 'Adventure');
```

### Styling Customization

#### Color Scheme Modification
Edit `frontend/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',  // Your brand color
          600: '#2563eb',
          900: '#1e3a8a'
        }
      }
    }
  }
}
```

#### Typography and Layout
Edit `frontend/src/style.css`:

```css
@layer base {
  body {
    @apply font-sans text-gray-900 bg-gradient-to-br from-blue-50 to-indigo-100;
  }

  h1, h2, h3 {
    @apply font-bold tracking-tight;
  }
}

@layer components {
  .hero-section {
    @apply bg-gradient-to-r from-primary-600 to-primary-800 text-white;
  }

  .skill-card {
    @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300;
  }
}
```

### Adding New Sections

#### Create New Component
```tsx
// frontend/src/components/sections/Blog.tsx
export function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <section className="section-container">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
      <div className="grid gap-6">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
```

#### Add to Main App
```tsx
// frontend/src/App.tsx
import { Blog } from './components/sections/Blog';

function App() {
  return (
    <div>
      <Header />
      <About />
      <Skills />
      <Blog />        {/* New section */}
      <Experience />
      <Projects />
      <Hobbies />
      <Contact />
      <Footer />
    </div>
  );
}
```

### Advanced Customization

#### Environment Variables
Create `.env` files:

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=My Portfolio

# .env.production
VITE_API_BASE_URL=/api
VITE_APP_TITLE=Vishwash Khandal - Portfolio
```

#### Internationalization (i18n)
```typescript
// i18n setup for multiple languages
const resources = {
  en: { translation: { welcome: "Welcome" } },
  es: { translation: { welcome: "Bienvenido" } }
};
```

#### Analytics Integration
```tsx
// Google Analytics
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: location.pathname
    });
  }, [location]);

  return null;
}
```

---

## 📊 Monitoring & Maintenance

### Application Monitoring

#### Health Checks
```
GET /actuator/health      # Application health
GET /actuator/info        # Application info
GET /actuator/metrics     # Performance metrics
```

#### Log Monitoring
```properties
# application.properties
logging.level.root=WARN
logging.level.com.believe.portfolio=DEBUG
logging.file.name=logs/portfolio.log
logging.logback.rollingpolicy.max-file-size=10MB
```

### Database Maintenance

#### Backup Strategy
```bash
# H2 Database backup (development)
# Copy database file or export data

# Production database backup
pg_dump portfolio_db > backup_$(date +%Y%m%d).sql
```

#### Performance Monitoring
```sql
-- Query performance
EXPLAIN ANALYZE SELECT * FROM experience ORDER BY start_date DESC;

-- Index usage
SELECT * FROM pg_stat_user_indexes WHERE schemaname = 'public';
```

### Security Considerations

#### Input Validation
```java
@PostMapping("/contacts")
public ResponseEntity<Contact> saveContact(@Valid @RequestBody Contact contact) {
    // Input validation with Bean Validation
}
```

#### CORS Configuration
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://yourdomain.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

---

## 🎯 Quick Start Checklist

### For Complete Beginners
- [ ] Install Java 21
- [ ] Install Node.js 18+
- [ ] Install Maven 3.6+
- [ ] Clone/download project
- [ ] Run `mvn spring-boot:run` (backend)
- [ ] Run `cd frontend && npm install && npm run dev` (frontend)
- [ ] Open `http://localhost:5173` in browser
- [ ] Customize data in `data.sql`
- [ ] Build for production: `mvn clean package`
- [ ] Deploy JAR file

### Production Checklist
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Monitoring tools set up
- [ ] Backup strategy implemented
- [ ] Security headers configured

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/portfolio/discussions)
- **Email**: your.email@example.com

---

*Built with ❤️ using Spring Boot, React, and modern web technologies.*

## Customization

### Update Your Data

1. **Profile**: Edit `src/main/resources/data.sql` to update your profile information
2. **Skills**: Add or modify skills in the `data.sql` file
3. **Projects**: Update project information in `data.sql`
4. **Experience**: Modify experience entries in `data.sql`
5. **Hobbies**: Update hobbies in `data.sql`

### Styling

The frontend uses Tailwind CSS. You can customize:
- Colors in `frontend/tailwind.config.js`
- Global styles in `frontend/src/style.css`
- Component styles in individual component files

## Development

### Running Both Services

1. Start the backend (from project root):
   ```bash
   mvn spring-boot:run
   ```

2. Start the frontend (in a new terminal, from frontend directory):
   ```bash
   cd frontend
   npm run dev
   ```

The frontend is configured to proxy API requests to the backend automatically.

## Production Deployment

### Integrated Build (Recommended)

The project is configured to automatically build the frontend and integrate it into the Spring Boot application:

```bash
# Windows
build.bat

# Linux/Mac
chmod +x build.sh
./build.sh

# Or manually with Maven (builds frontend automatically)
mvn clean package
```

This will:
1. Build the React frontend
2. Copy it to Spring Boot's static resources
3. Package everything into a single JAR file

Run the application:
```bash
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

The application will be available at `http://localhost:8080` with both the frontend and API integrated.

### Separate Builds

If you prefer to build separately:

**Backend:**
```bash
mvn clean package
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/` and will be automatically copied to Spring Boot's static resources during the Maven build.

## License

This project is open source and available for personal use.

