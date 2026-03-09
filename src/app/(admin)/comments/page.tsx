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

interface Comment {
  _id: string;
  post: { _id: string; title: string };
  user: { _id: string; name: string };
  content: string;
  status: 'pending' | 'approved' | 'spam' | 'deleted';
  likesCount: number;
  dislikesCount: number;
  createdAt: string;
}

export default function CommentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || '');
  const [postFilter, setPostFilter] = useState<string>(searchParams.get('post') || '');

  const fetchComments = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      if (postFilter) params.post = postFilter;

      const data = await api.getComments(params);
      setComments(data.comments);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [statusFilter, postFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      await api.deleteComment(id);
      toast.success('Comment deleted successfully');
      fetchComments(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete comment');
    }
  };

  const columns = [
    {
      key: 'post',
      header: 'Post',
      cell: (comment: Comment) => comment.post?.title || 'N/A',
    },
    {
      key: 'user',
      header: 'User',
      cell: (comment: Comment) => comment.user?.name || 'N/A',
    },
    {
      key: 'content',
      header: 'Content',
      cell: (comment: Comment) => (
        <div className="max-w-xs truncate">{comment.content}</div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (comment: Comment) => (
        <Badge
          variant={
            comment.status === 'approved' ? 'default' :
            comment.status === 'pending' ? 'secondary' :
            comment.status === 'spam' ? 'destructive' : 'outline'
          }
        >
          {comment.status}
        </Badge>
      ),
    },
    {
      key: 'likesCount',
      header: 'Likes',
      cell: (comment: Comment) => comment.likesCount,
    },
    {
      key: 'dislikesCount',
      header: 'Dislikes',
      cell: (comment: Comment) => comment.dislikesCount,
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (comment: Comment) => new Date(comment.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (comment: Comment) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/comments/${comment._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(comment._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Comments</h1>
        <Button onClick={() => router.push('/comments/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Comment
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="w-48">
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Add post filter if needed, could be a search input */}
      </div>

      <DataTable
        columns={columns}
        data={comments}
        pagination={pagination}
        onPageChange={(page) => fetchComments(page)}
      />
    </div>
  );
}