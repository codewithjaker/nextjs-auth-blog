import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.string().min(1),
  icon: z.string().min(1), // store icon name (e.g., from lucide-react)
  url: z.url(),
  order: z.number().default(0),
  status: z.enum(["active", "inactive"]).default("active"),
});
