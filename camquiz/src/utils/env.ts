// Environment configuration
export const env = {
  // Supabase
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',

  // API
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

  // App
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'CamQuiz',
  VITE_APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Educational Quiz Platform',

  // Features
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validate required environment variables
export const validateEnv = () => {
  const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
  const missing = required.filter(key => !env[key as keyof typeof env]);

  if (missing.length > 0 && env.isProduction) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return true;
};
