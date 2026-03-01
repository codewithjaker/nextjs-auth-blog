"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { FAQForm } from "@/components/forms/faq-form";
import { toast } from "sonner";

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
      <h1 className="text-3xl font-bold mb-6">Create FAQ</h1>
      <FAQForm onSubmit={onSubmit} />
    </div>
  );
}
