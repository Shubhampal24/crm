import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-gray-100 text-gray-900 border-transparent': variant === 'default',
          'bg-green-100 text-green-800 border-transparent': variant === 'success',
          'bg-yellow-100 text-yellow-800 border-transparent': variant === 'warning',
          'bg-red-100 text-red-800 border-transparent': variant === 'danger',
        },
        className
      )}
      {...props}
    />
  );
}
