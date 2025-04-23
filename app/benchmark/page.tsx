import { MainLayout } from "@/components/layouts/main-layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Suspense } from "react";
import {PerformanceChart} from "@/components/benchmark/performance-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";

export default function BenchmarkPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Intro Section - Enhanced Visibility */}
        <div className="p-6 bg-gradient-to-r from-teal-100 via-teal-50 to-slate-100 dark:from-teal-900/40 dark:via-teal-800/30 dark:to-slate-800/40 rounded-lg border border-teal-300 dark:border-teal-700 shadow-md space-y-2 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-teal-800 dark:text-teal-200 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Performance Benchmarking
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            Clicking the "Run Benchmark" button initiates a series of data fetch operations, allowing for a direct comparison between uncached API calls and responses served from a Redis cache. This process helps highlight the efficiency gains achieved through caching by measuring the time it takes to complete each request type. The results include average, minimum, and maximum response durations, all recorded in milliseconds. These performance metrics are then visualized below, making it easy to see the stark difference between slower, direct API calls and the significantly faster responses from Redis caching.
          </p>
          
        </div>

        {/* Performance Chart Section */}
        <div className="space-y-4">
          {/* Wrap SectionHeader to apply text colors if needed */}
          <div className="text-slate-900 dark:text-white">
             <SectionHeader
                title="Benchmark Results"
                description="Visual comparison of response times (lower is better)."
                // Apply specific classes here or modify SectionHeader if needed
             />
          </div>
          
          <Suspense fallback={<BenchmarkSkeleton />}>
            <PerformanceChart />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
}

// Skeleton specifically for the benchmark area
function BenchmarkSkeleton() {
  return (
    <div className="space-y-6 p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
      <div className="flex justify-center mb-4">
        <Skeleton className="h-10 w-40 rounded-md bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-20 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-20 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-4 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}