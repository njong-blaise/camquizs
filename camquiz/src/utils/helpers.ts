/**
 * Utility Functions for CamQuiz Application
 * Contains reusable functions for calculations, formatting, and validations
 */

import { LEVEL_THRESHOLDS, VALIDATION } from '@/constants';

/**
 * Format a percentage value with specified decimal places
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format a number as currency or points
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Calculate level and progress based on XP
 */
export const calculateLevel = (xp: number) => {
  let currentLevel = 1;
  let nextLevelXp = LEVEL_THRESHOLDS[1]?.xp || 100;

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      currentLevel = LEVEL_THRESHOLDS[i].level;
      if (i + 1 < LEVEL_THRESHOLDS.length) {
        nextLevelXp = LEVEL_THRESHOLDS[i + 1].xp;
      }
      break;
    }
  }

  const currentLevelXp = LEVEL_THRESHOLDS[currentLevel - 1]?.xp || 0;
  const xpForCurrentLevel = xp - currentLevelXp;
  const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
  const progress = (xpForCurrentLevel / xpNeededForNextLevel) * 100;

  return {
    level: currentLevel,
    currentXp: xp,
    xpInCurrentLevel: xpForCurrentLevel,
    xpNeededForNextLevel,
    progressPercentage: progress,
  };
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_PATTERN.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): boolean => {
  return VALIDATION.PASSWORD_PATTERN.test(password);
};

/**
 * Format seconds to MM:SS
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Calculate quiz score
 */
export const calculateScore = (correctAnswers: number, totalQuestions: number): number => {
  if (totalQuestions === 0) return 0;
  return Math.round((correctAnswers / totalQuestions) * 100);
};

/**
 * Calculate XP gained from quiz
 */
export const calculateXpGain = (score: number, difficulty: 'easy' | 'medium' | 'hard'): number => {
  const baseXp = {
    easy: 10,
    medium: 25,
    hard: 50,
  };

  const difficultyMultiplier = baseXp[difficulty];
  const scoreMultiplier = (score / 100) * 2; // 0 to 2x multiplier

  return Math.round(difficultyMultiplier * scoreMultiplier);
};

/**
 * Get grade from percentage score
 */
export const getGrade = (percentage: number): { grade: string; color: string } => {
  if (percentage >= 90) return { grade: 'A+', color: 'text-success-600' };
  if (percentage >= 80) return { grade: 'A', color: 'text-success-500' };
  if (percentage >= 70) return { grade: 'B', color: 'text-warning-500' };
  if (percentage >= 60) return { grade: 'C', color: 'text-warning-600' };
  if (percentage >= 50) return { grade: 'D', color: 'text-danger-500' };
  return { grade: 'F', color: 'text-danger-600' };
};

/**
 * Shuffle an array (Fisher-Yates)
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get random items from array
 */
export const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculate time ago string (e.g., "2 hours ago")
 */
export const timeAgo = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDate(dateObj);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: never[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Check if value is empty
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Deep clone an object
 */
export const deepClone = <T,>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      clonedObj[key] = deepClone(obj[key]);
    }
    return clonedObj;
  }
  return obj;
};

/**
 * Get initials from full name
 */
export const getInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Convert color to rgba with opacity
 */
export const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
