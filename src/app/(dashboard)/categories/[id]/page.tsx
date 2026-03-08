'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { CategoryForm } from '@/components/forms/category-form';

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategory(id)
      .then(setCategory)
      .catch((err) => toast.error(err.message || 'Failed to fetch category'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateCategory(id, data);
      toast.success('Category updated successfully');
      router.push('/categories');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update category');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Category</h1>
      <CategoryForm initialData={category} onSubmit={onSubmit} />
    </div>
  );
}