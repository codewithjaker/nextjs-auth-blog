'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface User {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getUsers({ page, limit: 10 });
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.deleteUser(id);
      toast.success('User deleted successfully');
      fetchUsers(pagination.page);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'isEmailVerified',
      header: 'Verified',
      cell: (user: User) => (
        <Badge variant={user.isEmailVerified ? 'default' : 'secondary'}>
          {user.isEmailVerified ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      cell: (user: User) => new Date(user.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (user: User) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => router.push(`/users/${user._id}`)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(user._id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={() => router.push('/users/new')}>
          <Plus className="mr-2 h-4 w-4" /> New User
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={users}
        pagination={pagination}
        onPageChange={(page) => fetchUsers(page)}
      />
    </div>
  );
}