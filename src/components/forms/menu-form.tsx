// @ts-nocheck

"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const menuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().min(1, "URL is required"),
  section: z.enum(["header", "footer"]),
  parent: z.string().nullable().optional(),
  order: z.coerce.number().int().min(0).default(0),
  newTab: z.boolean().default(false),
  status: z.enum(["active", "inactive"]).default("active"),
});

type MenuFormValues = z.infer<typeof menuSchema>;

interface MenuFormProps {
  initialData?: MenuFormValues & { _id?: string };
  onSubmit: (data: MenuFormValues) => Promise<void>;
}

export function MenuForm({ initialData, onSubmit }: MenuFormProps) {
  const [parentMenus, setParentMenus] = useState<any[]>([]);
  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: initialData || {
      name: "",
      url: "",
      section: "header",
      parent: null,
      order: 0,
      newTab: false,
      status: "active",
    },
  });

  const section = form.watch("section");

  // Fetch potential parent menus (same section, excluding self if editing)
  useEffect(() => {
    const fetchParents = async () => {
      try {
        const data = await api.getMenus({
          section,
          status: "active",
          limit: 100,
        });
        // Exclude current menu if editing
        let filtered = data.menus;
        if (initialData?._id) {
          filtered = filtered.filter((m: any) => m._id !== initialData._id);
        }
        setParentMenus(filtered);
      } catch (error) {
        console.error("Failed to load parent menus", error);
      }
    };
    fetchParents();
  }, [section, initialData?._id]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Home" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="/" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="header">Header</SelectItem>
                  <SelectItem value="footer">Footer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Menu (optional)</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value === "null" ? null : value)
                }
                value={field.value || "null"}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="No parent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">None</SelectItem>
                  {parentMenus.map((menu) => (
                    <SelectItem key={menu._id} value={menu._id}>
                      {menu.name} ({menu.url})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <FormControl>
                <Input {...field} type="number" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newTab"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="!mt-0">Open in new tab</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Menu</Button>
      </form>
    </Form>
  );
}
