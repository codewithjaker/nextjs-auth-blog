// 'use client';
// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { api } from '@/lib/api-client';
// import { PostForm } from '@/components/forms/post-form';

// export default function EditPostPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.getPost(id)
//       .then(setPost)
//       .catch((err) => toast.error(err.message || 'Failed to fetch post'))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const onSubmit = async (data: any) => {
//     try {
//       await api.updatePost(id, data);
//       toast.success('Post updated successfully');
//       router.push('/posts');
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to update post');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!post) return <div>Post not found</div>;

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
//       <PostForm initialData={post} onSubmit={onSubmit} />
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { PostForm } from "@/components/forms/post-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getPost(id)
      .then((data) => {
        // Transform populated fields to IDs
        const transformed = {
          ...data,
          author: data.author?._id || data.author,
          category: data.category?._id || data.category,
        };
        setPost(transformed);
      })
      .catch((err) => toast.error(err.message || "Failed to fetch post"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updatePost(id, data);
      toast.success("Post updated successfully");
      router.push("/posts");
    } catch (error: any) {
      toast.error(error.message || "Failed to update post");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Post</h1>
      </div>

      <PostForm initialData={post} onSubmit={onSubmit} />
    </div>
  );
}
