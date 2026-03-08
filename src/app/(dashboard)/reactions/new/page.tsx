"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { ReactionForm } from "@/components/forms/reaction-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewReactionPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createReaction(data);
      toast.success("Reaction created successfully");
      router.push("/reactions");
    } catch (error: any) {
      toast.error(error.message || "Failed to create reaction");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Reaction</h1>
      </div>

      <ReactionForm onSubmit={onSubmit} />
    </div>
  );
}
