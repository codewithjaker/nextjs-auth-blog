'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import { UserForm } from '@/components/forms/user-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUser(id)
      .then(setUser)
      .catch((err) => toast.error(err.message || 'Failed to fetch user'))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateUser(id, data);
      toast.success('User updated successfully');
      router.push('/users');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit User</h1>
      </div>

      <UserForm initialData={user} onSubmit={onSubmit} isEdit />
    </div>
  );
}