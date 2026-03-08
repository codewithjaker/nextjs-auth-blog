'use client';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { PageForm } from '@/components/forms/page-form';
import { toast } from 'sonner';

export default function NewPagePage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createPage(data);
      toast.success('Page created');
      router.push('/pages');
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Page</h1>
      <PageForm onSubmit={onSubmit} />
    </div>
  );
}