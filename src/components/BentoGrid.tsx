
import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  children: React.ReactNode;
  size: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]",
      className
    )}>
      {children}
    </div>
  );
}

export function BentoCard({ children, size, className }: BentoCardProps) {
  const sizeClasses = {
    sm: "col-span-1 row-span-1",
    md: "col-span-1 md:col-span-2 row-span-1",
    lg: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
  };

  return (
    <div 
      className={cn(
        "dashboard-card p-6 flex flex-col animate-scroll-reveal hover:scale-[1.02] transition-all duration-300",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
