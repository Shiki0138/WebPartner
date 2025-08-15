import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  animate?: boolean;
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  icon: Icon,
  iconPosition = 'left',
  animate = false,
  pulse = false,
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-100 text-blue-700',
    secondary: 'bg-purple-100 text-purple-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-cyan-100 text-cyan-700'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  const Component = animate ? motion.span : 'span';
  const animationProps = animate ? {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  } : {};

  return (
    <Component
      {...animationProps}
      className={`
        inline-flex items-center gap-1 font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${rounded ? 'rounded-full' : 'rounded-md'}
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-3 h-3" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-3 h-3" />}
    </Component>
  );
};

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  showLabel = true
}) => {
  const statusConfig = {
    online: {
      color: 'bg-green-500',
      label: 'オンライン',
      animation: true
    },
    offline: {
      color: 'bg-gray-400',
      label: 'オフライン',
      animation: false
    },
    busy: {
      color: 'bg-red-500',
      label: '取り込み中',
      animation: true
    },
    away: {
      color: 'bg-yellow-500',
      label: '離席中',
      animation: false
    }
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const { color, label: defaultLabel, animation } = statusConfig[status];
  const displayLabel = label || defaultLabel;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className={`${sizeClasses[size]} ${color} rounded-full`} />
        {animation && (
          <div className={`absolute inset-0 ${sizeClasses[size]} ${color} rounded-full animate-ping`} />
        )}
      </div>
      {showLabel && <span className="text-sm text-gray-600">{displayLabel}</span>}
    </div>
  );
};

interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: 'default' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  animate?: boolean;
}

export const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  max = 99,
  variant = 'primary',
  size = 'md',
  dot = false,
  animate = true
}) => {
  const variantClasses = {
    default: 'bg-gray-500',
    primary: 'bg-blue-600',
    danger: 'bg-red-600'
  };

  const sizeClasses = {
    sm: dot ? 'w-2 h-2' : 'min-w-[1.25rem] h-5 text-xs px-1',
    md: dot ? 'w-2.5 h-2.5' : 'min-w-[1.5rem] h-6 text-sm px-1.5',
    lg: dot ? 'w-3 h-3' : 'min-w-[1.75rem] h-7 text-base px-2'
  };

  const displayCount = count > max ? `${max}+` : count;
  const Component = animate ? motion.span : 'span';

  if (count === 0 && !dot) return null;

  return (
    <Component
      {...(animate && {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { type: 'spring', stiffness: 500, damping: 30 }
      })}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${dot ? '' : 'flex items-center justify-center'}
        text-white font-medium rounded-full
      `}
    >
      {!dot && displayCount}
    </Component>
  );
};

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  htmlFor,
  className = ''
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Tag: React.FC<TagProps> = ({
  children,
  onRemove,
  color = 'bg-gray-100 text-gray-700',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span className={`inline-flex items-center gap-1 ${color} ${sizeClasses[size]} rounded-full`}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:text-gray-900 transition-colors"
        >
          ×
        </button>
      )}
    </span>
  );
};