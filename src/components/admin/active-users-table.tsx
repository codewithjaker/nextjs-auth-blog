import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  postCount: number;
  commentCount: number;
  totalActivity: number;
}

export function ActiveUsersTable({ users }: { users: User[] }) {
  if (!users.length) {
    return <p className="text-muted-foreground">No users found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Posts</TableHead>
          <TableHead className="text-right">Comments</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">
              <Link href={`/users/${user._id}`} className="hover:underline">
                {user.name}
              </Link>
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">{user.postCount}</TableCell>
            <TableCell className="text-right">{user.commentCount}</TableCell>
            <TableCell className="text-right">{user.totalActivity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}