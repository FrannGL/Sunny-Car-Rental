import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  BookingSearchSchemaType,
  bookingSearchSchema,
} from "../schemas/booking-search.schema";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function useBookingSearch() {
  const locale = useLocale();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookingSearchSchemaType>({
    resolver: zodResolver(bookingSearchSchema),
  });

  const onSubmit = (data: BookingSearchSchemaType) => {
    if (
      data.pickUpLocation &&
      data.dropOffLocation &&
      data.pickupDate &&
      data.dropoffDate
    ) {
      const searchParams = new URLSearchParams({
        pickUpLocation: data.pickUpLocation,
        dropOffLocation: data.dropOffLocation,
        pickupDate: data.pickupDate.toISOString(),
        dropoffDate: data.dropoffDate.toISOString(),
      }).toString();

      router.push(`${locale}/cars?${searchParams}`);
    } else {
      console.log("Faltan datos para completar la búsqueda");
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    onSubmit,
  };
}
