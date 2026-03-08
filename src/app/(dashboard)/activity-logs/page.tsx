'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityLog {
  _id: string;
  user: { _id: string; name: string; email: string };
  action: string;
  module: string;
  targetId?: string;
  details?: any;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export default function ActivityLogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [userFilter, setUserFilter] = useState<string>(searchParams.get('user') || '');
  const [actionFilter, setActionFilter] = useState<string>(searchParams.get('action') || '');
  const [moduleFilter, setModuleFilter] = useState<string>(searchParams.get('module') || '');

  const fetchLogs = async (page = 1) => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10 };
      if (userFilter) params.user = userFilter;
      if (actionFilter) params.action = actionFilter;
      if (moduleFilter) params.module = moduleFilter;

      const data = await api.getActivityLogs(params);
      setLogs(data.logs);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [userFilter, actionFilter, moduleFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this log entry?')) return;
    try {
      await api.deleteActivityLog(id);
      toast.success('Log deleted successfully');
      fetchLogs(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete log');
    }
  };

  const columns = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      cell: (log: ActivityLog) => new Date(log.timestamp).toLocaleString(),
    },
    {
      key: 'user',
      header: 'User',
      cell: (log: ActivityLog) => log.user?.name || 'Unknown',
    },
    {
      key: 'action',
      header: 'Action',
      cell: (log: ActivityLog) => (
        <Badge variant="outline">{log.action}</Badge>
      ),
    },
    {
      key: 'module',
      header: 'Module',
      cell: (log: ActivityLog) => (
        <Badge variant="secondary">{log.module}</Badge>
      ),
    },
    {
      key: 'targetId',
      header: 'Target ID',
      cell: (log: ActivityLog) => log.targetId || '-',
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      cell: (log: ActivityLog) => log.ipAddress || '-',
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (log: ActivityLog) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/activity-logs/${log._id}`)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(log._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // For filter dropdowns, we can fetch distinct actions/modules or just free-text input.
  // We'll use selects with static options for common ones, but also allow custom input.
  const actionOptions = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'VIEW'];
  const moduleOptions = ['users', 'posts', 'categories', 'comments', 'settings', 'auth', 'other'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Activity Logs</h1>
        {/* Usually you wouldn't create logs manually, but we include for completeness */}
        <Button onClick={() => router.push('/activity-logs/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Log (Manual)
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="w-64">
              <Input
                placeholder="User ID"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              />
            </div>
            <div className="w-40">
              <Select value={actionFilter} onValueChange={(val) => setActionFilter(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {actionOptions.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <Select value={moduleFilter} onValueChange={(val) => setModuleFilter(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {moduleOptions.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={() => {
              setUserFilter('');
              setActionFilter('');
              setModuleFilter('');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        data={logs}
        pagination={pagination}
        onPageChange={(page) => fetchLogs(page)}
      />
    </div>
  );
}