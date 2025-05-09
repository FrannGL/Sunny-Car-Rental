import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z
    .number({
      required_error: "El año es requerido",
      invalid_type_error: "Debe ser un número",
    })
    .int()
    .gte(1900, "Año no válido")
    .lte(new Date().getFullYear(), "Año no válido"),
  plate_number: z.string().min(1, "La placa es requerida"),
  status: z.enum(["available", "unavailable", "rented"]),
  price_per_day: z
    .number({
      required_error: "El precio es requerido",
      invalid_type_error: "Debe ser un número",
    })
    .positive("Debe ser mayor que 0"),
  gama: z.enum(["baja", "media", "alta"]),
  location_id: z.string().min(1, "La ubicación es requerida"),
  image_base64: z.string().nullable().optional(),
});

export type CarSchema = z.infer<typeof carSchema>;
