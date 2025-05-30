import { Location } from "./locations";
import { Car } from "./car";
import { User } from "./user";

export interface Rental {
  id: number;
  car_id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  payment_method: "cash" | "card" | string;
  driver: string;
  driver_lic: number;
  damage_report: string;
  comments: string;
  ad_driver: string | null;
  ad_driver_lic: number | null;
  with_gas: boolean;
  delivery_type: "physical" | string;
  rented_by: "web" | string;
  reserve_code: string;
  total_price: number;
  status: "active" | "completed" | "cancelled" | string;
  created_at: string;
  updated_at: string;
  pickup_location_id: number | null;
  return_location_id: number | null;
}
