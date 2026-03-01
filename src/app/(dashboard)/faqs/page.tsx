"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  status: "active" | "inactive";
  createdAt: string;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchFAQs = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getFAQs({ page, limit: 10 });
      setFaqs(data.faqs);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error("Error", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.deleteFAQ(id);
      toast.success("FAQ deleted");
      fetchFAQs(pagination.page);
    } catch (error: any) {
      toast.error("Error deleting FAQ", {
        description: error.message,
      });
    }
  };

  const columns = [
    { key: "question", header: "Question" },
    { key: "order", header: "Order" },
    {
      key: "status",
      header: "Status",
      cell: (faq: FAQ) => (
        <Badge variant={faq.status === "active" ? "default" : "secondary"}>
          {faq.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (faq: FAQ) => new Date(faq.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (faq: FAQ) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/faqs/${faq._id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(faq._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <Button onClick={() => router.push("/faqs/new")}>
          <Plus className="mr-2 h-4 w-4" /> New FAQ
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={faqs}
        pagination={pagination}
        onPageChange={(page) => fetchFAQs(page)}
      />
    </div>
  );
}
