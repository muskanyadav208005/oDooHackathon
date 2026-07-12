import { Vehicle } from "@/types/vehicle";

export const vehicles: Vehicle[] = [
  {
    id: 1,
    registrationNumber: "MH12AB1234",
    vehicleName: "Tata Ace",
    type: "Mini Truck",
    maxLoad: 5000,
    odometer: 25000,
    acquisitionCost: 900000,
    status: "Available",
  },
  {
    id: 2,
    registrationNumber: "DL04XY9876",
    vehicleName: "Ashok Leyland",
    type: "Truck",
    maxLoad: 10000,
    odometer: 75000,
    acquisitionCost: 2200000,
    status: "On Trip",
  },
  {
    id: 3,
    registrationNumber: "KA01MN4321",
    vehicleName: "Mahindra Bolero",
    type: "Pickup",
    maxLoad: 2500,
    odometer: 15000,
    acquisitionCost: 1200000,
    status: "In Shop",
  },
];