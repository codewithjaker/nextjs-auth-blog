'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multi-select';
import { api } from '@/lib/api-client';

const chatRoomSchema = z.object({
  participants: z.array(z.string()).min(2, 'At least two participants are required'),
  isGroup: z.boolean().default(false),
  name: z.string().optional(),
}).refine((data) => {
  // If it's a group, name is required
  if (data.isGroup && !data.name) {
    return false;
  }
  return true;
}, {
  message: 'Group name is required for group chats',
  path: ['name'],
});

type ChatRoomFormValues = z.infer<typeof chatRoomSchema>;

interface ChatRoomFormProps {
  initialData?: ChatRoomFormValues & { _id?: string };
  onSubmit: (data: ChatRoomFormValues) => Promise<void>;
}

export function ChatRoomForm({ initialData, onSubmit }: ChatRoomFormProps) {
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<ChatRoomFormValues>({
    resolver: zodResolver(chatRoomSchema),
    defaultValues: initialData || {
      participants: [],
      isGroup: false,
      name: '',
    },
  });

  const watchIsGroup = form.watch('isGroup');

  // Fetch users for participants dropdown
  useEffect(() => {
    setLoading(true);
    api.getUsers({ limit: 100 })
      .then(data => setUsers(data.users))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const userOptions = users.map(u => ({ value: u._id, label: u.name }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <FormField
          control={form.control}
          name="isGroup"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0">Group chat</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchIsGroup && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter group name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participants *</FormLabel>
              <FormControl>
                <MultiSelect
                  options={userOptions}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder="Select participants"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>Save Chat Room</Button>
      </form>
    </Form>
  );
}