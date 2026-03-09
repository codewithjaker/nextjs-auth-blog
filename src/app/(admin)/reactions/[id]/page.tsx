'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { ReactionForm } from '@/components/forms/reaction-form';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function EditReactionPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [reaction, setReaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getReaction(id)
      .then(setReaction)
      .catch((err) => toast.error(err.message || 'Failed to fetch reaction'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateReaction(id, data);
      toast.success('Reaction updated successfully');
      router.push('/reactions');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update reaction');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!reaction) return <div>Reaction not found</div>;

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      <h1 className="text-3xl font-bold">Edit Reaction</h1>
      </div>

      <ReactionForm initialData={reaction} onSubmit={onSubmit} />
    </div>
  );
}