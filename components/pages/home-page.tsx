'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Database, Server, Clock, BarChart3, Info } from "lucide-react";

/**
 * HomePage Component
 * Client component containing the main content of the home page
 */
export function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Hero Section - Main welcome message and description */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400">
            Welcome to QuickStack!{' '}
            <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300 mx-auto text-lg">
            A demonstration of Redis caching with Next.js using server-side and client-side rendering techniques.
          </p>
        </div>
        
        {/* Feature Cards Section - Showcase main application features */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Server-Side Rendering Demo Card */}
          <FeatureCard
            icon={<Server className="h-5 w-5" />}
            title="Server-Side Rendering"
            description="Uses getServerSideProps to fetch data from the API with Redis caching"
            link="/users"
            linkText="View Users"
          />
          
          {/* Client-Side Rendering Demo Card */}
          <FeatureCard
            icon={<Clock className="h-5 w-5" />}
            title="Client-Side Rendering"
            description="Uses useEffect to fetch data from the API route with Redis caching"
            link="/client"
            linkText="View Posts"
          />
          
          {/* Performance Benchmark Demo Card */}
          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="Performance Benchmarking"
            description="Compare response times between direct API calls and Redis cache"
            link="/benchmark"
            linkText="Run Benchmark"
          />
        </div>
        
        {/* What This Demo Shows Card */}
        <Card className="group transition-all duration-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-white">
              <Info className="h-6 w-6 text-teal-500 dark:text-teal-400" />
              <span>Behind the Scenes of Fast Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                This project is a performance-focused prototype built with Next.js, React, and Redis to demonstrate real-world caching strategies in a full-stack web app.
              </p>
              <p>
                It fetches user and post data from a public API (JSONPlaceholder) and intelligently caches repeated requests using Redis to reduce latency and server load.
              </p>
              <p>
                You'll see two versions of each request: one without caching (slower, fresh from the API), and one with caching enabled (much faster, returned from Redis memory).
              </p>
              <p>
                The demo is interactive — you can explore both client-side and server-side rendered pages, monitor cache hits/misses in real time, and benchmark the speed difference between cached and uncached responses.
              </p>
            </div>
            
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                Redis caching improves the app by delivering:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Faster load times",
                  "Reduced API calls",
                  "Better scalability",
                  "A smoother user experience"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-3 pt-4 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
              <p>
                This simulation is a scaled-down version of how large-scale applications reduce costs and boost performance using caching.
              </p>
              <p>
                Take a look around and see how modern performance techniques work behind the scenes!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * FeatureCard Component Props Interface
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
 */
function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="group flex flex-col h-full hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
          <span className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
            {icon}
          </span>
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-400 pt-1">
          {description}
        </p>
      </CardHeader>
      <CardContent className="flex-1" />
      <div className="p-6 pt-0 mt-auto">
        <Link href={link} className="w-full">
          <Button 
            variant="default" 
            className="w-full gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white dark:text-slate-900"
          >
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
} 