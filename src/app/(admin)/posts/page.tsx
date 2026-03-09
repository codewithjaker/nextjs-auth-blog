'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author: { _id: string; name: string };
  category?: { _id: string; name: string } | null;
  status: 'draft' | 'published' | 'deleted';
  publishedAt?: string;
  views: number;
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getPosts({ page, limit: 10 });
      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.deletePost(id);
      toast.success('Post deleted successfully');
      fetchPosts(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete post');
    }
  };

  const columns = [
    { key: 'title', header: 'Title' },
    {
      key: 'author',
      header: 'Author',
      cell: (post: Post) => post.author?.name || 'Unknown',
    },
    {
      key: 'category',
      header: 'Category',
      cell: (post: Post) => post.category?.name || '-',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (post: Post) => (
        <Badge
          variant={
            post.status === 'published' ? 'default' :
            post.status === 'draft' ? 'secondary' : 'destructive'
          }
        >
          {post.status}
        </Badge>
      ),
    },
    {
      key: 'publishedAt',
      header: 'Published',
      cell: (post: Post) => post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-',
    },
    { key: 'views', header: 'Views' },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (post: Post) => new Date(post.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (post: Post) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/posts/${post._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(post._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button onClick={() => router.push('/posts/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={posts}
        pagination={pagination}
        onPageChange={(page) => fetchPosts(page)}
      />
    </div>
  );
}