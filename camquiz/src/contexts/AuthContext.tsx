import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { authService, profileService } from '@/services/supabase';
import type { Profile } from '@/types';

interface AuthContextType {
  session: Session | null;
  user: SupabaseUser | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  promoteToAdmin: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial session
  useEffect(() => {
    const loadSession = async () => {
      try {
        setLoading(true);
        const { session: initialSession, error: sessionError } =
          await authService.getSession();

        if (sessionError) throw sessionError;

        setSession(initialSession);
        if (initialSession?.user) {
          setUser(initialSession.user);

          // Load profile
          const { data: profileData, error: profileError } = await profileService.getById(
            initialSession.user.id
          );

          if (profileError && typeof profileError === 'object' && 'code' in profileError && (profileError as any).code !== 'PGRST116') {
            // PGRST116 is "not found" error, which is okay for new users
            throw profileError;
          }

          setProfile(profileData || null);
        }
      } catch (err) {
        console.error('Failed to load session:', err);
        setError(err instanceof Error ? err.message : 'Failed to load session');
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  // Subscribe to auth changes
  useEffect(() => {
    const subscription = authService.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error: loginError } = await authService.login(email, password);

      if (loginError) throw loginError;

      if (data) {
        setSession(data.session || null);
        setUser(data.session?.user || null);

        if (data.session?.user) {
          const { data: profileData } = await profileService.getById(data.session.user.id);
          setProfile(profileData || null);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, fullName: string) => {
      try {
        setError(null);
        const { data, error: registerError } = await authService.register(
          email,
          password,
          fullName
        );

        if (registerError) throw registerError;

        if (data) {
          setSession(data.session || null);
          setUser(data.session?.user || null);

          // Create profile for new user
          if (data.session?.user) {
            const { data: newProfile, error: profileError } = await profileService.create(
              data.session.user.id,
              fullName
            );

            if (profileError) throw profileError;
            setProfile(newProfile || null);
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed';
        setError(message);
        throw err;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      setError(null);
      const { error: logoutError } = await authService.logout();

      if (logoutError) throw logoutError;

      setSession(null);
      setUser(null);
      setProfile(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      throw err;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      const { error: resetError } = await authService.resetPassword(email);

      if (resetError) throw resetError;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      throw err;
    }
  }, []);

  const promoteToAdmin = useCallback(async (userId: string) => {
    try {
      setError(null);
      const { error: updateError } = await profileService.updateAdminStatus(userId, true);

      if (updateError) throw updateError;

      // Refresh profile if promoting current user
      if (profile?.user_id === userId) {
        const { data: updatedProfile } = await profileService.getById(userId);
        setProfile(updatedProfile || null);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to promote user to admin';
      setError(message);
      throw err;
    }
  }, [profile]);

  const value: AuthContextType = {
    session,
    user,
    profile,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
    isAuthenticated: !!user,
    isAdmin: profile?.is_admin || false,
    promoteToAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use Auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
