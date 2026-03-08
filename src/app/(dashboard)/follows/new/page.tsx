"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { FollowForm } from "@/components/forms/follow-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewFollowPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createFollow(data);
      toast.success("Follow relationship created");
      router.push("/follows");
    } catch (error: any) {
      toast.error(error.message || "Failed to create follow");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Follow Relationship</h1>
      </div>

      <FollowForm onSubmit={onSubmit} />
    </div>
  );
}
