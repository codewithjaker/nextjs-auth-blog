'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api-client';

const followSchema = z.object({
  follower: z.string().min(1, 'Follower is required'),
  following: z.string().min(1, 'Following is required'),
}).refine(data => data.follower !== data.following, {
  message: 'User cannot follow themselves',
  path: ['following'],
});

type FollowFormValues = z.infer<typeof followSchema>;

interface FollowFormProps {
  initialData?: FollowFormValues & { _id?: string };
  onSubmit: (data: FollowFormValues) => Promise<void>;
}

export function FollowForm({ initialData, onSubmit }: FollowFormProps) {
  const [users, setUsers] = useState<Array<{ _id: string; name: string; email: string }>>([]);

  useEffect(() => {
    api.getUsers({ limit: 100 }).then(data => {
      setUsers(data.users);
    }).catch(console.error);
  }, []);

  const form = useForm<FollowFormValues>({
    resolver: zodResolver(followSchema),
    defaultValues: initialData || {
      follower: '',
      following: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <FormField
          control={form.control}
          name="follower"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Follower *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name} ({user.email})
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
          name="following"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Following *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Follow</Button>
      </form>
    </Form>
  );
}