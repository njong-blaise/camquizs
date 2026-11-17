# CamQuiz - Educational Quiz Platform

A modern, production-ready educational web application built with React 19, TypeScript, and Tailwind CSS. CamQuiz helps Cameroon GCE ICT students prepare for their examination through interactive quizzes, progress tracking, and gamification.

## ?? Project Overview

CamQuiz is designed as a premium educational platform inspired by Duolingo, Quizizz, Kahoot, and Coursera. The application emphasizes:

- **Clean Architecture**: Scalable, maintainable code structure
- **Modern UI**: Premium, responsive design with smooth animations
- **Real-time Features**: Live leaderboards and instant feedback
- **Gamification**: Streaks, XP, badges, and achievements
- **Performance**: Optimized for desktop, tablet, and mobile devices

## ?? Project Structure

```
camquiz/
+-- src/
¦   +-- components/           # Reusable React components
¦   +-- pages/               # Page-level components (lazy loaded)
¦   +-- layouts/             # Layout wrapper components
¦   +-- contexts/            # React Context providers
¦   +-- hooks/               # Custom React hooks
¦   +-- services/            # External services (Supabase)
¦   +-- types/               # TypeScript interfaces & types
¦   +-- utils/               # Helper functions & utilities
¦   +-- constants/           # Application constants
¦   +-- assets/              # Images, icons, media files
¦   +-- routes/              # Route definitions and configuration
¦   +-- App.tsx              # Root app component
¦   +-- main.tsx             # Entry point
¦   +-- index.css            # Global styles with Tailwind
+-- public/                  # Static files
+-- .env                     # Environment variables (local)
+-- .env.example             # Environment template
+-- vite.config.ts          # Vite configuration with path aliases
+-- tsconfig.json           # TypeScript configuration
+-- tailwind.config.js      # Tailwind CSS configuration
+-- postcss.config.js       # PostCSS configuration
+-- package.json            # Project dependencies
```

## ??? Tech Stack

### Frontend
- React 19 - Latest React with improved hooks
- Vite - Lightning-fast build tool
- TypeScript - Type-safe development
- Tailwind CSS - Utility-first CSS framework
- React Router - Client-side routing
- React Hook Form - Efficient form handling
- Zod - Schema validation
- TanStack Query - Powerful data fetching
- Framer Motion - Smooth animations
- Lucide React - Modern icon library
- Recharts - Data visualization

### Backend & Database
- Supabase - PostgreSQL database as a service
- Supabase Auth - JWT-based authentication
- PostgreSQL - Relational database

### Deployment
- Vercel - Optimized for Next.js and React

## ?? Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn package manager
- Supabase account

### Local Development

1. Navigate to project:
   cd "c:\Users\blais\Desktop\computer quiz app\camquiz"

2. Install dependencies:
   npm install

3. Set up environment variables in .env.local:
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key

4. Start development server:
   npm run dev

5. Open browser: http://localhost:5173/

## ?? Available Scripts

npm run dev       # Development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run type-check # Type checking

## ? Foundation Built

### ? Completed Foundation
- [x] React 19 + Vite + TypeScript setup
- [x] Tailwind CSS with custom design tokens
- [x] Project folder structure (scalable architecture)
- [x] Global CSS with component classes
- [x] TypeScript types for all entities
- [x] Constants and configuration
- [x] Custom React hooks (20+ utilities)
- [x] Supabase service layer
- [x] Auth context for global auth state
- [x] React Router setup
- [x] React Query for data management
- [x] Path aliases (@/) for imports
- [x] Environment configuration
- [x] All page stubs
- [x] Development server running

### ?? Next Features to Build

We''ll build the following features one by one:

1. **Splash & Welcome Screen** - Animated intro screens
2. **Authentication System** - Login, Register, Forgot Password
3. **Dashboard** - Main hub with stats and quick actions
4. **Quiz System** - Topic selection and quiz engine
5. **Results & Analytics** - Score display and review
6. **Leaderboard** - Rankings with filters
7. **Profile & Statistics** - User profile page
8. **Gamification** - XP, badges, achievements
9. **Admin Panel** - Question management

## ?? Design Highlights

- **Premium Colors**: Custom gradient palettes
- **Smooth Animations**: Framer Motion integration ready
- **Responsive**: Mobile-first design
- **Accessible**: WCAG compliance focus
- **Modern Typography**: Inter font family

---

**Status**: Foundation Complete ? | Ready for Feature Development ??
