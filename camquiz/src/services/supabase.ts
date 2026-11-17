import { createClient } from '@supabase/supabase-js';
import { env } from '@/utils/env';

/**
 * Initialize and export Supabase client
 * This client handles all interactions with Supabase backend
 */
export const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY
);

/**
 * Auth Service - Handles authentication operations
 */
export const authService = {
  /**
   * Register a new user with email and password
   */
  register: async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Login user with email and password
   */
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Logout current user
   */
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  /**
   * Get current user session
   */
  getSession: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      return { session: null, error };
    }
  },

  /**
   * Send password reset email
   */
  resetPassword: async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Update user password
   */
  updatePassword: async (newPassword: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Watch authentication state changes
   */
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });

    return subscription;
  },
};

/**
 * Profile Service - Handles user profile operations
 */
export const profileService = {
  /**
   * Create user profile
   */
  create: async (userId: string, fullName: string, avatarUrl?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          full_name: fullName,
          avatar_url: avatarUrl,
          level: 1,
          xp: 0,
          daily_streak: 0,
          total_points: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Get user profile by ID
   */
  getById: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Update user profile
   */
  update: async (userId: string, updates: Record<string, any>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Update user admin status
   */
  updateAdminStatus: async (userId: string, isAdmin: boolean) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_admin: isAdmin })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Update user XP
   */
  addXp: async (userId: string, xpAmount: number) => {
    try {
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('xp, total_points')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      const newXp = (currentProfile.xp || 0) + xpAmount;
      const newPoints = (currentProfile.total_points || 0) + xpAmount;

      const { data, error } = await supabase
        .from('profiles')
        .update({ xp: newXp, total_points: newPoints })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Increment daily streak
   */
  incrementStreak: async (userId: string) => {
    try {
      const { data: currentProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('daily_streak')
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      const newStreak = (currentProfile.daily_streak || 0) + 1;

      const { data, error } = await supabase
        .from('profiles')
        .update({ daily_streak: newStreak })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

/**
 * Quiz Service - Handles quiz and question operations
 */
export const quizService = {
  /**
   * Get all topics
   */
  getTopics: async () => {
    try {
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('name');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Get questions for a topic
   */
  getQuestions: async (topicId: string, limit = 10) => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('topic_id', topicId)
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Get random questions
   */
  getRandomQuestions: async (limit = 10) => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Create quiz attempt
   */
  createAttempt: async (userId: string, topicId: string) => {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: userId,
          topic_id: topicId,
          score: 0,
          percentage: 0,
          total_questions: 0,
          correct_answers: 0,
          time_taken: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Save quiz answer
   */
  saveAnswer: async (
    quizAttemptId: string,
    questionId: string,
    userAnswer: 'A' | 'B' | 'C' | 'D' | null,
    isCorrect: boolean
  ) => {
    try {
      const { data, error } = await supabase
        .from('quiz_answers')
        .insert({
          quiz_attempt_id: quizAttemptId,
          question_id: questionId,
          user_answer: userAnswer,
          is_correct: isCorrect,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Complete quiz attempt
   */
  completeAttempt: async (
    attemptId: string,
    score: number,
    percentage: number,
    correctAnswers: number,
    totalQuestions: number,
    timeTaken: number
  ) => {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .update({
          score,
          percentage,
          correct_answers: correctAnswers,
          total_questions: totalQuestions,
          time_taken: timeTaken,
        })
        .eq('id', attemptId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Get quiz history for user
   */
  getHistory: async (userId: string, limit = 10) => {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*, topics(name)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

/**
 * Leaderboard Service - Handles leaderboard operations
 */
export const leaderboardService = {
  /**
   * Get leaderboard
   */
  getLeaderboard: async (period: 'daily' | 'weekly' | 'monthly' | 'all', limit = 50) => {
    try {
      let query = supabase
        .from('profiles')
        .select('*, users(email)')
        .order('total_points', { ascending: false })
        .limit(limit);

      // Add date filter based on period
      if (period !== 'all') {
        let dateFilter = new Date();
        if (period === 'daily') dateFilter.setDate(dateFilter.getDate() - 1);
        if (period === 'weekly') dateFilter.setDate(dateFilter.getDate() - 7);
        if (period === 'monthly') dateFilter.setMonth(dateFilter.getMonth() - 1);

        query = query.gte('updated_at', dateFilter.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Get user rank
   */
  getUserRank: async (userId: string, _period: 'daily' | 'weekly' | 'monthly' | 'all') => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('total_points')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      // Get rank
      const { data: rankData, error: rankError } = await supabase
        .from('profiles')
        .select('count', { count: 'exact' })
        .gt('total_points', data?.total_points || 0);

      if (rankError) throw rankError;

      return { rank: (rankData?.length || 0) + 1, error: null };
    } catch (error) {
      return { rank: null, error };
    }
  },
};

/**
 * Notification Service - Handles notifications
 */
export const notificationService = {
  /**
   * Create notification
   */
  create: async (
    userId: string,
    type: 'reminder' | 'challenge' | 'achievement' | 'leaderboard' | 'question',
    title: string,
    message: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          type,
          title,
          message,
          is_read: false,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Get user notifications
   */
  getNotifications: async (userId: string, limit = 20) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId: string) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
