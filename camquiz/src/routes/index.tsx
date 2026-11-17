import type { RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "@/components/Loading";

// Lazy load pages for better code splitting
const SplashScreen = lazy(() => import("@/pages/SplashScreen"));
const Welcome = lazy(() => import("@/pages/Welcome"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const TopicSelection = lazy(() => import("@/pages/TopicSelection"));
const RandomQuiz = lazy(() => import("@/pages/RandomQuiz"));
const QuizResult = lazy(() => import("@/pages/QuizResult"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const QuizHistory = lazy(() => import("@/pages/QuizHistory"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Settings = lazy(() => import("@/pages/Settings"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/**
 * Wrapper component to provide loading suspense
 */
const SuspenseWrapper = ({
  Component,
}: {
  Component: React.LazyExoticComponent<() => React.ReactElement>;
}): React.ReactElement => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  // Public Routes
  {
    path: "/",
    element: <SuspenseWrapper Component={SplashScreen} />,
  },
  {
    path: "/welcome",
    element: <SuspenseWrapper Component={Welcome} />,
  },
  {
    path: "/login",
    element: <SuspenseWrapper Component={Login} />,
  },
  {
    path: "/register",
    element: <SuspenseWrapper Component={Register} />,
  },
  {
    path: "/forgot-password",
    element: <SuspenseWrapper Component={ForgotPassword} />,
  },

  // Protected Routes
  {
    path: "/dashboard",
    element: <SuspenseWrapper Component={Dashboard} />,
  },
  {
    path: "/topics",
    element: <SuspenseWrapper Component={TopicSelection} />,
  },
  {
    path: "/quiz/random",
    element: <SuspenseWrapper Component={RandomQuiz} />,
  },
  {
    path: "/quiz/:topicId",
    element: <SuspenseWrapper Component={RandomQuiz} />,
  },
  {
    path: "/quiz-result/:attemptId",
    element: <SuspenseWrapper Component={QuizResult} />,
  },
  {
    path: "/leaderboard",
    element: <SuspenseWrapper Component={Leaderboard} />,
  },
  {
    path: "/profile",
    element: <SuspenseWrapper Component={ProfilePage} />,
  },
  {
    path: "/history",
    element: <SuspenseWrapper Component={QuizHistory} />,
  },
  {
    path: "/notifications",
    element: <SuspenseWrapper Component={Notifications} />,
  },
  {
    path: "/settings",
    element: <SuspenseWrapper Component={Settings} />,
  },

  // Admin Routes
  {
    path: "/admin",
    element: <SuspenseWrapper Component={AdminDashboard} />,
  },

  // 404 Page
  {
    path: "*",
    element: <SuspenseWrapper Component={NotFound} />,
  },
];

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  "/",
  "/welcome",
  "/login",
  "/register",
  "/forgot-password",
];

/**
 * Admin routes that require admin role
 */
export const ADMIN_ROUTES = ["/admin"];

/**
 * Routes that require authentication
 */
export const PROTECTED_ROUTES = routes.filter(
  (route) => route.path && !PUBLIC_ROUTES.includes(route.path as string)
);
