'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { ChatRoomForm } from '@/components/forms/chat-room-form';

export default function NewChatRoomPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createChatRoom(data);
      toast.success('Chat room created successfully');
      router.push('/chat-rooms');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create chat room');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Chat Room</h1>
      <ChatRoomForm onSubmit={onSubmit} />
    </div>
  );
}