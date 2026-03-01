"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),

  logo: z.string().optional(),
  favicon: z.string().optional(),

  contactEmail: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Invalid email",
    }),

  phone: z.string().optional(),
  address: z.string().optional(),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),

  googleAnalytics: z.string().optional(),
  googleMapEmbed: z.string().optional(),

  currency: z.object({
    code: z.string().min(1),
    symbol: z.string().min(1),
    position: z.enum(["before", "after"]),
  }),

  timezone: z.string().min(1),
});

type Settings = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "",
      logo: "",
      favicon: "",
      contactEmail: "",
      phone: "",
      address: "",
      metaTitle: "",
      metaDescription: "",
      googleAnalytics: "",
      googleMapEmbed: "",
      currency: {
        code: "USD",
        symbol: "$",
        position: "before",
      },
      timezone: "UTC",
    },
  });

  useEffect(() => {
    api
      .getSettings?.() // Assuming we have api.getSettings
      .then((data) => form.reset(data))
      .catch((err) =>
        toast.error("Error loading settings", {
          description: err.message,
        }),
      )
      .finally(() => setLoading(false));
  }, [form]);

  const onSubmit = async (data: Settings) => {
    try {
      await api.updateSettings?.(data);
      toast("Settings updated successfully");
    } catch (error: any) {
      toast.error("Error", {
        description: error.message,
        // variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-lg"
        >
          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="favicon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favicon URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="googleAnalytics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Analytics ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="googleMapEmbed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Map Embed Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency.code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency.symbol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency Symbol</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency.position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency Position</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before">Before ($100)</SelectItem>
                      <SelectItem value="after">After (100$)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Settings</Button>
        </form>
      </Form>
    </div>
  );
}
