import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

const Avatar = ({ src, alt = 'Avatar', size = 'md', className = '', fallback }: AvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-2xl',
  };
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizes[size]} ${className}`}
      />
    );
  }
  
  if (fallback) {
    return (
      <div
        className={`rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold ${sizes[size]} ${className}`}
      >
        {fallback.charAt(0).toUpperCase()}
      </div>
    );
  }
  
  return (
    <div
      className={`rounded-full bg-gray-200 flex items-center justify-center text-gray-400 ${sizes[size]} ${className}`}
    >
      <User className="w-1/2 h-1/2" />
    </div>
  );
};

export default Avatar;
