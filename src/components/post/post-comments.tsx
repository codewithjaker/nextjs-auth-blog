'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { api } from '@/lib/api-client';

interface Comment {
  _id: string;
  content: string;
  user: { _id: string; name: string };
  createdAt: string;
  likesCount: number;
  dislikesCount: number;
  replies?: Comment[];
}

interface PostCommentsProps {
  postId: string;
}

export function PostComments({ postId }: PostCommentsProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await api.getComments({ post: postId, limit: 100 });
      // Build tree structure: group by parentComment
      const flat = data.comments;
      const map = new Map();
      const roots: Comment[] = [];
      flat.forEach((c: any) => {
        map.set(c._id, { ...c, replies: [] });
      });
      flat.forEach((c: any) => {
        const node = map.get(c._id);
        if (c.parentComment) {
          const parent = map.get(c.parentComment);
          if (parent) parent.replies.push(node);
        } else {
          roots.push(node);
        }
      });
      setComments(roots);
    } catch (error) {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!session) {
      toast.error('Please login to comment');
      return;
    }
    setSubmitting(true);
    try {
      await api.createComment({
        post: postId,
        user: session.user.id,
        content: newComment,
        parentComment: null,
      });
      toast.success('Comment added');
      setNewComment('');
      fetchComments(); // refresh
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const renderComment = (comment: Comment, depth = 0) => (
    <div key={comment._id} className="relative pl-6" style={{ marginLeft: depth * 20 }}>
      <Card className="mb-4 p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{comment.user.name}</span>
              <span className="text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>
            <p className="mt-1">{comment.content}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <button className="text-muted-foreground hover:text-primary">
                Like ({comment.likesCount})
              </button>
              <button className="text-muted-foreground hover:text-primary">
                Reply
              </button>
            </div>
          </div>
        </div>
      </Card>
      {comment.replies?.map(reply => renderComment(reply, depth + 1))}
    </div>
  );

  if (loading) return <div>Loading comments...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <Textarea
          placeholder={session ? 'Write a comment...' : 'Please login to comment'}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!session || submitting}
          className="mb-2"
        />
        <Button type="submit" disabled={!session || submitting}>
          {submitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      {/* Comments list */}
      <div>
        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
}