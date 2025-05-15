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
  gama: z.enum(["economica", "media", "alta"]),
  transmission: z.enum(["manual", "automatic"], {
    required_error: "La transmisión es requerida",
  }),
  passenger_capacity: z
    .number({
      required_error: "La capacidad de pasajeros es requerida",
      invalid_type_error: "Debe ser un número",
    })
    .int()
    .min(1, "Debe tener al menos 1 pasajero")
    .max(12, "Máximo 12 pasajeros"),
  luggage_capacity: z
    .number({
      required_error: "La capacidad de equipaje es requerida",
      invalid_type_error: "Debe ser un número",
    })
    .int()
    .min(0, "No puede ser negativo"),
  unlimited_mileage: z.boolean({
    required_error: "Debe especificar si el kilometraje es ilimitado",
  }),
  car_code: z.string().min(1, "El código del vehículo es requerido"),
  location: z.object({
    id: z.number(),
    name: z.string(),
  }),
  image_base64: z.string().nullable().optional(),
});

export type CarSchema = z.infer<typeof carSchema>;
