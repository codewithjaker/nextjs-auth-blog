'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Bookmark {
  _id: string;
  user: { _id: string; name: string };
  post: { _id: string; title: string };
  createdAt: string;
}

export default function BookmarksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [userIdFilter, setUserIdFilter] = useState<string>(searchParams.get('user') || '');
  const [postIdFilter, setPostIdFilter] = useState<string>(searchParams.get('post') || '');

  const fetchBookmarks = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (userIdFilter) params.user = userIdFilter;
      if (postIdFilter) params.post = postIdFilter;

      const data = await api.getBookmarks(params);
      setBookmarks(data.bookmarks);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch bookmarks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [userIdFilter, postIdFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return;
    try {
      await api.deleteBookmark(id);
      toast.success('Bookmark deleted successfully');
      fetchBookmarks(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete bookmark');
    }
  };

  const columns = [
    {
      key: 'user',
      header: 'User',
      cell: (bookmark: Bookmark) => bookmark.user?.name || 'N/A',
    },
    {
      key: 'post',
      header: 'Post',
      cell: (bookmark: Bookmark) => bookmark.post?.title || 'N/A',
    },
    {
      key: 'createdAt',
      header: 'Bookmarked',
      cell: (bookmark: Bookmark) => new Date(bookmark.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (bookmark: Bookmark) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/bookmarks/${bookmark._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(bookmark._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bookmarks</h1>
        <Button onClick={() => router.push('/bookmarks/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Bookmark
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-64">
          <Input
            placeholder="Filter by User ID"
            value={userIdFilter}
            onChange={(e) => setUserIdFilter(e.target.value)}
          />
        </div>
        <div className="w-64">
          <Input
            placeholder="Filter by Post ID"
            value={postIdFilter}
            onChange={(e) => setPostIdFilter(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={bookmarks}
        pagination={pagination}
        onPageChange={(page) => fetchBookmarks(page)}
      />
    </div>
  );
}