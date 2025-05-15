import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  country: z.string().min(1, "El país es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  lat: z.string().min(1, "La latitud es requerida"),
  lon: z.string().min(1, "La longitud es requerida"),
  url: z.string().url("La URL debe ser válida"),
  image: z.string().url("La URL de la imagen debe ser válida"),
});

export type LocationSchemaType = z.infer<typeof locationSchema>;
