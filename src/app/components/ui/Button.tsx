// src/components/ui/Button.tsx

"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx'; // Ensure clsx is installed: npm install clsx

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        solid: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500', // Added "solid" variant
        outline: 'border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 focus-visible:ring-blue-500',
        ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-400',
        info: 'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500',
        link: 'text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500',
        upgrade: 'bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 focus:ring-teal-400',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
    compoundVariants: [
      {
        variant: 'link',
        size: 'icon',
        className: 'h-8 w-8 p-0',
      },
    ],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  ariaLabel?: string; // For icon-only buttons
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = isLoading || disabled;

    // Determine if the button is icon-only
    const isIconOnly = !children && (leftIcon || rightIcon);

    return (
      <button
        className={clsx(buttonVariants({ variant, size, fullWidth, loading: isLoading }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        aria-label={isIconOnly ? ariaLabel || 'button' : undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className={clsx(isIconOnly ? '' : 'mr-2')}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={clsx(isIconOnly ? '' : 'ml-2')}>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
