import { fetchUsers } from "@/lib/api";
import { UserCard } from "@/components/ui/user-card";
import { CacheIndicator } from "@/components/ui/cache-indicator";
import { SectionHeader } from "@/components/ui/section-header";

export async function UsersList() {
  const { data: users, cache } = await fetchUsers();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <SectionHeader
            title="Users Directory"
            description="Fetched server-side from JSONPlaceholder API, cached via Redis."
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}