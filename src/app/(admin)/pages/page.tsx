'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Page {
  _id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchPages = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getPages({ page, limit: 10 });
      setPages(data.pages);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deletePage(id);
      toast.success('Page deleted');
      fetchPages(pagination.page);
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    }
  };

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'slug', header: 'Slug' },
    {
      key: 'status',
      header: 'Status',
      cell: (page: Page) => (
        <span className={page.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>
          {page.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (page: Page) => new Date(page.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (page: Page) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/pages/${page._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(page._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pages</h1>
        <Button onClick={() => router.push('/pages/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Page
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={pages}
        pagination={pagination}
        onPageChange={(page) => fetchPages(page)}
      />
    </div>
  );
}