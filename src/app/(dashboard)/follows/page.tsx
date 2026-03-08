'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Follow {
  _id: string;
  follower: { _id: string; name: string; email: string };
  following: { _id: string; name: string; email: string };
  createdAt: string;
}

export default function FollowsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [follows, setFollows] = useState<Follow[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [followerFilter, setFollowerFilter] = useState<string>(searchParams.get('follower') || '');
  const [followingFilter, setFollowingFilter] = useState<string>(searchParams.get('following') || '');
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);

  useEffect(() => {
    // Fetch users for filter dropdowns
    api.getUsers({ limit: 100 }).then(data => {
      setUsers(data.users);
    }).catch(console.error);
  }, []);

  const fetchFollows = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (followerFilter) params.follower = followerFilter;
      if (followingFilter) params.following = followingFilter;

      const data = await api.getFollows(params);
      setFollows(data.follows);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch follows');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollows();
  }, [followerFilter, followingFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to unfollow?')) return;
    try {
      await api.deleteFollow(id);
      toast.success('Unfollowed successfully');
      fetchFollows(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete follow');
    }
  };

  const columns = [
    {
      key: 'follower',
      header: 'Follower',
      cell: (follow: Follow) => follow.follower?.name || 'N/A',
    },
    {
      key: 'following',
      header: 'Following',
      cell: (follow: Follow) => follow.following?.name || 'N/A',
    },
    {
      key: 'createdAt',
      header: 'Followed Since',
      cell: (follow: Follow) => new Date(follow.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (follow: Follow) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/follows/${follow._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(follow._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Follows</h1>
        <Button onClick={() => router.push('/follows/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Follow
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="w-64">
          <Select value={followerFilter} onValueChange={(val) => setFollowerFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by follower" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-64">
          <Select value={followingFilter} onValueChange={(val) => setFollowingFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by following" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={follows}
        pagination={pagination}
        onPageChange={(page) => fetchFollows(page)}
      />
    </div>
  );
}