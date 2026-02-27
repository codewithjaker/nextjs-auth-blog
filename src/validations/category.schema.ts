import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().optional(),
  parent: z.string().optional().nullable(),
  order: z.number().default(0),
  status: z.enum(["active", "inactive"]).default("active")
});