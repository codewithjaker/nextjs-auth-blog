"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { SliderForm } from "@/components/forms/slider-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Slider</h1>
      </div>

      <SliderForm onSubmit={onSubmit} />
    </div>
  );
}
