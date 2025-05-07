import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(1, "Username is required"),
});

export const verifySchema = z
  .object({
    code: z.string().min(1, "Code is required"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
    conf_pass: z
      .string()
      .min(6, {
        message: "Confirm password must be at least 6 characters long",
      })
      .max(20, {
        message: "Confirm password must be at most 20 characters long",
      }),
  })
  .refine((data) => data.password === data.conf_pass, {
    path: ["conf_pass"],
    message: "Las contraseñas no coinciden",
  });

export type EmailFormValues = z.infer<typeof emailSchema>;
export type RegisterStepValues = z.infer<typeof verifySchema>;
