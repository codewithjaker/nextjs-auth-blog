import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["super_admin", "admin", "editor", "author"]),
  status: z.enum(["active", "inactive"]).default("active"),
});
