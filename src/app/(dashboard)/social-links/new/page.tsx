"use client";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { SocialLinkForm } from "@/components/forms/social-link-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewSocialLinkPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createSocialLink(data);
      toast.success("Social link created");
      router.push("/social-links");
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
        <h1 className="text-3xl font-bold">Create Social Link</h1>
      </div>

      <SocialLinkForm onSubmit={onSubmit} />
    </div>
  );
}
