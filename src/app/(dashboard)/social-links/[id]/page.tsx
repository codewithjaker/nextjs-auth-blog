"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { SocialLinkForm } from "@/components/forms/social-link-form";
import { toast } from "sonner";

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
      <h1 className="text-3xl font-bold mb-6">Edit Social Link</h1>
      <SocialLinkForm initialData={link} onSubmit={onSubmit} />
    </div>
  );
}
