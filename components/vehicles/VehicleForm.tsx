"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VehicleForm() {
  const [registration, setRegistration] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [maxLoad, setMaxLoad] = useState("");
  const [odometer, setOdometer] = useState("");
  const [acquisitionCost, setAcquisitionCost] = useState("");
  const [status, setStatus] = useState("Available");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("vehicles").insert([
      {
        registration_number: registration,
        manufacturer: manufacturer,
        model: manufacturer,
        vehicle_type: vehicleType,
        max_load: Number(maxLoad),
        odometer: Number(odometer),
        acquisition_cost: Number(acquisitionCost),
        fuel_type: "Diesel",
        status: status,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Vehicle Added Successfully!");

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Registration Number"
        value={registration}
        onChange={(e) => setRegistration(e.target.value)}
      />

      <Input
        placeholder="Manufacturer"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
      />

      <Input
        placeholder="Vehicle Type"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Maximum Load (kg)"
        value={maxLoad}
        onChange={(e) => setMaxLoad(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Odometer"
        value={odometer}
        onChange={(e) => setOdometer(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Acquisition Cost"
        value={acquisitionCost}
        onChange={(e) => setAcquisitionCost(e.target.value)}
      />

      <Select
  onValueChange={(value: any) => {
    setStatus(String(value));
  }}
>
        <SelectTrigger>
          <SelectValue placeholder="Vehicle Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="On Trip">On Trip</SelectItem>
          <SelectItem value="In Shop">In Shop</SelectItem>
        </SelectContent>
      </Select>

      <Button className="w-full" type="submit">
        Save Vehicle
      </Button>
    </form>
  );
}