import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'border-blue-600',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size]}
          ${color}
          border-t-transparent
          rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

interface DotsLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const DotsLoader: React.FC<DotsLoaderProps> = ({
  size = 'md',
  color = 'bg-blue-600'
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} ${color} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
};

interface ProgressLoaderProps {
  progress: number;
  showPercentage?: boolean;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
}

export const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  progress,
  showPercentage = true,
  color = 'bg-blue-600',
  height = 'md'
}) => {
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">読み込み中...</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  animation = 'pulse',
  width,
  height
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`
        bg-gray-200
        ${variantClasses[variant]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={style}
    />
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  blur?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message = '読み込み中...',
  blur = true
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
          <div className="text-center">
            <Spinner size="lg" />
            {message && <p className="mt-4 text-gray-600">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

interface LoadingCardProps {
  rows?: number;
  showAvatar?: boolean;
  showActions?: boolean;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  rows = 3,
  showAvatar = false,
  showActions = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="flex items-start gap-4">
        {showAvatar && (
          <Skeleton variant="circular" width={48} height={48} />
        )}
        <div className="flex-1 space-y-3">
          <Skeleton height={20} width="60%" />
          {Array.from({ length: rows }).map((_, index) => (
            <Skeleton key={index} height={16} width={index === rows - 1 ? "80%" : "100%"} />
          ))}
        </div>
      </div>
      {showActions && (
        <div className="flex gap-2 mt-4">
          <Skeleton height={32} width={80} />
          <Skeleton height={32} width={80} />
        </div>
      )}
    </div>
  );
};

interface LoadingTableProps {
  rows?: number;
  columns?: number;
}

export const LoadingTable: React.FC<LoadingTableProps> = ({
  rows = 5,
  columns = 4
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} height={16} width={100} />
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  height={16} 
                  width={colIndex === 0 ? 150 : colIndex === columns - 1 ? 80 : 120} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};