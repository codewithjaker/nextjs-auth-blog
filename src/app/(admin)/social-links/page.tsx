'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface SocialLink {
  _id: string;
  platform: string;
  icon: string;
  url: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function SocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchLinks = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getSocialLinks({ page, limit: 10 });
      setLinks(data.socialLinks);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteSocialLink(id);
      toast.success('Social link deleted');
      fetchLinks(pagination.page);
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    }
  };

  const columns = [
    { key: 'platform', header: 'Platform' },
    { key: 'icon', header: 'Icon' },
    { key: 'url', header: 'URL' },
    { key: 'order', header: 'Order' },
    {
      key: 'status',
      header: 'Status',
      cell: (link: SocialLink) => (
        <Badge variant={link.status === 'active' ? 'default' : 'secondary'}>
          {link.status}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (link: SocialLink) => new Date(link.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (link: SocialLink) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/social-links/${link._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(link._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Social Links</h1>
        <Button onClick={() => router.push('/social-links/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Social Link
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={links}
        pagination={pagination}
        onPageChange={(page) => fetchLinks(page)}
      />
    </div>
  );
}