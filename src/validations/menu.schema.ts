import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  section: z.enum(["header", "footer"]),
  parent: z.string().optional().nullable(),
  order: z.number().default(0),
  newTab: z.boolean().default(false),
  status: z.enum(["active", "inactive"]).default("active")
});