import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  content: z.string().min(10),
  excerpt: z.string().optional(),
  featuredImage: z.string().optional(),
  category: z.string().optional(), // category ID
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  allowComments: z.boolean().default(true)
});