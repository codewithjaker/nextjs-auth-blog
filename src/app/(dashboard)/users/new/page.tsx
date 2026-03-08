"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { UserForm } from "@/components/forms/user-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewUserPage() {
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      await api.createUser(data);
      toast.success("User created successfully");
      router.push("/users");
    } catch (error: any) {
      toast.error(error.message || "Failed to create user");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create User</h1>
      </div>
      <UserForm onSubmit={onSubmit} />
    </div>
  );
}
