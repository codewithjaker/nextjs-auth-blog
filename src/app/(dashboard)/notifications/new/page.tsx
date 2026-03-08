'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { NotificationForm } from '@/components/forms/notification-form';

export default function NewNotificationPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createNotification(data);
      toast.success('Notification created successfully');
      router.push('/notifications');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create notification');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Notification</h1>
      <NotificationForm onSubmit={onSubmit} />
    </div>
  );
}