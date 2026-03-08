"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { BookmarkForm } from "@/components/forms/bookmark-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function EditBookmarkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [bookmark, setBookmark] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getBookmark(id)
      .then(setBookmark)
      .catch((err) => toast.error(err.message || "Failed to fetch bookmark"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateBookmark(id, data);
      toast.success("Bookmark updated successfully");
      router.push("/bookmarks");
    } catch (error: any) {
      toast.error(error.message || "Failed to update bookmark");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!bookmark) return <div>Bookmark not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <h1 className="text-3xl font-bold ">Edit Bookmark</h1>
      </div>

      <BookmarkForm initialData={bookmark} onSubmit={onSubmit} />
    </div>
  );
}
