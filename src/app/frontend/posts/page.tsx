// app/(frontend)/posts/page.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { format } from 'date-fns';

// Types based on API response
interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: { _id: string; name: string } | null;
  author: { _id: string; name: string };
  publishedAt: string;
  views: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

// Server component
export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }>;
}) {
  const { page = '1', search = '', category = '' } = await searchParams;
  const currentPage = parseInt(page);
  const limit = 9; // posts per page

  // Build query string
  const params = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
    status: 'published',
  });
  if (search) params.append('search', search);
  if (category) params.append('category', category);

  // Fetch posts and categories concurrently
  const [postsRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?${params}`, {
      next: { revalidate: 60 }, // ISR: revalidate every minute
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?status=active&limit=100`, {
      next: { revalidate: 3600 },
    }),
  ]);

  if (!postsRes.ok || !categoriesRes.ok) {
    throw new Error('Failed to fetch data');
  }

  const { posts, pagination } = await postsRes.json();
  const { categories } = await categoriesRes.json();

  const totalPages = pagination.pages;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">All Posts</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our latest articles and insights
        </p>
      </div>

      {/* Filters */}
      <form className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            name="search"
            placeholder="Search posts..."
            defaultValue={search}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select name="category" defaultValue={category}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat: Category) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Apply Filters</Button>
      </form>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <Link
              key={post._id}
              href={`/posts/${post.slug}`}
              className="group block transition-transform hover:scale-[1.02]"
            >
              <Card className="h-full overflow-hidden">
                {post.featuredImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author.name}</span>
                    <span>•</span>
                    <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                    {post.category && (
                      <>
                        <span>•</span>
                        <Badge variant="secondary">{post.category.name}</Badge>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt || post.content?.slice(0, 150) + '...'}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    {post.views} views
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === currentPage;
            // Build URL with preserved filters
            const url = new URLSearchParams({
              ...(search && { search }),
              ...(category && { category }),
              page: p.toString(),
            });
            return (
              <Link
                key={p}
                href={`/posts?${url.toString()}`}
                className={`px-3 py-2 rounded-md ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}