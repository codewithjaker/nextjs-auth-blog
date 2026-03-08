'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { PostForm } from '@/components/forms/post-form';

export default function NewPostPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createPost(data);
      toast.success('Post created successfully');
      router.push('/posts');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create post');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Post</h1>
      <PostForm onSubmit={onSubmit} />
    </div>
  );
}