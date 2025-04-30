import { useState } from "react";
import { useClientSession } from "./useClientSession";
import { Car } from "../types/car";
import { request } from "../actions/request";
import { toast } from "sonner";

interface FormValues {
  pickupDate: Date;
  dropoffDate: Date;
  subtotal: number;
  payment_method: "cash" | "card" | string;
  driver: string;
  driver_lic: number;
  damage_report: string;
  comments: string;
  ad_driver: string;
  ad_driver_lic: number;
  with_gas: boolean;
  coupon_code: string;
  pickup_location_id: number;
  return_location_id: number;
}

const useBookingForm = (car: Car) => {
  const [formValues, setFormValues] = useState<FormValues>({
    pickupDate: new Date(),
    dropoffDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    subtotal: 0,
    payment_method: "cash",
    driver: "",
    driver_lic: 0,
    damage_report: "",
    comments: "",
    ad_driver: "",
    ad_driver_lic: 0,
    with_gas: true,
    coupon_code: "",
    pickup_location_id: 0,
    return_location_id: 0,
  });

  const { user } = useClientSession();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    let finalValue: string | boolean = value;

    if (type === "checkbox" && "checked" in e.target) {
      finalValue = e.target.checked;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

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
      car_id: car.id,
      user_id: user?.id,
      start_date: formValues.pickupDate
        ? new Date(formValues.pickupDate).toISOString()
        : undefined,
      end_date: formValues.dropoffDate
        ? new Date(formValues.dropoffDate).toISOString()
        : undefined,
      payment_method: formValues.payment_method || "cash",
      driver: formValues.driver || "",
      driver_lic: formValues.driver_lic || 0,
      damage_report: formValues.damage_report || "",
      comments: formValues.comments || "",
      ad_driver: formValues.ad_driver || "12312312",
      ad_driver_lic: formValues.ad_driver_lic || 0,
      whit_gas: formValues.with_gas,
      coupon_code: formValues.coupon_code || "",
      pickup_location_id: formValues.pickup_location_id || 1,
      return_location_id: formValues.return_location_id || 1,
    };

    const { data, status, error } = await request(
      "rentals",
      "POST",
      formattedValues
    );

    if (status === 200) {
      console.log("Booking successfully created:", data);

      toast.success("Booking successfully created!", {
        duration: 3000,
        style: { backgroundColor: "#28a745", color: "#fff" },
      });
    } else {
      console.error("Error creating booking:", error || "Unknown error");

      toast.error(`Error: ${error || "Unknown error"}`, {
        duration: 3000,
        style: { backgroundColor: "#dc3545", color: "#fff" },
      });
    }
  };

  return {
    formValues,
    handleChange,
    handleDateChange,
    handleSubmit,
  };
};

export default useBookingForm;
