import { z } from "zod";

export const sliderSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  image: z.string().min(1),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  order: z.number().default(0),
  status: z.enum(["active", "inactive"]).default("active")
});