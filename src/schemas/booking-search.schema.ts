import { z } from "zod";

export const bookingSearchSchema = z.object({
  pickUpLocation: z.string().min(1, "El punto de partida es obligatorio"),
  dropOffLocation: z.string().min(1, "El punto de entrega es obligatorio"),
  pickupDate: z.date({ required_error: "La fecha de inicio es obligatoria" }),
  dropoffDate: z.date({
    required_error: "La fecha de devolución es obligatoria",
  }),
});

export type BookingSearchSchemaType = z.infer<typeof bookingSearchSchema>;
