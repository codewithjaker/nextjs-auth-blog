"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { ChatRoomForm } from "@/components/forms/chat-room-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewChatRoomPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createChatRoom(data);
      toast.success("Chat room created successfully");
      router.push("/chat-rooms");
    } catch (error: any) {
      toast.error(error.message || "Failed to create chat room");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Chat Room</h1>
      </div>

      <ChatRoomForm onSubmit={onSubmit} />
    </div>
  );
}
