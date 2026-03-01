"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { SliderForm } from "@/components/forms/slider-form";
import { toast } from "sonner";

export default function NewSliderPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createSlider(data);
      toast.success("Slider created");
      router.push("/sliders");
    } catch (error: any) {
      toast.error("Error creating slider", { description: error.message });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Slider</h1>
      <SliderForm onSubmit={onSubmit} />
    </div>
  );
}
