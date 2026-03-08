'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { CategoryForm } from '@/components/forms/category-form';

export default function NewCategoryPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createCategory(data);
      toast.success('Category created successfully');
      router.push('/categories');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create category');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Category</h1>
      <CategoryForm onSubmit={onSubmit} />
    </div>
  );
}