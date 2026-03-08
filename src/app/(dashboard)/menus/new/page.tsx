"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { MenuForm } from "@/components/forms/menu-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewMenuPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createMenu(data);
      toast.success("Menu created successfully");
      router.push("/menus");
    } catch (error: any) {
      toast.error(error.message || "Failed to create menu");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Menu Item</h1>
      </div>

      <MenuForm onSubmit={onSubmit} />
    </div>
  );
}
