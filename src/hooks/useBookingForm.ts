import { useState } from "react";
import { useClientSession } from "./useClientSession";
import { Car } from "../types/car";
import { request } from "../actions/request";

interface FormValues {
  pickupDate: Date;
  dropoffDate: Date;
  subtotal: number;
  discount: number;
}

const useBookingForm = (car: Car) => {
  const [formValues, setFormValues] = useState<FormValues>({
    pickupDate: new Date(),
    dropoffDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    subtotal: car.price_per_day,
    discount: 0,
  });

  const { user } = useClientSession();

  const handleDateChange = (
    field: "pickupDate" | "dropoffDate",
    date: Date
  ) => {
    setFormValues((prev) => {
      const updated = { ...prev, [field]: date };

      if (updated.pickupDate && updated.dropoffDate) {
        const diffTime = Math.abs(
          updated.dropoffDate.getTime() - updated.pickupDate.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        updated.subtotal = (diffDays || 1) * car.price_per_day;
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedValues = {
      start_date: formValues.pickupDate
        ? new Date(formValues.pickupDate).toISOString()
        : undefined,
      end_date: formValues.dropoffDate
        ? new Date(formValues.dropoffDate).toISOString()
        : undefined,
      discount: formValues.discount,
      subtotal: formValues.subtotal,
      car_id: car.id,
      user_id: user?.id,
      payment_method: "cash",
      damage_report: "",
      comments: "",
      coupon_code: "",
      pickup_location_id: 1,
      return_location_id: 1,
    };

    const { data, status, error } = await request(
      "rentals",
      "POST",
      formattedValues
    );

    if (status === 200) {
      console.log("Booking successfully created:", data);
    } else {
      console.error("Error creating booking:", error || "Unknown error");
    }
  };

  return {
    formValues,
    handleDateChange,
    handleSubmit,
  };
};

export default useBookingForm;
