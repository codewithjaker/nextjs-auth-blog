'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { api } from '@/lib/api-client';

const reactionSchema = z.object({
  user: z.string().min(1, 'User is required'),
  targetType: z.enum(['post', 'comment']),
  targetId: z.string().min(1, 'Target is required'),
  type: z.enum(['like', 'dislike']),
});

type ReactionFormValues = z.infer<typeof reactionSchema>;

interface ReactionFormProps {
  initialData?: ReactionFormValues & { _id?: string };
  onSubmit: (data: ReactionFormValues) => Promise<void>;
}

export function ReactionForm({ initialData, onSubmit }: ReactionFormProps) {
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);
  const [posts, setPosts] = useState<Array<{ _id: string; title: string }>>([]);
  const [comments, setComments] = useState<Array<{ _id: string; content: string; post?: { title: string } }>>([]);
  const [loadingTargets, setLoadingTargets] = useState(false);

  const form = useForm<ReactionFormValues>({
    resolver: zodResolver(reactionSchema),
    defaultValues: initialData || {
      user: '',
      targetType: 'post',
      targetId: '',
      type: 'like',
    },
  });

  const watchTargetType = form.watch('targetType');

  // Fetch users
  useEffect(() => {
    api.getUsers({ limit: 100 })
      .then(data => setUsers(data.users))
      .catch(console.error);
  }, []);

  // Fetch targets based on targetType
  useEffect(() => {
    if (!watchTargetType) return;
    setLoadingTargets(true);
    const fetchTargets = watchTargetType === 'post'
      ? api.getPosts({ limit: 100, status: 'published' })
      : api.getComments({ limit: 100 });

    fetchTargets
      .then(data => {
        if (watchTargetType === 'post') {
          setPosts(data.posts);
        } else {
          // Ensure comments are populated with post info if needed
          setComments(data.comments);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingTargets(false));
  }, [watchTargetType]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
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
          name="targetType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Target Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="post" />
                    </FormControl>
                    <FormLabel className="font-normal">Post</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="comment" />
                    </FormControl>
                    <FormLabel className="font-normal">Comment</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target *</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loadingTargets}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={loadingTargets ? 'Loading...' : 'Select a target'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {watchTargetType === 'post' && posts.map((post) => (
                    <SelectItem key={post._id} value={post._id}>
                      {post.title}
                    </SelectItem>
                  ))}
                  {watchTargetType === 'comment' && comments.map((comment) => (
                    <SelectItem key={comment._id} value={comment._id}>
                      {comment.content.substring(0, 50)}... {comment.post ? `(on: ${comment.post.title})` : ''}
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
            <FormItem className="space-y-3">
              <FormLabel>Reaction Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="like" />
                    </FormControl>
                    <FormLabel className="font-normal">Like</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dislike" />
                    </FormControl>
                    <FormLabel className="font-normal">Dislike</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Reaction</Button>
      </form>
    </Form>
  );
}