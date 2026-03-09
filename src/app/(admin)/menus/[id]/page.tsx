"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { MenuForm } from "@/components/forms/menu-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function EditMenuPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getMenu(id)
      .then((data) => {
        // Transform parent to just ID for form (if populated)
        if (data.parent && typeof data.parent === "object") {
          data.parent = data.parent._id;
        }
        setMenu(data);
      })
      .catch((err) => toast.error(err.message || "Failed to load menu"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateMenu(id, data);
      toast.success("Menu updated successfully");
      router.push("/menus");
    } catch (error: any) {
      toast.error(error.message || "Failed to update menu");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!menu) return <div>Menu not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Menu Item</h1>
      </div>

      <MenuForm initialData={menu} onSubmit={onSubmit} />
    </div>
  );
}
