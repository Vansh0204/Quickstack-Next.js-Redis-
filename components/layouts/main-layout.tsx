'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Database, Home, BarChart3, Users, FileText, Github, Instagram, Linkedin, Moon, Sun, Briefcase, GitBranch } from 'lucide-react';
import { useTheme } from 'next-themes';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col w-full bg-gradient-to-b from-slate-50 via-slate-100/50 to-white dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-950 transition-colors duration-500">
      <header className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl mx-auto transition-all duration-300",
        scrolled && "top-2 scale-95"
      )}>
        <div className={cn(
          "flex h-12 items-center justify-between rounded-full border px-4 backdrop-blur-md transition-all duration-300",
          "border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-800/70",
          "supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-800/60",
          "shadow-sm hover:shadow-md",
          scrolled && "h-10"
        )}>
          <Link 
            href="/" 
            className="flex items-center gap-2 font-semibold text-teal-600 dark:text-teal-400 transition-transform duration-300 hover:scale-105"
          >
            <Database className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            <span className="hidden sm:inline bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-400 bg-clip-text text-transparent">QuickStack</span>
          </Link>
          <nav className="flex items-center justify-end space-x-1 sm:space-x-2">
            <NavItem href="/" icon={<Home className="h-4 w-4" />}>Home</NavItem>
            <NavItem href="/client" icon={<FileText className="h-4 w-4" />}>Posts</NavItem>
            <NavItem href="/users" icon={<Users className="h-4 w-4" />}>Users</NavItem>
            <NavItem href="/benchmark" icon={<BarChart3 className="h-4 w-4" />}>Benchmark</NavItem>
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-4 w-4 absolute text-slate-600 dark:text-slate-400 transition-all scale-100 rotate-0 dark:scale-0" />
                <Moon className="h-4 w-4 absolute text-slate-600 dark:text-slate-400 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
              </Button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 pt-20 transition-all duration-300">
        {children}
      </main>
      
      {/* Social Icons Column */}
      <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
        <a
          href="https://portfolio-2-0-murex-three.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          title="View Portfolio"
        >
          <Briefcase className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
        </a>
        <a
          href="https://github.com/Vansh0204/NextJs-and-Radis-Project"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          title="View Source Code"
        >
          <GitBranch className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
        </a>
        <a
          href="https://github.com/Vansh0204"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          title="View Source Code"
        >
          <Github className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/vansh-agarwal-0413j"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          title="Connect on LinkedIn"
        >
          <Linkedin className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
        </a>
        <a
          href="https://www.instagram.com/all.about.vansh/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          title="Follow on Instagram"
        >
          <Instagram className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" />
        </a>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

function NavItem({ href, children, icon }: NavItemProps) {
  return (
    <Link href={href}>
      <Button 
        variant="ghost" 
        size="sm" 
        className={cn(
          "gap-1.5 rounded-full px-3 transition-all duration-300",
          "text-slate-700 dark:text-slate-300",
          "hover:bg-teal-100/50 dark:hover:bg-teal-900/20",
          "hover:text-teal-600 dark:hover:text-teal-400",
          "hover:scale-105 active:scale-95"
        )}
      >
        <span className="transition-transform duration-300 group-hover:rotate-12">
          {icon}
        </span>
        <span className="hidden sm:inline text-sm">{children}</span>
      </Button>
    </Link>
  );
}

// Social Link Component
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  title: string;
}

function SocialLink({ href, icon, title }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      title={title}
    >
      <div className="text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
        {icon}
      </div>
    </a>
  );
}