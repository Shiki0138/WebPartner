import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
}

interface TabsProps {
  items: Array<{
    key: string;
    label: string;
    icon?: LucideIcon;
    badge?: string | number;
  }>;
  activeKey: string;
  onChange: (key: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  onChange,
  variant = 'default',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  const variantClasses = {
    default: 'border-b-2',
    pills: 'rounded-lg',
    underline: ''
  };

  return (
    <div className={`${variant === 'default' ? 'border-b border-gray-200' : ''}`}>
      <div className={`flex ${variant === 'pills' ? 'gap-2' : ''}`}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeKey === item.key;

          return (
            <motion.button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                relative font-medium transition-all duration-200
                ${variant === 'default' ? `
                  ${isActive 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }
                ` : variant === 'pills' ? `
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                ` : `
                  ${isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              `}
              whileHover={{ y: variant === 'default' ? -1 : 0 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
                {item.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs font-medium rounded-full
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </div>
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    icon?: LucideIcon;
  }>;
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4" />
}) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="text-gray-400">{separator}</span>
            )}
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
              </Link>
            ) : (
              <span className={`flex items-center gap-1 ${isLast ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

interface SideNavigationProps {
  items: NavItem[];
  currentPath?: string;
  variant?: 'default' | 'compact';
  showIcons?: boolean;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  items,
  currentPath,
  variant = 'default',
  showIcons = true
}) => {
  const location = useLocation();
  const activePath = currentPath || location.pathname;

  const renderNavItem = (item: NavItem, depth = 0) => {
    const Icon = item.icon;
    const isActive = activePath === item.href || activePath.startsWith(item.href + '/');
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.href}>
        <Link
          to={item.href}
          className={`
            flex items-center justify-between
            ${variant === 'compact' ? 'px-3 py-2' : 'px-4 py-2.5'}
            ${depth > 0 ? 'pl-8' : ''}
            rounded-lg transition-all duration-200
            ${isActive
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }
          `}
        >
          <div className="flex items-center gap-3">
            {showIcons && Icon && (
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            )}
            <span>{item.label}</span>
          </div>
          {item.badge && (
            <span className={`
              px-2 py-0.5 text-xs font-medium rounded-full
              ${isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {item.badge}
            </span>
          )}
        </Link>
        {hasChildren && (
          <div className="mt-1 ml-4">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="space-y-1">
      {items.map(item => renderNavItem(item))}
    </nav>
  );
};

interface StepsProps {
  items: Array<{
    title: string;
    description?: string;
    icon?: LucideIcon;
  }>;
  current: number;
  direction?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export const Steps: React.FC<StepsProps> = ({
  items,
  current,
  direction = 'horizontal',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  if (direction === 'vertical') {
    return (
      <div className="space-y-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isCompleted = index < current;
          const isCurrent = index === current;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    ${sizeClasses[size]}
                    rounded-full flex items-center justify-center font-medium
                    ${isCompleted
                      ? 'bg-blue-600 text-white'
                      : isCurrent
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  {Icon ? <Icon className="w-5 h-5" /> : index + 1}
                </div>
                {index < items.length - 1 && (
                  <div className={`w-0.5 h-16 ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`} />
                )}
              </div>
              <div className="flex-1 pb-8">
                <h4 className={`font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isCompleted = index < current;
        const isCurrent = index === current;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  ${sizeClasses[size]}
                  rounded-full flex items-center justify-center font-medium
                  ${isCompleted
                    ? 'bg-blue-600 text-white'
                    : isCurrent
                      ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {Icon ? <Icon className="w-5 h-5" /> : index + 1}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
            </div>
            {index < items.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};