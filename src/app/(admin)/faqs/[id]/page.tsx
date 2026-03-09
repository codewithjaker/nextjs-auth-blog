"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { FAQForm } from "@/components/forms/faq-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function EditFAQPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getFAQ(id)
      .then(setFaq)
      .catch((err) =>
        toast.error("Error fetching FAQ", { description: err.message }),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateFAQ(id, data);
      toast.success("FAQ updated");
      router.push("/faqs");
    } catch (error: any) {
      toast.error("Error updating FAQ", { description: error.message });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!faq) return <div>FAQ not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit FAQ</h1>
      </div>

      <FAQForm initialData={faq} onSubmit={onSubmit} />
    </div>
  );
}
