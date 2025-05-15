import { z } from "zod";

export const RentalSchema = z.object({
  car_id: z.number(),
  user_id: z.number(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  payment_method: z.enum(["cash", "card"]).or(z.string()),
  driver: z.string(),
  driver_lic: z.number(),
  delivery_type: z.enum(["physical"]).or(z.string()),
  rented_by: z.enum(["web"]).or(z.string()),
  reserve_code: z.string(),
  damage_report: z.string(),
  comments: z.string(),
  ad_driver: z.string().nullable(),
  ad_driver_lic: z.number().nullable(),
  with_gas: z.boolean(),
  total_price: z.number(),
  status: z.enum(["active", "completed", "cancelled"]).or(z.string()),
  pickup_location_id: z.number().nullable(),
  return_location_id: z.number().nullable(),
});

export type RentalSchemaType = z.infer<typeof RentalSchema>;
