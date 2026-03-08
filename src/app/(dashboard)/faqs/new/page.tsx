"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { FAQForm } from "@/components/forms/faq-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function NewFAQPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createFAQ(data);
      toast.success("FAQ created");
      router.push("/faqs");
    } catch (error: any) {
      toast.error("Error creating FAQ", { description: error.message });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create FAQ</h1>
      </div>

      <FAQForm onSubmit={onSubmit} />
    </div>
  );
}
