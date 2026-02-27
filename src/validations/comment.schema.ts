import { z } from "zod";

export const commentSchema = z.object({
  post: z.string(), // post ID
  name: z.string().min(2),
  email: z.string().email(),
  comment: z.string().min(3),
  status: z.enum(["pending", "approved", "spam"]).default("pending")
});