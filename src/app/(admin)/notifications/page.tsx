'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface Notification {
  _id: string;
  recipient: { _id: string; name: string };
  sender?: { _id: string; name: string };
  type: 'follow' | 'like' | 'comment' | 'reply';
  targetType?: 'post' | 'comment' | 'user';
  targetId?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [recipientFilter, setRecipientFilter] = useState<string>(searchParams.get('recipient') || '');
  const [typeFilter, setTypeFilter] = useState<string>(searchParams.get('type') || '');
  const [isReadFilter, setIsReadFilter] = useState<string>(searchParams.get('isRead') || '');

  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (recipientFilter) params.recipient = recipientFilter;
      if (typeFilter) params.type = typeFilter;
      if (isReadFilter) params.isRead = isReadFilter === 'true';

      const data = await api.getNotifications(params);
      setNotifications(data.notifications);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [recipientFilter, typeFilter, isReadFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;
    try {
      await api.deleteNotification(id);
      toast.success('Notification deleted successfully');
      fetchNotifications(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete notification');
    }
  };

  const handleMarkAsRead = async (id: string, currentStatus: boolean) => {
    try {
      await api.updateNotification(id, { isRead: !currentStatus });
      toast.success(`Notification marked as ${!currentStatus ? 'read' : 'unread'}`);
      fetchNotifications(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update notification');
    }
  };

  const columns = [
    {
      key: 'recipient',
      header: 'Recipient',
      cell: (note: Notification) => note.recipient?.name || 'N/A',
    },
    {
      key: 'sender',
      header: 'Sender',
      cell: (note: Notification) => note.sender?.name || 'System',
    },
    {
      key: 'type',
      header: 'Type',
      cell: (note: Notification) => (
        <Badge variant="outline">{note.type}</Badge>
      ),
    },
    {
      key: 'message',
      header: 'Message',
      cell: (note: Notification) => (
        <div className="max-w-xs truncate">{note.message}</div>
      ),
    },
    {
      key: 'isRead',
      header: 'Status',
      cell: (note: Notification) => (
        <Badge variant={note.isRead ? 'secondary' : 'default'}>
          {note.isRead ? 'Read' : 'Unread'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (note: Notification) => new Date(note.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (note: Notification) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleMarkAsRead(note._id, note.isRead)}
          >
            {note.isRead ? 'Mark Unread' : 'Mark Read'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => router.push(`/notifications/${note._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(note._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button onClick={() => router.push('/notifications/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Notification
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-64">
          <Input
            placeholder="Filter by Recipient ID"
            value={recipientFilter}
            onChange={(e) => setRecipientFilter(e.target.value)}
          />
        </div>
        <div className="w-40">
          <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="follow">Follow</SelectItem>
              <SelectItem value="like">Like</SelectItem>
              <SelectItem value="comment">Comment</SelectItem>
              <SelectItem value="reply">Reply</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-40">
          <Select value={isReadFilter} onValueChange={(val) => setIsReadFilter(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Read status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Read</SelectItem>
              <SelectItem value="false">Unread</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={notifications}
        pagination={pagination}
        onPageChange={(page) => fetchNotifications(page)}
      />
    </div>
  );
}