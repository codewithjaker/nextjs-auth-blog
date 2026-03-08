'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ChatRoom {
  _id: string;
  participants: Array<{ _id: string; name: string }>;
  isGroup: boolean;
  name?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  createdAt: string;
}

export default function ChatRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);

  const fetchRooms = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getChatRooms({ page, limit: 10 });
      setRooms(data.chatRooms);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch chat rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chat room? All messages will also be deleted.')) return;
    try {
      await api.deleteChatRoom(id);
      toast.success('Chat room deleted successfully');
      fetchRooms(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete chat room');
    }
  };

  const handleViewChat = (id: string) => {
    router.push(`/chat/${id}`); // This should be the chat detail page we built earlier
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      cell: (room: ChatRoom) => {
        if (room.isGroup) return room.name;
        // For one-to-one, show other participant's name (excluding current user? But we don't have current user context here)
        // We'll just show all participants' names joined
        return room.participants.map(p => p.name).join(', ');
      },
    },
    {
      key: 'isGroup',
      header: 'Type',
      cell: (room: ChatRoom) => (
        <Badge variant={room.isGroup ? 'default' : 'secondary'}>
          {room.isGroup ? 'Group' : 'Direct'}
        </Badge>
      ),
    },
    {
      key: 'participants',
      header: 'Participants',
      cell: (room: ChatRoom) => room.participants.length,
    },
    {
      key: 'lastMessage',
      header: 'Last Message',
      cell: (room: ChatRoom) => room.lastMessage || 'No messages yet',
    },
    {
      key: 'lastMessageAt',
      header: 'Last Active',
      cell: (room: ChatRoom) => room.lastMessageAt
        ? formatDistanceToNow(new Date(room.lastMessageAt), { addSuffix: true })
        : 'Never',
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (room: ChatRoom) => new Date(room.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (room: ChatRoom) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleViewChat(room._id)}>
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => router.push(`/chat-rooms/${room._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(room._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat Rooms</h1>
        <Button onClick={() => router.push('/chat-rooms/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Chat Room
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={rooms}
        pagination={pagination}
        onPageChange={(page) => fetchRooms(page)}
      />
    </div>
  );
}