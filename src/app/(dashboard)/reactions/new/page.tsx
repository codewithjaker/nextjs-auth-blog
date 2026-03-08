'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { ReactionForm } from '@/components/forms/reaction-form';

export default function NewReactionPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createReaction(data);
      toast.success('Reaction created successfully');
      router.push('/reactions');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create reaction');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Reaction</h1>
      <ReactionForm onSubmit={onSubmit} />
    </div>
  );
}