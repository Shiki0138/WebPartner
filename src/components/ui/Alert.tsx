import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: boolean;
  animate?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon = true,
  animate = true
}) => {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-600'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: AlertCircle,
      iconColor: 'text-red-600'
    }
  };

  const { bg, border, text, icon: Icon, iconColor } = variants[variant];
  const Component = animate ? motion.div : 'div';

  return (
    <Component
      {...(animate && {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
      })}
      className={`${bg} ${border} ${text} border rounded-lg p-4`}
      role="alert"
    >
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        )}
        <div className={`${icon ? 'ml-3' : ''} flex-1`}>
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className={`ml-3 -mr-1 -mt-1 p-1 rounded-md hover:bg-black/5 transition-colors ${text}`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </Component>
  );
};

interface ToastProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  description,
  action,
  onClose,
  duration = 5000
}) => {
  const variants = {
    info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-600' },
    success: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-600' },
    warning: { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-600' },
    error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-600' }
  };

  const { icon: Icon, color, bg } = variants[variant];

  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full pointer-events-auto"
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {action.label}
            </button>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {duration && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 right-0 h-1 ${bg} origin-left`}
        />
      )}
    </motion.div>
  );
};

interface NotificationProps {
  avatar?: React.ReactNode;
  title: string;
  description?: string;
  time?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  unread?: boolean;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  avatar,
  title,
  description,
  time,
  action,
  unread = false,
  onClose
}) => {
  return (
    <div className={`relative p-4 ${unread ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}>
      {unread && (
        <div className="absolute top-4 left-2 w-2 h-2 bg-blue-600 rounded-full" />
      )}
      <div className="flex gap-3">
        {avatar && (
          <div className="flex-shrink-0">
            {avatar}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {onClose && (
              <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
          <div className="mt-2 flex items-center gap-4">
            {time && (
              <span className="text-xs text-gray-500">{time}</span>
            )}
            {action && (
              <button
                onClick={action.onClick}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                {action.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BannerProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
  sticky?: boolean;
}

export const Banner: React.FC<BannerProps> = ({
  variant = 'info',
  children,
  action,
  dismissible = false,
  onDismiss,
  sticky = false
}) => {
  const variants = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
  };

  return (
    <div className={`${variants[variant]} ${sticky ? 'sticky top-0 z-50' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            {children}
          </div>
          <div className="flex items-center gap-4">
            {action && (
              <button
                onClick={action.onClick}
                className="text-sm font-medium text-white hover:text-white/90 underline"
              >
                {action.label}
              </button>
            )}
            {dismissible && (
              <button
                onClick={onDismiss}
                className="text-white hover:text-white/90"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};