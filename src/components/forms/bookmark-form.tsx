'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { api } from '@/lib/api-client';

const bookmarkSchema = z.object({
  user: z.string().min(1, 'User is required'),
  post: z.string().min(1, 'Post is required'),
});

type BookmarkFormValues = z.infer<typeof bookmarkSchema>;

interface BookmarkFormProps {
  initialData?: BookmarkFormValues & { _id?: string };
  onSubmit: (data: BookmarkFormValues) => Promise<void>;
}

export function BookmarkForm({ initialData, onSubmit }: BookmarkFormProps) {
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);
  const [posts, setPosts] = useState<Array<{ _id: string; title: string }>>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: initialData || {
      user: '',
      post: '',
    },
  });

  // Fetch users and posts for dropdowns
  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getUsers({ limit: 100 }),
      api.getPosts({ limit: 100, status: 'published' })
    ]).then(([usersData, postsData]) => {
      setUsers(usersData.users);
      setPosts(postsData.posts);
    }).catch(console.error)
    .finally(() => setLoading(false));
  }, []);

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
                    <SelectValue placeholder="Select a user" />
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
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a post" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {posts.map((post) => (
                    <SelectItem key={post._id} value={post._id}>
                      {post.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>Save Bookmark</Button>
      </form>
    </Form>
  );
}