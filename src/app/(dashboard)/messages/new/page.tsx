'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { MessageForm } from '@/components/forms/message-form';

export default function NewMessagePage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createMessage(data);
      toast.success('Message created successfully');
      router.push('/messages');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create message');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Message</h1>
      <MessageForm onSubmit={onSubmit} />
    </div>
  );
}