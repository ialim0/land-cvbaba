// app/ui/Alert.tsx
import React, { useMemo } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        success: 'border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-500',
        warning: 'border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-500',
        info: 'border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-500',
        error: 'border-red-500/50 text-red-700 dark:border-red-500 [&>svg]:text-red-500', 
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const icons = {
  default: AlertCircle,
  destructive: XCircle,
  success: CheckCircle2,
  warning: AlertCircle,
  info: Info,
  error: XCircle, 
} as const;

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const Icon = useMemo(() => {
      if (variant && icons.hasOwnProperty(variant)) {
        return icons[variant];
      }
      return AlertCircle; // Fallback icon
    }, [variant]);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-4 w-4" />
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  )
);

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  )
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
