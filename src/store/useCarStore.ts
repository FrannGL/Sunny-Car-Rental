import { create } from "zustand";
import { Car } from "../types/car";
import { Location } from "../types/locations";

interface CarState {
  cars: Car[];
  locations: Location[];
  setCars: (newCars: Car[]) => void;
  setLocations: (newLocations: Location[]) => void;
}

export const useCarStore = create<CarState>((set) => ({
  cars: [],
  locations: [],
  setCars: (newCars) => set({ cars: newCars }),
  setLocations: (newLocations) => set({ locations: newLocations }),
}));
