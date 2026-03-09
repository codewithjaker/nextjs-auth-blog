"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { NotificationForm } from "@/components/forms/notification-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewNotificationPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createNotification(data);
      toast.success("Notification created successfully");
      router.push("/notifications");
    } catch (error: any) {
      toast.error(error.message || "Failed to create notification");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Notification</h1>
      </div>

      <NotificationForm onSubmit={onSubmit} />
    </div>
  );
}
