'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { ChatRoomForm } from '@/components/forms/chat-room-form';

export default function EditChatRoomPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getChatRoom(id)
      .then(setRoom)
      .catch((err) => toast.error(err.message || 'Failed to fetch chat room'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateChatRoom(id, data);
      toast.success('Chat room updated successfully');
      router.push('/chat-rooms');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update chat room');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!room) return <div>Chat room not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Chat Room</h1>
      <ChatRoomForm initialData={room} onSubmit={onSubmit} />
    </div>
  );
}