import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[280px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({ children, className, size = 'md', animate = true }: BentoCardProps) {
  const sizeClasses = {
    sm: 'row-span-1 col-span-1',
    md: 'row-span-1 col-span-1 md:col-span-2',
    lg: 'row-span-2 col-span-1 md:col-span-2 lg:col-span-2',
    xl: 'row-span-2 col-span-1 md:col-span-2 lg:col-span-3'
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-gradient-bento border border-border/50 p-8 transition-all duration-300 hover:shadow-large hover:scale-[1.02]",
        sizeClasses[size],
        animate && "hover:animate-bento-float",
        className
      )}
    >
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}