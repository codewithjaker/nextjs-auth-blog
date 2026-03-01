'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { FAQForm } from '@/components/forms/faq-form';
import { toast } from 'sonner';

export default function EditFAQPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFAQ(id)
      .then(setFaq)
      .catch((err) => toast.error("Error fetching FAQ", { description: err.message }))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateFAQ(id, data);
      toast.success("FAQ updated");
      router.push('/faqs');
    } catch (error: any) {
      toast.error("Error updating FAQ", { description: error.message });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!faq) return <div>FAQ not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit FAQ</h1>
      <FAQForm initialData={faq} onSubmit={onSubmit} />
    </div>
  );
}