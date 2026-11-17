import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card = ({ children, className = '', hover = false, onClick }: CardProps) => {
  const baseStyles = 'bg-white rounded-2xl shadow-md p-6';
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-102 cursor-pointer transition-all duration-300' : '';
  
  const CardComponent = onClick ? motion.div : 'div';
  const motionProps = onClick
    ? {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
        onClick,
      }
    : {};
  
  return (
    <CardComponent
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...motionProps}
    >
      {children}
    </CardComponent>
  );
};

export default Card;
