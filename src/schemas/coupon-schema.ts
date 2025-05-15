import { z } from "zod";

export const couponSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  discount: z
    .number({
      required_error: "El descuento es requerido",
      invalid_type_error: "Debe ser un número",
    })
    .positive("Debe ser mayor que 0"),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
});

export type CouponSchemaType = z.infer<typeof couponSchema>;
