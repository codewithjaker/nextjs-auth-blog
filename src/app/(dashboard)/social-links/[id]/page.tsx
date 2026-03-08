"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { SocialLinkForm } from "@/components/forms/social-link-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditSocialLinkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getSocialLink(id)
      .then(setLink)
      .catch((err) => toast.error("Error", { description: err.message }))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await api.updateSocialLink(id, data);
      toast.success("Social link updated");
      router.push("/social-links");
    } catch (error: any) {
      toast.error("Error", { description: error.message });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!link) return <div>Social link not found</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Social Link</h1>
      </div>
      <SocialLinkForm initialData={link} onSubmit={onSubmit} />
    </div>
  );
}
