'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  _id: string;
  chatRoom: { _id: string; name?: string; isGroup: boolean; participants: any[] };
  sender: { _id: string; name: string };
  content: string;
  type: 'text' | 'image' | 'file';
  createdAt: string;
}

export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [chatRoomFilter, setChatRoomFilter] = useState<string>(searchParams.get('chatRoom') || '');
  const [senderFilter, setSenderFilter] = useState<string>(searchParams.get('sender') || '');

  const fetchMessages = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (chatRoomFilter) params.chatRoom = chatRoomFilter;
      if (senderFilter) params.sender = senderFilter;

      const data = await api.getMessages(params);
      setMessages(data.messages);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chatRoomFilter, senderFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.deleteMessage(id);
      toast.success('Message deleted successfully');
      fetchMessages(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete message');
    }
  };

  const getChatRoomName = (room: Message['chatRoom']) => {
    if (!room) return 'Deleted';
    if (room.isGroup && room.name) return room.name;
    return room.participants?.map((p: any) => p.name).join(', ') || 'Unnamed';
  };

  const columns = [
    {
      key: 'chatRoom',
      header: 'Chat Room',
      cell: (msg: Message) => getChatRoomName(msg.chatRoom),
    },
    {
      key: 'sender',
      header: 'Sender',
      cell: (msg: Message) => msg.sender?.name || 'N/A',
    },
    {
      key: 'content',
      header: 'Content',
      cell: (msg: Message) => (
        <div className="max-w-xs truncate">{msg.content}</div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      cell: (msg: Message) => (
        <Badge variant="outline">{msg.type}</Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Sent',
      cell: (msg: Message) => new Date(msg.createdAt).toLocaleString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (msg: Message) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/messages/${msg._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(msg._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button onClick={() => router.push('/messages/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Message
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-64">
          <Input
            placeholder="Filter by Chat Room ID"
            value={chatRoomFilter}
            onChange={(e) => setChatRoomFilter(e.target.value)}
          />
        </div>
        <div className="w-64">
          <Input
            placeholder="Filter by Sender ID"
            value={senderFilter}
            onChange={(e) => setSenderFilter(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        pagination={pagination}
        onPageChange={(page) => fetchMessages(page)}
      />
    </div>
  );
}