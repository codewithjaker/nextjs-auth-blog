'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { BookmarkForm } from '@/components/forms/bookmark-form';

export default function NewBookmarkPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createBookmark(data);
      toast.success('Bookmark created successfully');
      router.push('/bookmarks');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create bookmark');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Bookmark</h1>
      <BookmarkForm onSubmit={onSubmit} />
    </div>
  );
}