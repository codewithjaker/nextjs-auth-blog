'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { MessageForm } from '@/components/forms/message-form';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function EditMessagePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMessage(id)
      .then(setMessage)
      .catch((err) => toast.error(err.message || 'Failed to fetch message'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateMessage(id, data);
      toast.success('Message updated successfully');
      router.push('/messages');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update message');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!message) return <div>Message not found</div>;

  return (
    <div>
        <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      <h1 className="text-3xl font-bold">Edit Message</h1>
      </div>

      <MessageForm initialData={message} onSubmit={onSubmit} />
    </div>
  );
}