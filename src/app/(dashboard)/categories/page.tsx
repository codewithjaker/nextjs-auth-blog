"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: { _id: string; name: string } | null;
  order: number;
  status: "active" | "inactive";
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchCategories = async (page = 1) => {
    setLoading(true);
    try {
      // const data = await api.getCategories({ page, limit: 10 });
      // setCategories(data.categories);
      // setPagination(data.pagination);

      const data = await api.getCategories({ page, limit: 10 });

      console.log(data)

      setCategories(data?.categories ?? []);
      setPagination(
        data?.pagination ?? { page: 1, limit: 10, total: 0, pages: 0 },
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.deleteCategory(id);
      toast.success("Category deleted successfully");
      fetchCategories(pagination.page);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "slug", header: "Slug" },
    {
      key: "parent",
      header: "Parent",
      cell: (cat: Category) => cat.parent?.name || "-",
    },
    {
      key: "status",
      header: "Status",
      cell: (cat: Category) => (
        <Badge variant={cat.status === "active" ? "default" : "secondary"}>
          {cat.status}
        </Badge>
      ),
    },
    { key: "order", header: "Order" },
    {
      key: "createdAt",
      header: "Created",
      cell: (cat: Category) => new Date(cat.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (cat: Category) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/categories/${cat._id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(cat._id)}
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
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={() => router.push("/categories/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Category
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={categories}
        pagination={pagination}
        onPageChange={(page) => fetchCategories(page)}
      />
    </div>
  );
}
