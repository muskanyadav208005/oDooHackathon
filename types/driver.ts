export interface Driver {
  id: number;
  name: string;
  licenseNumber: string;
  phone: string;
  expiry: string;
  status: "Available" | "On Trip" | "Off Duty" | "Suspended";
}
  