export interface Trip {
  id: number;
  vehicle: string;
  driver: string;
  pickup: string;
  destination: string;
  cargoWeight: number;
  distance: number;
  revenue: number;
  status: "Draft" | "Dispatched" | "Completed" | "Cancelled";
}