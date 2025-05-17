import { useClientSession } from "./useClientSession";
import { Car } from "../types/car";
import { request } from "../actions/request";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, BookingSchemaType } from "../schemas/booking-schema";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

const useBookingForm = (car: Car) => {
  const { user } = useClientSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      pickupDate: new Date(),
      dropoffDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      subtotal: car.price_per_day,
      payment_method: "cash",
      driver: "",
      driver_lic: undefined,
      damage_report: "",
      comments: "",
      ad_driver: "",
      ad_driver_lic: undefined,
      with_gas: true,
      coupon_code: "",
      pickup_location_id: 0,
      return_location_id: 0,
      delivery_type: "physical",
      rented_by: "web",
      reserve_code: "",
    },
  });

  const pickupDate = watch("pickupDate");
  const dropoffDate = watch("dropoffDate");

  const updateSubtotal = useCallback(() => {
    if (pickupDate && dropoffDate) {
      const diffTime = Math.abs(dropoffDate.getTime() - pickupDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const subtotal = (diffDays || 1) * car.price_per_day;
      setValue("subtotal", subtotal);
    }
  }, [pickupDate, dropoffDate, car.price_per_day, setValue]);

  const onSubmit = async (data: BookingSchemaType) => {
    const formattedValues = {
      car_id: car.id,
      user_id: user?.id,
      start_date: data.pickupDate.toISOString(),
      end_date: data.dropoffDate.toISOString(),
      payment_method: data.payment_method,
      driver: data.driver,
      driver_lic: data.driver_lic,
      damage_report: data.damage_report,
      comments: data.comments,
      ad_driver: data.ad_driver || "12312312",
      ad_driver_lic: data.ad_driver_lic,
      whit_gas: data.with_gas,
      coupon_code: data.coupon_code,
      pickup_location_id: data.pickup_location_id || 1,
      return_location_id: data.return_location_id || 1,
      delivery_type: data.delivery_type,
      rented_by: data.rented_by,
      reserve_code: data.reserve_code || "",
    };

    const {
      data: res,
      status,
      error,
    } = await request("rentals", "POST", formattedValues);

    if (status === 200) {
      toast.success("Booking successfully created!", {
        duration: 3000,
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
      router.refresh();
      setTimeout(() => {
        router.push("/rentals");
      }, 1000);
    } else {
      toast.error(`Error: ${error || "Unknown error"}`, {
        duration: 3000,
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  useEffect(() => {
    updateSubtotal();
  }, [pickupDate, dropoffDate, updateSubtotal]);

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    updateSubtotal,
    watch,
  };
};

export default useBookingForm;
