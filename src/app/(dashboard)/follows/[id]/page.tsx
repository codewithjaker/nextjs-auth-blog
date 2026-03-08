"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { FollowForm } from "@/components/forms/follow-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function EditFollowPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [follow, setFollow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getFollow(id)
      .then(setFollow)
      .catch((err) => toast.error(err.message || "Failed to fetch follow"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateFollow(id, data);
      toast.success("Follow updated");
      router.push("/follows");
    } catch (error: any) {
      toast.error(error.message || "Failed to update follow");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!follow) return <div>Follow not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Follow</h1>
      </div>

      <FollowForm initialData={follow} onSubmit={onSubmit} />
    </div>
  );
}
