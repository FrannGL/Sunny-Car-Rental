import { z } from "zod";

export const seasonSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  fecha_inicio: z.string().min(1, "La fecha de inicio es requerida"),
  fecha_fin: z.string().min(1, "La fecha de fin es requerida"),
  ajuste_gama_alta: z
    .number()
    .min(-100, "El ajuste no puede ser menor a -100%")
    .max(100, "El ajuste no puede ser mayor a 100%"),
  ajuste_gama_media: z
    .number()
    .min(-100, "El ajuste no puede ser menor a -100%")
    .max(100, "El ajuste no puede ser mayor a 100%"),
  ajuste_gama_economica: z
    .number()
    .min(-100, "El ajuste no puede ser menor a -100%")
    .max(100, "El ajuste no puede ser mayor a 100%"),
});

export type SeasonSchemaType = z.infer<typeof seasonSchema>;
