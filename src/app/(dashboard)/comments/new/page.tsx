"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { CommentForm } from "@/components/forms/comment-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewCommentPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createComment(data);
      toast.success("Comment created successfully");
      router.push("/comments");
    } catch (error: any) {
      toast.error(error.message || "Failed to create comment");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Comment</h1>
      </div>

      <CommentForm onSubmit={onSubmit} />
    </div>
  );
}
