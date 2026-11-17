// Topics
export const TOPICS = [
  {
    id: '1',
    name: 'Computer Fundamentals',
    description: 'Learn the basics of computers and computing',
    color: 'from-blue-500 to-blue-600',
    icon: 'Cpu',
  },
  {
    id: '2',
    name: 'Computer Hardware',
    description: 'Understand computer hardware components',
    color: 'from-purple-500 to-purple-600',
    icon: 'Zap',
  },
  {
    id: '3',
    name: 'Software',
    description: 'Explore software and applications',
    color: 'from-pink-500 to-pink-600',
    icon: 'Code',
  },
  {
    id: '4',
    name: 'Operating Systems',
    description: 'Master operating system concepts',
    color: 'from-green-500 to-green-600',
    icon: 'Monitor',
  },
  {
    id: '5',
    name: 'Microsoft Office',
    description: 'Learn Microsoft Office applications',
    color: 'from-orange-500 to-orange-600',
    icon: 'FileText',
  },
  {
    id: '6',
    name: 'Networking',
    description: 'Understand networking fundamentals',
    color: 'from-cyan-500 to-cyan-600',
    icon: 'Network',
  },
  {
    id: '7',
    name: 'Internet',
    description: 'Learn about the internet and web',
    color: 'from-indigo-500 to-indigo-600',
    icon: 'Globe',
  },
  {
    id: '8',
    name: 'Programming',
    description: 'Master programming concepts',
    color: 'from-red-500 to-red-600',
    icon: 'Brackets',
  },
  {
    id: '9',
    name: 'Database',
    description: 'Learn database concepts',
    color: 'from-amber-500 to-amber-600',
    icon: 'Database',
  },
  {
    id: '10',
    name: 'Computer Security',
    description: 'Understand cybersecurity',
    color: 'from-rose-500 to-rose-600',
    icon: 'Shield',
  },
];

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  easy: { label: 'Easy', value: 'easy', color: 'bg-success-100 text-success-700', points: 10 },
  medium: { label: 'Medium', value: 'medium', color: 'bg-warning-100 text-warning-700', points: 25 },
  hard: { label: 'Hard', value: 'hard', color: 'bg-danger-100 text-danger-700', points: 50 },
};

// Quiz Settings
export const QUIZ_SETTINGS = {
  TIME_PER_QUESTION: 30, // seconds
  QUESTIONS_PER_QUIZ: 10,
  PASSING_PERCENTAGE: 60,
  MIN_QUESTIONS_FOR_ATTEMPT: 5,
};

// Achievements
export const ACHIEVEMENTS = [
  {
    id: 'first_quiz',
    name: 'First Step',
    description: 'Complete your first quiz',
    icon: '🎯',
    badge_color: 'from-blue-500 to-blue-600',
    requirement: { type: 'quizzes_completed', count: 1 },
  },
  {
    id: 'perfect_score',
    name: 'Perfect Score',
    description: 'Score 100% on a quiz',
    icon: '⭐',
    badge_color: 'from-yellow-500 to-yellow-600',
    requirement: { type: 'perfect_score' },
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Achieve a 7-day streak',
    icon: '🔥',
    badge_color: 'from-red-500 to-red-600',
    requirement: { type: 'streak', count: 7 },
  },
  {
    id: 'master_topic',
    name: 'Master',
    description: 'Complete all quizzes in a topic',
    icon: '👑',
    badge_color: 'from-purple-500 to-purple-600',
    requirement: { type: 'topic_complete' },
  },
  {
    id: 'speedrun',
    name: 'Speedrunner',
    description: 'Complete a quiz in under 1 minute',
    icon: '⚡',
    badge_color: 'from-green-500 to-green-600',
    requirement: { type: 'time_taken', seconds: 60 },
  },
];

// XP Thresholds for Levels
export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0 },
  { level: 2, xp: 100 },
  { level: 3, xp: 250 },
  { level: 4, xp: 450 },
  { level: 5, xp: 700 },
  { level: 6, xp: 1000 },
  { level: 7, xp: 1350 },
  { level: 8, xp: 1750 },
  { level: 9, xp: 2200 },
  { level: 10, xp: 2700 },
  { level: 11, xp: 3250 },
  { level: 12, xp: 3850 },
  { level: 13, xp: 4500 },
  { level: 14, xp: 5200 },
  { level: 15, xp: 5950 },
];

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  FULL_NAME_MIN_LENGTH: 2,
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'camquiz_auth_token',
  USER: 'camquiz_user',
  SETTINGS: 'camquiz_settings',
  QUIZ_PROGRESS: 'camquiz_quiz_progress',
};

// API Endpoints (for reference)
export const API_ROUTES = {
  AUTH: '/auth',
  USERS: '/users',
  PROFILES: '/profiles',
  QUIZZES: '/quizzes',
  QUESTIONS: '/questions',
  TOPICS: '/topics',
  LEADERBOARD: '/leaderboard',
  ACHIEVEMENTS: '/achievements',
  NOTIFICATIONS: '/notifications',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 1 * 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 30 * 60 * 1000, // 30 minutes
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
};
