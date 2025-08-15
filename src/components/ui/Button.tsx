import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  animate?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  animate = true,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const isDisabled = disabled || loading;

  const Component = animate ? motion.button : 'button';
  const animationProps = animate ? {
    whileHover: !isDisabled ? { scale: 1.02 } : {},
    whileTap: !isDisabled ? { scale: 0.98 } : {}
  } : {};

  return (
    <Component
      {...animationProps}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>処理中...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </Component>
  );
};

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = 'md',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  if (!Icon) return null;

  return (
    <Button
      {...props}
      size={size}
      className={`${sizeClasses[size]} !p-0 ${props.className || ''}`}
    >
      <Icon className="w-5 h-5" />
    </Button>
  );
};

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex rounded-lg shadow-sm ${className}`} role="group">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        
        return React.cloneElement(child as React.ReactElement<any>, {
          className: `${child.props.className || ''} ${
            !isFirst ? '-ml-px' : ''
          } ${
            isFirst ? 'rounded-r-none' : ''
          } ${
            isLast ? 'rounded-l-none' : ''
          } ${
            !isFirst && !isLast ? 'rounded-none' : ''
          }`,
        });
      })}
    </div>
  );
};

interface ToggleButtonProps {
  options: Array<{
    value: string;
    label: string;
    icon?: LucideIcon;
  }>;
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  value,
  onChange,
  size = 'md'
}) => {
  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = value === option.value;
        
        return (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all
              ${isActive 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }
              ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : ''}
            `}
            animate={{ backgroundColor: isActive ? '#ffffff' : 'transparent' }}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
};