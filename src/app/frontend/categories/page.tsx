// app/(frontend)/categories/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FolderOpen } from 'lucide-react';

// Define Category type based on our API response
interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  status: string;
  createdAt: string;
}

export default async function CategoriesPage() {
  // Fetch active categories from the API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories?status=active&limit=100&sort=order`, {
    cache: 'no-store', // or 'force-cache' if you want static
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const { categories } = await res.json();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Categories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our content by category. Select a category to explore related posts.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: Category) => (
            <Link
              key={category._id}
              href={`/categories/${category.slug}`}
              className="group block transition-transform hover:scale-[1.02]"
            >
              <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </div>
                  {category.description && (
                    <CardDescription className="line-clamp-2">
                      {category.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {/* You could add post count here if available */}
                    View posts →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}