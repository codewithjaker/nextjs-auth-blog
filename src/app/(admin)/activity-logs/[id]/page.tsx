'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function ActivityLogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [log, setLog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getActivityLog(id)
      .then(setLog)
      .catch((err) => toast.error(err.message || 'Failed to fetch log'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this log entry?')) return;
    try {
      await api.deleteActivityLog(id);
      toast.success('Log deleted');
      router.push('/activity-logs');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete log');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!log) return <div>Log not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Activity Log Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">ID</p>
              <p className="font-mono text-sm">{log._id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
              <p>{format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">User</p>
              <p>{log.user?.name} ({log.user?.email})</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Action / Module</p>
              <p><Badge variant="outline">{log.action}</Badge> on <Badge variant="secondary">{log.module}</Badge></p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Target ID</p>
              <p className="font-mono text-sm">{log.targetId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">IP Address</p>
              <p>{log.ipAddress || 'N/A'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">User Agent</p>
              <p className="text-sm break-words">{log.userAgent || 'N/A'}</p>
            </div>
            {log.details && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Details</p>
                <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => router.push(`/activity-logs/${id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}