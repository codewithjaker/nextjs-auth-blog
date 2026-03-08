'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { FollowForm } from '@/components/forms/follow-form';

export default function NewFollowPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createFollow(data);
      toast.success('Follow relationship created');
      router.push('/follows');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create follow');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Follow Relationship</h1>
      <FollowForm onSubmit={onSubmit} />
    </div>
  );
}