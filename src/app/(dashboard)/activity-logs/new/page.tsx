'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { ActivityLogForm } from '@/components/forms/activity-log-form';

export default function NewActivityLogPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createActivityLog(data);
      toast.success('Activity log created');
      router.push('/activity-logs');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create log');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Activity Log (Manual)</h1>
      <ActivityLogForm onSubmit={onSubmit} />
    </div>
  );
}