export interface Vehicle {
  id: number;
  registrationNumber: string;
  vehicleName: string;
  type: string;
  maxLoad: number;
  odometer: number;
  acquisitionCost: number;
  status: "Available" | "On Trip" | "In Shop" | "Retired";
}