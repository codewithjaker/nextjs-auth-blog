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

const commentSchema = z.object({
  post: z.string().min(1, 'Post is required'),
  user: z.string().min(1, 'User is required'),
  content: z.string().min(1, 'Content cannot be empty'),
  parentComment: z.string().nullable().optional(),
  status: z.enum(['pending', 'approved', 'spam', 'deleted']).default('pending'),
  // These are typically system-managed, but we include them for completeness
  likesCount: z.number().int().min(0).default(0),
  dislikesCount: z.number().int().min(0).default(0),
  isEdited: z.boolean().default(false),
});

type CommentFormValues = z.infer<typeof commentSchema>;

interface CommentFormProps {
  initialData?: CommentFormValues & { _id?: string };
  onSubmit: (data: CommentFormValues) => Promise<void>;
}

export function CommentForm({ initialData, onSubmit }: CommentFormProps) {
  const [posts, setPosts] = useState<Array<{ _id: string; title: string }>>([]);
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);
  const [parentComments, setParentComments] = useState<Array<{ _id: string; content: string }>>([]);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: initialData || {
      post: '',
      user: '',
      content: '',
      parentComment: null,
      status: 'pending',
      likesCount: 0,
      dislikesCount: 0,
      isEdited: false,
    },
  });

  // Fetch posts and users for dropdowns
  useEffect(() => {
    Promise.all([
      api.getPosts({ limit: 100, status: 'published' }),
      api.getUsers({ limit: 100 })
    ]).then(([postsData, usersData]) => {
      setPosts(postsData.posts);
      setUsers(usersData.users);
    }).catch(console.error);
  }, []);

  // When post changes, fetch its comments for parent selection
  const watchPost = form.watch('post');
  useEffect(() => {
    if (watchPost) {
      api.getComments({ post: watchPost, limit: 100 })
        .then(data => {
          // Exclude current comment if editing
          let list = data.comments;
          if (initialData?._id) {
            list = list.filter((c: any) => c._id !== initialData._id);
          }
          setParentComments(list);
        })
        .catch(console.error);
    } else {
      setParentComments([]);
    }
  }, [watchPost, initialData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
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
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
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
          name="parentComment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Comment (optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="None (top-level comment)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">None</SelectItem>
                  {parentComments.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.content.substring(0, 50)}...
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content *</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="spam">Spam</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Read-only fields for counts (optional) */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="likesCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Likes</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dislikesCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dislikes</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="isEdited"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Input type="checkbox" checked={field.value} onChange={e => field.onChange(e.target.checked)} className="w-4 h-4" />
              </FormControl>
              <FormLabel className="!mt-0">Mark as edited</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Comment</Button>
      </form>
    </Form>
  );
}