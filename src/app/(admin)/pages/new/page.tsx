"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { PageForm } from "@/components/forms/page-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewPagePage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createPage(data);
      toast.success("Page created");
      router.push("/pages");
    } catch (error: any) {
      toast.error("Error", { description: error.message });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Page</h1>
      </div>

      <PageForm onSubmit={onSubmit} />
    </div>
  );
}
