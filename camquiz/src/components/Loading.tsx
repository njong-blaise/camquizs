/**
 * Loading Component
 * Displays a loading spinner with smooth animations
 */

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-slate-600 font-medium">Loading CamQuiz...</p>
      </div>
    </div>
  );
}
