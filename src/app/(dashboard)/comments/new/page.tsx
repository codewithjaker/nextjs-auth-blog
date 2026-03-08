'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { CommentForm } from '@/components/forms/comment-form';

export default function NewCommentPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createComment(data);
      toast.success('Comment created successfully');
      router.push('/comments');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create comment');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Comment</h1>
      <CommentForm onSubmit={onSubmit} />
    </div>
  );
}