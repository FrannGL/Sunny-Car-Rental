import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(1, { message: "Email is required!" }),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters!" }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
