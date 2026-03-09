"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { CategoryForm } from "@/components/forms/category-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewCategoryPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createCategory(data);
      toast.success("Category created successfully");
      router.push("/categories");
    } catch (error: any) {
      toast.error(error.message || "Failed to create category");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Category</h1>
      </div>

      <CategoryForm onSubmit={onSubmit} />
    </div>
  );
}
