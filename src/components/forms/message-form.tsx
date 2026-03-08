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

const messageSchema = z.object({
  chatRoom: z.string().min(1, 'Chat room is required'),
  sender: z.string().min(1, 'Sender is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum(['text', 'image', 'file']).default('text'),
  // isReadBy and deletedFor are arrays – we'll omit from form for simplicity
});

type MessageFormValues = z.infer<typeof messageSchema>;

interface MessageFormProps {
  initialData?: MessageFormValues & { _id?: string };
  onSubmit: (data: MessageFormValues) => Promise<void>;
}

export function MessageForm({ initialData, onSubmit }: MessageFormProps) {
  const [chatRooms, setChatRooms] = useState<Array<{ _id: string; name?: string; participants: any[] }>>([]);
  const [users, setUsers] = useState<Array<{ _id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: initialData || {
      chatRoom: '',
      sender: '',
      content: '',
      type: 'text',
    },
  });

  // Fetch chat rooms and users
  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getChatRooms({ limit: 100 }),
      api.getUsers({ limit: 100 })
    ]).then(([roomsData, usersData]) => {
      setChatRooms(roomsData.chatRooms);
      setUsers(usersData.users);
    }).catch(console.error)
    .finally(() => setLoading(false));
  }, []);

  // Helper to get chat room display name
  const getChatRoomName = (room: typeof chatRooms[0]) => {
    if (room.isGroup && room.name) return room.name;
    // For one-to-one, show participants names
    return room.participants?.map((p: any) => p.name).join(', ') || 'Unnamed';
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        <FormField
          control={form.control}
          name="chatRoom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chat Room *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select a chat room" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {chatRooms.map((room) => (
                    <SelectItem key={room._id} value={room._id}>
                      {getChatRoomName(room)}
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
              <FormLabel>Sender *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={loading}>
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Type *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="file">File</SelectItem>
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
                {form.watch('type') === 'text' ? (
                  <Textarea {...field} rows={4} />
                ) : (
                  <Input {...field} placeholder="URL or path to image/file" />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>Save Message</Button>
      </form>
    </Form>
  );
}