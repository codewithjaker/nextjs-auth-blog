"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Menu {
  _id: string;
  name: string;
  url: string;
  section: "header" | "footer";
  parent?: { _id: string; name: string } | null;
  order: number;
  newTab: boolean;
  status: "active" | "inactive";
  createdAt: string;
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchMenus = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api.getMenus({ page, limit: 10, populate: "parent" });
      setMenus(data.menus);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await api.deleteMenu(id);
      toast.success("Menu deleted successfully");
      fetchMenus(pagination.page);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete menu");
    }
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "url", header: "URL" },
    { key: "section", header: "Section" },
    {
      key: "parent",
      header: "Parent",
      cell: (menu: Menu) => menu.parent?.name || "—",
    },
    { key: "order", header: "Order" },
    {
      key: "newTab",
      header: "New Tab",
      cell: (menu: Menu) => (menu.newTab ? "Yes" : "No"),
    },
    {
      key: "status",
      header: "Status",
      cell: (menu: Menu) => (
        <span
          className={
            menu.status === "active" ? "text-green-600" : "text-red-600"
          }
        >
          {menu.status}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (menu: Menu) => new Date(menu.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (menu: Menu) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/menus/${menu._id}`)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(menu._id)}
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
        <h1 className="text-3xl font-bold">Menus</h1>
        <Button onClick={() => router.push("/menus/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Menu Item
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={menus}
        pagination={pagination}
        onPageChange={(page) => fetchMenus(page)}
      />
    </div>
  );
}
