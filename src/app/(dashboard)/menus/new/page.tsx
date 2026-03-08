"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { MenuForm } from "@/components/forms/menu-form";
import { toast } from "sonner";

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
      <h1 className="text-3xl font-bold mb-6">Create Menu Item</h1>
      <MenuForm onSubmit={onSubmit} />
    </div>
  );
}
