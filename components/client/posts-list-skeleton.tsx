"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export function PostsListSkeleton() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Recent Posts"
        description="Client-side rendered posts from JSONPlaceholder API with Redis caching"
        action={
          <Button 
            variant="outline" 
            size="sm" 
            disabled={true}
            className="gap-2"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}