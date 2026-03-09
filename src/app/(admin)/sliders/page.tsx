'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface Slider {
  _id: string;
  title?: string;
  subtitle?: string;
  image: string;
  buttonText?: string;
  buttonUrl?: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchSliders = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getSliders({ page, limit: 10 });
      setSliders(data.sliders);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error('Error fetching sliders', { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.deleteSlider(id);
      toast.success('Slider deleted');
      fetchSliders(pagination.page);
    } catch (error: any) {
      toast.error('Error deleting slider', { description: error.message });
    }
  };

  const columns = [
    { key: 'image', header: 'Image', cell: (slider: Slider) => (
      <img src={slider.image} alt={slider.title} className="h-10 w-10 object-cover rounded" />
    )},
    { key: 'title', header: 'Title' },
    { key: 'subtitle', header: 'Subtitle' },
    { key: 'order', header: 'Order' },
    {
      key: 'status',
      header: 'Status',
      cell: (slider: Slider) => (
        <span className={`px-2 py-1 rounded-full text-xs ${slider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {slider.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (slider: Slider) => new Date(slider.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (slider: Slider) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/sliders/${slider._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(slider._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sliders</h1>
        <Button onClick={() => router.push('/sliders/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Slider
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={sliders}
        pagination={pagination}
        onPageChange={(page) => fetchSliders(page)}
      />
    </div>
  );
}