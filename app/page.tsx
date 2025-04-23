/**
 * Main page component for the Redis Demo application
 * This file demonstrates the integration of Redis caching with Next.js
 * featuring both server-side and client-side rendering approaches
 */

// Import UI components and utilities
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layouts/main-layout";
import Link from "next/link";

// Import icons from Lucide
import { ArrowRight, Database, Server, Clock, BarChart3 } from "lucide-react";

import { HomePage } from "@/components/pages/home-page";

/**
 * Home Page
 * Server component that wraps the client-side HomePage component in MainLayout
 */
export default function Home() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}

/**
 * FeatureCard Component Props Interface
 * Defines the structure of props for the FeatureCard component
 */
interface FeatureCardProps {
  icon: React.ReactNode;     // Icon component to display
  title: string;            // Card title
  description: string;      // Feature description
  link: string;            // Navigation link
  linkText: string;        // Button text
}

/**
 * FeatureCard Component
 * Reusable card component for displaying feature information
 * Includes hover effects, animations, and responsive design
 */
function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="group flex flex-col h-full hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/70 hover:scale-[1.03]">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          <span className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 group-hover:bg-teal-200/70 dark:group-hover:bg-teal-800/40 transition-colors">
            {icon}
          </span>
          <span>{title}</span>
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-sm group-hover:text-teal-600/80 dark:group-hover:text-teal-400/80 transition-colors pt-1">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {/* Additional content can be added here if needed */}
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Link href={link} className="w-full">
          <Button 
            variant="default" 
            className="w-full gap-2 group-hover:gap-3 transition-all duration-200 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {linkText}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-200" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}