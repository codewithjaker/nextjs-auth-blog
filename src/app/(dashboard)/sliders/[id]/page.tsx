'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api-client';
import { SliderForm } from '@/components/forms/slider-form';
import { toast } from 'sonner';

export default function EditSliderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [slider, setSlider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSlider(id)
      .then(setSlider)
      .catch((err) => toast.error('Error fetching slider', { description: err.message }))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateSlider(id, data);
      toast.success('Slider updated');
      router.push('/sliders');
    } catch (error: any) {
      toast.error('Error updating slider', { description: error.message });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!slider) return <div>Slider not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Slider</h1>
      <SliderForm initialData={slider} onSubmit={onSubmit} />
    </div>
  );
}