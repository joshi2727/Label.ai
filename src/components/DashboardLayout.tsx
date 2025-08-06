
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  Home, 
  Camera, 
  Brain, 
  Shield, 
  Settings, 
  User 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'scanner', label: 'Scanner', icon: Camera, href: '/scanner' },
  { id: 'analysis', label: 'Analysis', icon: Brain, href: '/analysis' },
  { id: 'safety', label: 'Safety', icon: Shield, href: '/safety' },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export function DashboardLayout({ children, currentPage = 'home' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(var(--surface-0))]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-30 h-full w-60 bg-[hsl(var(--sidebar-background))] transform transition-transform duration-300 ease-in-out md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-[hsl(var(--sidebar-border))]">
            <h1 className="text-xl font-bold text-[hsl(var(--sidebar-foreground))]">
              Label.ai
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;
                
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={cn(
                        "sidebar-nav-item",
                        isActive && "active"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Theme toggle in sidebar */}
          <div className="p-4 border-t border-[hsl(var(--sidebar-border))]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--sidebar-foreground))]">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-60">
        {/* Top bar */}
        <header className="h-16 bg-[hsl(var(--surface-1))] border-b border-border flex items-center justify-between px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:block" />
          
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
