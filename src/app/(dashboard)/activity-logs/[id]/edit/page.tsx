'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { ActivityLogForm } from '@/components/forms/activity-log-form';

export default function EditActivityLogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getActivityLog(id)
      .then(setLog)
      .catch((err) => toast.error(err.message || 'Failed to fetch log'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateActivityLog(id, data);
      toast.success('Activity log updated');
      router.push(`/activity-logs/${id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update log');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!log) return <div>Log not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Activity Log</h1>
      <ActivityLogForm initialData={log} onSubmit={onSubmit} />
    </div>
  );
}