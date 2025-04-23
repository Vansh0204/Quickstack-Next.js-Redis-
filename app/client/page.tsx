import { MainLayout } from "@/components/layouts/main-layout";
import { Suspense } from "react";
import { PostsList } from "@/components/client/posts-list";
import { PostsListSkeleton } from "@/components/client/posts-list-skeleton";
import { Clock } from "lucide-react";

export default function ClientPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="p-6 bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/50 dark:to-sky-900/50 rounded-lg border border-cyan-200/50 dark:border-cyan-800/50 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Client-Side Rendering with Redis Cache
            <span className="text-2xl ml-1">💻</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
          This page shows how data can be loaded on the client side with the help of Redis caching. It uses a tool called SWR, which works like useEffect in React but is better for handling data and caching. The backend work, including saving and checking data in Redis, is done using Next.js API routes. While the data is loading, React Suspense helps show a loading message or spinner. You can also see a live update below that tells you if the data came from the cache or was freshly loaded, along with the time it happened.
          </p>
          
        </div>
        
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList />
        </Suspense>
      </div>
    </MainLayout>
  );
}

