"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { MessageForm } from "@/components/forms/message-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewMessagePage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createMessage(data);
      toast.success("Message created successfully");
      router.push("/messages");
    } catch (error: any) {
      toast.error(error.message || "Failed to create message");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Message</h1>
      </div>

      <MessageForm onSubmit={onSubmit} />
    </div>
  );
}
