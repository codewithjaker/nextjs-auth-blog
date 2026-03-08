"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { BookmarkForm } from "@/components/forms/bookmark-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewBookmarkPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createBookmark(data);
      toast.success("Bookmark created successfully");
      router.push("/bookmarks");
    } catch (error: any) {
      toast.error(error.message || "Failed to create bookmark");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Bookmark</h1>
      </div>

      <BookmarkForm onSubmit={onSubmit} />
    </div>
  );
}
