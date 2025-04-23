"use client";

import { useState } from "react";
import { PerformanceMetrics } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, BarChart3, Zap, Server, Timer, Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export function PerformanceChart() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [runCount, setRunCount] = useState(0);

  const runBenchmark = async () => {
    setIsBenchmarking(true);
    setMetrics(null);
    setRunCount(prev => prev + 1);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await fetch('/api/benchmark');
      if (!response.ok) {
        throw new Error(`Benchmark API failed with status: ${response.status}`);
      }
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to run benchmark:', error);
      setMetrics(null);
    } finally {
      setIsBenchmarking(false);
    }
  };

  const chartData = metrics ? [
    { name: 'Direct API', time: metrics.apiTime, fill: 'hsl(var(--chart-2))' },
    { name: 'Redis Cache', time: metrics.cacheTime, fill: 'hsl(var(--chart-1))' }
  ] : [];

  return (
    <Card className="overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2 group">
              <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-110" />
              Benchmark Results
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
              Compare response times: Direct API vs. Redis Cache. Lower is better.
            </CardDescription>
          </div>
          <Button
            onClick={runBenchmark}
            disabled={isBenchmarking}
            size="sm"
            className="gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white dark:text-slate-900 w-full sm:w-auto transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
          >
            {isBenchmarking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
            <Play className="h-4 w-4" />
            )}
            {isBenchmarking ? "Running..." : "Run Benchmark"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 min-h-[350px] flex flex-col">
        {isBenchmarking && !metrics && (
           <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
              <div className="relative">
                <Loader2 className="h-8 w-8 animate-spin mb-3 text-teal-500" />
                <div className="absolute inset-0 h-8 w-8 animate-ping opacity-30 bg-teal-500 rounded-full"></div>
              </div>
              <p className="font-medium animate-pulse">Running Benchmark...</p>
              <p className="text-sm mt-2 opacity-75">Fetching data and measuring response times.</p>
           </div>
        )}

        {!isBenchmarking && !metrics && runCount === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
            <div className="transform transition-transform duration-300 hover:scale-110 cursor-pointer">
              <Play className="h-8 w-8 mb-3 text-teal-500" />
                  </div>
            <p className="font-medium">Ready to Start</p>
            <p className="text-sm mt-2 opacity-75 hover:opacity-100 transition-opacity duration-300">Click "Run Benchmark" to compare performance.</p>
                  </div>
        )}

        {metrics && (
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard 
                icon={<Server className="h-5 w-5 text-indigo-500" />}
                title="Direct API Call"
                time={metrics.apiTime}
                isBaseline={true}
              />
              <ResultCard 
                icon={<Zap className="h-5 w-5 text-teal-500" />}
                title="Redis Cache"
                time={metrics.cacheTime}
                baselineTime={metrics.apiTime}
              />
                </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-2">
               <SummaryStat 
                  label="Time Saved" 
                  value={`${metrics.difference}ms`} 
                  icon={<Timer size={14} className="text-slate-500 dark:text-slate-400" />} 
                />
                <SummaryStat 
                  label="Cache Performance Boost" 
                  value={`${metrics.percentFaster}% Faster`} 
                  icon={<TrendingUp size={14} className="text-green-600 dark:text-green-400" />} 
                  valueClassName="text-green-600 dark:text-green-400"
                />
            </div>
            
            <div className="h-60 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart 
                  data={chartData} 
                  margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border) / 0.5)" />
                  <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} unit="ms" />
                  <YAxis type="category" dataKey="name" fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <RechartsTooltip 
                    cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
                    contentStyle={{
                      background: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                      fontSize: '12px',
                      padding: '6px 10px',
                    }}
                    labelStyle={{ fontWeight: 500 }}
                    formatter={(value) => [`${value}ms`, 'Response Time']} 
                  />
                  <Bar dataKey="time" radius={[0, 4, 4, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
      
      {metrics && (
        <CardFooter className="px-6 py-3 border-t border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Run #{runCount} completed. Demonstrating Redis cache ({metrics.cacheTime}ms) vs direct API ({metrics.apiTime}ms).
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

interface ResultCardProps {
  icon: React.ReactNode;
  title: string;
  time: number;
  isBaseline?: boolean;
  baselineTime?: number;
}

function ResultCard({ icon, title, time, isBaseline = false, baselineTime }: ResultCardProps) {
  const isFaster = !isBaseline && baselineTime && time < baselineTime;
  const isSlower = !isBaseline && baselineTime && time > baselineTime;
  const difference = baselineTime ? Math.abs(baselineTime - time) : 0;
  const percentageDiff = baselineTime ? Math.abs(((time - baselineTime) / baselineTime) * 100) : 0;

  return (
    <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-2">
        <span className="flex-shrink-0 transition-transform duration-300 hover:scale-110">{icon}</span>
        <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors duration-300 hover:text-teal-600 dark:hover:text-teal-400">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white transition-all duration-300 hover:scale-105">
        {time}<span className="text-base font-normal text-slate-500 dark:text-slate-400">ms</span>
      </p>
      
      {!isBaseline && baselineTime && (
        <div className="mt-2 flex items-center text-xs gap-1 transition-all duration-300">
          {isFaster ? (
            <>
              <TrendingDown size={14} className="text-green-500 animate-bounce" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                {difference.toFixed(0)}ms ({percentageDiff.toFixed(0)}%) faster
              </span>
            </>
          ) : isSlower ? (
             <>
              <TrendingUp size={14} className="text-red-500 animate-pulse" />
              <span className="text-red-600 dark:text-red-400 font-medium">
                {difference.toFixed(0)}ms ({percentageDiff.toFixed(0)}%) slower
              </span>
             </>
          ) : (
             <span className="text-slate-500 dark:text-slate-400">Same speed as baseline</span>
          )}
        </div>
      )}
       {isBaseline && (
         <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 transition-opacity duration-300 hover:opacity-75">Baseline performance</p>
       )}
    </div>
  );
}

interface SummaryStatProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  valueClassName?: string;
}

function SummaryStat({ label, value, icon, valueClassName = "" }: SummaryStatProps) {
  return (
    <div className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-300">
      <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
        <span className="transition-transform duration-300 hover:scale-110">{icon}</span>
        {label}:
      </span>
      <span className={`font-medium text-slate-800 dark:text-slate-200 ${valueClassName} transition-all duration-300 hover:scale-105`}>
        {value}
      </span>
    </div>
  );
}