'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Server, Clock, BarChart3, Info } from "lucide-react";

/**
 * Benefits list extracted for cleaner JSX & maintainability
 */
const benefits = [
  "Faster load times",
  "Reduced API calls",
  "Better scalability",
  "A smoother user experience"
];

/**
 * HomePage Component
 * Client component containing the main content of the home page
 */
export function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-teal-400 dark:to-cyan-400">
            Welcome to QuickStack!{" "}
            <span className="inline-block animate-wave">👋</span>
          </h1>

          <p className="max-w-2xl text-slate-600 dark:text-slate-300 mx-auto text-lg">
            A practical demonstration of Redis caching with Next.js using both server-side and client-side rendering techniques.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <FeatureCard
            icon={<Server className="h-5 w-5" />}
            title="Server-Side Rendering"
            description="Uses server-rendered data fetching with Redis caching"
            link="/users"
            linkText="View Users"
          />

          <FeatureCard
            icon={<Clock className="h-5 w-5" />}
            title="Client-Side Rendering"
            description="Uses client-side data fetching with Redis caching"
            link="/client"
            linkText="View Posts"
          />

          <FeatureCard
            icon={<BarChart3 className="h-5 w-5" />}
            title="Performance Benchmarking"
            description="Compare response times between API calls and cache"
            link="/benchmark"
            linkText="Run Benchmark"
          />
        </div>

        {/* Demo Explanation Card */}
        <Card className="group transition-all duration-300 hover:scale-[1.01] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
          
          <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-slate-900 dark:text-white">
              <Info className="h-6 w-6 text-teal-500 dark:text-teal-400" />
              <span>Behind the Scenes of Fast Data</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">

            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                This project demonstrates how Redis caching significantly improves performance in modern web applications.
              </p>
              <p>
                Data is fetched from an external API and cached to reduce repeated network requests and latency.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
                Redis caching improves the app by delivering:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * FeatureCard Props
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

/**
 * FeatureCard Component
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
          <Button className="w-full gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white dark:text-slate-900">
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

    </Card>
  );
}
