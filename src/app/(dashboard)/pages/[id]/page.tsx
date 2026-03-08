'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { PageForm } from '@/components/forms/page-form';
import { toast } from 'sonner';

export default function EditPagePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPage(id)
      .then(setPage)
      .catch((err) => toast.error('Error', { description: err.message }))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updatePage(id, data);
      toast.success('Page updated');
      router.push('/pages');
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!page) return <div>Page not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Page</h1>
      <PageForm initialData={page} onSubmit={onSubmit} />
    </div>
  );
}