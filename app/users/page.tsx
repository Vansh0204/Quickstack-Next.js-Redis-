import { MainLayout } from "@/components/layouts/main-layout";
import { UsersList } from "@/components/server/users-list";
import { Server } from "lucide-react";

export default function UsersPage() {
  return (
    <MainLayout>
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Intro Section */}
        <div className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/50 dark:to-cyan-900/50 rounded-lg border border-teal-200/50 dark:border-teal-800/50 shadow-sm space-y-2">
          <h2 className="text-xl font-semibold text-teal-800 dark:text-teal-200 flex items-center gap-2">
            <Server className="h-5 w-5" />
            Server-Side Rendering with Redis Cache
            <span className="text-2xl ml-1">🚀</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
           This page showcases server-side rendering (SSR) enhanced with Redis caching. Data retrieval occurs on the server through getServerSideProps, ensuring fresh content on each request. On the initial load, the server fetches data from the external API and stores the result in Redis. For any following requests made within 60 seconds, the server bypasses the API and delivers the data directly from the Redis cache, improving speed and efficiency. You can monitor the cache behavior in real-time by observing the cache status indicator below.
          </p>
        </div>
        
        {/* User List Component */}
        <UsersList />
      </div>
    </MainLayout>
  );
}