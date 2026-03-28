import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  slug: string;
  views: number;
  likesCount: number;
  commentCount?: number;
  authorName?: string;
}

export function PopularPostsTable({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return <p className="text-muted-foreground">No posts found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead className="text-right">Views</TableHead>
          <TableHead className="text-right">Likes</TableHead>
          <TableHead className="text-right">Comments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post._id}>
            <TableCell className="font-medium">
              <Link href={`/posts/${post._id}`} className="hover:underline">
                {post.title}
              </Link>
            </TableCell>
            <TableCell>{post.authorName || 'N/A'}</TableCell>
            <TableCell className="text-right">{post.views}</TableCell>
            <TableCell className="text-right">{post.likesCount}</TableCell>
            <TableCell className="text-right">{post.commentCount || 0}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}