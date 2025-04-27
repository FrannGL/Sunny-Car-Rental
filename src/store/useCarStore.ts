import { create } from "zustand";
import { Car } from "../types/car";

interface CarState {
  cars: Car[];
  setCars: (newCars: Car[]) => void;
}

export const useCarStore = create<CarState>((set) => ({
  cars: [],
  setCars: (newCars) => set({ cars: newCars }),
}));
