import { Location } from "./locations";

export interface Car {
  brand: string;
  model: string;
  year: number;
  plate_number: string;
  status: "available" | "unavailable" | "rented";
  price_per_day: number;
  gama: "economica" | "media" | "alta";
  id: number;
  created_at: string;
  updated_at: string;
  image_base64: string | null;
  location: Location;
}
