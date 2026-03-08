'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Reaction {
  _id: string;
  user: { _id: string; name: string };
  targetType: 'post' | 'comment';
  targetId: any; // populated object or ID
  type: 'like' | 'dislike';
  createdAt: string;
}

export default function ReactionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [targetTypeFilter, setTargetTypeFilter] = useState<string>(searchParams.get('targetType') || '');
  const [userIdFilter, setUserIdFilter] = useState<string>(searchParams.get('user') || '');
  const [typeFilter, setTypeFilter] = useState<string>(searchParams.get('type') || '');

  const fetchReactions = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (targetTypeFilter) params.targetType = targetTypeFilter;
      if (userIdFilter) params.user = userIdFilter;
      if (typeFilter) params.type = typeFilter;

      const data = await api.getReactions(params);
      setReactions(data.reactions);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch reactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, [targetTypeFilter, userIdFilter, typeFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reaction?')) return;
    try {
      await api.deleteReaction(id);
      toast.success('Reaction deleted successfully');
      fetchReactions(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete reaction');
    }
  };

  const getTargetDisplay = (reaction: Reaction) => {
    if (reaction.targetType === 'post') {
      const post = reaction.targetId;
      return post?.title || 'Unknown post';
    } else {
      const comment = reaction.targetId;
      if (comment?.content) {
        return comment.content.substring(0, 50) + '...';
      }
      return 'Unknown comment';
    }
  };

  const columns = [
    {
      key: 'user',
      header: 'User',
      cell: (reaction: Reaction) => reaction.user?.name || 'N/A',
    },
    {
      key: 'targetType',
      header: 'Target Type',
      cell: (reaction: Reaction) => (
        <Badge variant="outline">{reaction.targetType}</Badge>
      ),
    },
    {
      key: 'target',
      header: 'Target',
      cell: (reaction: Reaction) => getTargetDisplay(reaction),
    },
    {
      key: 'type',
      header: 'Reaction',
      cell: (reaction: Reaction) => (
        <Badge variant={reaction.type === 'like' ? 'default' : 'destructive'}>
          {reaction.type}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (reaction: Reaction) => new Date(reaction.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (reaction: Reaction) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/reactions/${reaction._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(reaction._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reactions</h1>
        <Button onClick={() => router.push('/reactions/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Reaction
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-40">
          <Select value={targetTypeFilter} onValueChange={(val) => setTargetTypeFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Target Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="post">Post</SelectItem>
              <SelectItem value="comment">Comment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-40">
          <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Reaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="like">Like</SelectItem>
              <SelectItem value="dislike">Dislike</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-64">
          <Input
            placeholder="Filter by User ID"
            value={userIdFilter}
            onChange={(e) => setUserIdFilter(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={reactions}
        pagination={pagination}
        onPageChange={(page) => fetchReactions(page)}
      />
    </div>
  );
}