import { User } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Briefcase, Globe, Mail, Phone, ArrowUpRight } from 'lucide-react';

interface UserCardProps {
  user: User;
  showDetails?: boolean;
}

export function UserCard({ user, showDetails = false }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className={`group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-teal-300 dark:hover:border-teal-600/50 shadow-sm hover:shadow-teal-500/10 transition-all duration-200 h-full flex flex-col ${showDetails ? 'hover:transform-none' : ''}`}>
      <CardHeader className="p-4 flex items-center gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0 border border-slate-200 dark:border-slate-700">
          <AvatarFallback className="bg-slate-100 dark:bg-slate-700 text-teal-600 dark:text-teal-400 font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <CardTitle className="text-sm font-semibold text-slate-900 dark:text-white truncate" title={user.name}>{user.name}</CardTitle>
          <p className={`text-xs text-slate-500 dark:text-slate-400 truncate ${!showDetails && 'group-hover:hidden'} transition-opacity duration-300`} title={user.company.name}>{user.company.name}</p>
        </div>
      </CardHeader>
      
      {/* Contact Info - Always visible if showDetails is true */}
      <div className={`${!showDetails ? 'absolute inset-0 bg-gradient-to-t from-teal-50/80 to-transparent dark:from-teal-900/80 dark:to-transparent opacity-0 group-hover:opacity-100' : ''} p-4 pt-16 group-focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-end`}>
        <div className="space-y-1.5 text-xs">
          <ContactItem icon={<Mail size={14} />} href={`mailto:${user.email}`} text={user.email} />
          <ContactItem icon={<Phone size={14} />} text={user.phone} />
          <ContactItem icon={<Globe size={14} />} href={`https://${user.website}`} text={user.website} isExternal />
        </div>
      </div>

      {/* Spacer to ensure content pushes footer down */}
      <div className="flex-grow"></div> 

      {/* Footer with View Profile Link - Hidden if showDetails is true */}
      {!showDetails && (
        <CardFooter className="p-3 border-t border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0 group-hover:hidden transition-opacity duration-300">
          <Link 
            href={`/users/${user.id}`} 
            className="flex items-center justify-between w-full text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline group/link"
          >
            View Full Profile
            <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 group-focus/link:opacity-100 transition-opacity" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}

// Helper for Contact Items
interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
  isExternal?: boolean;
}

function ContactItem({ icon, text, href, isExternal }: ContactItemProps) {
  const content = (
    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
      <span className="flex-shrink-0 text-slate-500 dark:text-slate-400">{icon}</span>
      <span className="truncate" title={text}>{text}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }
  return content;
}