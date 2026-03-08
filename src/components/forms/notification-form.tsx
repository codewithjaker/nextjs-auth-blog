'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api-client';

const notificationSchema = z.object({
  recipient: z.string().min(1, 'Recipient is required'),
  sender: z.string().optional(),
  type: z.enum(['follow', 'like', 'comment', 'reply']),
  targetType: z.enum(['post', 'comment', 'user']).optional(),
  targetId: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  isRead: z.boolean().default(false),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

interface NotificationFormProps {
  initialData?: NotificationFormValues & { _id?: string };
  onSubmit: (data: NotificationFormValues) => Promise<void>;
}

export function NotificationForm({ initialData, onSubmit }: NotificationFormProps) {
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: initialData || {
      recipient: '',
      sender: '',
      type: 'follow',
      targetType: undefined,
      targetId: '',
      message: '',
      isRead: false,
    },
  });

  // Fetch users for dropdowns
  useEffect(() => {
    setLoading(true);
    api.getUsers({ limit: 100 })
      .then(data => setUsers(data.users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <FormField
          control={form.control}
          name="recipient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select recipient" />
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
          name="sender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sender (optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''} disabled={loading}>
                <FormControl>
                  <SelectTrigger className='w-full'> 
                    <SelectValue placeholder="Select sender (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">None</SelectItem>
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="follow">Follow</SelectItem>
                  <SelectItem value="like">Like</SelectItem>
                  <SelectItem value="comment">Comment</SelectItem>
                  <SelectItem value="reply">Reply</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Type (optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select target type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">None</SelectItem>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="comment">Comment</SelectItem>
                  <SelectItem value="user">User</SelectItem>
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
                <Input {...field} placeholder="ID of the target" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message *</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isRead"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Mark as read</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>Save Notification</Button>
      </form>
    </Form>
  );
}