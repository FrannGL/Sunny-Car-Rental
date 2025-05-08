import { z } from "zod";

export const bookingSchema = z
  .object({
    pickupDate: z.date({ required_error: "Pickup date is required" }),
    dropoffDate: z.date({ required_error: "Dropoff date is required" }),
    subtotal: z.number().min(1, "Subtotal must be at least 1"),
    payment_method: z.enum(["cash", "card"]).or(z.string()),

    driver: z.string().min(1, "Driver name is required"),

    driver_lic: z
      .number({
        required_error: "Driver license is required",
        invalid_type_error: "Must be a number",
      })
      .min(1, "Driver license is required"),

    damage_report: z.string().optional(),
    comments: z.string().optional(),

    ad_driver: z.string().optional(),

    ad_driver_lic: z
      .number({
        invalid_type_error: "Must be a number",
      })
      .min(1, "Additional driver license is required")
      .optional(),

    with_gas: z.boolean(),
    coupon_code: z.string().optional(),

    pickup_location_id: z
      .number({
        required_error: "Pickup location is required",
        invalid_type_error: "Must be a number",
      })
      .min(1, "Pickup location is required"),

    return_location_id: z
      .number({
        required_error: "Return location is required",
        invalid_type_error: "Must be a number",
      })
      .min(1, "Return location is required"),
  })
  .refine(
    (data) => {
      if (data.ad_driver && !data.ad_driver_lic) {
        return false;
      }
      return true;
    },
    {
      message:
        "Additional driver license is required if additional driver is set",
      path: ["ad_driver_lic"],
    }
  );

export type BookingSchemaType = z.infer<typeof bookingSchema>;
