
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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

/* ===========================
   ZOD SCHEMA
=========================== */
const settingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  googleMapEmbed: z.string().optional(),
  marketingIntegrations: z.array(
    z.object({
      name: z.string().min(1),
      type: z.enum(["analytics", "ads", "other"]),
      key: z.string().min(1),
      isActive: z.boolean(),
    }),
  ),
  currency: z.object({
    code: z
      .string()
      .length(3)
      .transform((val) => val.toUpperCase()),
    symbol: z.string().min(1),
    position: z.enum(["before", "after"]),
  }),
  timezone: z.string().min(1),
  localization: z.object({
    languages: z
      .array(
        z.object({
          code: z.string().min(1),
          name: z.string().min(1),
          locale: z.string().min(1),
          direction: z.enum(["ltr", "rtl"]),
          isDefault: z.boolean(),
          isActive: z.boolean(),
        }),
      )
      .min(1),
    defaultLocale: z.string().optional(),
    dateFormat: z.string().optional(),
  }),
  businessHours: z
    .array(
      z.object({
        day: z.string(),
        open: z.string().optional(),
        close: z.string().optional(),
        isClosed: z.boolean().optional(),
      }),
    )
    .length(7),
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
      googleMapEmbed: "",
      marketingIntegrations: [],
      currency: { code: "USD", symbol: "$", position: "before" },
      timezone: "UTC",
      localization: {
        languages: [],
        defaultLocale: "en-US",
        dateFormat: "YYYY-MM-DD",
      },
      businessHours: [
        { day: "Sunday", open: "09:00", close: "18:00", isClosed: false },
        { day: "Monday", open: "09:00", close: "18:00", isClosed: false },
        { day: "Tuesday", open: "09:00", close: "18:00", isClosed: false },
        { day: "Wednesday", open: "09:00", close: "18:00", isClosed: false },
        { day: "Thursday", open: "09:00", close: "18:00", isClosed: false },
        { day: "Friday", isClosed: true },
        { day: "Saturday", isClosed: true },
      ],
    },
  });

  const marketingArray = useFieldArray({
    control: form.control,
    name: "marketingIntegrations",
  });
  const languageArray = useFieldArray({
    control: form.control,
    name: "localization.languages",
  });
  const hoursArray = useFieldArray({
    control: form.control,
    name: "businessHours",
  });

  useEffect(() => {
    api
      .getSettings?.()
      .then((res: any) => res?.data && form.reset(res.data))
      .catch((err) =>
        toast.error("Error loading settings", { description: err.message }),
      )
      .finally(() => setLoading(false));
  }, [form]);

  const onSubmit = async (data: Settings) => {
    try {
      await api.updateSettings?.(data);
      toast.success("Settings updated successfully");
    } catch (error: any) {
      toast.error("Error updating settings", { description: error.message });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Enterprise Settings</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-5xl"
        >
          {/* ================== SITE INFO ================== */}
          <h2 className="text-xl font-semibold">Site Info</h2>
          {["siteName", "logo", "favicon"].map((n) => (
            <FormField
              key={n}
              control={form.control}
              name={n as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{n}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* ================== CONTACT ================== */}
          <h2 className="text-xl font-semibold">Contact</h2>
          {["contactEmail", "phone", "address"].map((n) => (
            <FormField
              key={n}
              control={form.control}
              name={n as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{n}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* ================== SEO ================== */}
          <h2 className="text-xl font-semibold">SEO</h2>
          {["metaTitle", "metaDescription"].map((n) => (
            <FormField
              key={n}
              control={form.control}
              name={n as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{n}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* ================== INTEGRATIONS ================== */}
          <h2 className="text-xl font-semibold">Marketing Integrations</h2>
          {marketingArray.fields.map((m, idx) => (
            <div key={m.id} className="flex gap-2 mb-2">
              {["name", "key"].map((f) => (
                <FormField
                  key={f}
                  control={form.control}
                  name={`marketingIntegrations.${idx}.${f}` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{f}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <FormField
                control={form.control}
                name={`marketingIntegrations.${idx}.type` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="ads">Ads</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`marketingIntegrations.${idx}.isActive` as any}
                render={({ field }) => (
                  <FormItem className="flex items-center mt-6">
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => marketingArray.remove(idx)}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              marketingArray.append({
                name: "",
                type: "analytics",
                key: "",
                isActive: true,
              })
            }
          >
            Add Integration
          </Button>

          <FormField
            control={form.control}
            name="googleMapEmbed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Map Embed</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ================== CURRENCY ================== */}
          <h2 className="text-xl font-semibold">Currency</h2>
          {["code", "symbol"].map((n) => (
            <FormField
              key={n}
              control={form.control}
              name={`currency.${n}` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{n}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="currency.position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before">Before ($100)</SelectItem>
                      <SelectItem value="after">After (100$)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* ================== TIMEZONE ================== */}
          <h2 className="text-xl font-semibold">Timezone</h2>
          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ================== LOCALIZATION ================== */}
          <h2 className="text-xl font-semibold">Languages</h2>
          {languageArray.fields.map((lang, idx) => (
            <div key={lang.id} className="flex gap-2 items-center mb-2">
              <Input
                value={lang.name}
                onChange={(e) => {
                  const newLangs = [
                    ...form.getValues("localization.languages"),
                  ];
                  newLangs[idx].name = e.target.value;
                  form.setValue("localization.languages", newLangs);
                }}
                placeholder="Language Name"
              />
              <Input
                value={lang.code}
                onChange={(e) => {
                  const newLangs = [
                    ...form.getValues("localization.languages"),
                  ];
                  newLangs[idx].code = e.target.value;
                  form.setValue("localization.languages", newLangs);
                }}
                className="w-20"
                placeholder="Code"
              />
              <Input
                value={lang.locale}
                onChange={(e) => {
                  const newLangs = [
                    ...form.getValues("localization.languages"),
                  ];
                  newLangs[idx].locale = e.target.value;
                  form.setValue("localization.languages", newLangs);
                }}
                placeholder="Locale"
              />
              <Select
                value={lang.direction}
                onValueChange={(val) => {
                  const newLangs = [
                    ...form.getValues("localization.languages"),
                  ];
                  newLangs[idx].direction = val as "ltr" | "rtl";
                  form.setValue("localization.languages", newLangs);
                }}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ltr">LTR</SelectItem>
                  <SelectItem value="rtl">RTL</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="radio"
                name="defaultLang"
                checked={lang.isDefault}
                onChange={() => {
                  const newLangs = form
                    .getValues("localization.languages")
                    .map((l, i) => ({
                      ...l,
                      isDefault: i === idx,
                    }));
                  form.setValue("localization.languages", newLangs);
                }}
              />
              <input
                type="checkbox"
                checked={lang.isActive}
                onChange={() => {
                  const newLangs = [
                    ...form.getValues("localization.languages"),
                  ];
                  newLangs[idx].isActive = !newLangs[idx].isActive;
                  form.setValue("localization.languages", newLangs);
                }}
              />
              <Button type="button" onClick={() => languageArray.remove(idx)}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              languageArray.append({
                code: "",
                name: "",
                locale: "",
                direction: "ltr",
                isDefault: false,
                isActive: true,
              })
            }
          >
            Add Language
          </Button>

          {/* ================== BUSINESS HOURS ================== */}
          <h2 className="text-xl font-semibold">Business Hours</h2>
          {hoursArray.fields.map((hour, idx) => (
            <div key={hour.id} className="flex gap-2 items-center mb-2">
              <span className="w-24">{hour.day}</span>
              <Input
                type="time"
                value={hour.open || ""}
                onChange={(e) => {
                  const newHours = [...form.getValues("businessHours")];
                  newHours[idx].open = e.target.value;
                  form.setValue("businessHours", newHours);
                }}
              />
              <Input
                type="time"
                value={hour.close || ""}
                onChange={(e) => {
                  const newHours = [...form.getValues("businessHours")];
                  newHours[idx].close = e.target.value;
                  form.setValue("businessHours", newHours);
                }}
              />
              <input
                type="checkbox"
                checked={hour.isClosed || false}
                onChange={() => {
                  const newHours = [...form.getValues("businessHours")];
                  newHours[idx].isClosed = !newHours[idx].isClosed;
                  form.setValue("businessHours", newHours);
                }}
              />
            </div>
          ))}

          <Button type="submit">Save Settings</Button>
        </form>
      </Form>
    </div>
  );
}
