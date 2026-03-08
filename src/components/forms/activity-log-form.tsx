'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api-client';

const activityLogSchema = z.object({
  user: z.string().min(1, 'User is required'),
  action: z.string().min(1, 'Action is required'),
  module: z.string().min(1, 'Module is required'),
  targetId: z.string().optional(),
  details: z.any().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  timestamp: z.string().optional(),
});

type ActivityLogFormValues = z.infer<typeof activityLogSchema>;

interface ActivityLogFormProps {
  initialData?: ActivityLogFormValues & { _id?: string };
  onSubmit: (data: ActivityLogFormValues) => Promise<void>;
}

export function ActivityLogForm({ initialData, onSubmit }: ActivityLogFormProps) {
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<ActivityLogFormValues>({
    resolver: zodResolver(activityLogSchema),
    defaultValues: initialData || {
      user: '',
      action: '',
      module: '',
      targetId: '',
      details: null,
      ipAddress: '',
      userAgent: '',
      timestamp: new Date().toISOString().slice(0, 16),
    },
  });

  useEffect(() => {
    setLoading(true);
    api.getUsers({ limit: 100 })
      .then(data => setUsers(data.users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Common actions and modules (could be fetched from API)
  const actionOptions = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'VIEW'];
  const moduleOptions = ['users', 'posts', 'categories', 'comments', 'settings', 'auth', 'chat', 'other'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {actionOptions.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="module"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select module" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {moduleOptions.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target ID (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ipAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Address (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userAgent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Agent (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timestamp (optional)</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details (JSON, optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ? JSON.stringify(field.value, null, 2) : ''}
                  onChange={(e) => {
                    try {
                      const parsed = e.target.value ? JSON.parse(e.target.value) : null;
                      field.onChange(parsed);
                    } catch {
                      // if invalid JSON, store as string? But schema expects any, so we can keep string.
                      field.onChange(e.target.value);
                    }
                  }}
                  rows={6}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>Save Activity Log</Button>
      </form>
    </Form>
  );
}