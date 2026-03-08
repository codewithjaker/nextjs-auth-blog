'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { NotificationForm } from '@/components/forms/notification-form';

export default function EditNotificationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNotification(id)
      .then(setNotification)
      .catch((err) => toast.error(err.message || 'Failed to fetch notification'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateNotification(id, data);
      toast.success('Notification updated successfully');
      router.push('/notifications');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update notification');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!notification) return <div>Notification not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Notification</h1>
      <NotificationForm initialData={notification} onSubmit={onSubmit} />
    </div>
  );
}