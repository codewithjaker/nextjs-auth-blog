import { z } from "zod";

export const pageSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft")
});