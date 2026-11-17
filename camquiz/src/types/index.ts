// User Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'student' | 'admin';
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  level: number;
  xp: number;
  daily_streak: number;
  total_points: number;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Quiz Types
export interface Topic {
  id: string;
  name: string;
  description: string;
  icon?: string;
  color: string;
  question_count: number;
  created_at: string;
}

export interface Question {
  id: string;
  topic_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  percentage: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number;
  completed_at: string;
  created_at: string;
}

export interface QuizAnswer {
  id: string;
  quiz_attempt_id: string;
  question_id: string;
  user_answer: 'A' | 'B' | 'C' | 'D' | null;
  is_correct: boolean;
  created_at: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  id: string;
  user_id: string;
  rank: number;
  points: number;
  average_score: number;
  quiz_count: number;
  profile: Profile;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge_color: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  achievement: Achievement;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  type: 'reminder' | 'challenge' | 'achievement' | 'leaderboard' | 'question';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}
