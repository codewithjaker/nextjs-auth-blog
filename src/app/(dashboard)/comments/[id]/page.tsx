'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { CommentForm } from '@/components/forms/comment-form';

export default function EditCommentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getComment(id)
      .then(setComment)
      .catch((err) => toast.error(err.message || 'Failed to fetch comment'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateComment(id, data);
      toast.success('Comment updated successfully');
      router.push('/comments');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update comment');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!comment) return <div>Comment not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Comment</h1>
      <CommentForm initialData={comment} onSubmit={onSubmit} />
    </div>
  );
}