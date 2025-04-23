import { Post, User } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface PostCardProps {
  post: Post;
  user?: User;
}

export function PostCard({ post, user }: PostCardProps) {
  const initials = user 
    ? user.name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
    : `U${post.userId}`;

  return (
    <Card className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 shadow-sm h-full flex flex-col transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800">
      <CardHeader className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarFallback className="text-xs bg-slate-100 dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-medium border border-slate-200 dark:border-slate-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-sm font-medium text-slate-900 dark:text-white leading-tight line-clamp-1" title={post.title}>
              {post.title}
            </CardTitle>
            {user && (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate" title={user.name}>
                by {user.name}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-sm text-slate-600 dark:text-slate-300 flex-1">
        <p className="line-clamp-4">
          {post.body}
        </p>
      </CardContent>
      <CardFooter className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
        <Badge variant="outline" className="text-xs font-normal border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400">
          ID: {post.id}
        </Badge>
      </CardFooter>
    </Card>
  );
}