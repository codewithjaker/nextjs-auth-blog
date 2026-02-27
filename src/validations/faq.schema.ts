import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(3),
  answer: z.string().min(3),
  order: z.number().default(0),
  status: z.enum(["active", "inactive"]).default("active")
});