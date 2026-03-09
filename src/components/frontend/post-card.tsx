import Link from "next/link";
import Image from "next/image";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {post.featuredImage && (
        <div className="relative h-48">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{post.title}</h3>
        <p className="text-muted-foreground mt-2">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="text-primary mt-4 inline-block">Read more →</Link>
      </div>
    </div>
  );
}